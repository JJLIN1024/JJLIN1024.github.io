---
title: Hamming Distance
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

Given two integers `x` and `y`, return _the **Hamming distance** between them_.

**Example 1:**

**Input:** x = 1, y = 4
**Output:** 2
**Explanation:**
1   (0 0 0 1)
4   (0 1 0 0)
       ↑   ↑
The above arrows point to positions where the corresponding bits are different.

**Example 2:**

**Input:** x = 3, y = 1
**Output:** 1

**Constraints:**

*   `0 <= x, y <= 231 - 1`

## Code 

使用 [[Number of 1 Bits]] 中學到的技巧，結合 XOR，就可以算出 hamming distance。

```cpp
class Solution {
public:
    int hammingDistance(int x, int y) {
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

## Source
- [Hamming Distance - LeetCode](https://leetcode.com/problems/hamming-distance/description/)