---
title: Spiral Matrix II
date: 2023-04-15
lastmod: 2023-12-28
author:
  - Jimmy Lin
tags:
  - array
draft: false
---

## Description

Given a positive integer `n`, generate an `n x n` `matrix` filled with elements from `1` to `n2` in spiral order.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/11/13/spiraln.jpg)

**Input:** n = 3
**Output:** \[\[1,2,3\],\[8,9,4\],\[7,6,5\]\]

**Example 2:**

**Input:** n = 1
**Output:** \[\[1\]\]

**Constraints:**

*   `1 <= n <= 20`

## Code 

Time Complexity: $O(N + M)$, Space Complexity: $O(N + M)$

use code from [[Spiral Matrix]], modify it a little bit, use `count` to represents array elements to be added.

注意起始點在 ` i = 0, j = -1`。

```cpp
class Solution {
public:
    vector<vector<int>> generateMatrix(int n) {
       vector<int> steps = {n, n - 1};
       vector<vector<int>> dir = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};

        vector<vector<int>> res(n, vector<int>(n, 0));
       int d = 0, i = 0, j = -1, counter = 0;
       while(steps[d % 2]) {
           for(int k = 0; k < steps[d % 2]; k++) {
               i += dir[d][0];
               j += dir[d][1];
               counter++;
               res[i][j] = counter;
           }
            steps[d % 2]--;
           d = (d + 1) % 4;
       } 

       return res;
    }
};
```

## Source
- [Spiral Matrix II - LeetCode](https://leetcode.com/problems/spiral-matrix-ii/description/)