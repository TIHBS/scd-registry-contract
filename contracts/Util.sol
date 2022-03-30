// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./UtilLibrary.sol";

contract Util {
  using UtilLibrary for *;

  function copy(string memory str) public pure returns (string memory) {
    return UtilLibrary.copy(str);
  }

  function tokenize(string memory _str, string memory _delim) public pure returns (string[] memory) {
    return UtilLibrary.tokenize(_str, _delim);
  }

  function split(string memory _str, uint256 pos) public pure returns (string memory, string memory) {
    return UtilLibrary.split(_str, pos);
  }

  function substring(
    string memory _str,
    uint256 begin,
    uint256 end
  ) public pure returns (string memory) {
    return UtilLibrary.substring(_str, begin, end);
  }
}
