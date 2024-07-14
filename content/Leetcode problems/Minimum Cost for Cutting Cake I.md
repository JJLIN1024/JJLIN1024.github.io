---
title: Minimum Cost for Cutting Cake I
date: 2024-07-14
lastmod: 2024-07-14
author:
  - Jimmy Lin
tags:
  - DP
draft: false
---

## Description

There is an `m x n` cake that needs to be cut into `1 x 1` pieces.

You are given integers `m`, `n`, and two arrays:

*   `horizontalCut` of size `m - 1`, where `horizontalCut[i]` represents the cost to cut along the horizontal line `i`.
*   `verticalCut` of size `n - 1`, where `verticalCut[j]` represents the cost to cut along the vertical line `j`.

In one operation, you can choose any piece of cake that is not yet a `1 x 1` square and perform one of the following cuts:

1.  Cut along a horizontal line `i` at a cost of `horizontalCut[i]`.
2.  Cut along a vertical line `j` at a cost of `verticalCut[j]`.

After the cut, the piece of cake is divided into two distinct pieces.

The cost of a cut depends only on the initial cost of the line and does not change.

Return the **minimum** total cost to cut the entire cake into `1 x 1` pieces.

**Example 1:**

**Input:** m = 3, n = 2, horizontalCut = \[1,3\], verticalCut = \[5\]

**Output:** 13

**Explanation:**

![](https://assets.leetcode.com/uploads/2024/06/04/ezgifcom-animated-gif-maker-1.gif)

*   Perform a cut on the vertical line 0 with cost 5, current total cost is 5.
*   Perform a cut on the horizontal line 0 on `3 x 1` subgrid with cost 1.
*   Perform a cut on the horizontal line 0 on `3 x 1` subgrid with cost 1.
*   Perform a cut on the horizontal line 1 on `2 x 1` subgrid with cost 3.
*   Perform a cut on the horizontal line 1 on `2 x 1` subgrid with cost 3.

The total cost is `5 + 1 + 1 + 3 + 3 = 13`.

**Example 2:**

**Input:** m = 2, n = 2, horizontalCut = \[7\], verticalCut = \[4\]

**Output:** 15

**Explanation:**

*   Perform a cut on the horizontal line 0 with cost 7.
*   Perform a cut on the vertical line 0 on `1 x 2` subgrid with cost 4.
*   Perform a cut on the vertical line 0 on `1 x 2` subgrid with cost 4.

The total cost is `7 + 4 + 4 = 15`.

**Constraints:**

*   `1 <= m, n <= 20`
*   `horizontalCut.length == m - 1`
*   `verticalCut.length == n - 1`
*   `1 <= horizontalCut[i], verticalCut[i] <= 103`

## Code 

Time Complexity: $O(n^4)$, Space Complexity: $O(n^4)$

暴力法 + memoization。

```cpp
class Solution {
public:
    int minimumCost(int m, int n, vector<int>& horizontalCut, vector<int>& verticalCut) {
        vector<vector<vector<vector<int>>>> memo(m + 1, vector<vector<vector<int>>>(m + 1, vector<vector<int>>(n + 1, vector<int>(n + 1, -1))));

        return tryToCut(0, m, 0, n, horizontalCut, verticalCut, memo);
    }

    int tryToCut(int h_start, int h_end, int v_start, int v_end, vector<int>& horizontalCut, vector<int>& verticalCut, vector<vector<vector<vector<int>>>>& memo) {
        if(memo[h_start][h_end][v_start][v_end] != -1) {
            return memo[h_start][h_end][v_start][v_end];
        }
        if(((h_end - h_start) == 1) && ((v_end - v_start) == 1)) {
            return memo[h_start][h_end][v_start][v_end] = 0;
        }

        int minCost = INT_MAX;
        for(int i = h_start + 1; i < h_end; i++) {
            minCost = min(minCost, horizontalCut[i - 1] + tryToCut(h_start, i, v_start, v_end, horizontalCut, verticalCut, memo) + tryToCut(i, h_end, v_start, v_end, horizontalCut, verticalCut, memo));
        }
        for(int i = v_start + 1; i < v_end; i++) {
            minCost = min(minCost, verticalCut[i - 1] + tryToCut(h_start, h_end, v_start, i, horizontalCut, verticalCut, memo) + tryToCut(h_start, h_end, i, v_end, horizontalCut, verticalCut, memo));
        }
        return memo[h_start][h_end][v_start][v_end] = minCost;
    }
};
```

## Source
- [Minimum Cost for Cutting Cake I - LeetCode](https://leetcode.com/problems/minimum-cost-for-cutting-cake-i/description/)