---
title: Painting the Walls
date: 2023-10-14
lastmod: 2023-10-14
author:
  - Jimmy Lin
tags:
  - DP
  - memoization
  - knapsack
draft: false
---

## Description

You are given two **0-indexed** integer arrays, `cost` and `time`, of size `n` representing the costs and the time taken to paint `n` different walls respectively. There are two painters available:

*   A **paid painter** that paints the `ith` wall in `time[i]` units of time and takes `cost[i]` units of money.
*   A **free painter** that paints **any** wall in `1` unit of time at a cost of `0`. But the free painter can only be used if the paid painter is already **occupied**.

Return _the minimum amount of money required to paint the_ `n` _walls._

**Example 1:**

**Input:** cost = \[1,2,3,2\], time = \[1,2,3,2\]
**Output:** 3
**Explanation:** The walls at index 0 and 1 will be painted by the paid painter, and it will take 3 units of time; meanwhile, the free painter will paint the walls at index 2 and 3, free of cost in 2 units of time. Thus, the total cost is 1 + 2 = 3.

**Example 2:**

**Input:** cost = \[2,3,4,2\], time = \[1,1,1,1\]
**Output:** 4
**Explanation:** The walls at index 0 and 3 will be painted by the paid painter, and it will take 2 units of time; meanwhile, the free painter will paint the walls at index 1 and 2, free of cost in 2 units of time. Thus, the total cost is 2 + 2 = 4.

**Constraints:**

*   `1 <= cost.length <= 500`
*   `cost.length == time.length`
*   `1 <= cost[i] <= 106`
*   `1 <= time[i] <= 500`

## Code 

### Top Down with memoization
Time Complexity: $O()$, Space Complexity: $O()$

Intuition: 每個 wall 都有兩種選擇，painted by the paid painter or the free painter。所以這個問題是 knapsack-liked 的。

這題難的點在於 memoization 時要紀錄些什麼資訊。

brute force - TLE 的版本：
```cpp
class Solution {
    
public:
    int paintWalls(vector<int>& cost, vector<int>& time) {
        return helper(cost, time, 0, 0, 0, 0);
    }

    int helper(vector<int>& cost, vector<int>& time, int idx, int totalCost, int t1, int t2) {
        if(idx >= cost.size()) {
            if(t1 < t2) return INT_MAX;
            else return totalCost;
        }

        int c1 = helper(cost, time, idx + 1, totalCost + cost[idx], t1 + time[idx], t2);
        int c2 = helper(cost, time, idx + 1, totalCost, t1, t2 + 1);

        return min(c1, c2);
    }
    
};
```

Memoization 的版本：

關鍵在於 `min(t + time[idx], n)`，因為若所花費的時間超過 `n`，那還不如直接全部都用 free painter 來做。

因此 memoization 的 dp table 設為 `vector<vector<int>> dp(n, vector<int>(2*n + 1, -1))`，這和 [[Tallest Billboard|Tallest Billboard]] 中的 `diff` 變數是相同的概念。

```cpp
class Solution {
    int n;
public:
    int paintWalls(vector<int>& cost, vector<int>& time) {
        n = cost.size();
        vector<vector<int>> dp(n, vector<int>(2*n + 1, -1));
        return helper(cost, time, 0, 0, dp);
    }

    int helper(vector<int>& cost, vector<int>& time, int idx, int t, vector<vector<int>>& dp) {
        if(idx >= cost.size()) {
            if(t < 0) return 1e9;
            else return 0;
        }
        
        if(dp[idx][t + n] != -1) return dp[idx][t + n];

        int c1 = cost[idx] + helper(cost, time, idx + 1, min(t + time[idx], n), dp);
        int c2 = helper(cost, time, idx + 1, t - 1, dp);

        return dp[idx][t + n] = min(c1, c2);
    }
    
};
```


## Source
- [Painting the Walls - LeetCode](https://leetcode.com/problems/painting-the-walls/description/?envType=daily-question&envId=2023-10-14)