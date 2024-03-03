---
title: Swim in Rising Water
date: 2023-07-22
lastmod: 2023-07-22
author:
  - Jimmy Lin
tags:
  - binary_search
  - review
  - heap
draft: false
---

## Description

You are given an `n x n` integer matrix `grid` where each value `grid[i][j]` represents the elevation at that point `(i, j)`.

The rain starts to fall. At time `t`, the depth of the water everywhere is `t`. You can swim from a square to another 4-directionally adjacent square if and only if the elevation of both squares individually are at most `t`. You can swim infinite distances in zero time. Of course, you must stay within the boundaries of the grid during your swim.

Return _the least time until you can reach the bottom right square_ `(n - 1, n - 1)` _if you start at the top left square_ `(0, 0)`.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/06/29/swim1-grid.jpg)

**Input:** grid = \[\[0,2\],\[1,3\]\]
**Output:** 3
Explanation:
At time 0, you are in grid location (0, 0).
You cannot go anywhere else because 4-directionally adjacent neighbors have a higher elevation than t = 0.
You cannot reach point (1, 1) until time 3.
When the depth of water is 3, we can swim anywhere inside the grid.

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/06/29/swim2-grid-1.jpg)

**Input:** grid = \[\[0,1,2,3,4\],\[24,23,22,21,5\],\[12,13,14,15,16\],\[11,17,18,19,20\],\[10,9,8,7,6\]\]
**Output:** 16
**Explanation:** The final route is shown.
We need to wait until time 16 so that (0, 0) and (4, 4) are connected.

**Constraints:**

*   `n == grid.length`
*   `n == grid[i].length`
*   `1 <= n <= 50`
*   `0 <= grid[i][j] < n2`
*   Each value `grid[i][j]` is **unique**.

## Code 

### Binary Search
Time Complexity: $O(n^2 \log n)$, Space Complexity: $O(n^2)$

類似 [[Path With Minimum Effort]]。

```cpp
class Solution {
public:
    int swimInWater(vector<vector<int>>& grid) {
        int n = grid.size();
        int l = 0, r = n * n;
        while(l <= r) {
            int m = l + (r - l) / 2;
            vector<vector<bool>> visited(n, vector<bool>(n, false));
            if(canSwim(m, 0, 0, grid, visited))
                r = m - 1;
            else 
                l = m + 1;
        }

        return l;
    }


    bool canSwim(int water, int i, int j, vector<vector<int>>& grid, vector<vector<bool>>& visited) {
        int n = grid.size();
        if(!(i >= 0 && j >= 0 && i < n && j < n) || visited[i][j] || grid[i][j] > water) return false;
        if(i == n - 1 && j == n - 1) return true;
        visited[i][j] = true;
        
        return canSwim(water, i + 1, j, grid, visited) || canSwim(water, i, j + 1, grid, visited) || canSwim(water, i - 1, j, grid, visited) || canSwim(water, i, j - 1, grid, visited);

    }
};
```


### Heap
Time Complexity: $O(n^2 \log n)$, Space Complexity: $O(n^2)$

heap 幫我們 keep track of the minimum so far until we meet the destination.

```cpp
class Solution {
public:
    int swimInWater(vector<vector<int>>& grid) {
    using T = tuple<int, int, int>;
    int n = grid.size();

    // min heap
    auto cmp = [](const auto& t1, const auto& t2) { 
        return get<0>(t1) > get<0>(t2); 
    };
    priority_queue<T, vector<T>, decltype(cmp)> pq(cmp);

    vector<vector<bool>> visited(n, vector<bool>(n, false));
    pq.push(make_tuple(grid[0][0], 0, 0));
    visited[0][0] = true;
    int res = 0;
    vector<pair<int, int>> directions = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
    while (!pq.empty())
    {
        auto t = pq.top();
        pq.pop();
        res = max(res, get<0>(t));
        int x = get<1>(t), y = get<2>(t);
        if (x == n-1 && y == n-1)
        {
            return res;
        }
        for (const auto& p : directions)
        {
            int x_neigh = x+p.first, y_neigh = y+p.second;
            if (0 <= x_neigh && x_neigh < n && 0 <= y_neigh && y_neigh < n && !visited[x_neigh][y_neigh])
            {
                visited[x_neigh][y_neigh] = true;
                pq.push(make_tuple(grid[x_neigh][y_neigh], x_neigh, y_neigh));
            }
        }
    }
    return 0;
}

};
```

## Source
- [Swim in Rising Water - LeetCode](https://leetcode.com/problems/swim-in-rising-water/description/)