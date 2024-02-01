---
title: Pacific Atlantic Water Flow
date: 2023-03-09
lastmod: 2023-03-09
author: Jimmy Lin
tags: ["boundary dfs", "dfs", "bfs"]
draft: false
---

## Description

There is an `m x n` rectangular island that borders both the **Pacific Ocean** and **Atlantic Ocean**. The **Pacific Ocean** touches the island's left and top edges, and the **Atlantic Ocean** touches the island's right and bottom edges.

The island is partitioned into a grid of square cells. You are given an `m x n` integer matrix `heights` where `heights[r][c]` represents the **height above sea level** of the cell at coordinate `(r, c)`.

The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is **less than or equal to** the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.

Return _a **2D list** of grid coordinates_ `result` _where_ `result[i] = [ri, ci]` _denotes that rain water can flow from cell_ `(ri, ci)` _to **both** the Pacific and Atlantic oceans_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/06/08/waterflow-grid.jpg)

**Input:** heights = \[\[1,2,2,3,5\],\[3,2,3,4,4\],\[2,4,5,3,1\],\[6,7,1,4,5\],\[5,1,1,2,4\]\]
**Output:** \[\[0,4\],\[1,3\],\[1,4\],\[2,2\],\[3,0\],\[3,1\],\[4,0\]\]
**Explanation:** The following cells can flow to the Pacific and Atlantic oceans, as shown below:
\[0,4\]: \[0,4\] -> Pacific Ocean 
       \[0,4\] -> Atlantic Ocean
\[1,3\]: \[1,3\] -> \[0,3\] -> Pacific Ocean 
       \[1,3\] -> \[1,4\] -> Atlantic Ocean
\[1,4\]: \[1,4\] -> \[1,3\] -> \[0,3\] -> Pacific Ocean 
       \[1,4\] -> Atlantic Ocean
\[2,2\]: \[2,2\] -> \[1,2\] -> \[0,2\] -> Pacific Ocean 
       \[2,2\] -> \[2,3\] -> \[2,4\] -> Atlantic Ocean
\[3,0\]: \[3,0\] -> Pacific Ocean 
       \[3,0\] -> \[4,0\] -> Atlantic Ocean
\[3,1\]: \[3,1\] -> \[3,0\] -> Pacific Ocean 
       \[3,1\] -> \[4,1\] -> Atlantic Ocean
\[4,0\]: \[4,0\] -> Pacific Ocean 
       \[4,0\] -> Atlantic Ocean
Note that there are other possible paths for these cells to flow to the Pacific and Atlantic oceans.

**Example 2:**

**Input:** heights = \[\[1\]\]
**Output:** \[\[0,0\]\]
**Explanation:** The water can flow from the only cell to the Pacific and Atlantic oceans.

**Constraints:**

*   `m == heights.length`
*   `n == heights[r].length`
*   `1 <= m, n <= 200`
*   `0 <= heights[r][c] <= 105`

## Code 

想法來源：[[Surrounded Regions]] 中的 boundary dfs。

想法：從四周海岸線一路往上，可以到達就在該格子標示從哪個海域來，最後再看有哪些格子是兩個海域都有標示，就是我們要找的那些格子。

```cpp
class Solution {
public:
    vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {
        int m = heights.size();
        int n = heights[0].size();
        vector<vector<pair<bool, bool>>> canFlowTo(m, vector<pair<bool, bool>>(n, {false, false}));
        for(int i = 0; i < m; i++) {
            vector<vector<bool>> visited1(m, vector<bool>(n, false));
            vector<vector<bool>> visited2(m, vector<bool>(n, false));
            dfs(heights, visited1, canFlowTo, i, 0, 1);
            dfs(heights, visited2, canFlowTo, i, n - 1, 2);
        }
        for(int j = 0; j < n; j++) {
            vector<vector<bool>> visited3(m, vector<bool>(n, false));
            vector<vector<bool>> visited4(m, vector<bool>(n, false));
            dfs(heights, visited3, canFlowTo, 0, j, 1);
            dfs(heights, visited4, canFlowTo, m - 1, j, 2);
        }

        vector<vector<int>> answer;
        for(int i = 0; i < m; i++) {
            for(int j = 0; j < n; j++) {
                if(canFlowTo[i][j].first == true && canFlowTo[i][j].second == true) {
                    answer.push_back({i, j});
                }
            }
        }
        return answer;
    }

    void dfs(vector<vector<int>>& heights, vector<vector<bool>>& visited, vector<vector<pair<bool, bool>>>& canFlowTo, int x, int y, int ocean) {
        if(visited[x][y]) return;
        visited[x][y] = true;
        if(ocean == 1) canFlowTo[x][y].first = true;
        if(ocean == 2) canFlowTo[x][y].second = true;
        if(x + 1 < heights.size() && heights[x+1][y] >= heights[x][y]) dfs(heights, visited, canFlowTo, x + 1, y, ocean);
        if(y + 1 < heights[0].size() && heights[x][y+1] >= heights[x][y]) dfs(heights, visited, canFlowTo, x, y + 1, ocean);
        if(x - 1 >= 0 && heights[x-1][y] >= heights[x][y]) dfs(heights, visited, canFlowTo, x - 1, y, ocean);
        if(y - 1 >= 0 && heights[x][y-1] >= heights[x][y]) dfs(heights, visited, canFlowTo, x, y - 1, ocean);
    }
};
```

## Source
- [Pacific Atlantic Water Flow - LeetCode](https://leetcode.com/problems/pacific-atlantic-water-flow/)