---
title: Number of Enclaves
date: 2023-04-07
lastmod: 2023-04-07
author: Jimmy Lin
tags: ["boundary DFS"]
draft: false
---

## Description

You are given an `m x n` binary matrix `grid`, where `0` represents a sea cell and `1` represents a land cell.

A **move** consists of walking from one land cell to another adjacent (**4-directionally**) land cell or walking off the boundary of the `grid`.

Return _the number of land cells in_ `grid` _for which we cannot walk off the boundary of the grid in any number of **moves**_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/02/18/enclaves1.jpg)

**Input:** grid = \[\[0,0,0,0\],\[1,0,1,0\],\[0,1,1,0\],\[0,0,0,0\]\]
**Output:** 3
**Explanation:** There are three 1s that are enclosed by 0s, and one 1 that is not enclosed because its on the boundary.

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/02/18/enclaves2.jpg)

**Input:** grid = \[\[0,1,1,0\],\[0,0,1,0\],\[0,0,1,0\],\[0,0,0,0\]\]
**Output:** 0
**Explanation:** All 1s are either on the boundary or can reach the boundary.

**Constraints:**

*   `m == grid.length`
*   `n == grid[i].length`
*   `1 <= m, n <= 500`
*   `grid[i][j]` is either `0` or `1`.

## Code 

解題邏輯和 [[Surrounded Regions]] 一樣，使用 boundary DFS，從邊界開始。

```cpp
class Solution {
public:
    int numEnclaves(vector<vector<int>>& grid) {
        
        int n = grid.size();
        int m = grid[0].size();
        for(int i = 0; i < n; i++) {
            if(grid[i][0] == 1) boundaryDFS(grid, i, 0, n, m);
            if(grid[i][m-1] == 1) boundaryDFS(grid, i, m-1, n, m);
        }

        for(int j = 0; j < m; j++) {
            if(grid[0][j] == 1) boundaryDFS(grid, 0, j, n, m);
            if(grid[n-1][j] == 1) boundaryDFS(grid, n-1, j, n, m);
        }

        int count = 0;
        for(int i = 0; i < n; i++) {
            for(int j = 0; j < m; j++) {
                if(grid[i][j] == 1) count++;
            }
        }

        return count;

    }

    void boundaryDFS(vector<vector<int>>& grid, int x, int y, int n, int m) {
        if(grid[x][y] == 0 || grid[x][y] == -1) return;
        grid[x][y] = -1;
        if(x + 1 < n && grid[x+1][y] == 1) boundaryDFS(grid, x + 1, y, n, m);
        if(y + 1 < m && grid[x][y+1] == 1) boundaryDFS(grid, x, y + 1, n, m);
        if(x - 1 >= 0 && grid[x-1][y] == 1) boundaryDFS(grid, x - 1, y, n, m);
        if(y - 1 >= 0 && grid[x][y-1] == 1) boundaryDFS(grid, x, y - 1, n, m);
    }
};
```

## Source
- [Number of Enclaves - LeetCode](https://leetcode.com/problems/number-of-enclaves/description/)