---
title: Island Perimeter
date: 2023-02-24
lastmod: 2023-02-24
author: Jimmy Lin
tags: ["graph", "dfs", "bfs"]
draft: false
---

## Description

You are given `row x col` `grid` representing a map where `grid[i][j] = 1` represents land and `grid[i][j] = 0` represents water.

Grid cells are connected **horizontally/vertically** (not diagonally). The `grid` is completely surrounded by water, and there is exactly one island (i.e., one or more connected land cells).

The island doesn't have "lakes", meaning the water inside isn't connected to the water around the island. One cell is a square with side length 1. The grid is rectangular, width and height don't exceed 100. Determine the perimeter of the island.

**Example 1:**

![](https://assets.leetcode.com/uploads/2018/10/12/island.png)

**Input:** grid = \[\[0,1,0,0\],\[1,1,1,0\],\[0,1,0,0\],\[1,1,0,0\]\]
**Output:** 16
**Explanation:** The perimeter is the 16 yellow stripes in the image above.

**Example 2:**

**Input:** grid = \[\[1\]\]
**Output:** 4

**Example 3:**

**Input:** grid = \[\[1,0\]\]
**Output:** 4

**Constraints:**

*   `row == grid.length`
*   `col == grid[i].length`
*   `1 <= row, col <= 100`
*   `grid[i][j]` is `0` or `1`.
*   There is exactly one island in `grid`.

## Code 

code 和 [[Flood Fill]] 是一樣的，重點在於怎麼找出邊界。

所謂邊界其實就是當遇到水，或是超出長寬限制，檢查這兩種 case，遇到時 `count++` 即可。

```cpp
class Solution {
public:
    int islandPerimeter(vector<vector<int>>& grid) {
        int m = grid.size();
        int n = grid[0].size();
        vector<vector<int>> visited(m, vector<int>(n ,0));
        int count = 0;
        for(int i = 0; i < m; i++) {
            for(int j = 0; j < n; j++) {
                if(grid[i][j] == 1) {
                    dfs(grid, visited, i, j, m, n, count);
                    break;
                }
            }
        }
        return count;
    }

    void dfs(vector<vector<int>>& grid, vector<vector<int>>& visited, int x, int y, int m, int n, int& count) {

        if( x >= m || y >= n || x < 0 || y < 0 || grid[x][y] == 0) {
            count++;
            return;
        }

        if(visited[x][y] == 1) return;

        visited[x][y] = 1;

        dfs(grid, visited, x - 1, y, m, n, count);
        dfs(grid, visited, x, y - 1, m, n, count);
        dfs(grid, visited, x + 1, y, m, n, count);
        dfs(grid, visited, x, y + 1, m, n, count);
    }

};
```

## Source
- [Island Perimeter - LeetCode](https://leetcode.com/problems/island-perimeter/description/)