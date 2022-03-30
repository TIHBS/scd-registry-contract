// SPDX-License-Identifier: MIT
pragma solidity ^0.4.23;
pragma experimental ABIEncoderV2;

contract IUtil {
  function copy(string memory str) public pure returns (string memory);

  function tokenize(string memory _str, string memory _delim) public pure returns (string[] memory);

  function split(string memory _str, uint256 pos) public pure returns (string memory, string memory);

  function substring(
    string memory _str,
    uint256 begin,
    uint256 end
  ) public pure returns (string memory);
}
