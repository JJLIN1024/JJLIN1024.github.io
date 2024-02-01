---
title: Triangle
date: 2023-10-10
lastmod: 2023-10-10
author:
  - Jimmy Lin
tags:
  - DP
  - dfs
  - memoization
draft: false
---

## Description

Given a `triangle` array, return _the minimum path sum from top to bottom_.

For each step, you may move to an adjacent number of the row below. More formally, if you are on index `i` on the current row, you may move to either index `i` or index `i + 1` on the next row.

**Example 1:**

**Input:** triangle = \[\[2\],\[3,4\],\[6,5,7\],\[4,1,8,3\]\]
**Output:** 11
**Explanation:** The triangle looks like:
   2
  3 4
 6 5 7
4 1 8 3
The minimum path sum from top to bottom is 2 + 3 + 5 + 1 = 11 (underlined above).

**Example 2:**

**Input:** triangle = \[\[-10\]\]
**Output:** -10

**Constraints:**

*   `1 <= triangle.length <= 200`
*   `triangle[0].length == 1`
*   `triangle[i].length == triangle[i - 1].length + 1`
*   `-104 <= triangle[i][j] <= 104`

**Follow up:** Could you do this using only `O(n)` extra space, where `n` is the total number of rows in the triangle?

## Code 

### DP with memoization
Time Complexity: $O(n^2)$, Space Complexity: $O(n^2)$

```cpp
class Solution {
    int memo[201][201];
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        memset(memo, -1, sizeof(memo));
        return dfs(0, 0, triangle);
    }

    int dfs(int i, int j, vector<vector<int>>& triangle) {

        if(i >= triangle.size()) {
            return 0; 
        }
        if(j >= triangle[i].size()) {
            return 1001;
        }

        if(memo[i][j] != -1) return memo[i][j];

        int new_i = i + 1;
        int new_j_l = j, new_j_r = j + 1;
        int pathSum = triangle[i][j];
        pathSum = min(pathSum + dfs(new_i, new_j_r, triangle), pathSum + dfs(new_i, new_j_l, triangle));
        return memo[i][j] = pathSum;

    }
};
```


### Bottom Up DP
Time Complexity: $O(n)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        int n = triangle.size();
        for(int i = n - 2; i >= 0; i--) {
            for(int j = 0; j < triangle[i].size(); j++) {
                triangle[i][j] = triangle[i][j] + min(triangle[i + 1][j], triangle[i + 1][j + 1]);
            }
        }
        return triangle[0][0];
    }

};
```

## Source
- [Triangle - LeetCode](https://leetcode.com/problems/triangle/)