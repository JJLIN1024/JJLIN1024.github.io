---
title: Sum of Two Integers
date: 2023-01-31
lastmod: 2023-12-07
author:
  - Jimmy Lin
tags:
  - bit_manipulation
  - review
draft: false
sr-due: 2024-03-10
sr-interval: 4
sr-ease: 270
---

## Description

Given two integers `a` and `b`, return _the sum of the two integers without using the operators_ `+` _and_ `-`.

**Example 1:**

**Input:** a = 1, b = 2
**Output:** 3

**Example 2:**

**Input:** a = 2, b = 3
**Output:** 5

**Constraints:**

*   `-1000 <= a, b <= 1000`

## Code 

要注意的點是：在 C/C++ 中，對於 negative int or signed int 做 shift 是 undefined behavior，所以必須將 cast 成 unsigned int。

- `a ^ b`：處理兩數相加不會產生 carry 的部分
- `(a & b) << 1`：處理會產生 carry 的部分，同時向左移（因為 carry 是加到左邊一位）

```c
int getSum(int a, int b) {
    return b == 0 ? a : getSum(a ^ b, (unsigned int)(a & b) << 1); 
}
```

```cpp
class Solution {
public:
    int getSum(int a, int b) {
        int c;
        while(b != 0) {
            c = a & b;  // carry
            a = a ^ b;  // add without carry
            b = (unsigned int)c << 1; // carry to add in the next round
        }
        return a;
    }
};

```

## Source
- [Sum of Two Integers - LeetCode](https://leetcode.com/problems/sum-of-two-integers/description/)