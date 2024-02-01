---
title: Min Cost Climbing Stairs
date: 2022-12-22
lastmod: 2022-12-22
author: Jimmy Lin
tags:
  - DP
draft: false
---

## Description

You are given an integer array `cost` where `cost[i]` is the cost of `ith` step on a staircase. Once you pay the cost, you can either climb one or two steps.

You can either start from the step with index `0`, or the step with index `1`.

Return _the minimum cost to reach the top of the floor_.

**Example 1:**

**Input:** cost = \[10,15,20\]
**Output:** 15
**Explanation:** You will start at index 1.
- Pay 15 and climb two steps to reach the top.
The total cost is 15.

**Example 2:**

**Input:** cost = \[1,100,1,1,1,100,1,1,100,1\]
**Output:** 6
**Explanation:** You will start at index 0.
- Pay 1 and climb two steps to reach index 2.
- Pay 1 and climb two steps to reach index 4.
- Pay 1 and climb two steps to reach index 6.
- Pay 1 and climb one step to reach index 7.
- Pay 1 and climb two steps to reach index 9.
- Pay 1 and climb one step to reach the top.
The total cost is 6.

**Constraints:**

*   `2 <= cost.length <= 1000`
*   `0 <= cost[i] <= 999`

## Code

Basically it is [[Climbing Stairs]] with costs.

Time Complexity: $O(n)$, Space Complexity: $O(n)$

寫出 DP 關係式： `DP[i] = min(DP[i-1] + cost[i-1], DP[i-2] + cost[i-2]);`

接著定義出 base case：`DP[0] = 0; DP[1] = 0;`

```cpp
class Solution {
public:
    int minCostClimbingStairs(vector<int>& cost) {
        int n = cost.size();
        int DP[n+1];
        DP[0] = 0;
        DP[1] = 0;
        for(int i = 2; i <= n; i++) {
            DP[i] = min(DP[i-1] + cost[i-1], DP[i-2] + cost[i-2]);
        }
        return DP[n];
    }
};
```

第二種 DP 關係式：`DP[i] = cost[i] + min(DP[i-1], DP[i-2]);`

定義出 base case：`DP[0] = cost[0]; DP[1] = cost[1];`

Problem Solved! 差別在於使用的 Spcae 為 $n$ 格（上面的解法是 $n+1$）。

```cpp
class Solution {
public:
    int minCostClimbingStairs(vector<int>& cost) {
        int n = cost.size();
        int DP[n];
        DP[0] = cost[0];
        DP[1] = cost[1];
        for(int i = 2; i < n; i++) {
            DP[i] = cost[i] + min(DP[i-1], DP[i-2]);
        }
        return min(DP[n-1], DP[n-2]);
    }
};
```

### Optimization

Space complexity 可以壓到 $O(1)$，因為觀察到在 DP 計算的過程中，只會需要用到三個值。

```cpp
class Solution {
public:
    int minCostClimbingStairs(vector<int>& cost) {
        int n = cost.size();
        int a = 0;
        int b = 0;
        int c;
        for(int i = 2; i <= n; i++) {
            c = min(b + cost[i-1], a + cost[i-2]);
            a = b;
            b = c;
        }
        return c;
    }
};
```

## Source
- [Min Cost Climbing Stairs - LeetCode](https://leetcode.com/problems/min-cost-climbing-stairs/)