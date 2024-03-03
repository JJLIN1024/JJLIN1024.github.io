---
title: Divide Two Integers
date: 2023-12-10
lastmod: 2023-12-10
author:
  - Jimmy Lin
tags:
  - bit_manipulation
draft: false
---

## Description

Given two integers `dividend` and `divisor`, divide two integers **without** using multiplication, division, and mod operator.

The integer division should truncate toward zero, which means losing its fractional part. For example, `8.345` would be truncated to `8`, and `-2.7335` would be truncated to `-2`.

Return _the **quotient** after dividing_ `dividend` _by_ `divisor`.

**Note:** Assume we are dealing with an environment that could only store integers within the **32-bit** signed integer range: `[−231, 231 − 1]`. For this problem, if the quotient is **strictly greater than** `231 - 1`, then return `231 - 1`, and if the quotient is **strictly less than** `-231`, then return `-231`.

**Example 1:**

**Input:** dividend = 10, divisor = 3
**Output:** 3
**Explanation:** 10/3 = 3.33333.. which is truncated to 3.

**Example 2:**

**Input:** dividend = 7, divisor = -3
**Output:** -2
**Explanation:** 7/-3 = -2.33333.. which is truncated to -2.

**Constraints:**

*   `-231 <= dividend, divisor <= 231 - 1`
*   `divisor != 0`

## Code 

Time Complexity: $O(\log N)$, Space Complexity: $O(1)$

以 `10 / 3` 為例：

`10` in binary: `1010`，`3` in binary: `0011`，我們可以不斷地將 `3` left shift，在此最大可以 left shift 一次，`10 - (3 * 2) = 4`，也就是 `1010 - 0110 = 0100`，而這一輪的操作可得 `quotient = 2`。接著因為 `4 > 3`，可以再做一次，得到 `quotient += 1`，得到最終的答案 `quotient = 3`。


```cpp
class Solution {
public:
    int divide(int dividend, int divisor) {
        if(dividend == divisor) return 1;
        int sign = (dividend ^ divisor) < 0 ? -1 : 1;
        unsigned int a = (unsigned int) abs(dividend);
        unsigned int b = (unsigned int) abs(divisor);
        unsigned int quotient = 0;
        while(a >= b) {
            int q = 0;
            while(a > (b << (q + 1))) {
                q++;
            }
            quotient += (1 << q);
            a -= (b << q);
        }
        if(quotient == (1 << 31)) {
            return sign == 1 ? INT_MAX : INT_MIN;
        }
        return sign * quotient;
    }
};
```

## Source
- [Divide Two Integers - LeetCode](https://leetcode.com/problems/divide-two-integers/description/)