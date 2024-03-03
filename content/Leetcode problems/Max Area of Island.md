---
title: Max Area of Island
date: 2022-12-30
lastmod: 2022-12-30
author: Jimmy Lin
tags: ["BFS", "DFS"]
draft: false
---

## Code

code 的邏輯和 [[Number of Islands]] 大同小異。

```cpp
class Solution {
public:
  int maxAreaOfIsland(vector<vector<int>> &grid) {
    int m = grid.size();
    int n = grid[0].size();
    vector<vector<int>> visited(m, vector<int>(n, 0));
    int answer = 0;
    for (int i = 0; i < m; i++) {
      for (int j = 0; j < n; j++) {
        if (!visited[i][j]) {
          if (grid[i][j] == 1) {
            answer = max(countIsland(grid, visited, i, j), answer);
          } else {
            visited[i][j] = 1;
          }
        }
      }
    }

    return answer;
  }

  int countIsland(vector<vector<int>> &grid, vector<vector<int>> &visited,
                  int i, int j) {
    if (i < 0 || j < 0 || i >= grid.size() || j >= grid[0].size() ||
        grid[i][j] == 0)
      return 0;
    if (grid[i][j] == 1 && visited[i][j] == 1)
      return 0;

    visited[i][j] = 1;

    return 1 + countIsland(grid, visited, i + 1, j) +
           countIsland(grid, visited, i - 1, j) +
           countIsland(grid, visited, i, j + 1) +
           countIsland(grid, visited, i, j - 1);
  }
};
```

## Link
- [Max Area of Island](https://leetcode.com/problems/max-area-of-island/description/)
