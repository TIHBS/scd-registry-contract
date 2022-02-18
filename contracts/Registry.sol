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

    uint256 idCounter;
    mapping(uint256 => SCDMetadata) sCDMetadata;

    mapping(string => mapping(uint256 => bool)) public name;
    mapping(string => mapping(uint256 => bool)) public author;
    mapping(string => mapping(uint256 => bool)) public internalAddress;
    mapping(string => mapping(uint256 => bool)) public publicFunction;
    mapping(string => mapping(uint256 => bool)) public events;
    mapping(string => mapping(uint256 => bool)) public url;
    mapping(string => mapping(uint256 => bool)) public signature;
    mapping(uint256 => mapping(uint256 => bool)) public version;
    mapping(BlockchainType => mapping(uint256 => bool)) public blockChainType;

    constructor() public {
        idCounter = 0;
    }
}
