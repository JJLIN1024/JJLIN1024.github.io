---
title: Sqrt(x)
date: 2023-04-21
lastmod: 2023-04-21
author:
  - Jimmy Lin
tags:
  - binary_search
draft: false
---

## Description

Given a non-negative integer `x`, return _the square root of_ `x` _rounded down to the nearest integer_. The returned integer should be **non-negative** as well.

You **must not use** any built-in exponent function or operator.

*   For example, do not use `pow(x, 0.5)` in c++ or `x ** 0.5` in python.

**Example 1:**

**Input:** x = 4
**Output:** 2
**Explanation:** The square root of 4 is 2, so we return 2.

**Example 2:**

**Input:** x = 8
**Output:** 2
**Explanation:** The square root of 8 is 2.82842..., and since we round it down to the nearest integer, 2 is returned.

**Constraints:**

*   `0 <= x <= 231 - 1`

## Code 

基本概念同 [[Binary Search 101|Binary Search 101]]。

可以用除法避免 integer overflow。
```cpp
class Solution {
public:
    int mySqrt(int x) {
        if(x == 0) return 0;
        int l = 1, r = x;

        while(l < r) {
            int mid = l + (r - l) / 2;
            if(mid == x / mid) return mid;
            else if(mid < x / mid) {
                l = mid + 1;
            } else {
                r = mid;
            }
        }

        return l == x / l ? l : l - 1;
    }
};
```

和 [[Valid Perfect Square]] 是同個概念。

```cpp
class Solution {
public:
    int mySqrt(int x) {
        long long l = 1, r = x;
        while(l < r) {
            long long m = l + (r - l) / 2;
            long long product = m * m;
            if(product < x) {
                l = m + 1;
            } else {
                r = m;
            }
        }
        return l * l > x ? l - 1 : l;
    }
};
```

## Source
- [Sqrt(x) - LeetCode](https://leetcode.com/problems/sqrtx/description/)