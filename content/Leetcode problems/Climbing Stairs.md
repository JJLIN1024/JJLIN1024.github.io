---
title: Climbing Stairs
date: 2022-12-21
lastmod: 2022-12-21
author: Jimmy Lin
tags:
  - DP
draft: false
---
## Description

You are climbing a staircase. It takes `n` steps to reach the top.

Each time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?

**Example 1:**

**Input:** n = 2
**Output:** 2
**Explanation:** There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps

**Example 2:**

**Input:** n = 3
**Output:** 3
**Explanation:** There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step

**Constraints:**

*   `1 <= n <= 45`


## Code

其實就是 [[Fibonacci Number|Fibonacci Number]]。

Time Complexity: $O(n)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) return n;
        int n1 = 1;
        int n2 = 2;
        int ways;
        for(int i = 3; i <= n; i++) {
            ways = n1 + n2;
            n1 = n2;
            n2 = ways;
        }
        return ways;
    }
};
```

Fibonacci computing hack: `a = (b += a) - a;`

```cpp
class Solution {
public:
    int climbStairs(int n) {
        int a = 1, b = 1;
        while (n--)
            a = (b += a) - a;
        return a;
    }
};
```



## Link
- [70. Climbing Stairs](https://leetcode.com/problems/climbing-stairs)
