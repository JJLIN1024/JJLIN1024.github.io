---
title: Minimum Cost For Tickets
date: 2023-09-09
lastmod: 2023-09-09
author: Jimmy Lin
tags: ["dynamic programming"]
draft: false
---

## Description

You have planned some train traveling one year in advance. The days of the year in which you will travel are given as an integer array `days`. Each day is an integer from `1` to `365`.

Train tickets are sold in **three different ways**:

*   a **1-day** pass is sold for `costs[0]` dollars,
*   a **7-day** pass is sold for `costs[1]` dollars, and
*   a **30-day** pass is sold for `costs[2]` dollars.

The passes allow that many days of consecutive travel.

*   For example, if we get a **7-day** pass on day `2`, then we can travel for `7` days: `2`, `3`, `4`, `5`, `6`, `7`, and `8`.

Return _the minimum number of dollars you need to travel every day in the given list of days_.

**Example 1:**

**Input:** days = \[1,4,6,7,8,20\], costs = \[2,7,15\]
**Output:** 11
**Explanation:** For example, here is one way to buy passes that lets you travel your travel plan:
On day 1, you bought a 1-day pass for costs\[0\] = $2, which covered day 1.
On day 3, you bought a 7-day pass for costs\[1\] = $7, which covered days 3, 4, ..., 9.
On day 20, you bought a 1-day pass for costs\[0\] = $2, which covered day 20.
In total, you spent $11 and covered all the days of your travel.

**Example 2:**

**Input:** days = \[1,2,3,4,5,6,7,8,9,10,30,31\], costs = \[2,7,15\]
**Output:** 17
**Explanation:** For example, here is one way to buy passes that lets you travel your travel plan:
On day 1, you bought a 30-day pass for costs\[2\] = $15 which covered days 1, 2, ..., 30.
On day 31, you bought a 1-day pass for costs\[0\] = $2 which covered day 31.
In total, you spent $17 and covered all the days of your travel.

**Constraints:**

*   `1 <= days.length <= 365`
*   `1 <= days[i] <= 365`
*   `days` is in strictly increasing order.
*   `costs.length == 3`
*   `1 <= costs[i] <= 1000`

## Code 

### DP 
Time Complexity: $O(365)$, Space Complexity: $O(\max(n, 365))$

遞迴的邏輯是：在 Day `i`，假設我們買了一日票，那 total cost 就會是一日票的價錢再加上一天之後的總花費，若買了七日票， total cost 就會是七日票的價錢和七日之後的總花費，三十日的票同理。

```cpp
class Solution {
public:
    int mincostTickets(vector<int>& days, vector<int>& costs) {
        unordered_set<int> t(days.begin(), days.end());
        int dp[366];
        dp[0] = 0;

        for(int i = 1; i < 366; i++) {
            dp[i] = dp[i - 1];
            if(t.find(i) != t.end()) {
                dp[i] = min({dp[max(0, i - 1)] + costs[0], dp[max(0, i - 7)] + costs[1], dp[max(0, i - 30)] + costs[2]});
            }
        }

        return dp[365];
    }
};
```

## Source
- [Minimum Cost For Tickets - LeetCode](https://leetcode.com/problems/minimum-cost-for-tickets/description/)