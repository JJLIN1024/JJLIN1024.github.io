---
title: Count Submatrices with Top-Left Element and Sum Less Than k
date: 2024-03-04
lastmod: 2024-03-04
author:
  - Jimmy Lin
tags:
  - prefix_sum
draft: false
---

## Description

You are given a **0-indexed** integer matrix `grid` and an integer `k`.

Return _the **number** of_

_submatrices_

_that contain the top-left element of the_ `grid`, _and have a sum less than or equal to_ `k`.

**Example 1:**

![](https://assets.leetcode.com/uploads/2024/01/01/example1.png)

**Input:** grid = \[\[7,6,3\],\[6,6,1\]\], k = 18
**Output:** 4
**Explanation:** There are only 4 submatrices, shown in the image above, that contain the top-left element of grid, and have a sum less than or equal to 18.

**Example 2:**

![](https://assets.leetcode.com/uploads/2024/01/01/example21.png)

**Input:** grid = \[\[7,2,9\],\[1,5,0\],\[2,6,6\]\], k = 20
**Output:** 6
**Explanation:** There are only 6 submatrices, shown in the image above, that contain the top-left element of grid, and have a sum less than or equal to 20.

**Constraints:**

*   `m == grid.length`
*   `n == grid[i].length`
*   `1 <= n, m <= 1000`
*   `0 <= grid[i][j] <= 1000`
*   `1 <= k <= 109`

## Code 

Time Complexity: $O(n^2)$, Space Complexity: $O(1)$

same as [[Number of Submatrices That Sum to Target]].

```cpp
class Solution {
public:
    int countSubmatrices(vector<vector<int>>& grid, int k) {
        int m = grid.size(), n = grid[0].size();
        for(int i = 0; i < m; i++) {
            for(int j = 1; j < n; j++) {
                grid[i][j] += grid[i][j - 1];
            }
        }   
        
        int res = 0;
        for(int i = 0; i < n; i++) {
            int count = 0;
            for(int j = 0; j < m; j++) {
                count += grid[j][i];
                if(count <= k)
                    res++;
            }
        }
        return res;
    }
};
```

## Source
- [Count Submatrices with Top-Left Element and Sum Less Than k - LeetCode](https://leetcode.com/problems/count-submatrices-with-top-left-element-and-sum-less-than-k/description/)