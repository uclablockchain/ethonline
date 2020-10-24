pragma solidity ^0.6.6;

contract ComposableMultiCaller {
    /**
    * @dev NOTE: this contract is NOT WORKING CORRECTLY (yet)!
    **/

    fallback() external payable {
        assembly {
            function scratch_calldatacopy(to, from, size) -> val {
                mstore(0, 0)
                calldatacopy(to, from, size)
                val := mload(0)
            }
            function new_memory_calldatacopy(from, size) -> ptr {
                ptr := mload(0x40)
                calldatacopy(ptr, from, size)
                mstore(0x40, add(ptr, size))
            }
            function new_memory(n_bytes32) -> ptr {
                ptr := mload(0x40)
                for { let i := 0 } lt(i, n_bytes32) { i := add(i, 1) } {
                    mstore(add(ptr, mul(i, 32)), 0)
                }
                mstore(0x40, add(ptr, mul(n_bytes32, 32)))
            }

            /**
            * @dev We use this to hold any return data that comes back from
            *      intermediate calls (mainly so we don't clog the scratch
            *      space and/or corrupt the free memory/dynamic memory slots).
            *      Expanding memory only costs 3 gas per word (maybe it's
            *      changed, I'm basing this off the yellowpaper currently),
            *      so for safety this is worthwhile. Saves 256 bytes of space.
            **/
            // let intermediateOutput := new_memory(256)

            /**
            * @dev Iterate until we reach end of the encoded data
            **/
            let end := calldatasize()
            let callsPosition := 0
            for { } lt(callsPosition, sub(end, 1)) { } {
                /**
                * @dev The first 20 bytes of each calldata contains the address
                *      of the target.
                **/
                // mstore(0, 0)
                // calldatacopy(12, callsPosition, 20)
                // let target := mload(0)
                let target := scratch_calldatacopy(12, callsPosition, 20)
                if eq(extcodesize(target), 0) { revert(0, 32) }
                // let targetCodesize := extcodesize(target)
                // if eq(targetCodesize, 0) {
                //     revert(0, 32)
                // }
                mstore(0, 0)

                /**
                * @dev Get the size of the current calldata to send.
                **/
                // mstore(0, 0)
                // calldatacopy(20, callsPosition, 12)
                // let size := mload(0)
                // mstore(0, 0)
                let size := scratch_calldatacopy(20, add(callsPosition, 20), 12)

                /**
                * @dev Store the rest of the data (selector and calldata).
                **/
                // let data := mload(0x40)
                // calldatacopy(data, add(callsPosition, 32), size)
                // mstore(0x40, add(data, size))
                let data := new_memory_calldatacopy(add(callsPosition, 32), size)


                let intermediateOutput := new_memory(4)
                // let intermediateOutput := mload(0x40)
                // for { let i := 0 } lt(i, 4) { i := add(i, 1) } {
                //     mstore(add(intermediateOutput, mul(i, 32)), 0)
                // }
                // mstore(0x40, add(intermediateOutput, 256))


                callsPosition := add(callsPosition, add(size, 32))
                /**
                * @dev send the call passing along all wei/gas sent with the
                *      call. returns 0 on error, 1 on success. Require that the
                *      target is a contract. If not, revert with the incorrect
                *      target value (it is still in scratch space before
                *      sending the call)
                **/
                let result := call(gas(), target, callvalue(), data, size, intermediateOutput, 256)
                switch result
                    case 0 {
                        // call failed, revert if it didn't already
                        revert(intermediateOutput, returndatasize())
                    }
                    default {
                        // successful call => increment position
                        log0(intermediateOutput, returndatasize())
                        revert(intermediateOutput, returndatasize())
                    }
            }
        }
    }
}
