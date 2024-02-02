---
title: Set Matrix Zeroes
date: 2023-04-23
lastmod: 2024-02-02
author:
  - Jimmy Lin
tags:
  - array
  - review
draft: false
sr-due: 2024-04-23
sr-interval: 81
sr-ease: 310
---

## Description

Given an `m x n` integer matrix `matrix`, if an element is `0`, set its entire row and column to `0`'s.

You must do it [in place](https://en.wikipedia.org/wiki/In-place_algorithm).

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/08/17/mat1.jpg)

**Input:** matrix = \[\[1,1,1\],\[1,0,1\],\[1,1,1\]\]
**Output:** \[\[1,0,1\],\[0,0,0\],\[1,0,1\]\]

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/08/17/mat2.jpg)

**Input:** matrix = \[\[0,1,2,0\],\[3,4,5,2\],\[1,3,1,5\]\]
**Output:** \[\[0,0,0,0\],\[0,4,5,0\],\[0,3,1,0\]\]

**Constraints:**

*   `m == matrix.length`
*   `n == matrix[0].length`
*   `1 <= m, n <= 200`
*   `-231 <= matrix[i][j] <= 231 - 1`

**Follow up:**

*   A straightforward solution using `O(mn)` space is probably a bad idea.
*   A simple improvement uses `O(m + n)` space, but still not the best solution.
*   Could you devise a constant space solution?

## Code 

row 0 和 col 0 的資訊會衝突，因此只能選一個，另外一個就用 col0 來記錄。

關鍵在於 row 0 & col 0，所以 for loop 必須要由 `i = 1, j = 1` 開始 iterate。row 0 & col 0 的元素要另外紀錄，不能因為其中一個為零就將其他人設為 0 ，因為這樣會導致 `i = 1, j = 1` 之後的元素被錯誤的設為 0。

```cpp
class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        int zeroCol = 0, zeroRow = 0, n = matrix.size(), m = matrix[0].size();
        
        for(int i = 0; i < n; i++) {
            if(matrix[i][0] == 0) zeroCol = 1;
        }

        for(int j = 0; j < m; j++) {
            if(matrix[0][j] == 0) zeroRow = 1;
        }

        
        for(int i = 1; i < n; i++) {
            for(int j = 1; j < m; j++) {
                if(matrix[i][j] == 0) {
                    matrix[i][0] = 0;
                    matrix[0][j] = 0;
                }
            }
        }

        for(int i = 1; i < n; i++) {
            for(int j = 1; j < m; j++) {
                if(matrix[i][0] == 0 || matrix[0][j] == 0) {
                    matrix[i][j] = 0;
                }
            }
        }
        
        for(int i = 0; i < n; i++) {
            if(zeroCol) matrix[i][0] = 0;
        }

        for(int j = 0; j < m; j++) {
            if(zeroRow) matrix[0][j] = 0;
        }
    }
};
```

其實可以再進一步縮減需要紀錄的資訊，只需要紀錄 `col0` 即可，但就要注意先後順序。要從右下角填回左上角，因為記錄是否為 0 的資訊都儲存在左邊和上面。

```cpp
class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {

        int col0 = 1;
        for(int i = 0; i < matrix.size(); i++) {
            if(matrix[i][0] == 0) col0 = 0;
            for(int j = 1; j < matrix[i].size(); j++) {
                if(matrix[i][j] == 0) {
                    matrix[i][0] = matrix[0][j] = 0;
                }
            }
        }

        
        for(int i = matrix.size() - 1; i >= 0; i--) {
            for(int j = matrix[i].size() - 1; j >= 1; j--) {
                if(matrix[i][0] == 0 || matrix[0][j] == 0) 
                    matrix[i][j] = 0;
            }
        }

        for(int i = 0; i < matrix.size(); i++) {
            if(col0 == 0) matrix[i][0] = 0;
        }
    }
};
```
## Source
- [Set Matrix Zeroes - LeetCode](https://leetcode.com/problems/set-matrix-zeroes/)