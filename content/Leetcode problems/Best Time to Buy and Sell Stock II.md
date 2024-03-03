---
title: Best Time to Buy and Sell Stock II
date: 2022-12-26
lastmod: 2022-12-26
author: Jimmy Lin
tags:
  - DP
  - review
draft: false
sr-due: 2024-02-04
sr-interval: 4
sr-ease: 272
---

## Code
### DP - 1

Time Complexity: $O(n)$, Space Complexity: $O(n)$

一脈相承 [[Most consistent ways of dealing with the series of stock problems|Most consistent ways of dealing with the series of stock problems]]，和 [[Best Time to Buy and Sell Stock|Best Time to Buy and Sell Stock]] 中的寫法一樣。

差別只在於因為沒有交易次數限制，所以

```cpp
T[i][k][0] =  T[i][k - 1][0] =  T[i][k - 2][0] = ... = T[i][0]
T[i][k][1] =  T[i][k - 1][1] =  T[i][k - 2][1] = ... = T[i][1]
```

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
            T[i][1] = max(T[i - 1][1], T[i - 1][0] - prices[i - 1]);
        }

        return T[days][0];
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
    
// No trading limits ->  
// T[i][k][0] =  T[i][k - 1][0] =  T[i][k - 2][0] = ... = T[i][0]
// T[i][k][1] =  T[i][k - 1][1] =  T[i][k - 2][1] = ... = T[i][1]

```

### DP - 2

因為可以 Buy & Sell on the same day，因此這個問題就等價於 [[Maximum Subarray|Maximum Subarray]]，解法就和 [[Best Time to Buy and Sell Stock|Best Time to Buy and Sell Stock]] 中運用 [[notes/algorithm/Kadane Algorithm(Maximum Subarray Problem)|Kadane Algorithm(Maximum Subarray Problem)]] 的解法一樣。

Time Complexity: $O(n)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int profit = 0;
        for(int i = 1; i < prices.size(); i++) {
            int diff = prices[i] - prices[i-1];
            if(diff > 0) profit += diff;
        }

        return profit;
    }
};
```

也可以用 DP 的概念來解：

`curHold` 就是買股票部位現值，因為股票是未套現的資產，因此是負的（`curNotHold - prices[i]`），`curNotHold` 就是獲利了結的現金部位，所以用加的（`curHold + prices[i]`），意思就是看當天的賣出價位是否可以 cover 你之前買進的部位的價錢。

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int curHold = -prices[0];
        int curNotHold = 0;
        for(int i = 1; i < prices.size(); i++) {
            curHold = max(curHold, curNotHold - prices[i]);
            curNotHold = max(curNotHold, curHold + prices[i]);
        }
        
        return curNotHold;
    }
};
```

## Link
- [Best Time to Buy and Sell Stock II](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/)