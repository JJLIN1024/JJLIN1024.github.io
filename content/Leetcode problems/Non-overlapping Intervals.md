---
title: Non-overlapping Intervals
date: 2023-04-26
lastmod: 2023-04-26
author: Jimmy Lin
tags: ["greedy"]
draft: false
---

## Description

Given an array of intervals `intervals` where `intervals[i] = [starti, endi]`, return _the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping_.

**Example 1:**

**Input:** intervals = \[\[1,2\],\[2,3\],\[3,4\],\[1,3\]\]
**Output:** 1
**Explanation:** \[1,3\] can be removed and the rest of the intervals are non-overlapping.

**Example 2:**

**Input:** intervals = \[\[1,2\],\[1,2\],\[1,2\]\]
**Output:** 2
**Explanation:** You need to remove two \[1,2\] to make the rest of the intervals non-overlapping.

**Example 3:**

**Input:** intervals = \[\[1,2\],\[2,3\]\]
**Output:** 0
**Explanation:** You don't need to remove any of the intervals since they're already non-overlapping.

**Constraints:**

*   `1 <= intervals.length <= 105`
*   `intervals[i].length == 2`
*   `-5 * 104 <= starti < endi <= 5 * 104`

## Code 

Greedy Choice Property: earliest deadline first.

這題其實就是 [[Maximum Length of Pair Chain]] 而已，都是用 greedy 去解。

```cpp
class Solution {
    static bool comp(const vector<int>& i1, const vector<int>& i2) {
        return i1[1] < i2[1];
    }
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end(), comp);
        int count = 0;
        for(int j = 0, i = 0; j < intervals.size(); j++) {
            if(j == 0 || intervals[i][1] <= intervals[j][0]) {
                count++;
                i = j;
            }
        } 

        return intervals.size() - count;
    }

};
```

## Source
- [Non-overlapping Intervals - LeetCode](https://leetcode.com/problems/non-overlapping-intervals/description/)