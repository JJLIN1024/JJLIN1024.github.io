---
title: Power of Four
date: 2023-02-01
lastmod: 2023-02-01
author:
  - Jimmy Lin
tags:
  - bit_manipulation
draft: false
---

## Description

Given an integer `n`, return _`true` if it is a power of four. Otherwise, return `false`_.

An integer `n` is a power of four, if there exists an integer `x` such that `n == 4x`.

**Example 1:**

**Input:** n = 16
**Output:** true

**Example 2:**

**Input:** n = 5
**Output:** false

**Example 3:**

**Input:** n = 1
**Output:** true

**Constraints:**

*   `-231 <= n <= 231 - 1`

**Follow up:** Could you solve it without loops/recursion?

## Code 

### Math

$(4^n - 1) = (2^n + 1)(2^n - 1)$ ，又$(2^n + 1)$、$(2^n - 1)$其中一數必為 3 的倍數。

```cpp
class Solution {
public:
    bool isPowerOfFour(int n) {
        return (n > 0) && !(n & (n-1)) && (n - 1) % 3 == 0;
    }
};
```

### Bit manipulation

先使用 [[Power of Two]] 中的 `!(n & (n-1))` 判斷是否為 2 的倍數，因為是 4 的倍數就一定是 2 的倍數，接著因為 4 的倍數的 1 bit set 的位置都是在奇數 index，因此使用 `0x55555555`當遮罩。

使用 `(1 ^ ((unsigned int)n >> 31))` 判斷是否為負數，若負數值為 0，若為正數則值為 1。

0 則會在 `(n & 0x55555555)` 中被判斷為 false。

```c
bool isPowerOfFour(int n) {
    return (1 ^ ((unsigned int)n >> 31)) && !(n & (n - 1)) && (n & 0x55555555);
}
```

```cpp
class Solution {
public:
    bool isPowerOfFour(int n) {
        return (1 ^ ((n >> 31) & 1)) && !(n == 0) && !(n & (n - 1)) && (n & 0x55555555);
    }
};
```

```cpp
class Solution {
public:
    bool isPowerOfFour(int n) {
        return (n > 0) && !(n & (n-1)) && (n & (0x55555555));
    }
};
```


## Source
- [Power of Four - LeetCode](https://leetcode.com/problems/power-of-four/description/)