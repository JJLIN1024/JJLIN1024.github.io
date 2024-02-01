---
title: Power of Three
date: 2023-02-01
lastmod: 2023-02-01
author: Jimmy Lin
tags: ["math"]
draft: false
---

## Description

Given an integer `n`, return _`true` if it is a power of three. Otherwise, return `false`_.

An integer `n` is a power of three, if there exists an integer `x` such that `n == 3x`.

**Example 1:**

**Input:** n = 27
**Output:** true
**Explanation:** 27 = 33

**Example 2:**

**Input:** n = 0
**Output:** false
**Explanation:** There is no x where 3x = 0.

**Example 3:**

**Input:** n = -1
**Output:** false
**Explanation:** There is no x where 3x = (-1).

**Constraints:**

*   `-231 <= n <= 231 - 1`

**Follow up:** Could you solve it without loops/recursion?

## Code 

```cpp
class Solution {
public:
    bool isPowerOfThree(int n) {
        if(n <= 0) return false;
        while(n > 1) {
            int res = n % 3;
            if(res != 0) return false;
            n = n / 3;
        }
        return true;
    }
};
```

## Source
- [Power of Three - LeetCode](https://leetcode.com/problems/power-of-three/description/)