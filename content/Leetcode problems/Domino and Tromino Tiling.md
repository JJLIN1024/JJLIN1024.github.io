---
title: Domino and Tromino Tiling
date: 2023-09-05
lastmod: 2023-09-05
author: Jimmy Lin
tags: ["dynamic programming"]
draft: false
---

## Description

You have two types of tiles: a `2 x 1` domino shape and a tromino shape. You may rotate these shapes.

![](https://assets.leetcode.com/uploads/2021/07/15/lc-domino.jpg)

Given an integer n, return _the number of ways to tile an_ `2 x n` _board_. Since the answer may be very large, return it **modulo** `109 + 7`.

In a tiling, every square must be covered by a tile. Two tilings are different if and only if there are two 4-directionally adjacent cells on the board such that exactly one of the tilings has both squares occupied by a tile.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/07/15/lc-domino1.jpg)

**Input:** n = 3
**Output:** 5
**Explanation:** The five different ways are show above.

**Example 2:**

**Input:** n = 1
**Output:** 1

**Constraints:**

*   `1 <= n <= 1000`

## Code 

### DP
Time Complexity: $O(n)$, Space Complexity: $O(n)$

```markdown
dp[i] 的組成：
1. dp[i-1] 加上 "|" 
2. dp[i-2] 加上兩條 " - " 一個上一個下，不考慮 "||"，因為這包含在 1. 當中
3. tromino 以及 domino 所組成，長度大於等於 3 的 2 * N 的長方塊，可以發現，若堅持一定要 tromino 在長方塊的外邊（包住 domino）（因為若不包住，就是 1. 2. 負責的遞迴關係），則永遠只有兩種組成方法。
```

```cpp
class Solution {
public:
    int numTilings(int n) {
        long long mod = 1e9 + 7;
        long long dp[n + 1];
        memset(dp, 0, sizeof(dp));
        if(n == 1) return 1;
        if(n == 2) return 2;

        dp[0] = 1;
        dp[1] = 1;
        dp[2] = 2;

        for(int i = 3; i < n + 1; i++) {
            dp[i] = (2 * dp[i - 1] + dp[i - 3]) % mod;
        }

        return (int) dp[n] % mod;
    }
};
```

### DP-Optimized
Time Complexity: $O(n)$, Space Complexity: $O(1)$

可觀察出 `dp[i]` 只和 `dp[i-1], dp[i-3]` 有關係，因此我們只需要 4 個變數，Space Complexity 可以降到 $O(1)$。
```cpp
class Solution {
public:
    int numTilings(int n) {
        long mod = 1e9 + 7;
        if(n == 1) return 1;
        if(n == 2) return 2;

        long a = 1;
        long b = 1;
        long c = 2;
        long d;

        for(int i = 3; i < n + 1; i++) {
            d = (2 * c) % mod + a % mod;
            a = b;
            b = c;
            c = d;
        }

        return (int) d % mod;
    }
};
```
## Source
- [Domino and Tromino Tiling - LeetCode](https://leetcode.com/problems/domino-and-tromino-tiling/description/)