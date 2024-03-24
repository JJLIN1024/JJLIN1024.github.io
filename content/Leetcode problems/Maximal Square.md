---
title: Maximal Square
date: 2023-04-21
lastmod: 2023-04-21
author:
  - Jimmy Lin
tags:
  - DP
  - review
draft: false
sr-due: 2024-07-17
sr-interval: 116
sr-ease: 290
---

## Description

Given an `m x n` binary `matrix` filled with `0`'s and `1`'s, _find the largest square containing only_ `1`'s _and return its area_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/11/26/max1grid.jpg)

**Input:** matrix = \[\["1","0","1","0","0"\],\["1","0","1","1","1"\],\["1","1","1","1","1"\],\["1","0","0","1","0"\]\]
**Output:** 4

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/11/26/max2grid.jpg)

**Input:** matrix = \[\["0","1"\],\["1","0"\]\]
**Output:** 1

**Example 3:**

**Input:** matrix = \[\["0"\]\]
**Output:** 0

**Constraints:**

*   `m == matrix.length`
*   `n == matrix[i].length`
*   `1 <= m, n <= 300`
*   `matrix[i][j]` is `'0'` or `'1'`.

## Code 

- [image source](https://leetcode.com/problems/maximal-square/solutions/600149/python-thinking-process-diagrams-dp-approach/)
![](https://i.imgur.com/1aW5ZSA.png)

![](https://i.imgur.com/RDHdiZi.png)

```cpp
class Solution {
public:
    int maximalSquare(vector<vector<char>>& matrix) {
        int n = matrix.size();
        int m = matrix[0].size();
        vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));

        int res = 0;
        for(int i = 0; i < n; i++) {
            for(int j = 0; j < m; j++) {
                if(matrix[i][j] == '1') {
                    dp[i+1][j+1] = min({dp[i][j], dp[i][j+1], dp[i+1][j]}) + 1;
                    res = max(res, dp[i+1][j+1]);
                }
                
            }
        }

        return res * res;

    }
};
```

## Source
- [Maximal Square - LeetCode](https://leetcode.com/problems/maximal-square/)