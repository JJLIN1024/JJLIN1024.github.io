---
title: Best Time to Buy and Sell Stock
date: 2022-12-25
lastmod: 2022-12-25
author:
  - Jimmy Lin
tags:
  - DP
draft: false
---

## Code

Time Complexity: $O(n)$, Space Complexity: $O(1)$
### DP - 1

Follows the tutorial of [[Most consistent ways of dealing with the series of stock problems|Most consistent ways of dealing with the series of stock problems]], we get the following solution.

Note that index 0 is the day before the prices of stocks starts, so index 1 corresponds index 0 of the prices array.

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int days = prices.size();
        int trades = 1;
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

// i = 0, 1, 2, ..., n;
// 0 -> day 0, i = 0;
// prices = [7, 1, 5, 3, 6 ,4], i = 1, 2, ..., 6

// T[i][k][0]: i-th day, with k transactions complete, with 0 stock in hand
// T[i][k][1]: i-th day, with k transactions complete, with 1 stock in hand

// Recurrence Relationship
// i = 1, 2, ..., n;
// T[i][k][0] = max(T[i - 1][k][0], T[i - 1][k][1] + prices[i]);
// T[i][k][1] = max(T[i - 1][k][1], T[i - 1][k - 1][0] - prices[i]);

// Base cases:
// T[0][k][0] = 0, T[0][k][1] = -Infinity
// T[i][0][0] = 0, T[i][0][1] = -Infinity, for i = 1, 2, ..., n
    
```

### DP - 2

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
       int buy = prices[0];
       int sell = 0;
       for(int p: prices) {
           buy = min(p, buy);
           sell = max(p - buy, sell);
       } 
       return sell;
    }
};
```

### Kadane's Algorithm

- [Kadane's Algorithm(Maximum Subarray Problem)](https://en.wikipedia.org/wiki/Maximum_subarray_problem)
- [Largest Sum Contiguous Subarray (Kadane’s Algorithm)](https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/)

由 [[notes/algorithm/Kadane Algorithm(Maximum Subarray Problem)|Kadane Algorithm(Maximum Subarray Problem)]] 可寫成以下版本（注意因為題目給的是當日的 price，因此在計算時要自己換算成兩日之間的差）：

類似題目 : [[Maximum Subarray|Maximum Subarray]]

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
       int curSum = 0;
       int maxSum = 0;
       for(int i = 1; i < prices.size(); i++) {
           curSum = max(curSum + (prices[i] - prices[i-1]), prices[i] - prices[i-1]);
           maxSum = max(maxSum, curSum);
       } 
       return maxSum;
    }
};
```

## Link
- [Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/)
