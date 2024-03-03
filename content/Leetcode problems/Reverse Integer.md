---
title: Reverse Integer
date: 2023-03-19
lastmod: 2023-03-19
author: Jimmy Lin
tags: ["math", "interger overflow"]
draft: false
---

## Description

Given a signed 32-bit integer `x`, return `x` _with its digits reversed_. If reversing `x` causes the value to go outside the signed 32-bit integer range `[-231, 231 - 1]`, then return `0`.

**Assume the environment does not allow you to store 64-bit integers (signed or unsigned).**

**Example 1:**

**Input:** x = 123
**Output:** 321

**Example 2:**

**Input:** x = -123
**Output:** -321

**Example 3:**

**Input:** x = 120
**Output:** 21

**Constraints:**

*   `-231 <= x <= 231 - 1`

## Code 

```cpp
class Solution {
public:
    int reverse(int x) {
        int rev = 0;
        while(x) {
            int digit = x % 10;
            x /= 10;
            // check overflow
            if ((rev > 0 && rev > (INT_MAX - digit)/10) | (rev < 0 && rev < (INT_MIN - digit)/10)) return 0;
            rev = rev * 10 + digit;
        }
        return rev;
    }
};
```

## Source
- [Reverse Integer - LeetCode](https://leetcode.com/problems/reverse-integer/description/)