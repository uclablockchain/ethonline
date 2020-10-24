pragma solidity ^0.6.6;
pragma experimental ABIEncoderV2;

import "./interfaces/IComposable.sol";

contract Composable is IComposable {

    /**
    * @notice Implements the encoding standard for sending calls in its
    *         fallback function for demonstration purposes and for use within
    *         deployed contracts. Ideally, users of this contract will use the
    *         provided encoding functions definitions off-chain ie via web3.js,
    *         so that they can save on gas costs, and just submit the encoded
    *         data as a raw transaction.
    **/
    address private _composableSingleCaller;
    address private _composableMultiCaller;

    constructor(address composableSingleCaller, address composableMultiCaller) public {
        _composableSingleCaller = composableSingleCaller;
        _composableMultiCaller = composableMultiCaller;
    }

    function composableSingleCaller() external view override returns (address) {
        return _composableSingleCaller;
    }

    function composableMultiCaller() external view override returns (address) {
        return _composableMultiCaller;
    }

    function encodeCall(address target, bytes calldata data) external view override returns (bytes memory) {
        /**
        * @notice For this `encodeCall` function, within the calldata there will
        *         be 4 bytes more than what we should expect to get sent to the
        *         target contract. The reason: using this standard encoded call
        *         requires its function selector (which is 4 bytes), and we
        *         don't want to forward that. Hence, subtract 40 from the
        *         calldata size. (encoding bytes + this selector) == 40 bytes
        **/
        uint96 _size = uint96(getCalldataSize() - 40);
        bytes20 _target = bytes20(uint160(uint256(target)));
        bytes memory _data = new bytes(_size);
        assembly {
            calldatacopy(_data, 40, _size)
        }
        return abi.encodePacked(_target, _size, _data);
    }

    /**
    * @notice Adapted from @openzeppelin/contracts/utils/Address.sol:_functionCallWithValue
    *         Removed the contract check since this is hardcoded to only work on the deployed contract,
    *         and for the nested calls, ComposableCaller checks if the address is a contract.
    **/
    function sendCall(bytes calldata data) external override returns (bytes memory) {
        (bool success, bytes memory returndata) = _composableSingleCaller.call(data);
        if (success) {
            return returndata;
        } else {
            if (returndata.length > 0) {
                assembly {
                    let returndata_size := mload(returndata)
                    revert(add(32, returndata), returndata_size)
                }
            } else {
                revert("Composable::composableCall: Call failed");
            }
        }
    }

    /*
    * @notice Grab the length of calldata (to be used within functions of this
    *         contract).
    */
    function getCalldataSize() internal view returns (uint size) {
        assembly {
            size := calldatasize()
        }
    }

}
