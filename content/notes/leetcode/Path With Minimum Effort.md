---
title: Path With Minimum Effort
date: 2023-07-17
lastmod: 2023-07-17
author: Jimmy Lin
tags: ["binary search", "bfs"]
draft: false
---

## Description

You are a hiker preparing for an upcoming hike. You are given `heights`, a 2D array of size `rows x columns`, where `heights[row][col]` represents the height of cell `(row, col)`. You are situated in the top-left cell, `(0, 0)`, and you hope to travel to the bottom-right cell, `(rows-1, columns-1)` (i.e., **0-indexed**). You can move **up**, **down**, **left**, or **right**, and you wish to find a route that requires the minimum **effort**.

A route's **effort** is the **maximum absolute difference** in heights between two consecutive cells of the route.

Return _the minimum **effort** required to travel from the top-left cell to the bottom-right cell._

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/10/04/ex1.png)

**Input:** heights = \[\[1,2,2\],\[3,8,2\],\[5,3,5\]\]
**Output:** 2
**Explanation:** The route of \[1,3,5,3,5\] has a maximum absolute difference of 2 in consecutive cells.
This is better than the route of \[1,2,2,2,5\], where the maximum absolute difference is 3.

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/10/04/ex2.png)

**Input:** heights = \[\[1,2,3\],\[3,8,4\],\[5,3,5\]\]
**Output:** 1
**Explanation:** The route of \[1,2,3,4,5\] has a maximum absolute difference of 1 in consecutive cells, which is better than route \[1,3,5,3,5\].

**Example 3:**

![](https://assets.leetcode.com/uploads/2020/10/04/ex3.png)

**Input:** heights = \[\[1,2,1,1,1\],\[1,2,1,2,1\],\[1,2,1,2,1\],\[1,2,1,2,1\],\[1,1,1,2,1\]\]
**Output:** 0
**Explanation:** This route does not require any effort.

**Constraints:**

*   `rows == heights.length`
*   `columns == heights[i].length`
*   `1 <= rows, columns <= 100`
*   `1 <= heights[i][j] <= 106`

## Code 
基本概念同：[[Binary Search 101|Binary Search 101]]，還需要用到 BFS。

Time Complexity: $O((m + n) \log 1e6)$, Space Complexity: $O(m + n)$

```cpp
class Solution {
public:
    int minimumEffortPath(vector<vector<int>>& heights) {
        int l = 0, r = 1000000;
        while(l < r) {
            int mid = l + (r - l) / 2;
            if(isOK(heights, mid)) {
                r = mid;
            } else {
                l = mid + 1;
            }
        }

        return l;
    }

    bool isOK(vector<vector<int>>& heights, int a) {
        int n = heights.size();
        int m = heights[0].size();
        vector<vector<int>> visited(n, vector<int>(m, 0));
        visited[0][0] = 1;

        queue<pair<int, int>> q;
        q.push({0, 0});
        vector<pair<int, int>> dir = {{0, 1}, {1, 0}, {-1, 0}, {0, -1}};
        while(!q.empty()) {
            int x = q.front().first;
            int y = q.front().second;
            q.pop();
            
            // not here! too slow
            // visited[x][y] = 1;

            for(int k = 0; k < 4; k++) {
                int i = x + dir[k].first;
                int j = y + dir[k].second;
                if(i < 0 || i >= n || j < 0 || j >= m)
                    continue;
                if(visited[i][j]) 
                    continue;
                if(abs(heights[i][j] - heights[x][y]) > a)
                    continue;
                q.push({i, j});
                // mark it here to speed up!
                visited[i][j] = 1;
            }
        }

        return visited[n-1][m-1] == 1;
    }

};
```

## Source
- [Path With Minimum Effort - LeetCode](https://leetcode.com/problems/path-with-minimum-effort/)