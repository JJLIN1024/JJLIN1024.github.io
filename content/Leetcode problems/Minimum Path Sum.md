---
title: Minimum Path Sum
date: 2024-02-21
lastmod: 2024-02-21
author:
  - Jimmy Lin
tags:
  - DP
draft: false
---

## Description

Given a `m x n` `grid` filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.

**Note:** You can only move either down or right at any point in time.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/11/05/minpath.jpg)

**Input:** grid = \[\[1,3,1\],\[1,5,1\],\[4,2,1\]\]
**Output:** 7
**Explanation:** Because the path 1 → 3 → 1 → 1 → 1 minimizes the sum.

**Example 2:**

**Input:** grid = \[\[1,2,3\],\[4,5,6\]\]
**Output:** 12

**Constraints:**

*   `m == grid.length`
*   `n == grid[i].length`
*   `1 <= m, n <= 200`
*   `0 <= grid[i][j] <= 200`

## Code 

和 [[Unique Paths]] ㄧ模一樣。

Time Complexity: $O(nm)$, Space Complexity: $O(nm)$

```cpp
class Solution {
public:
    int minPathSum(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        vector<vector<int>> dp(m, vector<int>(n, INT_MAX));
        for(int i = 0; i < m; i++) {
            dp[i][0] = grid[i][0];
            if(i > 0)
                dp[i][0] += dp[i - 1][0];
        }
            
        for(int i = 0; i < n; i++) {
            dp[0][i] = grid[0][i];
            if(i > 0)
                dp[0][i] += dp[0][i - 1];
        }
            
        
        for(int i = 1; i < m; i++) {
            for(int j = 1; j < n; j++) {
                dp[i][j] = min(dp[i][j], dp[i][j - 1] + grid[i][j]);
                dp[i][j] = min(dp[i][j], dp[i - 1][j] + grid[i][j]);
            }
        }

        return dp[m - 1][n - 1];
    }

};

```

## Source
- [Minimum Path Sum - LeetCode](https://leetcode.com/problems/minimum-path-sum/description/?envType=study-plan-v2&envId=top-interview-150)