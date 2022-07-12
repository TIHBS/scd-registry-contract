// SPDX-License-Identifier: MIT
pragma solidity ^0.4.23;

import "./generated/QueryRegex.sol";

library FindLibrary {
  using QueryRegex for *;

  function find(string input)
    public
    pure
    returns (
      uint256 begin,
      uint256 end,
      bool accepts
    )
  {
    // Test
    QueryRegex.State memory cur = QueryRegex.State(false, QueryRegex.s1);
    uint256 _begin = 0;
    uint256 _end = begin;

    for (uint256 i = begin; i < bytes(input).length; i++) {
      bytes1 c = bytes(input)[i];

      cur = cur.func(c);

      if (cur.func == QueryRegex.s0) {
        cur.func = QueryRegex.s1;
      }

      if (cur.func == QueryRegex.s1) {
        _begin = i + 1;
        _end = _begin;
      } else {
        _end++;
      }

      if (cur.accepts) {
        break;
      }
    }
    return (_begin, _end, cur.accepts);
  }
}
