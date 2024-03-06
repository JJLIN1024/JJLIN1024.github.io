---
title: Pow(x, n)
date: 2023-04-21
lastmod: 2023-04-21
author:
  - Jimmy Lin
tags:
  - math
  - bit_manipulation
  - review
draft: false
sr-due: 2024-03-10
sr-interval: 4
sr-ease: 270
---

## Description

Implement [pow(x, n)](http://www.cplusplus.com/reference/valarray/pow/), which calculates `x` raised to the power `n` (i.e., `xn`).

**Example 1:**

**Input:** x = 2.00000, n = 10
**Output:** 1024.00000

**Example 2:**

**Input:** x = 2.10000, n = 3
**Output:** 9.26100

**Example 3:**

**Input:** x = 2.00000, n = -2
**Output:** 0.25000
**Explanation:** 2\-2 = 1/22 = 1/4 = 0.25

**Constraints:**

*   `-100.0 < x < 100.0`
*   `-231 <= n <= 231-1`
*   `n` is an integer.
*   `-104 <= xn <= 104`

## Code 

### Brute Force (TLE)

$O(n)$ Multiplications
```cpp
class Solution {
public:
    double myPow(double x, int n) {
        
        double res = 1;
        if(n == 0) return res;

        if(n < 0) {
            for(int i = 0; i < -n; i++) {
                res /= x;
            }
        } else {
            for(int i = 0; i < n; i++) {
                res *= x;
            }
        }

        return res;
    }
};
```


### Log

$O(\log_2 n)$ Multiplications

例如 `n = 11`，寫成二進位為 `1011`，我們就不斷地 right shift，用 `if(n & 1)` 檢查 right most bit 是否為 `1` 來決定是否要乘上此時的 `x`。

```cpp
class Solution {
public:
    double myPow(double x, int n) {
        
        double res = 1;
        if(n == 0) return res;

        if(n < 0) {
            x = 1 / x;
        } 
        
        while(n) {
            if(n & 1) {
                res *= x;
            }
            
            x *= x;
            n /= 2;
        }

        return res;
    }
};
```





## Source
- [Pow(x, n) - LeetCode](https://leetcode.com/problems/powx-n/)