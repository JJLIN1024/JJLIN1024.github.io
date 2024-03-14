---
title: Valid Perfect Square
date: 2024-03-14
lastmod: 2024-03-14
author:
  - Jimmy Lin
tags:
  - binary_search
draft: false
---

## Description

Given a positive integer num, return `true` _if_ `num` _is a perfect square or_ `false` _otherwise_.

A **perfect square** is an integer that is the square of an integer. In other words, it is the product of some integer with itself.

You must not use any built-in library function, such as `sqrt`.

**Example 1:**

**Input:** num = 16
**Output:** true
**Explanation:** We return true because 4 \* 4 = 16 and 4 is an integer.

**Example 2:**

**Input:** num = 14
**Output:** false
**Explanation:** We return false because 3.742 \* 3.742 = 14 and 3.742 is not an integer.

**Constraints:**

*   `1 <= num <= 231 - 1`

## Code 

Time Complexity: $O(\log n)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    bool isPerfectSquare(int num) {
        long long l = 1, r = num;
        while(l < r) {
            long long m = l + (r - l) / 2;
            long long product = m * m;
            if(product < num) {
                l = m + 1;
            } else {
                r = m;
            }
        }
        return l * l == num;
    }
};
```

## Source
- [Valid Perfect Square - LeetCode](https://leetcode.com/problems/valid-perfect-square/description/?envType=study-plan-v2&envId=binary-search)