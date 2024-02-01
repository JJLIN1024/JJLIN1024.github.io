---
title: As Far from Land as Possible
date: 2023-03-23
lastmod: 2023-03-23
author: Jimmy Lin
tags: ["DFS", "BFS"]
draft: false
---

## Description

Given an `n x n` `grid` containing only values `0` and `1`, where `0` represents water and `1` represents land, find a water cell such that its distance to the nearest land cell is maximized, and return the distance. If no land or water exists in the grid, return `-1`.

The distance used in this problem is the Manhattan distance: the distance between two cells `(x0, y0)` and `(x1, y1)` is `|x0 - x1| + |y0 - y1|`.

**Example 1:**

![](https://assets.leetcode.com/uploads/2019/05/03/1336_ex1.JPG)

**Input:** grid = \[\[1,0,1\],\[0,0,0\],\[1,0,1\]\]
**Output:** 2
**Explanation:** The cell (1, 1) is as far as possible from all the land with distance 2.

**Example 2:**

![](https://assets.leetcode.com/uploads/2019/05/03/1336_ex2.JPG)

**Input:** grid = \[\[1,0,0\],\[0,0,0\],\[0,0,0\]\]
**Output:** 4
**Explanation:** The cell (2, 2) is as far as possible from all the land with distance 4.

**Constraints:**

*   `n == grid.length`
*   `n == grid[i].length`
*   `1 <= n <= 100`
*   `grid[i][j]` is `0` or `1`

## Code 

similar to [[01 Matrix]]

```cpp
class Solution {
public:
    int maxDistance(vector<vector<int>>& grid) {
        queue<pair<int, int>> q;
        int n = grid.size();
        for(int i = 0; i < n; i++) {
            for(int j = 0; j < n; j++) {
                if(grid[i][j] == 1) 
                    q.push({i, j});
            }
        }

        if(q.empty() || q.size() == n * n) return -1;

        vector<int> dir = {-1, 0, 1, 0, -1};
        int level = -1;
        while(!q.empty()) {
            int levelNum = q.size();
            for(int i = 0; i < levelNum; i++) {
                auto land = q.front(); q.pop();
                int x = land.first;
                int y = land.second;
                for(int k = 0; k < 4; k++) {
                    int newX = x + dir[k];
                    int newY = y + dir[k + 1];
                    if(newX >= 0 && newX < grid.size() && newY >=0 && newY < grid[0].size() && grid[newX][newY] == 0) {
                        grid[newX][newY] = -1;
                        q.push({newX, newY});
                    }
                }
            }
            level++;
        }

        return level;

    }
};
```

## Source
- [As Far from Land as Possible - LeetCode](https://leetcode.com/problems/as-far-from-land-as-possible/description/)