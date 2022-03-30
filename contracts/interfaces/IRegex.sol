// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

abstract contract IRegex {
  function setUtilAddress(address _address) public virtual;

  function count(string memory input) public view virtual returns (uint256);

  function tokenize(string memory input) public view virtual returns (string[] memory);

  function find(string memory input)
    public
    pure
    virtual
    returns (
      uint256 begin,
      uint256 end,
      bool accepts
    );
}
