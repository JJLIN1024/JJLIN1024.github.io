---
title: Pascal's Triangle II
date: 2023-04-30
lastmod: 2023-04-30
author:
  - Jimmy Lin
tags:
  - array
  - DP
  - review
draft: false
sr-due: 2024-04-23
sr-interval: 81
sr-ease: 312
---

## Description

Given an integer `rowIndex`, return the `rowIndexth` (**0-indexed**) row of the **Pascal's triangle**.

In **Pascal's triangle**, each number is the sum of the two numbers directly above it as shown:

![](https://upload.wikimedia.org/wikipedia/commons/0/0d/PascalTriangleAnimated2.gif)

**Example 1:**

**Input:** rowIndex = 3
**Output:** \[1,3,3,1\]

**Example 2:**

**Input:** rowIndex = 0
**Output:** \[1\]

**Example 3:**

**Input:** rowIndex = 1
**Output:** \[1,1\]

**Constraints:**

*   `0 <= rowIndex <= 33`

**Follow up:** Could you optimize your algorithm to use only `O(rowIndex)` extra space?

## Code 

use code from [[Pascal's Triangle]]:

$O(n)$ time, $O(n)$ space
```cpp
class Solution {
public:
    vector<int> getRow(int rowIndex) {
        vector<int> cur;
        vector<int> prev;

        for(int i = 0; i <= rowIndex; i++) {

            cur.resize(i + 1);
            cur[0] = cur[i] = 1;

            for(int j = 1; j < i; j++) {
                cur[j] = prev[j-1] + prev[j];
            }

            prev = cur;
        }

        return cur;
    }
};
```

We can do better. $O(n)$ Space only using 1 vector.

```cpp
class Solution {
public:
    vector<int> getRow(int rowIndex) {

        vector<int> answer(rowIndex+1, 0);
        answer[0] = 1;

        for(int i = 1; i <= rowIndex; i++) {
            for(int j = i; j >= 1; j--) {
                answer[j] += answer[j-1];
            }
            
        }

        return answer;
    }
};
```

## Source
- [Pascal's Triangle II - LeetCode](https://leetcode.com/problems/pascals-triangle-ii/description/)