---
title: Spiral Matrix
date: 2023-04-15
lastmod: 2023-04-15
author: Jimmy Lin
tags: ["array"]
draft: false
---

## Description

Given an `m x n` `matrix`, return _all elements of the_ `matrix` _in spiral order_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/11/13/spiral1.jpg)

**Input:** matrix = \[\[1,2,3\],\[4,5,6\],\[7,8,9\]\]
**Output:** \[1,2,3,6,9,8,7,4,5\]

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/11/13/spiral.jpg)

**Input:** matrix = \[\[1,2,3,4\],\[5,6,7,8\],\[9,10,11,12\]\]
**Output:** \[1,2,3,4,8,12,11,10,9,5,6,7\]

**Constraints:**

*   `m == matrix.length`
*   `n == matrix[i].length`
*   `1 <= m, n <= 10`
*   `-100 <= matrix[i][j] <= 100`

## Code 

Time Complexity: $O(N + M)$, Space Complexity: $O(1)$

關鍵就是觀察規律：

1. `vector<vector<int>> dir = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};`
2. `while(directionalSteps[dir_idx % 2])`

```cpp
class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        vector<vector<int>> dir = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};

        vector<int> answer;
        int m = matrix.size(), n = matrix[0].size();
        if (m == 0 || n == 0) return answer;


        vector<int> directionalSteps = {n, m - 1};
        int dir_idx = 0;
        int i = 0, j = -1;
        while(directionalSteps[dir_idx % 2]){

            for(int k = 0; k < directionalSteps[dir_idx % 2]; k++) {
                i += dir[dir_idx][0];
                j += dir[dir_idx][1];
                answer.push_back(matrix[i][j]);
            }

            directionalSteps[dir_idx % 2]--;
            dir_idx = (dir_idx + 1) % 4;
        }

        return answer;

    }
};
```

## Source
- [Spiral Matrix - LeetCode](https://leetcode.com/problems/spiral-matrix/description/)