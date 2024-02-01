---
title: Single Number III
date: 2023-02-06
lastmod: 2023-02-06
author:
  - Jimmy Lin
tags:
  - bit_manipulation
draft: false
---

## Description

Given an integer array `nums`, in which exactly two elements appear only once and all the other elements appear exactly twice. Find the two elements that appear only once. You can return the answer in **any order**.

You must write an algorithm that runs in linear runtime complexity and uses only constant extra space.

**Example 1:**

**Input:** nums = \[1,2,1,3,2,5\]
**Output:** \[3,5\]
**Explanation: ** \[5, 3\] is also a valid answer.

**Example 2:**

**Input:** nums = \[-1,0\]
**Output:** \[-1,0\]

**Example 3:**

**Input:** nums = \[0,1\]
**Output:** \[1,0\]

**Constraints:**

*   `2 <= nums.length <= 3 * 104`
*   `-231 <= nums[i] <= 231 - 1`
*   Each integer in `nums` will appear twice, only two integers will appear once.

## Code 

和 [[Single Number]]、[[Single Number II]] 一樣都是基於 XOR 特性的題目。

這題和 [[Single Number]] 比較像，只是全部 XOR 完之後會剩下兩個數子，因此要想辦法將他們分開。

用到的技巧是 `a ^ -a` 可以得到一個數的 last set bit，因為剩下兩個數字的 XOR 一定不為 0（因為不相等），因此至少有一個 bit 為 1，用此 set bit 來區分兩數。因為 XOR 後的 bit 為 1 代表原本兩數在此 bit 上一個是 0 一個是 1，所以我們用此 bit 將所有數字分成兩群後分別 XOR，就可將兩數分離。

```cpp
class Solution {
public:
    vector<int> singleNumber(vector<int>& nums) {
        long ab = 0;
        for(auto num: nums) {
            ab ^= num;
        }

        vector<int> res(2, 0);
        long lastSetBit = ab & -ab;
        for(auto num: nums) {
            if(num & lastSetBit) {
                res[0] ^= num;
            } else {
                res[1] ^= num;
            }
        }

        return res;
    }
};
```

## Source
- [Single Number III - LeetCode](https://leetcode.com/problems/single-number-iii/)