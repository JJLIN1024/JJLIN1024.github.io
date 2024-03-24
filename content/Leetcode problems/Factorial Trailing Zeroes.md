---
title: Factorial Trailing Zeroes
date: 2024-02-22
lastmod: 2024-02-22
author:
  - Jimmy Lin
tags:
  - math
  - review
draft: false
sr-due: 2024-07-15
sr-interval: 114
sr-ease: 290
---

## Description

Given an integer `n`, return _the number of trailing zeroes in_ `n!`.

Note that `n! = n * (n - 1) * (n - 2) * ... * 3 * 2 * 1`.

**Example 1:**

**Input:** n = 3
**Output:** 0
**Explanation:** 3! = 6, no trailing zero.

**Example 2:**

**Input:** n = 5
**Output:** 1
**Explanation:** 5! = 120, one trailing zero.

**Example 3:**

**Input:** n = 0
**Output:** 0

**Constraints:**

*   `0 <= n <= 104`

**Follow up:** Could you write a solution that works in logarithmic time complexity?

## Code 

2 的因數永遠比 5 多，所以只要計算有幾個 5 就行了。

Time Complexity: $O(\log n)$, Space Complexity: $O(1)$

127 / 5 = 25

```cpp
class Solution {
public:
    int trailingZeroes(int n) {
        int count = 0;
        while(n != 0) {
            int tmp = n / 5;
            count += tmp;
            n = tmp;
        }
        return count;
    }
};
```

## Source
- [Factorial Trailing Zeroes - LeetCode](https://leetcode.com/problems/factorial-trailing-zeroes/description/?envType=study-plan-v2&envId=top-interview-150)