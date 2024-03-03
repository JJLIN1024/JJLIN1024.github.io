---
title: Height Checker
date: 2023-12-11
lastmod: 2023-12-11
author:
  - Jimmy Lin
tags:
  - counting_sort
  - sort
draft: false
---

## Description

A school is trying to take an annual photo of all the students. The students are asked to stand in a single file line in **non-decreasing order** by height. Let this ordering be represented by the integer array `expected` where `expected[i]` is the expected height of the `ith` student in line.

You are given an integer array `heights` representing the **current order** that the students are standing in. Each `heights[i]` is the height of the `ith` student in line (**0-indexed**).

Return _the **number of indices** where_ `heights[i] != expected[i]`.

**Example 1:**

**Input:** heights = \[1,1,4,2,1,3\]
**Output:** 3
**Explanation:** 
heights:  \[1,1,4,2,1,3\]
expected: \[1,1,1,2,3,4\]
Indices 2, 4, and 5 do not match.

**Example 2:**

**Input:** heights = \[5,1,2,3,4\]
**Output:** 5
**Explanation:**
heights:  \[5,1,2,3,4\]
expected: \[1,2,3,4,5\]
All indices do not match.

**Example 3:**

**Input:** heights = \[1,2,3,4,5\]
**Output:** 0
**Explanation:**
heights:  \[1,2,3,4,5\]
expected: \[1,2,3,4,5\]
All indices match.

**Constraints:**

*   `1 <= heights.length <= 100`
*   `1 <= heights[i] <= 100`

## Code 

Time Complexity: $O(N)$, Space Complexity: $O(N)$

```cpp
class Solution {
public:
    int heightChecker(vector<int>& heights) {
        vector<int> fre(101, 0);
        for(auto h: heights) {
            fre[h]++;
        }

        int index = 0;
        int res = 0;
        for(int i = 0; i < 101; i++) {
            while(fre[i] > 0) {
                if(i != heights[index++]) res++;
                fre[i]--;
            }
        }
        
        return res;
    }
};
```

## Source
- [Height Checker - LeetCode](https://leetcode.com/problems/height-checker/description/)