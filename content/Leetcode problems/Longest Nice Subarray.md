---
title: Longest Nice Subarray
date: 2023-12-07
lastmod: 2023-12-07
author:
  - Jimmy Lin
tags:
  - bit_manipulation
  - two_pointer
  - sliding_window
draft: false
---

## Description

You are given an array `nums` consisting of **positive** integers.

We call a subarray of `nums` **nice** if the bitwise **AND** of every pair of elements that are in **different** positions in the subarray is equal to `0`.

Return _the length of the **longest** nice subarray_.

A **subarray** is a **contiguous** part of an array.

**Note** that subarrays of length `1` are always considered nice.

**Example 1:**

**Input:** nums = \[1,3,8,48,10\]
**Output:** 3
**Explanation:** The longest nice subarray is \[3,8,48\]. This subarray satisfies the conditions:
- 3 AND 8 = 0.
- 3 AND 48 = 0.
- 8 AND 48 = 0.
It can be proven that no longer nice subarray can be obtained, so we return 3.

**Example 2:**

**Input:** nums = \[3,1,5,11,13\]
**Output:** 1
**Explanation:** The length of the longest nice subarray is 1. Any subarray of length 1 can be chosen.

**Constraints:**

*   `1 <= nums.length <= 105`
*   `1 <= nums[i] <= 109`

## Code 

Time Complexity: $O(N)$, Space Complexity: $O(1)$

每兩兩 bitwise and 都為零，就代表在區間內，每個 index 的 bit 只有一個會是 1，其餘都是 0。

第一次 XOR 會將 `nums[i]` 的 1 bit 放上 `count`（用 `(count & nums[j]) == 0` 確認過不會有兩個 `1` 要 XOR 的狀況）。

第二次 XOR 就 cancel 掉原本的。

```cpp
class Solution {
public:
    int longestNiceSubarray(vector<int>& nums) {
        int nice = 1;
        int j = 0;
        int count = 0;
        for(int i = 0; i < nums.size(); i++) {
            while(j < nums.size() && ((count & nums[j]) == 0)) {
                count ^= nums[j];
                j++;
            }
            nice = max(nice, j - i);
            count ^= nums[i];
        }
        return nice;
    }
};
```

## Source
- [Longest Nice Subarray - LeetCode](https://leetcode.com/problems/longest-nice-subarray/description/)