---
title: Unique Paths II
date: 2024-01-31
lastmod: 2024-01-31
author: Jimmy Lin
tags:
  - DP
draft: false
---

## Description

You are given an `m x n` integer array `grid`. There is a robot initially located at the **top-left corner** (i.e., `grid[0][0]`). The robot tries to move to the **bottom-right corner** (i.e., `grid[m - 1][n - 1]`). The robot can only move either down or right at any point in time.

An obstacle and space are marked as `1` or `0` respectively in `grid`. A path that the robot takes cannot include **any** square that is an obstacle.

Return _the number of possible unique paths that the robot can take to reach the bottom-right corner_.

The testcases are generated so that the answer will be less than or equal to `2 * 109`.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/11/04/robot1.jpg)

**Input:** obstacleGrid = \[\[0,0,0\],\[0,1,0\],\[0,0,0\]\]
**Output:** 2
**Explanation:** There is one obstacle in the middle of the 3x3 grid above.
There are two ways to reach the bottom-right corner:
1. Right -> Right -> Down -> Down
2. Down -> Down -> Right -> Right

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/11/04/robot2.jpg)

**Input:** obstacleGrid = \[\[0,1\],\[0,0\]\]
**Output:** 1

**Constraints:**

*   `m == obstacleGrid.length`
*   `n == obstacleGrid[i].length`
*   `1 <= m, n <= 100`
*   `obstacleGrid[i][j]` is `0` or `1`.

## Code 

Time Complexity: $O(n^2)$, Space Complexity: $O(n^2)$

只是 [[Unique Paths]] 加了障礙物，所以 DP 的 state 要排除障礙物，其他都一樣。

```cpp
class Solution {
public:
    int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {
        int n = obstacleGrid.size();
        int m = obstacleGrid[0].size();
        vector<vector<int>> DP(n + 1, vector<int>(m + 1, 0));
        DP[0][0] = 1;
        DP[0][1] = 1;
        for(int i = 1; i <= n; i++) {
            for(int j = 1; j <= m; j++) {
                if (!obstacleGrid[i - 1][j - 1]) DP[i][j] = DP[i-1][j] + DP[i][j-1];
            }
        }
        return DP[n][m];
    }
};
```

## Source
- [Unique Paths II - LeetCode](https://leetcode.com/problems/unique-paths-ii/description/)