pragma solidity ^0.6.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SimpleToken is ERC20 {
    /**
    * @notice The functions within this contract fail under the current design.
    *         I believe it has to do with the msg.sender becoming the calling
    *         contract, but using `delegatecall` uses the wrong contract state?
    **/
    constructor(string memory name, string memory symbol) public ERC20(name, symbol) {
        _mint(msg.sender, 10000 ether); // 10,000 tokens
    }
}
