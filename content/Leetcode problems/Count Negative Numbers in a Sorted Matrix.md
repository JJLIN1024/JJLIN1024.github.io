---
title: Count Negative Numbers in a Sorted Matrix
date: 2023-07-01
lastmod: 2023-07-01
author:
  - Jimmy Lin
tags:
  - binary_search
draft: false
---

## Description

Given a `m x n` matrix `grid` which is sorted in non-increasing order both row-wise and column-wise, return _the number of **negative** numbers in_ `grid`.

**Example 1:**

**Input:** grid = \[\[4,3,2,-1\],\[3,2,1,-1\],\[1,1,-1,-2\],\[-1,-1,-2,-3\]\]
**Output:** 8
**Explanation:** There are 8 negatives number in the matrix.

**Example 2:**

**Input:** grid = \[\[3,2\],\[1,0\]\]
**Output:** 0

**Constraints:**

*   `m == grid.length`
*   `n == grid[i].length`
*   `1 <= m, n <= 100`
*   `-100 <= grid[i][j] <= 100`

**Follow up:** Could you find an `O(n + m)` solution?

## Code 

### Binary Search

Time Complexity: $O(m \log n)$, Space Complexity: $O(1)$

基本概念同 [[Binary Search 101|Binary Search 101]]。

```cpp
class Solution {
public:
    int countNegatives(vector<vector<int>>& grid) {
        int res = 0;
        for(auto& row: grid) {
            res += lower_bound(row.rbegin(), row.rend(), 0) - row.rbegin();
        }
        return res;
    }
};
```

```cpp
class Solution {
public:
    int countNegatives(vector<vector<int>>& grid) {
        int res = 0;
        for(int i = 0; i < grid.size(); i++) {
            int l = 0, r = grid[i].size();
            while(l < r) {
                int mid = (l + r) / 2;
                if(grid[i][mid] >= 0)
                    l = mid + 1;
                else 
                    r = mid;
            }
            res += (grid[i].size() - l);
        }
        return res;
    }
};
```


### Two pointer

Time Complexity: $O(m + n)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    int countNegatives(vector<vector<int>>& grid) {
        int n = grid.size();
        int m = grid[0].size();
        int i = 0, j = m - 1;

        int res = 0;
        while(i < n) {
            while(j >= 0 && grid[i][j] < 0) j--;
            res += (m - j - 1);
            i++;
        }
        return res;
    }
};
```

## Source
- [Count Negative Numbers in a Sorted Matrix - LeetCode](https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix/description/)