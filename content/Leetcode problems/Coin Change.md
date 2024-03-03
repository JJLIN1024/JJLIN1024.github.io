---
title: Coin Change
date: 2023-03-22
lastmod: 2023-03-22
author: Jimmy Lin
tags:
  - knapsack
  - DP
draft: false
---

## Description

You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.

Return _the fewest number of coins that you need to make up that amount_. If that amount of money cannot be made up by any combination of the coins, return `-1`.

You may assume that you have an infinite number of each kind of coin.

**Example 1:**

**Input:** coins = \[1,2,5\], amount = 11
**Output:** 3
**Explanation:** 11 = 5 + 5 + 1

**Example 2:**

**Input:** coins = \[2\], amount = 3
**Output:** -1

**Example 3:**

**Input:** coins = \[1\], amount = 0
**Output:** 0

**Constraints:**

*   `1 <= coins.length <= 12`
*   `1 <= coins[i] <= 231 - 1`
*   `0 <= amount <= 104`

## Code 

Denote $M$ as the amount, $N$ as the size of coins vector.
Time Complexity: $O(MN)$, Space Complexity: $O(M)$

邏輯和 [[Perfect Squares|Perfect Squares]] 類似。是 Knapsack 類型的題目。

```cpp
class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        vector<int> dp(amount + 1, 1e5);
        dp[0] = 0;
        for(int i = 1; i <= amount; i++) {
            for(auto coin: coins) {
                if(i >= coin) {
                    dp[i] = min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        return dp[amount] == 1e5 ? -1 : dp[amount];
    } 
};
```

## Source
- [Coin Change - LeetCode](https://leetcode.com/problems/coin-change/description/)