pragma solidity ^0.6.6;


interface IComposable {
    function composableSingleCaller() external view returns (address);
    function composableMultiCaller() external view returns (address);
    function encodeCall(address target, bytes calldata data) external view returns (bytes memory);
    function sendCall(bytes calldata data) external returns (bytes memory);
}
