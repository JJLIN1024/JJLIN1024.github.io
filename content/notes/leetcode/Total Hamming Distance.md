---
title: Total Hamming Distance
date: 2023-03-17
lastmod: 2023-12-07
author:
  - Jimmy Lin
tags:
  - bit_manipulation
draft: false
---

## Description

The [Hamming distance](https://en.wikipedia.org/wiki/Hamming_distance) between two integers is the number of positions at which the corresponding bits are different.

Given an integer array `nums`, return _the sum of **Hamming distances** between all the pairs of the integers in_ `nums`.

**Example 1:**

**Input:** nums = \[4,14,2\]
**Output:** 6
**Explanation:** In binary representation, the 4 is 0100, 14 is 1110, and 2 is 0010 (just
showing the four bits relevant in this case).
The answer will be:
HammingDistance(4, 14) + HammingDistance(4, 2) + HammingDistance(14, 2) = 2 + 2 + 2 = 6.

**Example 2:**

**Input:** nums = \[4,14,4\]
**Output:** 4

**Constraints:**

*   `1 <= nums.length <= 104`
*   `0 <= nums[i] <= 109`
*   The answer for the given input will fit in a **32-bit** integer.

## Code 

原本想直接用 for loop $O(n^2 k)$（k 是 each pair 中 XOR 後剩下的 bit 數） 套 [[Hamming Distance]] 的解解出所有 pair 的 hamming distance 的總和，但是這樣會 time limit exceed。

```cpp
class Solution {
public:
    int totalHammingDistance(vector<int>& nums) {
        int res = 0;
        for(int i = 0; i < nums.size(); i++) {
            for(int j = i + 1; j < nums.size(); j++) {
                res += calcHammingDistance(nums[i], nums[j]);
            }
        }

        return res;
    }

    int calcHammingDistance(int x, int y) {
        int n = x ^ y;
        int dis = 0;
        while(n) {
            n = n & (n - 1);
            dis++;
        }
        return dis;
    }
};
```

改進的方法是觀察：

觀察每個 index 的 bit 的行為，當有一對 `1, 0` 時就會讓 total hamming distance 增加 1，因此要做的就是對於 n  個數字的每個 bit 都去找出有多少 1 和 0，將 1 的個數和 0 的個數相乘（成 pair）。

```cpp
class Solution {
public:
    int totalHammingDistance(vector<int>& nums) {
        int dis = 0;
        for(int j = 0; j < 32; j++) {
            int zeros = 0;
            int ones = 0;
            for(int i = 0; i < nums.size(); i++) {
                if(nums[i] & (1 << j)) ones++;
                else zeros++;
            }
            dis += zeros * ones;
        }
        return dis;
    }

};
```

## Source
- [Total Hamming Distance - LeetCode](https://leetcode.com/problems/total-hamming-distance/)