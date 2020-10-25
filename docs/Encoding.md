# Composable Encoding Standard
We aim to define a non-standard packed encoding for calling arbitrary functions with arbitrary function parameters, and we implement our specification of encoding and decoding arbitrary calldata by interrupting the standard function call process via `fallback` function, taking inspiration in particular from the [ERC-2535 Diamond Standard](https://eips.ethereum.org/EIPS/eip-2535). We use a tightly packed encoding, wasting no space and making one important assumption: **the length of any individual call within a composed chain of calls will not exceed the upper bound of a 64-bit unsigned integer**.

![Image of Encoding](https://github.com/uclablockchain/ethonline/blob/main/docs/Composable.pdf)

## Examining the Solidity Docs
[Function Types](https://solidity.readthedocs.io/en/v0.7.4/types.html)
>If external function types are used outside of the context of Solidity, **they are treated as the function type, which encodes the address followed by the function identifier together in a single bytes24 type.**

[Layout in Memory](https://solidity.readthedocs.io/en/v0.7.4/internals/layout_in_memory.html)
>Elements in memory arrays in Solidity always occupy multiples of 32 bytes (this is even true for byte[], but not for bytes and string). Multi-dimensional memory arrays are pointers to memory arrays. **The length of a dynamic array is stored at the first slot of the array and followed by the array elements.**

notably, from [Function Types](https://solidity.readthedocs.io/en/v0.7.4/types.html)
>.address returns the address of the contract of the function.
.selector returns the ABI function selector



## vvv - Deprecated - vvv
#### Sending a Composable call

1. Encode the function calldata for your intended contract, including the function selector.
2. Prepend 32 bytes to the calldata, containing:
 - First 20 bytes: the target address
 - Remaining 12 bytes: the size of the original calldata as a uint96
3. Send it.

A rough representation of this, in pseudo-Solidity:
```
bytes memory data = abi.encodeWithSelector(targetFunction.selector, ...) // whatever arguments necessary for that function, if any
abi.encodePacked(target, sizeOf(data), data) // pack it together with the bytes32 encoding (target + size)
```

#### What Composable does

Composable only implements the `fallback` and `receive` functions, so it defaults to `fallback` whenever a message is sent to the contract that contains data. We process the call using `memory`, which is a kind of temporary storage, different from `calldata`. We must manually allocate memory, whereas calldata cannot be overwritten, and calldata only contains the data which was sent as parameters within a function call. To do this, we use assembly code, and the Composable contract that does the transaction decoding and sending is exclusively coded in assembly. Writing to memory is cheap and expanding memory is cheap. Writing to storage is expensive! Writing to storage costs 20,000 gas for uninitialized values and 5,000 for resetting values to 0. Expanding memory by a word costs 3 gas. That's a difference of _4 orders of magnitude_.

#### The process of manipulating the data is as follows:
1.   Copy the first 20 bytes into a variable `target`, using memory as an intermediate container, ultimately storing it in the stack, which is nearly free in terms of gas expense.
```
[calldata] 4639f1764512b76D7770116d98B5695F8f6D0d4b000000000000000000000066
           |                                      |
           ------------------------v              ------------------------v
[ memory ] 0000000000000000000000004639f1764512b76D7770116d98B5695F8f6D0d4b ----> [ target ]
```
2. Copy the last 12 bytes into a variable `size` using the same process.
```
[calldata] 4639f1764512b76D7770116d98B5695F8f6D0d4b000000000000000000000066
                                                   |                      |
                                                   v                      v
[ memory ] 0000000000000000000000000000000000000000000000000000000000000066 ----> [ size ]
```
3. Manually allocate memory to hold the intended calldata. This is less visually appealing, so we left out the drawing here, because it's straightforward in terms of alignment: we just send it directly to memory as it is, starting from the end of the first 32 bytes.

#### A note about the size variable
We store the size of the individual call to enable sending multiple calls within a single transaction. In the case when `(calldatasize() - 32) > size`, we anticipate another call to send, and loop through the calls until we reach the end of the calldata.
