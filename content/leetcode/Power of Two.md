---
title: Power of Two
date: 2023-02-01
lastmod: 2023-12-05
author:
  - Jimmy Lin
tags:
  - bit_manipulation
draft: false
---

## Description

Given an integer `n`, return _`true` if it is a power of two. Otherwise, return `false`_.

An integer `n` is a power of two, if there exists an integer `x` such that `n == 2x`.

**Example 1:**

**Input:** n = 1
**Output:** true
**Explanation:** 20 = 1

**Example 2:**

**Input:** n = 16
**Output:** true
**Explanation:** 24 = 16

**Example 3:**

**Input:** n = 3
**Output:** false

**Constraints:**

*   `-231 <= n <= 231 - 1`

**Follow up:** Could you solve it without loops/recursion?

## Code 

### Bit Manipulation
Time Complexity: $O(1)$, Space Complexity: $O(1)$

使用 [[Number of 1 Bits]] 中學到的 `n & (n-1)` trick 。因為二的倍數的 bits 只會有一個 1，其他都是 0，所以如果消除了最後一個 1 bit 之後數字變成 0 就代表此數原本是 2 的倍數。

```c
bool isPowerOfTwo(int n) {
   return (1 ^ ((unsigned int)n >> (sizeof(int) * CHAR_BIT - 1))) && n && !(n & (n - 1)); 
}
```

使用 `(1 ^ ((unsigned int)n >> (sizeof(int) * CHAR_BIT - 1)))` 得到判斷 sign，小於0 回傳 0，大於 0 回傳 1。

使用 `n` 去判斷是否等於 0。

```cpp
class Solution {
public:
    bool isPowerOfTwo(int n) {
        if(n <= 0) return false;
        return !(n & (n-1)); // extract last bit
    }
};
```

## Source
- [Power of Two - LeetCode](https://leetcode.com/problems/power-of-two/description/)