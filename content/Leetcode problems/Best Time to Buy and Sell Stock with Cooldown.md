---
title: Best Time to Buy and Sell Stock with Cooldown
date: 2023-09-02
lastmod: 2023-09-02
author: Jimmy Lin
tags:
  - DP
  - review
draft: false
---

## Description

You are given an array `prices` where `prices[i]` is the price of a given stock on the `ith` day.

Find the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restrictions:

*   After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).

**Note:** You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

**Example 1:**

**Input:** prices = \[1,2,3,0,2\]
**Output:** 3
**Explanation:** transactions = \[buy, sell, cooldown, buy, sell\]

**Example 2:**

**Input:** prices = \[1\]
**Output:** 0

**Constraints:**

*   `1 <= prices.length <= 5000`
*   `0 <= prices[i] <= 1000`

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(n)$

一脈相承 [[Most consistent ways of dealing with the series of stock problems|Most consistent ways of dealing with the series of stock problems]]。

此題是 [[Best Time to Buy and Sell Stock II|Best Time to Buy and Sell Stock II]] 的變形，因為有 cooldown，因此

`T[i][1] = i >= 2 ? max(T[i - 1][1], T[i - 2][0] - prices[i - 1]) : -prices[0];`

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int days = prices.size();
        int T[days + 1][2];

        // On day 0, no way ending up with stock in hand
        T[0][0] = 0;
        T[0][1] = -1e4;

        for(int i = 1; i < days + 1; i++) {
            T[i][0] = max(T[i - 1][0], T[i - 1][1] + prices[i - 1]);

            T[i][1] = i >= 2 ? max(T[i - 1][1], T[i - 2][0] - prices[i - 1]) : -prices[0];
        }

        return T[days][0];
    }
};
```

## Source
- [Best Time to Buy and Sell Stock with Cooldown - LeetCode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/description/)