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
    string version;
    string[] functions;
    string[] events;
    bool isValid;
    BlockchainType blockChainType;
  }

  struct SCDMetadataWithID {
    uint256 id;
    SCDMetadata metadata;
  }

  uint256 private idCounter;
  mapping(uint256 => SCDMetadata) private metadataMap;

  mapping(string => EnumerableSet.UintSet) private nameMap;
  mapping(string => EnumerableSet.UintSet) private authorMap;
  mapping(string => EnumerableSet.UintSet) private internalAddressMap;
  mapping(string => EnumerableSet.UintSet) private functionsMap;
  mapping(string => EnumerableSet.UintSet) private eventsMap;
  mapping(string => EnumerableSet.UintSet) private urlMap;
  mapping(string => EnumerableSet.UintSet) private signatureMap;
  mapping(string => EnumerableSet.UintSet) private versionMap;
  mapping(BlockchainType => EnumerableSet.UintSet) private blockChainTypeMap;

  constructor() {
    idCounter = 0;
  }

  function storeMultiple(SCDMetadata[] memory _metadata) public {
    for (uint256 i = 0; i < _metadata.length; i++) {
      store(_metadata[i]);
    }
  }

  function store(SCDMetadata memory _metadata) public {
    metadataMap[idCounter] = _metadata;

    nameMap[_metadata.name].add(idCounter);
    authorMap[_metadata.author].add(idCounter);
    internalAddressMap[_metadata.internalAddress].add(idCounter);
    urlMap[_metadata.url].add(idCounter);
    signatureMap[_metadata.signature].add(idCounter);
    versionMap[_metadata.version].add(idCounter);
    blockChainTypeMap[_metadata.blockChainType].add(idCounter);

    addMultipleKeysForOneValue(functionsMap, _metadata.functions, idCounter);
    addMultipleKeysForOneValue(eventsMap, _metadata.events, idCounter);
    idCounter++;
  }

  function retrieveById(uint256 _id) public view returns (SCDMetadataWithID memory) {
    return SCDMetadataWithID(_id, metadataMap[_id]);
  }

  function retrieveByName(string memory _name) public view returns (SCDMetadataWithID[] memory) {
    return retrieveFrom(nameMap, _name);
  }

  function retrieveByAuthor(string memory _author) public view returns (SCDMetadataWithID[] memory) {
    return retrieveFrom(authorMap, _author);
  }

  function retrieveByInternalAddress(string memory _internalAddress) public view returns (SCDMetadataWithID[] memory) {
    return retrieveFrom(internalAddressMap, _internalAddress);
  }

  function retrieveByUrl(string memory _url) public view returns (SCDMetadataWithID[] memory) {
    return retrieveFrom(urlMap, _url);
  }

  function retrieveByFunction(string memory _function) public view returns (SCDMetadataWithID[] memory) {
    return retrieveFrom(functionsMap, _function);
  }

  function retrieveByEvent(string memory _event) public view returns (SCDMetadataWithID[] memory) {
    return retrieveFrom(eventsMap, _event);
  }

  function retrieveBySignature(string memory _signature) public view returns (SCDMetadataWithID[] memory) {
    return retrieveFrom(signatureMap, _signature);
  }

  function retrieveByVersion(string memory _version) public view returns (SCDMetadataWithID[] memory) {
    return retrieveFrom(versionMap, _version);
  }

  function retrieveByType(BlockchainType _type) public view returns (SCDMetadataWithID[] memory) {
    EnumerableSet.UintSet storage indices = blockChainTypeMap[_type];
    SCDMetadataWithID[] memory metadata = new SCDMetadataWithID[](indices.length());

    for (uint256 i = 0; i < indices.length(); i++) {
      uint256 currentIndex = indices.at(i);
      metadata[i] = SCDMetadataWithID(currentIndex, metadataMap[currentIndex]);
    }

    return metadata;
  }

  function retrieveFrom(mapping(string => EnumerableSet.UintSet) storage from, string memory key)
    internal
    view
    returns (SCDMetadataWithID[] memory)
  {
    EnumerableSet.UintSet storage indices = from[key];
    SCDMetadataWithID[] memory metadata = new SCDMetadataWithID[](indices.length());

    for (uint256 i = 0; i < indices.length(); i++) {
      uint256 currentIndex = indices.at(i);
      metadata[i] = SCDMetadataWithID(currentIndex, metadataMap[currentIndex]);
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
}
