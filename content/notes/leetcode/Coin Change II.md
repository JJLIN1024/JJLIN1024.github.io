---
title: Coin Change II
date: 2023-09-18
lastmod: 2023-09-18
author: Jimmy Lin
tags:
  - knapsack
  - unbounded_knapsack
  - DP
  - review
draft: false
---

## Description

You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.

Return _the number of combinations that make up that amount_. If that amount of money cannot be made up by any combination of the coins, return `0`.

You may assume that you have an infinite number of each kind of coin.

The answer is **guaranteed** to fit into a signed **32-bit** integer.

**Example 1:**

**Input:** amount = 5, coins = \[1,2,5\]
**Output:** 4
**Explanation:** there are four ways to make up the amount:
5=5
5=2+2+1
5=2+1+1+1
5=1+1+1+1+1

**Example 2:**

**Input:** amount = 3, coins = \[2\]
**Output:** 0
**Explanation:** the amount of 3 cannot be made up just with coins of 2.

**Example 3:**

**Input:** amount = 10, coins = \[10\]
**Output:** 1

**Constraints:**

*   `1 <= coins.length <= 300`
*   `1 <= coins[i] <= 5000`
*   All the values of `coins` are **unique**.
*   `0 <= amount <= 5000`

## Code 

和 [[Ones and Zeroes|Ones and Zeroes]] 一樣是 knapsack 類型的題目，只是這一題是 Unbounded Knapsack。因此 DP 關係式會是

`dp[i][j] = dp[i - 1][j] + (j >= coins[i - 1] ? dp[i][j - coins[i - 1]] : 0);`

而非 `dp[i][j] = dp[i - 1][j] + (j >= coins[i - 1] ? dp[i - 1][j - coins[i - 1]] : 0);`

差別在於 `i` 還是 `i - 1`。

Time Complexity: $O(nm)$, Space Complexity: $O(nm)$
### DP

```cpp
class Solution {
public:
    int change(int amount, vector<int>& coins) {
        int n = coins.size();
        int dp[n + 1][amount + 1];
        memset(dp, 0, sizeof(dp));

        for(int i = 0; i < n + 1; i++) {
            dp[i][0] = 1;
        }

        for(int i = 1; i < n + 1; i++) {
            for(int j = 0; j < amount + 1; j++) {
                dp[i][j] = dp[i - 1][j] + (j >= coins[i - 1] ? dp[i][j - coins[i - 1]] : 0);
            }
        }

        return dp[n][amount];
    }
};

```

### DP - Space Optimized

可以觀察到 `dp[i][j]` 只和 `dp[i][j - coins[i - 1]]` 以及 `dp[i - 1][j]` 有關，因此可以用 1D 的 array 來做 DP。

Time Complexity: $O(nm)$, Space Complexity: $O(m)$

```cpp
class Solution {
public:
    int change(int amount, vector<int>& coins) {
        int n = coins.size();
        int dp[amount + 1];
        memset(dp, 0, sizeof(dp));

        dp[0] = 1;

        for(int i = 1; i < n + 1; i++) {
            for(int j = 0; j < amount + 1; j++) {
                dp[j] = dp[j] + (j >= coins[i - 1] ? dp[j - coins[i - 1]] : 0);
            }
        }

        return dp[amount];
    }
};

```
## Source
- [Coin Change II - LeetCode](https://leetcode.com/problems/coin-change-ii/description/)