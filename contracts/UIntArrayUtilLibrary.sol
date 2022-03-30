// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

library UIntArrayUtilLibrary {
  function contains(uint256[] memory array, uint256 value) internal pure returns (bool) {
    (, bool present) = indexOf(array, value);
    return present;
  }

  function indexOf(uint256[] memory array, uint256 value) internal pure returns (uint256, bool) {
    for (uint256 i = 0; i < array.length; i++) {
      if (array[i] == value) {
        return (i, true);
      }
    }
    return (0, false);
  }

  function intersection(uint256[] memory first, uint256[] memory second) internal pure returns (uint256[] memory) {
    uint256 count = 0;
    bool[] memory toInclude = new bool[](first.length);
    for (uint256 i = 0; i < first.length; i++) {
      if (contains(second, first[i])) {
        toInclude[i] = true;
        count++;
      }
    }

    uint256[] memory result = new uint256[](count);
    uint256 j = 0;
    for (uint256 i = 0; i < first.length; i++) {
      if (toInclude[i]) {
        result[j] = first[i];
        j++;
      }
    }
    return result;
  }
}
