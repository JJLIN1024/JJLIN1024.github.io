---
title: Rotting Oranges
date: 2023-03-09
lastmod: 2023-03-09
author: Jimmy Lin
tags: ["bfs"]
draft: false
---

## Description

You are given an `m x n` `grid` where each cell can have one of three values:

*   `0` representing an empty cell,
*   `1` representing a fresh orange, or
*   `2` representing a rotten orange.

Every minute, any fresh orange that is **4-directionally adjacent** to a rotten orange becomes rotten.

Return _the minimum number of minutes that must elapse until no cell has a fresh orange_. If _this is impossible, return_ `-1`.

**Example 1:**

![](https://assets.leetcode.com/uploads/2019/02/16/oranges.png)

**Input:** grid = \[\[2,1,1\],\[1,1,0\],\[0,1,1\]\]
**Output:** 4

**Example 2:**

**Input:** grid = \[\[2,1,1\],\[0,1,1\],\[1,0,1\]\]
**Output:** -1
**Explanation:** The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.

**Example 3:**

**Input:** grid = \[\[0,2\]\]
**Output:** 0
**Explanation:** Since there are already no fresh oranges at minute 0, the answer is just 0.

**Constraints:**

*   `m == grid.length`
*   `n == grid[i].length`
*   `1 <= m, n <= 10`
*   `grid[i][j]` is `0`, `1`, or `2`.

## Code 

similar to [[Flood Fill]]，因為要求 minimum minutes，因此要使用 BFS，要思考的點在於，若有很多個 rotten oranges，要讓他們同時開始感染其他健康的 oranges，因為 BFS 是一個 level 一個 level 往下做，因此所有 initial rotten oranges 都會在 level 0。

注意 `vector<int> dir = {-1, 0, 1, 0, -1};`的使用。

注意一開始時設 `ans = -1` 。

```cpp
class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        int m = grid.size();
        int n = grid[0].size();
        queue<pair<int, int>> q;
        int fresh = 0;
        for(int i = 0; i < m; i++) {
            for(int j = 0; j < n; j++) {
                if(grid[i][j] == 2) q.push({i, j});
                if(grid[i][j] == 1) fresh++;
            }
        }

        vector<int> dir = {-1, 0, 1, 0, -1};
        int ans = -1;
        while(!q.empty()) {
            int s = q.size();
            while(s--) {
                auto node = q.front();
                q.pop();
                for(int i = 0; i < 4; i++) {
                    int x = node.first + dir[i];
                    int y = node.second + dir[i+1];
                    if(x >= 0 && x < m && y >= 0 && y < n && grid[x][y] == 1) {
                        grid[x][y] = 2;
                        fresh--;
                        q.push({x, y});
                    }
                }
            }

            ans++;
        }

        if(fresh) return -1;
        if(ans == -1) return 0;
        return ans;
    }

};
```

## Source
- [Rotting Oranges - LeetCode](https://leetcode.com/problems/rotting-oranges/description/)