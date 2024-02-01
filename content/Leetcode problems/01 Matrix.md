---
title: 01 Matrix
date: 2023-03-20
lastmod: 2023-03-20
author: Jimmy Lin
tags: ["dp"]
draft: false
---

## Description

Given an `m x n` binary matrix `mat`, return _the distance of the nearest_ `0` _for each cell_.

The distance between two adjacent cells is `1`.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/04/24/01-1-grid.jpg)

**Input:** mat = \[\[0,0,0\],\[0,1,0\],\[0,0,0\]\]
**Output:** \[\[0,0,0\],\[0,1,0\],\[0,0,0\]\]

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/04/24/01-2-grid.jpg)

**Input:** mat = \[\[0,0,0\],\[0,1,0\],\[1,1,1\]\]
**Output:** \[\[0,0,0\],\[0,1,0\],\[1,2,1\]\]

**Constraints:**

*   `m == mat.length`
*   `n == mat[i].length`
*   `1 <= m, n <= 104`
*   `1 <= m * n <= 104`
*   `mat[i][j]` is either `0` or `1`.
*   There is at least one `0` in `mat`.

## Code 

### DP

要做兩遍，因為不確定從左上還是右下過來會比較近。

```cpp
class Solution {
public:
    vector<vector<int>> updateMatrix(vector<vector<int>>& mat) {
        int n = mat.size();
        int m = mat[0].size();
        int INF = n + m;
        vector<vector<int>> answer(n, vector<int>(m, 0));
        // from the top left corner
        for(int i = 0; i < n; i++) {
            for(int j = 0; j < m; j++) {
                if(mat[i][j] == 0) continue;
                else {
                    int top = INF, left = INF;
                    if(i - 1 >= 0) top = answer[i - 1][j];
                    if(j - 1 >= 0) left = answer[i][j - 1];
                    answer[i][j] = min(top, left) + 1;
                }
            }
        }
        // from the buttom right corner
        for(int i = n - 1; i >= 0; i--) {
            for(int j =  m - 1 ; j >= 0; j--) {
                if(mat[i][j] == 0) continue;
                else {
                    int bottom = INF, right = INF;
                    if(i + 1 < n) bottom = answer[i + 1][j];
                    if(j + 1 < m) right = answer[i][j + 1];
                    answer[i][j] = min(answer[i][j], min(bottom, right) + 1);
                }
            }
        }

        return answer;
    }
};
```

### BFS

## Source
- [01 Matrix - LeetCode](https://leetcode.com/problems/01-matrix/description/)