// SPDX-License-Identifier: MIT
pragma solidity ^0.4.23;
pragma experimental ABIEncoderV2;

import "./FindLibrary.sol";
import "./generated/QueryRegex.sol";
import "./interfaces/IUtil.sol";

contract Regex {
  using FindLibrary for *;
  using QueryRegex for *;

  constructor(address _utilAddress) public {
    utilAddress = _utilAddress;
  }

  address public utilAddress;

  function setUtilAddress(address _address) public {
    utilAddress = _address;
  }

  function count(string input) public view returns (uint256) {
    bool accepts = true;
    uint256 counter = 0;
    while (true) {
      uint256 begin;
      uint256 end;
      (begin, end, accepts) = find(input);
      if (accepts) {
        counter++;
        IUtil util = IUtil(utilAddress);
        (, input) = util.split(input, end);
      } else {
        break;
      }
    }
    return counter;
  }

  function tokenize(string input) public view returns (string[]) {
    IUtil util = IUtil(utilAddress);
    bool accepts = true;
    uint256 _count = count(util.copy(input));
    string[] memory results = new string[](_count);
    for (uint256 i = 0; i < _count; i++) {
      uint256 begin;
      uint256 end;
      (begin, end, accepts) = find(input);
      results[i] = util.substring(input, begin, end);
      (, input) = util.split(input, end);
    }
    return results;
  }

  function find(string input)
    public
    pure
    returns (
      uint256 begin,
      uint256 end,
      bool accepts
    )
  {
    return FindLibrary.find(input);
  }

  function matches(string input) public pure returns (bool accepts) {
    return QueryRegex.matches(input);
  }
}
