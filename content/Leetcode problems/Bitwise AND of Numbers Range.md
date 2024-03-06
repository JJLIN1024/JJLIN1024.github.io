---
title: Bitwise AND of Numbers Range
date: 2023-02-04
lastmod: 2023-12-07
author:
  - Jimmy Lin
tags:
  - bit_manipulation
  - review
draft: false
sr-due: 2024-04-28
sr-interval: 53
sr-ease: 290
---

## Description

Given two integers `left` and `right` that represent the range `[left, right]`, return _the bitwise AND of all numbers in this range, inclusive_.

**Example 1:**

**Input:** left = 5, right = 7
**Output:** 4

**Example 2:**

**Input:** left = 0, right = 0
**Output:** 0

**Example 3:**

**Input:** left = 1, right = 2147483647
**Output:** 0

**Constraints:**

*   `0 <= left <= right <= 231 - 1`

## Code 

直接從 left and 到 right 顯然會 TLE。

當我們將數字不斷往上加時，從 bit 的角度來看，都是先從低位的 bit 開始變化，因此 left & right 的差異會在靠右邊的 bit，而左邊的 bit 會是一樣的。因為這題要求的是 bitwise and，因此只需要找出右邊有多少位 bit 不一樣即可。

In one word, this problem is asking us to find the **common prefix** of m and n 's binary code.

```c
int rangeBitwiseAnd(int left, int right) {
    int zeros = 0;
    while(left != right) {
        right >>= 1;
        left >>= 1;
        zeros++;
    }
    return left << zeros;
}
```

```cpp
class Solution {
public:
    int rangeBitwiseAnd(int left, int right) {
        int zeros = 0;
        while(left != right) {
            left >>= 1;
            right >>= 1;
            zeros++;
        }
        return left << zeros;
    }
};

```

## Source
- [Bitwise AND of Numbers Range - LeetCode](https://leetcode.com/problems/bitwise-and-of-numbers-range/description/)