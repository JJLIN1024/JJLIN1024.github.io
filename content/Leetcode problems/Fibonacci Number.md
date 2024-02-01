---
title: Fibonacci Number
date: 2022-12-21
lastmod: 2022-12-21
author:
  - Jimmy Lin
tags:
  - DP
draft: false
---

## Description

The **Fibonacci numbers**, commonly denoted `F(n)` form a sequence, called the **Fibonacci sequence**, such that each number is the sum of the two preceding ones, starting from `0` and `1`. That is,

F(0) = 0, F(1) = 1
F(n) = F(n - 1) + F(n - 2), for n > 1.

Given `n`, calculate `F(n)`.

**Example 1:**

**Input:** n = 2
**Output:** 1
**Explanation:** F(2) = F(1) + F(0) = 1 + 0 = 1.

**Example 2:**

**Input:** n = 3
**Output:** 2
**Explanation:** F(3) = F(2) + F(1) = 1 + 1 = 2.

**Example 3:**

**Input:** n = 4
**Output:** 3
**Explanation:** F(4) = F(3) + F(2) = 2 + 1 = 3.

**Constraints:**

*   `0 <= n <= 30`

## Code

Time Complexity: $O(n)$, Space Complexity: $O(1)$

差別在於使用 while loop or for loop，以及是 return b 還是 c。

```cpp
class Solution {
public:
    int fib(int n) {
        if (n <= 1) return n;
        int a = 0;
        int b = 1;
        int c = a + b;
        while(n-- >= 2){
            c = a + b;
            a = b;
            b = c;
        }
        return b;
    }
};
```

```cpp
class Solution {
public:
    int fib(int n) {
        if (n <= 1) return n;
        int a = 0;
        int b = 1;
        int c;
        for(int i = 2; i <= n; i++){
            c = a + b;
            a = b;
            b = c;
        }
        return c;
    }
};
```


## Link
- [509. Fibonacci Number](https://leetcode.com/problems/fibonacci-number)