---
title: Best Time to Buy and Sell Stock III
date: 2023-09-02
lastmod: 2023-09-02
author: Jimmy Lin
tags:
  - DP
  - review
draft: false
sr-due: 2024-02-04
sr-interval: 4
sr-ease: 270
---
## Description

You are given an array `prices` where `prices[i]` is the price of a given stock on the `ith` day.

Find the maximum profit you can achieve. You may complete **at most two transactions**.

**Note:** You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

**Example 1:**

**Input:** prices = \[3,3,5,0,0,3,1,4\]
**Output:** 6
**Explanation:** Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
Then buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 4-1 = 3.

**Example 2:**

**Input:** prices = \[1,2,3,4,5\]
**Output:** 4
**Explanation:** Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are engaging multiple transactions at the same time. You must sell before buying again.

**Example 3:**

**Input:** prices = \[7,6,4,3,1\]
**Output:** 0
**Explanation:** In this case, no transaction is done, i.e. max profit = 0.

**Constraints:**

*   `1 <= prices.length <= 105`
*   `0 <= prices[i] <= 105`

## Code 

## DP

Time Complexity: $O(n)$, Space Complexity: $O(n)$

一脈相承 [[Most consistent ways of dealing with the series of stock problems|Most consistent ways of dealing with the series of stock problems]] & [[Best Time to Buy and Sell Stock|Best Time to Buy and Sell Stock]]，程式碼的部分只改動了 `int trades = 2;`

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int days = prices.size();
        int trades = 2;
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
- [Best Time to Buy and Sell Stock III - LeetCode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/description/)