---
title: Flood Fill
date: 2022-12-30
lastmod: 2023-10-30
author:
  - Jimmy Lin
tags:
  - graph
  - bfs
  - dfs
draft: false
---

## Description

An image is represented by an `m x n` integer grid `image` where `image[i][j]` represents the pixel value of the image.

You are also given three integers `sr`, `sc`, and `color`. You should perform a **flood fill** on the image starting from the pixel `image[sr][sc]`.

To perform a **flood fill**, consider the starting pixel, plus any pixels connected **4-directionally** to the starting pixel of the same color as the starting pixel, plus any pixels connected **4-directionally** to those pixels (also with the same color), and so on. Replace the color of all of the aforementioned pixels with `color`.

Return _the modified image after performing the flood fill_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/06/01/flood1-grid.jpg)

**Input:** image = \[\[1,1,1\],\[1,1,0\],\[1,0,1\]\], sr = 1, sc = 1, color = 2
**Output:** \[\[2,2,2\],\[2,2,0\],\[2,0,1\]\]
**Explanation:** From the center of the image with position (sr, sc) = (1, 1) (i.e., the red pixel), all pixels connected by a path of the same color as the starting pixel (i.e., the blue pixels) are colored with the new color.
Note the bottom corner is not colored 2, because it is not 4-directionally connected to the starting pixel.

**Example 2:**

**Input:** image = \[\[0,0,0\],\[0,0,0\]\], sr = 0, sc = 0, color = 0
**Output:** \[\[0,0,0\],\[0,0,0\]\]
**Explanation:** The starting pixel is already colored 0, so no changes are made to the image.

**Constraints:**

*   `m == image.length`
*   `n == image[i].length`
*   `1 <= m, n <= 50`
*   `0 <= image[i][j], color < 216`
*   `0 <= sr < m`
*   `0 <= sc < n`

## Code 

Time Complexity: $O(n + m)$, Space Complexity: $O(n + m)$
### BFS

```cpp
class Solution {
public:
    vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int color) {
       queue<pair<int, int>> q;
       int n = image.size();
       int m = image[0].size();
       vector<vector<int>> visited(n, vector<int>(m, 0));
       q.push({sr, sc});
       int orig_color = image[sr][sc];

        vector<vector<int>> dir = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
       while(!q.empty()) {
           auto pixel = q.front();
           q.pop();
           int x = pixel.first, y = pixel.second;
           image[x][y] = color;
           visited[x][y] = 1;
           for(int i = 0; i < dir.size(); i++) {
               int new_x = x + dir[i][0];
               int new_y = y + dir[i][1];
               if(new_x < n && new_x >= 0 && new_y >= 0 && new_y < m && !visited[new_x][new_y] && image[new_x][new_y] == orig_color) {
                   q.push({new_x, new_y});
               }
           }
       }
       return image;
    }
};
```
### DFS

```cpp
class Solution {
public:
    vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int color) {
        int m = image.size();
        int n = image[0].size();
        vector<vector<int>> visited(m, vector<int>(n ,0));
        int orig_color = image[sr][sc];
        dfs(image, visited, sr, sc, m, n, orig_color, color);
        return image;
    }

    void dfs(vector<vector<int>>& image, vector<vector<int>>& visited, int x, int y, int m, int n, int orig_color, int color) {
        if(visited[x][y] == 1) return;

        visited[x][y] = 1;
        image[x][y] = color;

        if(x - 1 >= 0 && image[x-1][y] == orig_color) dfs(image, visited, x - 1, y, m, n, orig_color, color);
        if(y - 1 >= 0 && image[x][y - 1] == orig_color) dfs(image, visited, x, y - 1, m, n, orig_color, color);
        if(x + 1 < m && image[x + 1][y] == orig_color) dfs(image, visited, x + 1, y, m, n, orig_color, color);
        if(y + 1 < n && image[x][y + 1] == orig_color) dfs(image, visited, x, y + 1, m, n, orig_color, color);
    }
};
```

## Source
- [Flood Fill - LeetCode](https://leetcode.com/problems/flood-fill/)