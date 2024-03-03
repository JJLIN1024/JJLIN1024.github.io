---
title: Summary Ranges
date: 2024-02-26
lastmod: 2024-02-26
author:
  - Jimmy Lin
tags:
  - array
draft: false
---

## Description

You are given a **sorted unique** integer array `nums`.

A **range** `[a,b]` is the set of all integers from `a` to `b` (inclusive).

Return _the **smallest sorted** list of ranges that **cover all the numbers in the array exactly**_. That is, each element of `nums` is covered by exactly one of the ranges, and there is no integer `x` such that `x` is in one of the ranges but not in `nums`.

Each range `[a,b]` in the list should be output as:

*   `"a->b"` if `a != b`
*   `"a"` if `a == b`

**Example 1:**

**Input:** nums = \[0,1,2,4,5,7\]
**Output:** \["0->2","4->5","7"\]
**Explanation:** The ranges are:
\[0,2\] --> "0->2"
\[4,5\] --> "4->5"
\[7,7\] --> "7"

**Example 2:**

**Input:** nums = \[0,2,3,4,6,8,9\]
**Output:** \["0","2->4","6","8->9"\]
**Explanation:** The ranges are:
\[0,0\] --> "0"
\[2,4\] --> "2->4"
\[6,6\] --> "6"
\[8,9\] --> "8->9"

**Constraints:**

*   `0 <= nums.length <= 20`
*   `-231 <= nums[i] <= 231 - 1`
*   All the values of `nums` are **unique**.
*   `nums` is sorted in ascending order.

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    vector<string> summaryRanges(vector<int>& nums) {
        vector<string> res;
        for(int i = 0; i < nums.size(); i++) {
            int end = i;
            while((end + 1 < nums.size()) && (nums[end] == nums[end + 1] - 1)) end++;
            if(i == end) res.push_back(to_string(nums[i]));
            else {
                res.push_back(to_string(nums[i]) + "->" + to_string(nums[end]));
            }
            i = end;
        }
        return res;
    }
};
```

## Source
- [Summary Ranges - LeetCode](https://leetcode.com/problems/summary-ranges/description/?envType=study-plan-v2&envId=top-interview-150)