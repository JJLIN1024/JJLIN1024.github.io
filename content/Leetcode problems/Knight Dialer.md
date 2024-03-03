---
title: Knight Dialer
date: 2023-09-09
lastmod: 2023-09-09
author: Jimmy Lin
tags: ["dynamic programming"]
draft: false
---

## Description

The chess knight has a **unique movement**, it may move two squares vertically and one square horizontally, or two squares horizontally and one square vertically (with both forming the shape of an **L**). The possible movements of chess knight are shown in this diagaram:

A chess knight can move as indicated in the chess diagram below:

![](https://assets.leetcode.com/uploads/2020/08/18/chess.jpg)

We have a chess knight and a phone pad as shown below, the knight **can only stand on a numeric cell** (i.e. blue cell).

![](https://assets.leetcode.com/uploads/2020/08/18/phone.jpg)

Given an integer `n`, return how many distinct phone numbers of length `n` we can dial.

You are allowed to place the knight **on any numeric cell** initially and then you should perform `n - 1` jumps to dial a number of length `n`. All jumps should be **valid** knight jumps.

As the answer may be very large, **return the answer modulo** `109 + 7`.

**Example 1:**

**Input:** n = 1
**Output:** 10
**Explanation:** We need to dial a number of length 1, so placing the knight over any numeric cell of the 10 cells is sufficient.

**Example 2:**

**Input:** n = 2
**Output:** 20
**Explanation:** All the valid number we can dial are \[04, 06, 16, 18, 27, 29, 34, 38, 40, 43, 49, 60, 61, 67, 72, 76, 81, 83, 92, 94\]

**Example 3:**

**Input:** n = 3131
**Output:** 136006598
**Explanation:** Please take care of the mod.

**Constraints:**

*   `1 <= n <= 5000`

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    int knightDialer(int n) {
        long mod = 1e9 + 7;
        vector<vector<int>> source = {{4, 6}, {6, 8}, {7, 9}, {4, 8}, {0, 3, 9}, {}, {0, 1, 7}, {2, 6}, {1, 3}, {2, 4}};     
        vector<vector<long>> DP(n + 1, vector<long>(10));

        for(int i = 0; i < 10; i++) {
            DP[1][i] = 1;
        }

        for(int i = 2; i < n + 1; i++) {
            for(int v = 0; v < 10; v++) {
                for(int u: source[v]) {
                    DP[i][v] += DP[i - 1][u];
                }
                DP[i][v] %= mod;
            }
        }

        long sum = 0;
        for(int i = 0; i < 10; i++) {
            sum += DP[n][i];
        }

        return (int) (sum % mod);
    }
};
```

## Source
- [Knight Dialer - LeetCode](https://leetcode.com/problems/knight-dialer/description/)