---
title: Maximum XOR After Operations
date: 2023-12-07
lastmod: 2023-12-07
author:
  - Jimmy Lin
tags:
  - bit_manipulation
draft: false
---

## Description

You are given a **0-indexed** integer array `nums`. In one operation, select **any** non-negative integer `x` and an index `i`, then **update** `nums[i]` to be equal to `nums[i] AND (nums[i] XOR x)`.

Note that `AND` is the bitwise AND operation and `XOR` is the bitwise XOR operation.

Return _the **maximum** possible bitwise XOR of all elements of_ `nums` _after applying the operation **any number** of times_.

**Example 1:**

**Input:** nums = \[3,2,4,6\]
**Output:** 7
**Explanation:** Apply the operation with x = 4 and i = 3, num\[3\] = 6 AND (6 XOR 4) = 6 AND 2 = 2.
Now, nums = \[3, 2, 4, 2\] and the bitwise XOR of all the elements = 3 XOR 2 XOR 4 XOR 2 = 7.
It can be shown that 7 is the maximum possible bitwise XOR.
Note that other operations may be used to achieve a bitwise XOR of 7.

**Example 2:**

**Input:** nums = \[1,2,3,9,2\]
**Output:** 11
**Explanation:** Apply the operation zero times.
The bitwise XOR of all the elements = 1 XOR 2 XOR 3 XOR 9 XOR 2 = 11.
It can be shown that 11 is the maximum possible bitwise XOR.

**Constraints:**

*   `1 <= nums.length <= 105`
*   `0 <= nums[i] <= 108`

## Code 

Time Complexity: $O(32N)$, Space Complexity: $O(1)$

解法和 [[Total Hamming Distance|Total Hamming Distance]] 類似，都是 iterate through 每一個 num 的 32 個 bit。

關鍵在於 `nums[i] = nums[i] & (nums[i] ^ x)` 這個式子可以讓我們將 `nums[i]` 本身 bit 被設為 1 的 index 改成設為 0，但是無法將 0 變成 1（因為前面還需要和 `nums[i]` 本身再 `&` 一次）。

```cpp
class Solution {
public:
    int maximumXOR(vector<int>& nums) {
        int res = 0;
        for(unsigned int i = 0, mask = 1; i < 32; i++, mask <<= 1) {
            for(int j = 0; j < nums.size(); j++) {
                if(nums[j] & mask) {
                    res |= mask;
                    break;
                }
            }
        }
        return res;
    }
};


// nums[i] = nums[i] & (nums[i] ^ x)
// can make the original one bit becomes zero
// but not vice versa

```

## Source
- [Maximum XOR After Operations - LeetCode](https://leetcode.com/problems/maximum-xor-after-operations/description/)