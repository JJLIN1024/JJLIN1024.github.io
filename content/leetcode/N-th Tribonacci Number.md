---
title: N-th Tribonacci Number
date: 2022-12-21
lastmod: 2022-12-21
author: Jimmy Lin
tags:
  - DP
draft: false
---

The Tribonacci sequence Tn is defined as follows: 

T0 = 0, T1 = 1, T2 = 1, and Tn+3 = Tn + Tn+1 + Tn+2 for n >= 0.

Given `n`, return the value of Tn.

**Example 1:**

**Input:** n = 4
**Output:** 4
**Explanation:**
T_3 = 0 + 1 + 1 = 2
T_4 = 1 + 1 + 2 = 4

**Example 2:**

**Input:** n = 25
**Output:** 1389537

**Constraints:**

- `0 <= n <= 37`
- The answer is guaranteed to fit within a 32-bit integer, ie. `answer <= 2^31 - 1`.
## Code

和 [[Fibonacci Number|Fibonacci Number]] 一樣的邏輯，只需要注意使用 while 以及 for 時終止條件，以及是 return d 還是 c。

Time Complexity: $O(n)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    int tribonacci(int n) {
        if (n == 0) return 0;
        if (n == 1) return 1;
        if (n == 2) return 1;
        int a = 0;
        int b = 1;
        int c = 1;
        int d;
        for(int i = 3; i <= n; i++) {
            d = a + b + c;
            a = b;
            b = c;
            c = d;
        }
        return d;
    }
};
```

```cpp
class Solution {
public:
    int tribonacci(int n) {
        if (n < 2) return n;
        int a = 0, b = 1, c = 1, d = a + b + c;
        while (n-- > 2) {
            d = a + b + c, a = b, b = c, c = d;
        }
        return c;
    }
};
```

## Link
- [1137. N-th Tribonacci Number](https://leetcode.com/problems/n-th-tribonacci-number/)

