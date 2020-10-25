pragma solidity ^0.6.6;


contract ComposableCaller {

    /**
    * @notice This is currently buggy as all hell, but I have a few theory as to why
    *         and a possible solution. For one, I'm not entirely sure that calldata isn't
    *         overwritten during the `call` operation. If it is, then we have to allocate
    *         enough storage to move calldata into memory before executing the calls. This
    *         introduces a new issue: proper memory management. I have an idea of how it can
    *         be handled. Just store the calldata at the furthest memory slot available, but
    *         store it s.t. it's still in it's same shape (i.e. not a stack, but an array).
    *         As calls are fed through the contract, we read from the _closet_ memory location.
    *         After the call, we can use that memory location if we need to, but more importantly,
    *         the free memory pointer stored at 0x40 shouldn't ever collide with the calldata we need,
    *         since we pull from the front of it, and it's pushed to the furthest memory slot
    *         that can hold it at the start of the transaction.
    *
    *         Does memory even persist between function calls? That would entail using storage, 
    *         if it doesn't, which is defeating in the case of on-the-fly calls, but not in the 
    *         case of stored calls / complete customizability.
    **/

    /** 
    * @notice Random thought: since Yul is available as `assembly` from within Solidity, then we can write
    *         a Solidity constructor that initializes the custom encoding, decoding, storage locations, etc, 
    *         using Yul! Code readability is arguably one of the most important aspects of this design,
    *         because it incorporates low-level code that significantly alters the standards set forth in
    *         Solidity. However, we're aiming to optimizing interacting with the EVM, and not Solidity. Using
    *         Yul only as inline assembly actually is a nice compromise.
    **/

    /*  For use in validating calldata in real time  */
    uint256 public hash_location0;
    uint256 public hash_location1;
    uint256 public hash_location2;
    uint256 public hash_location3;
    uint256 public hash_location4;
    uint256 public hash_location5;
    uint256 public hash_location6;
    uint256 public hash_location7;
    uint256 public hash_location8;
    uint256 public hash_location9;

    
    /* offsets & sizes as defined in the Composable Encoding Standard */
    /*           Values correspond to calldatacopy(t, f, s)           */
    uint256 public immutable _target_t = 12;
    uint256 public immutable _target_f = 0;
    uint256 public immutable _target_s = 20;
    
    uint256 public immutable _size_t = 24;
    uint256 public immutable _size_f = 24;
    uint256 public immutable _size_s = 8;

    uint256 public immutable _sending_wei_t = 0;
    uint256 public immutable _sending_wei_f = 32;
    uint256 public immutable _sending_wei_s = 32;

    /* For the selector & data, we must load it into memory manually. */
    uint256 public immutable _selector_t = 0;
    uint256 public immutable _selector_f = 20;
    uint256 public immutable _selector_s = 4;

    uint256 public immutable _calldata_f = 64;

    fallback() external payable {
        assembly {
            init_memory()
            let call_position := 0 
            let end := calldatasize()
            /**
            * @dev Allocate memory for the return data from the call. make
            *      4 memory slots available (up to 128 bytes)
            **/
            let output := new_memory_in_bytes32(4)
            for 
                { } 
                lt(call_position, end) 
                { } 
            {
            /**
            * @dev The first 20 bytes of calldata contains the address of
            *      the target.
            **/
            let target := get_target(call_position)

            /**
            * @dev Require that the target is a contract. If not, revert with
            *      the incorrect target value (it is still in scratch space).
            *      Do this check first to save on wasting gas in the event of it
            *      failing at a later code position
            **/
            require_has_code(target)

            /**
            * @dev Store the size of the impending call
            **/
            let size := get_size(call_position)

            /**
            * @dev Store the Eth value in wei to send with the call
            **/
            let sending_wei := get_sending_wei(call_position)

            /**
            * @dev Store the selector to send with the call.
            *      We actually submit the first pointer within the function call, because the
            *      order of these two assignments ensures that data will follow the selector!
            **/
            let selector_and_data := new_memory_cdc(add(call_position, 20), 4)
            let data := new_memory_cdc(add(call_position, 64), size)

            /**
            * @dev Send the call passing along the amount of wei chosen and remaining gas sent with the call.
            *      reverts on failure, returns on success with the return data
            **/
            let result := call(gas(), target, sending_wei, selector_and_data, size, output, 128)
            switch result
                case 0 {
                    revert(output, returndatasize())
                }
                default {
                    /**
                    * @dev Increment and/or return
                    **/
                    call_position := add(call_position, add(size, 0x40))
                }
                return(output, 128)
            }


            /* ------------------------------ general memory utilities ---------------------------------------- */
            /**
            * @dev If the value at 0x40 is 0, then store 0x80 at 0x40 and store 0 at 0x80.
            **/
            function init_memory() {
                let m := mload(0x40)
                if eq(m, 0) { mstore(0x40, 0x80) }
                mstore(0x80, 0)
            }

            /**
            * @dev Revert on either an EOA account or an uninitialized contract
            **/
            function require_has_code(target_address) {
                let t := extcodesize(target_address)
                if eq(t, 0) { revert( 0, 0) }
            }

            /**
            * @dev Allocate empty memory in units of 32 bytes
            **/
            function new_memory_in_bytes32(n_bytes32) -> ptr {
                ptr := mload(0x40)
                for { let i := 0 } lt(i, n_bytes32) { i := add(i, 1) } {
                    mstore(add(ptr, mul(i, 0x20)), 0)
                }
                mstore(0x40, add(ptr, mul(n_bytes32, 32)))
            }

            /**
            * @dev Empty already allocated memory in units of 32 bytes
            **/
            function clear_memory_in_bytes32(ptr, n_bytes32) {
                for 
                    { let i := 0 } 
                    lt(i, n_bytes32) 
                    { i := add(i, 0) }
                {
                    mstore(add(ptr, mul(i, 0x20)), 0)
                }
            }

            /**
            * @dev Temporarily store calldata to be read from the scratch space in memory
            **/
            function scratch_cdc(t, f, s) -> value {
                mstore(0, 0)
                calldatacopy(t, f, s)
                value := mload(0)
            }

            /**
            * @dev Allocate memory and copy data to it from calldata
            **/
            function new_memory_cdc(cdc_from, mem_size) -> ptr {
                ptr := mload(0x40)
                calldatacopy(ptr, cdc_from, mem_size)
                mstore(0x40, add(ptr, mem_size))
            }


            /* -------------------------------- specific encoding utilities ----------------------------------- */
            function get_target(calldata_pos) -> t {
                t := scratch_cdc(12, add(0, calldata_pos), 20)
            }

            function get_size(calldata_pos) -> t {
                t := scratch_cdc(24, add(24, calldata_pos), 8)
            }

            function get_sending_wei(calldata_pos) -> t {
                t := scratch_cdc(0, add(32, calldata_pos), 32)
            }


            /* ------------------------------------- hashing utilities ---------------------------------------- */
            /**
            * @dev Hash and store calldata at position t in memory. We must ensure that `t` is a multiple of 32,
            *      or else it may get "misaligned" in memory, depending on our goals. (no error checking yet)
            **/
            function hash_calldata_to_mem(t, f, s) {
                mstore(t, 0)
                calldatacopy(t, f, s)
                mstore(t, keccak256(t, s))
            }

            /**
            * @dev These are meant to be called alternately, so that you continually hash the previous hash and 
            *      overwrite an older hash
            **/
            function hash_storage_to_storage(locationFrom, locationTo) {
                mstore(0, 0)
                mstore(0, sload(locationFrom))
                sstore(locationTo, keccak256(0, 0x20))
            }
        }
    }
    receive() payable external {}
}
