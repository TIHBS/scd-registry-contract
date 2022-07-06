// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./external/strings.sol";
import "./UtilLibrary.sol";
import "./UIntArrayUtilLibrary.sol";
import "./interfaces/IRegex.sol";

contract Registry {
  using EnumerableSet for EnumerableSet.UintSet;
  using Counters for Counters.Counter;
  using UIntArrayUtilLibrary for uint256[];
  using UtilLibrary for *;
  using strings for *;

  event ContractRegistered(uint256 id);

  enum BlockchainType {
    BITCOIN,
    ETHEREUM,
    FABRIC,
    NEO
  }

  struct SCDMetadataIn {
    string name;
    string internalAddress;
    string url;
    string signature;
    string version;
    string[] functions;
    string[] events;
    BlockchainType blockChainType;
  }

  struct SCDMetadata {
    string name;
    address author;
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

  struct KeyValuePair {
    string key;
    string value;
  }

  constructor(address _regexAddress) {
    regexAddress = _regexAddress;
  }

  Counters.Counter private idCounter;
  mapping(uint256 => SCDMetadata) private metadataMap;

  mapping(string => EnumerableSet.UintSet) private nameMap;
  mapping(address => EnumerableSet.UintSet) private authorMap;
  mapping(string => EnumerableSet.UintSet) private internalAddressMap;
  mapping(string => EnumerableSet.UintSet) private functionsMap;
  mapping(string => EnumerableSet.UintSet) private eventsMap;
  mapping(string => EnumerableSet.UintSet) private urlMap;
  mapping(string => EnumerableSet.UintSet) private signatureMap;
  mapping(string => EnumerableSet.UintSet) private versionMap;
  mapping(BlockchainType => EnumerableSet.UintSet) private blockChainTypeMap;

  // Used to return an empty set
  EnumerableSet.UintSet private emptySet;

  address public regexAddress;

  function setRegexAddress(address _regexAddress) public {
    regexAddress = _regexAddress;
  }

  function storeMultiple(SCDMetadataIn[] memory _metadata) public {
    for (uint256 i = 0; i < _metadata.length; i++) {
      store(_metadata[i]);
    }
  }

  function store(SCDMetadataIn memory _metadata) public {
    SCDMetadata memory toStore = SCDMetadata({
      name: _metadata.name,
      author: msg.sender,
      internalAddress: _metadata.internalAddress,
      url: _metadata.url,
      signature: _metadata.signature,
      version: _metadata.version,
      blockChainType: _metadata.blockChainType,
      functions: _metadata.functions,
      events: _metadata.events,
      isValid: true
    });
    metadataMap[idCounter.current()] = toStore;

    nameMap[toStore.name].add(idCounter.current());
    authorMap[toStore.author].add(idCounter.current());
    internalAddressMap[toStore.internalAddress].add(idCounter.current());
    urlMap[toStore.url].add(idCounter.current());
    signatureMap[toStore.signature].add(idCounter.current());
    versionMap[toStore.version].add(idCounter.current());
    blockChainTypeMap[toStore.blockChainType].add(idCounter.current());

    addMultipleKeysForOneValue(functionsMap, toStore.functions, idCounter.current());
    addMultipleKeysForOneValue(eventsMap, toStore.events, idCounter.current());
    emit ContractRegistered(idCounter.current());
    idCounter.increment();
  }

  function isKey(strings.slice memory asSlice) internal pure returns (bool) {
    return
      asSlice.equals("Name".toSlice()) ||
      asSlice.equals("Author".toSlice()) ||
      asSlice.equals("InternalAddress".toSlice()) ||
      asSlice.equals("Url".toSlice()) ||
      asSlice.equals("Signature".toSlice()) ||
      asSlice.equals("Version".toSlice()) ||
      asSlice.equals("Function".toSlice()) ||
      asSlice.equals("Event".toSlice()) ||
      asSlice.equals("BlockchainType".toSlice());
  }

  function getSetForKey(KeyValuePair memory pair) internal view returns (EnumerableSet.UintSet storage) {
    strings.slice memory asSlice = pair.key.toSlice();
    require(isKey(asSlice), "This key is not valid!");

    if (asSlice.equals("Name".toSlice())) {
      return nameMap[pair.value];
    } else if (asSlice.equals("Author".toSlice())) {
      address addr = UtilLibrary.toAddress(pair.value);
      return authorMap[addr];
    } else if (asSlice.equals("InternalAddress".toSlice())) {
      return internalAddressMap[pair.value];
    } else if (asSlice.equals("Url".toSlice())) {
      return urlMap[pair.value];
    } else if (asSlice.equals("Signature".toSlice())) {
      return signatureMap[pair.value];
    } else if (asSlice.equals("Version".toSlice())) {
      return versionMap[pair.value];
    } else if (asSlice.equals("Function".toSlice())) {
      return functionsMap[pair.value];
    } else if (asSlice.equals("Event".toSlice())) {
      return eventsMap[pair.value];
    } else if (asSlice.equals("BlockchainType".toSlice())) {
      strings.slice memory valueAsSlice = pair.value.toSlice();
      if (valueAsSlice.equals("BITCOIN".toSlice()) || valueAsSlice.equals("0".toSlice())) {
        return blockChainTypeMap[BlockchainType.BITCOIN];
      }
      if (valueAsSlice.equals("ETHEREUM".toSlice()) || valueAsSlice.equals("1".toSlice())) {
        return blockChainTypeMap[BlockchainType.ETHEREUM];
      }
      if (valueAsSlice.equals("FABRIC".toSlice()) || valueAsSlice.equals("2".toSlice())) {
        return blockChainTypeMap[BlockchainType.FABRIC];
      }
      if (valueAsSlice.equals("NEO".toSlice()) || valueAsSlice.equals("3".toSlice())) {
        return blockChainTypeMap[BlockchainType.NEO];
      }
    }
    return emptySet;
  }

  function queryParamToValue(string memory queryParam) internal pure returns (string memory key, string memory value) {
    strings.slice memory queryParamSlice = queryParam.toSlice();
    key = queryParamSlice.split("=".toSlice()).toString();
    queryParamSlice.split("'".toSlice());
    queryParamSlice.rsplit("'".toSlice());
    value = queryParamSlice.toString();
  }

  function query(string memory _query) public view returns (SCDMetadataWithID[] memory) {
    require(_query.toSlice().len() > 0, "The query should not be empty!");

    IRegex regex = IRegex(regexAddress);

    string[] memory keyValueStrings = regex.tokenize(_query);

    if (keyValueStrings.length <= 0) {
      return new SCDMetadataWithID[](0);
    }

    KeyValuePair[] memory keyValuePairs = new KeyValuePair[](keyValueStrings.length);
    for (uint256 i = 0; i < keyValueStrings.length; i++) {
      (string memory key, string memory value) = queryParamToValue(keyValueStrings[i]);
      keyValuePairs[i] = KeyValuePair(key, value);
    }

    uint256[] memory resultArray = getSetForKey(keyValuePairs[0]).values();

    for (uint256 i = 1; i < keyValuePairs.length; i++) {
      uint256[] memory current = getSetForKey(keyValuePairs[i]).values();
      resultArray = resultArray.intersection(current);
    }

    return indicesToMetadata(resultArray);
  }

  function retrieveById(uint256 _id) public view returns (SCDMetadataWithID memory) {
    return SCDMetadataWithID(_id, metadataMap[_id]);
  }

  function retrieveByName(string memory _name) public view returns (SCDMetadataWithID[] memory) {
    return retrieveFrom(nameMap, _name);
  }

  function retrieveByAuthor(address _author) public view returns (SCDMetadataWithID[] memory) {
    EnumerableSet.UintSet storage indices = authorMap[_author];
    return indicesToMetadata(indices.values());
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

  function indicesToMetadata(uint256[] memory indices) public view returns (SCDMetadataWithID[] memory) {
    SCDMetadataWithID[] memory metadata = new SCDMetadataWithID[](indices.length);
    for (uint256 i = 0; i < indices.length; i++) {
      uint256 currentIndex = indices[i];
      metadata[i] = SCDMetadataWithID(currentIndex, metadataMap[currentIndex]);
    }
    return metadata;
  }

  function retrieveByType(BlockchainType _type) public view returns (SCDMetadataWithID[] memory) {
    EnumerableSet.UintSet storage indices = blockChainTypeMap[_type];
    return indicesToMetadata(indices.values());
  }

  function retrieveFrom(mapping(string => EnumerableSet.UintSet) storage from, string memory key)
    internal
    view
    returns (SCDMetadataWithID[] memory)
  {
    EnumerableSet.UintSet storage indices = from[key];
    return indicesToMetadata(indices.values());
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
