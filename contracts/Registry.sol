// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract Registry {
  using EnumerableSet for EnumerableSet.UintSet;

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
    string[] functions;
    string[] events;
    uint256 version;
    BlockchainType blockChainType;
  }

  string private message;

  uint256 private idCounter;
  mapping(uint256 => SCDMetadata) private metadataMap;

  mapping(string => EnumerableSet.UintSet) private nameMap;
  mapping(string => EnumerableSet.UintSet) private authorMap;
  mapping(string => EnumerableSet.UintSet) private internalAddressMap;
  mapping(string => EnumerableSet.UintSet) private functionsMap;
  mapping(string => EnumerableSet.UintSet) private eventsMap;
  mapping(string => EnumerableSet.UintSet) private urlMap;
  mapping(string => EnumerableSet.UintSet) private signatureMap;
  mapping(uint256 => EnumerableSet.UintSet) private versionMap;
  mapping(BlockchainType => EnumerableSet.UintSet) private blockChainTypeMap;

  constructor() {
    idCounter = 0;
    message = "Hello World!";
  }

  function store(SCDMetadata memory metadata) public {
    metadataMap[idCounter] = metadata;

    nameMap[metadata.name].add(idCounter);
    authorMap[metadata.author].add(idCounter);
    internalAddressMap[metadata.internalAddress].add(idCounter);
    urlMap[metadata.url].add(idCounter);
    signatureMap[metadata.signature].add(idCounter);
    versionMap[metadata.version].add(idCounter);
    blockChainTypeMap[metadata.blockChainType].add(idCounter);

    addMultipleKeysForOneValue(functionsMap, metadata.functions, idCounter);
    addMultipleKeysForOneValue(eventsMap, metadata.events, idCounter);
    idCounter++;
  }

  function retrieveByName(string memory name) public view returns (SCDMetadata[] memory) {
    return retrieveFrom(nameMap, name);
  }

  function retrieveFrom(mapping(string => EnumerableSet.UintSet) storage from, string memory key)
    internal
    view
    returns (SCDMetadata[] memory)
  {
    EnumerableSet.UintSet storage indices = from[key];
    SCDMetadata[] memory metadata = new SCDMetadata[](indices.length());

    for (uint256 i = 0; i < indices.length(); i++) {
      uint256 currentIndex = indices.at(i);
      metadata[i] = metadataMap[currentIndex];
    }

    return metadata;
  }

  function addMultipleKeysForOneValue(
    mapping(string => EnumerableSet.UintSet) storage to,
    string[] memory keys,
    uint256 value
  ) internal {
    for (uint256 i = 0; i < keys.length; i++) {
      to[keys[i]].add(value);
    }
  }

  function get() public view returns (string memory) {
    return message;
  }

  function set(string memory newMessage) public {
    message = newMessage;
  }
}
