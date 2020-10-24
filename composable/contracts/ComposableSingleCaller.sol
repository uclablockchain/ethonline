pragma solidity ^0.6.6;

contract ComposableSingleCaller {

    fallback() external payable {
        assembly {
            /**
            * @dev The first 20 bytes of calldata contains the address of
            *      the target.
            **/
            function scratchcalldatacopy(t, f, s) -> value {
                mstore(0, 0)
                calldatacopy(t, f, s)
                value := mload(0)
            }
            // mstore(0, 0)
            // calldatacopy(12, 0, 20)
            // let target := mload(0)
            let target := scratchcalldatacopy(12, 0, 20)

            /**
            * @dev Require that the target is a contract. If not, revert with
            *      the incorrect target value (it is still in scratch space).
            **/
            let targetcodesize := extcodesize(target)
            if eq(targetcodesize, 0) {
                revert(0, 0x20)
            }

            /**
            * @dev Now that we've verified it's a contract, we can get the
            *      size (saves gas by catching errors early).
            **/
            // mstore(0, 0)
            // calldatacopy(0, 20, 12)
            // let size := mload(0)
            // mstore(0, 0)
            // let size := sub(calldatasize(), 32)

            /**
            * @dev Store the rest of the data (selector and calldata).
            **/
            mstore(0, 0)
            let data := mload(0x40)
            calldatacopy(20, 20, 12)
            let size := mload(0)
            // let size := mload(0)
            // mstore(0, 0)
            calldatacopy(data, 32, size)
            mstore(0x40, add(data, size))

            /**
            * @dev allocate memory for the return data from the call. make
            *      4 memory slots available (up to 128 bytes)
            **/
            // let output := mload(0x40)
            // for { let i := 0 } lt(i, 4) { i := add(i, 1) } {
            //     mstore(add(output, mul(i, 0x20)) , 0)
            // }
            // mstore(0x40, add(output, 0x80))

            /**
            * @dev send the call passing along all wei/gas sent with the call.
            *      reverts on failure, returns on success with the return
            *      data
            **/
            // let result := delegatecall(gas(), target, data, size, output, 0x80)
            // let result := call(gas(), target, callvalue(), data, size, output, 0x80)
            let result := call(gas(), target, callvalue(), data, size, 0, 0)
            switch result
                case 0 {
                    revert(0, 0)
                }
                default {
                    return(0, 0)
            }
        }
    }

    receive() external payable {}
}
