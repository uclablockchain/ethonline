# Example ABI Encoding Breakdown
Composable uses a simple method of encoding calls to external contracts.

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
This is an oversimplification, because the `bytes memory data` object from `abi` encoding functions isn't typical; it doesn't contain the offset / size which is required to decode standard Solidity decoding, since it is intended to be digested by a function call and not as a variable. Hence, we have custom encoding implementations available in Javascript and in Solidity.

#### What Composable does

Composable attempts to map the first 4 bytes to one of its functions, but it doesn't have any functions except for the `fallback` and `receive` functions, so it defaults to `fallback` whenever a message is sent to the contract that contains data. We process the call using `memory`, which is a kind of temporary storage, different from `calldata`. We must manually allocate memory, whereas calldata cannot be overwritten, and calldata only contains the data which was sent as parameters within a function call. To do this, we must use assembly code, and the Composable contract that does the transaction decoding and sending is exclusively coded in assembly. Writing to memory is cheap and expanding memory is cheap. Writing to storage is expensive! Writing to storage costs 20,000 gas for uninitialized values and 5,000 for resetting values to 0. Expanding memory by a word costs 3 gas. That's a difference of _4 orders of magnitude_.

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
[ memory ] 0000000000000000000000004639f1764512b76D7770116d98B5695F8f6D0d4b ----> [ size ]
```
3. Manually allocate memory to hold the intended calldata. This is less visually appealing, so we left out the drawing here, because it's straightforward in terms of alignment: we just send it directly to memory as it is, starting from the end of the first 32 bytes.

#### A note about the size variable
We store the size of the individual call to enable sending multiple calls within a single transaction. In the case when `(calldatasize() - 32) > size`, we anticipate another call to send, and loop through the calls until we reach the end of the calldata.
