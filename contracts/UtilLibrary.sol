// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "./external/strings.sol";

library UtilLibrary {
  using strings for *;

  function copy(string memory str) internal pure returns (string memory) {
    return str.toSlice().copy().toString();
  }

  function tokenize(string memory _str, string memory _delim) internal pure returns (string[] memory) {
    strings.slice memory strSlice = _str.toSlice();
    strings.slice memory delimSlice = _delim.toSlice();
    string[] memory tokens = new string[](strSlice.count(delimSlice) + 1);
    for (uint256 i = 0; i < tokens.length; i++) {
      tokens[i] = strSlice.split(delimSlice).toString();
    }
    return tokens;
  }

  function split(string memory _str, uint256 pos) internal pure returns (string memory, string memory) {
    strings.slice memory left = _str.toSlice();
    strings.slice memory right = _str.toSlice().copy();

    uint256 diff = left._len - pos;
    left._len -= diff;

    right._len = diff;
    right._ptr = left._ptr + pos;

    return (left.toString(), right.toString());
  }

  function substring(
    string memory _str,
    uint256 begin,
    uint256 end
  ) internal pure returns (string memory) {
    string memory sub;
    string memory left;
    string memory right;

    (left, sub) = split(_str, begin);
    (sub, right) = split(sub, end - begin);

    return sub;
  }

  function fromHexChar(uint8 c) internal pure returns (uint8) {
    if (bytes1(c) >= bytes1("0") && bytes1(c) <= bytes1("9")) {
      return c - uint8(bytes1("0"));
    }
    if (bytes1(c) >= bytes1("a") && bytes1(c) <= bytes1("f")) {
      return 10 + c - uint8(bytes1("a"));
    }
    if (bytes1(c) >= bytes1("A") && bytes1(c) <= bytes1("F")) {
      return 10 + c - uint8(bytes1("A"));
    }
    return 0;
  }

  function hexStringToAddress(string memory s) internal pure returns (bytes memory) {
    bytes memory ss = bytes(s);
    require(ss.length % 2 == 0); // length must be even
    bytes memory r = new bytes(ss.length / 2);
    for (uint256 i = 0; i < ss.length / 2; ++i) {
      r[i] = bytes1(fromHexChar(uint8(ss[2 * i])) * 16 + fromHexChar(uint8(ss[2 * i + 1])));
    }

    return r;
  }

  function toAddress(string memory s) internal pure returns (address) {
    bytes memory _bytes = hexStringToAddress(s);
    require(_bytes.length >= 1 + 20, "toAddress_outOfBounds");
    address tempAddress;

    assembly {
      tempAddress := div(mload(add(add(_bytes, 0x20), 1)), 0x1000000000000000000000000)
    }

    return tempAddress;
  }
}
