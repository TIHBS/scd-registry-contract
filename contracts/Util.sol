// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "hardhat/console.sol";
import "./strings.sol";

library Util {
  using strings for *;

  function tokenize(string memory _str, string memory _delim) public pure returns (string[] memory) {
    strings.slice memory strSlice = _str.toSlice();
    strings.slice memory delimSlice = _delim.toSlice();
    string[] memory tokens = new string[](strSlice.count(delimSlice) + 1);
    for (uint256 i = 0; i < tokens.length; i++) {
      tokens[i] = strSlice.split(delimSlice).toString();
    }
    return tokens;
  }
}
