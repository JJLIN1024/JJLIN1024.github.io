---
title: Pascal's Triangle
date: 2023-04-30
lastmod: 2023-04-30
author:
  - Jimmy Lin
tags:
  - array
  - review
draft: false
sr-due: 2024-11-11
sr-interval: 257
sr-ease: 330
---

## Description

Given an integer `numRows`, return the first numRows of **Pascal's triangle**.

In **Pascal's triangle**, each number is the sum of the two numbers directly above it as shown:

![](https://upload.wikimedia.org/wikipedia/commons/0/0d/PascalTriangleAnimated2.gif)

**Example 1:**

**Input:** numRows = 5
**Output:** \[\[1\],\[1,1\],\[1,2,1\],\[1,3,3,1\],\[1,4,6,4,1\]\]

**Example 2:**

**Input:** numRows = 1
**Output:** \[\[1\]\]

**Constraints:**

*   `1 <= numRows <= 30`

## Code 

```cpp
class Solution {
public:
    vector<vector<int>> generate(int numRows) {
        vector<vector<int>> answer(numRows);

        for(int i = 0; i < numRows; i++) {
            answer[i].resize(i + 1);
            answer[i][0] = answer[i][i] = 1;

            for(int j = 1; j < i; j++) {
                answer[i][j] = answer[i-1][j-1] + answer[i-1][j];
            }
        }

        return answer;
    }
};
```

## Source
- [Pascal's Triangle - LeetCode](https://leetcode.com/problems/pascals-triangle/description/)