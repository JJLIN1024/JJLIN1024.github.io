---
title: Unique Paths III
date: 2024-01-28
lastmod: 2024-01-28
author: Jimmy Lin
tags:
  - backtracking
draft: false
---

## Description

You are given an `m x n` integer array `grid` where `grid[i][j]` could be:

*   `1` representing the starting square. There is exactly one starting square.
*   `2` representing the ending square. There is exactly one ending square.
*   `0` representing empty squares we can walk over.
*   `-1` representing obstacles that we cannot walk over.

Return _the number of 4-directional walks from the starting square to the ending square, that walk over every non-obstacle square exactly once_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/08/02/lc-unique1.jpg)

**Input:** grid = \[\[1,0,0,0\],\[0,0,0,0\],\[0,0,2,-1\]\]
**Output:** 2
**Explanation:** We have the following two paths: 
1. (0,0),(0,1),(0,2),(0,3),(1,3),(1,2),(1,1),(1,0),(2,0),(2,1),(2,2)
2. (0,0),(1,0),(2,0),(2,1),(1,1),(0,1),(0,2),(0,3),(1,3),(1,2),(2,2)

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/08/02/lc-unique2.jpg)

**Input:** grid = \[\[1,0,0,0\],\[0,0,0,0\],\[0,0,0,2\]\]
**Output:** 4
**Explanation:** We have the following four paths: 
1. (0,0),(0,1),(0,2),(0,3),(1,3),(1,2),(1,1),(1,0),(2,0),(2,1),(2,2),(2,3)
2. (0,0),(0,1),(1,1),(1,0),(2,0),(2,1),(2,2),(1,2),(0,2),(0,3),(1,3),(2,3)
3. (0,0),(1,0),(2,0),(2,1),(2,2),(1,2),(1,1),(0,1),(0,2),(0,3),(1,3),(2,3)
4. (0,0),(1,0),(2,0),(2,1),(1,1),(0,1),(0,2),(0,3),(1,3),(1,2),(2,2),(2,3)

**Example 3:**

![](https://assets.leetcode.com/uploads/2021/08/02/lc-unique3-.jpg)

**Input:** grid = \[\[0,1\],\[2,0\]\]
**Output:** 0
**Explanation:** There is no path that walks over every empty square exactly once.
Note that the starting and ending square can be anywhere in the grid.

**Constraints:**

*   `m == grid.length`
*   `n == grid[i].length`
*   `1 <= m, n <= 20`
*   `1 <= m * n <= 20`
*   `-1 <= grid[i][j] <= 2`
*   There is exactly one starting cell and one ending cell.

## Code 

```cpp
class Solution {
public:
    int uniquePathsIII(vector<vector<int>>& grid) {
        int startI, startJ;
        int n = grid.size();
        int m = grid[0].size();
        for(int i = 0; i < n; i++) {
            for(int j = 0; j < m; j++) {
                if(grid[i][j] == 1) {
                    startI = i;
                    startJ = j;
                    break; 
                }
            }
        }
        return search(startI, startJ, grid);
    }

    int search(int x, int y, vector<vector<int>>& grid) {
        if(x >= grid.size() || x < 0 || y >= grid[0].size() || y < 0) return 0; 
        if(grid[x][y] == 3 || grid[x][y] == -1) return 0;
        if(grid[x][y] == 2) {
            for(int i = 0; i < grid.size(); i++) {
                for(int j = 0; j < grid[i].size(); j++) {
                    if(grid[i][j] == 0) return 0; 
                }
            }
            return 1;
        }
	    // Backtracking
        int temp = grid[x][y];
        grid[x][y] = 3;
        int res = search(x + 1, y, grid) + search(x - 1, y, grid) + search(x, y + 1, grid) + search(x, y - 1, grid);       
        // Backtracking
        grid[x][y] = temp;
        return res;


    }
};
```

## Source
- [Unique Paths III - LeetCode](https://leetcode.com/problems/unique-paths-iii/description/)