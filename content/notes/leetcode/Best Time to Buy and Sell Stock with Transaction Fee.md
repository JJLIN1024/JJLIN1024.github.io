---
title: Best Time to Buy and Sell Stock with Transaction Fee
date: 2023-09-02
lastmod: 2023-09-02
author: Jimmy Lin
tags:
  - DP
  - review
draft: false
sr-due: 2024-02-04
sr-interval: 4
sr-ease: 272
---

## Description

You are given an array `prices` where `prices[i]` is the price of a given stock on the `ith` day, and an integer `fee` representing a transaction fee.

Find the maximum profit you can achieve. You may complete as many transactions as you like, but you need to pay the transaction fee for each transaction.

**Note:**

*   You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).
*   The transaction fee is only charged once for each stock purchase and sale.

**Example 1:**

**Input:** prices = \[1,3,2,8,4,9\], fee = 2
**Output:** 8
**Explanation:** The maximum profit can be achieved by:
- Buying at prices\[0\] = 1
- Selling at prices\[3\] = 8
- Buying at prices\[4\] = 4
- Selling at prices\[5\] = 9
The total profit is ((8 - 1) - 2) + ((9 - 4) - 2) = 8.

**Example 2:**

**Input:** prices = \[1,3,7,5,10,3\], fee = 3
**Output:** 6

**Constraints:**

*   `1 <= prices.length <= 5 * 104`
*   `1 <= prices[i] < 5 * 104`
*   `0 <= fee < 5 * 104`

## Code 
### DP
Time Complexity: $O(n)$, Space Complexity: $O(n)$

此題為 [[Best Time to Buy and Sell Stock II|Best Time to Buy and Sell Stock II]]  的變形，只需要加上

`T[i][0] = max(T[i - 1][0], T[i - 1][1] + prices[i - 1] - fee);` 即可，在賣掉股票之後代表交易完成，才需要收手續費。

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices, int fee) {
        int days = prices.size();
        int T[days + 1][2];

        // On day 0, no way ending up with stock in hand
        T[0][0] = 0;
        T[0][1] = -1e7;

        for(int i = 1; i < days + 1; i++) {
            T[i][0] = max(T[i - 1][0], T[i - 1][1] + prices[i - 1] - fee);
            T[i][1] = max(T[i - 1][1], T[i - 1][0] - prices[i - 1]);
        }

        return T[days][0];
    }
};
```

## Source
- [Best Time to Buy and Sell Stock with Transaction Fee - LeetCode](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/)