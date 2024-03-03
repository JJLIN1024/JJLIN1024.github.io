---
title: Search a 2D Matrix II
date: 2022-12-28
lastmod: 2022-12-28
author: Jimmy Lin
tags:
  - binary_search
  - review
draft: false
sr-due: 2024-12-03
sr-interval: 275
sr-ease: 330
---

## Description

Write an efficient algorithm that searches for a value `target` in an `m x n` integer matrix `matrix`. This matrix has the following properties:

*   Integers in each row are sorted in ascending from left to right.
*   Integers in each column are sorted in ascending from top to bottom.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/11/24/searchgrid2.jpg)

**Input:** matrix = \[\[1,4,7,11,15\],\[2,5,8,12,19\],\[3,6,9,16,22\],\[10,13,14,17,24\],\[18,21,23,26,30\]\], target = 5
**Output:** true

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/11/24/searchgrid.jpg)

**Input:** matrix = \[\[1,4,7,11,15\],\[2,5,8,12,19\],\[3,6,9,16,22\],\[10,13,14,17,24\],\[18,21,23,26,30\]\], target = 20
**Output:** false

**Constraints:**

*   `m == matrix.length`
*   `n == matrix[i].length`
*   `1 <= n, m <= 300`
*   `-109 <= matrix[i][j] <= 109`
*   All the integers in each row are **sorted** in ascending order.
*   All the integers in each column are **sorted** in ascending order.
*   `-109 <= target <= 109`


## Code

### Binary Search

Time Complexity: $O(n \log {m})$, Space Complexity: $O(1)$

概念： [[Search a 2D Matrix|Search a 2D Matrix]] 、[[Binary Search 101|Binary Search 101]] 

```cpp
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int n = matrix.size();
        for(int i = 0; i < n; i++) {
            int l = 0, r = matrix[i].size() - 1;

            while(l < r) {
                int mid = l + (r - l) / 2;
                if(matrix[i][mid] >= target) r = mid;
                else l = mid + 1;
            }

            if(matrix[i][l] == target) return true;
        }
        return false;
    }
};
```

### Search from the top right

Time Complexity: $O(m + n)$, Space Complexity: $O(1)$

KEY：column 和 row 都是 sorted。

```cpp
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int n = matrix.size();
        int m = matrix[0].size();
        int i = 0, j = m - 1;
        while(i >= 0 && i < n && j < m && j >= 0) {
            if(matrix[i][j] < target) i++;
            else if (matrix[i][j] > target) j--;
            else return true;
        }
        return false;
    }
};
```

## Link
- [Search a 2D Matrix II](https://leetcode.com/problems/search-a-2d-matrix-ii/description/)
