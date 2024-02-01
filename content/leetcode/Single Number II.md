---
title: Single Number II
date: 2023-02-06
lastmod: 2023-02-06
author:
  - Jimmy Lin
tags:
  - bit_manipulation
draft: false
---

## Description

Given an integer array `nums` where every element appears **three times** except for one, which appears **exactly once**. _Find the single element and return it_.

You must implement a solution with a linear runtime complexity and use only constant extra space.

**Example 1:**

**Input:** nums = \[2,2,3,2\]
**Output:** 3

**Example 2:**

**Input:** nums = \[0,1,0,1,0,1,99\]
**Output:** 99

**Constraints:**

*   `1 <= nums.length <= 3 * 104`
*   `-231 <= nums[i] <= 231 - 1`
*   Each element in `nums` appears exactly **three times** except for one element which appears **once**.

## Code 

在 [[Single Number]] 中，兩次 XOR 等於 no-op，但是在這題當中，我們想要做的事情是讓三次 XOR 等於 no-op，但這和 XOR 本身的性質不符合，因此我們必須自己設定 counter。

generalize 到如何使 k 次 XOR 等於 no-op，即是 `count[j] = (count[j] + 1) % k;` 即可。

```cpp
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        vector<int> count(32, 0);
        for(int i = 0; i < nums.size(); i++) {
            for(int j = 0; j < 32; j++) {
                bool hasBit = (nums[i] & (1 << j));
                if(hasBit) {
                    count[j] = (count[j] + 1) % 3;
                }
            }
        }

        int res = 0;
        for(int i = 0; i < 32; i++) {
            if(count[i] > 0) {
                res |= (1 << i);
            }
        }
        return res;
    }
};
```

## Source
- [Single Number II - LeetCode](https://leetcode.com/problems/single-number-ii/description/)