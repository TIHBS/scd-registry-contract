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
}
