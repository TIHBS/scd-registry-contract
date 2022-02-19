// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Registry {
    enum BlockchainType {
        BITCOIN,
        ETHEREUM,
        FABRIC,
        NEO
    }

    struct SCDMetadata {
        string name;
        string author;
        string internalAddress;
        string url;
        string signature;
        string[] publicFunction;
        string[] events;
        uint256 version;
        BlockchainType blockChainType;
    }

    string private message;

    uint256 private idCounter;
    mapping(uint256 => SCDMetadata) private sCDMetadata;

    mapping(string => mapping(uint256 => bool)) private name;
    mapping(string => mapping(uint256 => bool)) private author;
    mapping(string => mapping(uint256 => bool)) private internalAddress;
    mapping(string => mapping(uint256 => bool)) private publicFunction;
    mapping(string => mapping(uint256 => bool)) private events;
    mapping(string => mapping(uint256 => bool)) private url;
    mapping(string => mapping(uint256 => bool)) private signature;
    mapping(uint256 => mapping(uint256 => bool)) private version;
    mapping(BlockchainType => mapping(uint256 => bool)) private blockChainType;

    constructor() {
        idCounter = 0;
        message = "Hello World!";
    }

    function Get() public view returns (string memory) {
        return message;
    }

    function Set(string memory newMessage) public {
        message = newMessage;
    }
}
