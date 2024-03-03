---
title: Single Number
date: 2023-02-06
lastmod: 2023-12-07
author:
  - Jimmy Lin
tags:
  - bit_manipulation
draft: false
---

## Description

Given a **non-empty** array of integers `nums`, every element appears _twice_ except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only constant extra space.

**Example 1:**

**Input:** nums = \[2,2,1\]
**Output:** 1

**Example 2:**

**Input:** nums = \[4,1,2,1,2\]
**Output:** 4

**Example 3:**

**Input:** nums = \[1\]
**Output:** 1

**Constraints:**

*   `1 <= nums.length <= 3 * 104`
*   `-3 * 104 <= nums[i] <= 3 * 104`
*   Each element in the array appears twice except for one element which appears only once.

## Code 

和 [[Missing Number]] 中用到的觀念一樣。
XOR 觀念：XOR 同一個數字兩字等於 no-op。

```cpp
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int res = 0;
        for(auto num: nums) {
            res ^= num;
        }

        return res;
    }
};
```

## Source
- [Single Number - LeetCode](https://leetcode.com/problems/single-number/description/)