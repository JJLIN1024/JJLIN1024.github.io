---
title: Best Time to Buy and Sell Stock IV - LeetCode
date: 2023-09-02
lastmod: 2023-09-02
author: Jimmy Lin
tags:
  - DP
  - review
draft: false
sr-due: 2024-03-07
sr-interval: 4
sr-ease: 272
---

## Description

You are given an integer array `prices` where `prices[i]` is the price of a given stock on the `ith` day, and an integer `k`.

Find the maximum profit you can achieve. You may complete at most `k` transactions: i.e. you may buy at most `k` times and sell at most `k` times.

**Note:** You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

**Example 1:**

**Input:** k = 2, prices = \[2,4,1\]
**Output:** 2
**Explanation:** Buy on day 1 (price = 2) and sell on day 2 (price = 4), profit = 4-2 = 2.

**Example 2:**

**Input:** k = 2, prices = \[3,2,6,5,0,3\]
**Output:** 7
**Explanation:** Buy on day 2 (price = 2) and sell on day 3 (price = 6), profit = 6-2 = 4. Then buy on day 5 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.

**Constraints:**

*   `1 <= k <= 100`
*   `1 <= prices.length <= 1000`
*   `0 <= prices[i] <= 1000`

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(n)$

一脈相承 [[Most consistent ways of dealing with the series of stock problems|Most consistent ways of dealing with the series of stock problems]] & [[Best Time to Buy and Sell Stock|Best Time to Buy and Sell Stock]]，此題是 [[Best Time to Buy and Sell Stock III|Best Time to Buy and Sell Stock III]] 的 generalization。

```cpp
class Solution {
public:
    int maxProfit(int k, vector<int>& prices) {
        int days = prices.size();
        int trades = k;
        int T[days + 1][trades + 1][2];

        // On day 0, no way ending up with stock in hand
        for(int i = 0; i < trades + 1; i++) {
            T[0][i][0] = 0;
            T[0][i][1] = -1e4;
        }

        // no trade, no way ending up with stock in hand
        for(int i = 0; i < days + 1; i++) {
            T[i][0][0] = 0;
            T[i][0][1] = -1e4;
        }

        for(int k = 1; k < trades + 1; k++) {
            for(int i = 1; i < days + 1; i++) {
                T[i][k][0] = max(T[i - 1][k][0], T[i - 1][k][1] + prices[i - 1]);
                T[i][k][1] = max(T[i - 1][k][1], T[i - 1][k - 1][0] - prices[i - 1]);
            }
        }
        
        return T[days][trades][0];
    }
};
```

## Source
- [Best Time to Buy and Sell Stock IV - LeetCode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/description/)