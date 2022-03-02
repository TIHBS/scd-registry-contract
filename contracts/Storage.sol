// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Storage {
    mapping(string => string) private message;

    function Get() public view returns (string memory) {
        return message["someKey"];
    }

    function Set(string memory newMessage) public {
        message["someKey"] = newMessage;
    }
}
