---
title: Max Increase to Keep City Skyline
date: 2023-07-23
lastmod: 2023-07-23
author: Jimmy Lin
tags: ["greedy"]
draft: false
---

## Description

There is a city composed of `n x n` blocks, where each block contains a single building shaped like a vertical square prism. You are given a **0-indexed** `n x n` integer matrix `grid` where `grid[r][c]` represents the **height** of the building located in the block at row `r` and column `c`.

A city's **skyline** is the outer contour formed by all the building when viewing the side of the city from a distance. The **skyline** from each cardinal direction north, east, south, and west may be different.

We are allowed to increase the height of **any number of buildings by any amount** (the amount can be different per building). The height of a `0`\-height building can also be increased. However, increasing the height of a building should **not** affect the city's **skyline** from any cardinal direction.

Return _the **maximum total sum** that the height of the buildings can be increased by **without** changing the city's **skyline** from any cardinal direction_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/06/21/807-ex1.png)

**Input:** grid = \[\[3,0,8,4\],\[2,4,5,7\],\[9,2,6,3\],\[0,3,1,0\]\]
**Output:** 35
**Explanation:** The building heights are shown in the center of the above image.
The skylines when viewed from each cardinal direction are drawn in red.
The grid after increasing the height of buildings without affecting skylines is:
gridNew = \[ \[8, 4, 8, 7\],
            \[7, 4, 7, 7\],
            \[9, 4, 8, 7\],
            \[3, 3, 3, 3\] \]

**Example 2:**

**Input:** grid = \[\[0,0,0\],\[0,0,0\],\[0,0,0\]\]
**Output:** 0
**Explanation:** Increasing the height of any building will result in the skyline changing.

**Constraints:**

*   `n == grid.length`
*   `n == grid[r].length`
*   `2 <= n <= 50`
*   `0 <= grid[r][c] <= 100`

## Code 

Time Complexity: $O(n^2)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    int maxIncreaseKeepingSkyline(vector<vector<int>>& grid) {
        int n = grid.size(), m = grid[0].size();
        vector<int> rowMax(n, 0);
        vector<int> colMax(m, 0);
        for(int i = 0; i < n; i++) {
            for(int j = 0; j < m; j++) {
                rowMax[i] = max(rowMax[i], grid[i][j]);
                colMax[j] = max(colMax[j], grid[i][j]);
            }
        }

        int res = 0;
        for(int i = 0; i < n; i++) {
            for(int j = 0; j < m; j++) {
                int limit = min(rowMax[i], colMax[j]);
                res += limit - grid[i][j];
            }
        }

        return res;
    }
};
```

## Source
- [Max Increase to Keep City Skyline - LeetCode](https://leetcode.com/problems/max-increase-to-keep-city-skyline/description/)