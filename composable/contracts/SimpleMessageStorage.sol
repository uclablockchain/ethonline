pragma solidity 0.6.6;


contract SimpleMessageStorage {
    /**
    * @notice For use in testing Composable calls.
    **/
    address public owner;
    string private message;

    constructor(string memory initialMessage) public {
        owner = msg.sender;
        message = initialMessage;
    }

    /**
    * @notice Requires a transaction call, and can be called through Composable.
    **/
    function setMessage(string memory newMessage) public {
        message = newMessage;
    }

    /**
    * @notice Doesn't require a transaction call, but _can_ be called within a
    *         transaction.
    **/
    function getMessage() public view returns (string memory) {
        return message;
    }

    /**
    * @notice We cannot change owner because currently still facing the
    *         the challenge of sending the correct `msg.sender` value through
    *         `call`. With `delegatecall`, execution occurs within the context
    *         of the delegator, which prevents the called contract from
    *         accessing its own state, so we have to develop a new method.
    **/
    function changeOwner(address newOwner) public {
        require(owner == msg.sender, "Only owner");
        owner = newOwner;
    }

}
