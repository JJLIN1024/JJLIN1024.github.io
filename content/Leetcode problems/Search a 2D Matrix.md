---
title: Search a 2D Matrix
date: 2022-12-28
lastmod: 2022-12-28
author: Jimmy Lin
tags:
  - binary_search
draft: false
---

## Description

You are given an `m x n` integer matrix `matrix` with the following two properties:

*   Each row is sorted in non-decreasing order.
*   The first integer of each row is greater than the last integer of the previous row.

Given an integer `target`, return `true` _if_ `target` _is in_ `matrix` _or_ `false` _otherwise_.

You must write a solution in `O(log(m * n))` time complexity.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/10/05/mat.jpg)

**Input:** matrix = \[\[1,3,5,7\],\[10,11,16,20\],\[23,30,34,60\]\], target = 3
**Output:** true

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/10/05/mat2.jpg)

**Input:** matrix = \[\[1,3,5,7\],\[10,11,16,20\],\[23,30,34,60\]\], target = 13
**Output:** false

**Constraints:**

*   `m == matrix.length`
*   `n == matrix[i].length`
*   `1 <= m, n <= 100`
*   `-104 <= matrix[i][j], target <= 104`

## Code

Time Complexity: $O(\log {mn})$, Space Complexity: $O(1)$

基本概念：[[Binary Search 101|Binary Search 101]]

這題就是 [[Classic Binary Search]] 的 2D 版本而已。

```cpp
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int m = matrix.size(), n = matrix[0].size();
        int l = 0, r = m * n - 1;
        while(l < r) {
            int mid = l + (r - l) / 2;
            int i = mid / n;
            int j = mid % n;
            if(matrix[i][j] >= target) r = mid;
            else l = mid + 1;
        }
        return matrix[l / n][l % n] == target;
    }
};
```

## Link
- [Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/description/)
