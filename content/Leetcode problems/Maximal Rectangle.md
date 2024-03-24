---
title: Maximal Rectangle
date: 2024-01-24
lastmod: 2024-01-24
author: Jimmy Lin
tags:
  - stack
  - review
draft: false
sr-due: 2024-10-21
sr-interval: 212
sr-ease: 310
---

## Description

Given a `rows x cols` binary `matrix` filled with `0`'s and `1`'s, find the largest rectangle containing only `1`'s and return _its area_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/09/14/maximal.jpg)

**Input:** matrix = \[\["1","0","1","0","0"\],\["1","0","1","1","1"\],\["1","1","1","1","1"\],\["1","0","0","1","0"\]\]
**Output:** 6
**Explanation:** The maximal rectangle is shown in the above picture.

**Example 2:**

**Input:** matrix = \[\["0"\]\]
**Output:** 0

**Example 3:**

**Input:** matrix = \[\["1"\]\]
**Output:** 1

**Constraints:**

*   `rows == matrix.length`
*   `cols == matrix[i].length`
*   `1 <= row, cols <= 200`
*   `matrix[i][j]` is `'0'` or `'1'`.

## Code 

Time Complexity: $O(n^2)$, Space Complexity: $O(n)$

[[Largest Rectangle in Histogram]] 的 2D 版本。

以 Example 1 為例，一列一列的來看，第一列就是 `[1, 0, 1, 0, 0]` 求解 largest rectangle in histogram.

第二列就是 histogram = `[2, 0, 2, 1, 1]`，以此類推。

```cpp
class Solution {
public:
    int maximalRectangle(vector<vector<char>>& matrix) {
        int n = matrix[0].size();
        int res = 0;
        vector<int> V(n + 1, 0);
        for(int i = 0; i < matrix.size(); i++) {
            for(int j = 0; j < matrix[i].size(); j++) {
                if(matrix[i][j] == '0') {
                    V[j] = 0;
                } else {
                    V[j]++;
                }   
            }
            // maximum rectangle
            stack<int> st;
            for(int k = 0; k < V.size(); k++) {
                while(!st.empty() && V[st.top()] >= V[k]) {
                    int h = V[st.top()]; st.pop();
                    int index = st.empty() ? -1 : st.top();
                    res = max(res, (k - index - 1) * h);
                }
                st.push(k);
            }
        }
        return res;
    }
};
```

## Source
- [Maximal Rectangle - LeetCode](https://leetcode.com/problems/maximal-rectangle/description/)