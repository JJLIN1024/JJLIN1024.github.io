---
title: Divide Intervals Into Minimum Number of Groups
date: 2023-07-18
lastmod: 2023-07-18
author:
  - Jimmy Lin
tags:
  - difference_array
  - review
draft: false
sr-due: 2024-03-19
sr-interval: 15
sr-ease: 290
---

## Description

You are given a 2D integer array `intervals` where `intervals[i] = [lefti, righti]` represents the **inclusive** interval `[lefti, righti]`.

You have to divide the intervals into one or more **groups** such that each interval is in **exactly** one group, and no two intervals that are in the same group **intersect** each other.

Return _the **minimum** number of groups you need to make_.

Two intervals **intersect** if there is at least one common number between them. For example, the intervals `[1, 5]` and `[5, 8]` intersect.

**Example 1:**

**Input:** intervals = \[\[5,10\],\[6,8\],\[1,5\],\[2,3\],\[1,10\]\]
**Output:** 3
**Explanation:** We can divide the intervals into the following groups:
- Group 1: \[1, 5\], \[6, 8\].
- Group 2: \[2, 3\], \[5, 10\].
- Group 3: \[1, 10\].
It can be proven that it is not possible to divide the intervals into fewer than 3 groups.

**Example 2:**

**Input:** intervals = \[\[1,3\],\[5,6\],\[8,10\],\[11,13\]\]
**Output:** 1
**Explanation:** None of the intervals overlap, so we can put all of them in one group.

**Constraints:**

*   `1 <= intervals.length <= 105`
*   `intervals[i].length == 2`
*   `1 <= lefti <= righti <= 106`

## Code 

解法同：[[My Calendar III|My Calendar III]]，只需要反過來想，有多少重疊，就代表要分成多少個 group。

Time Complexity: $O(n \log n)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    int minGroups(vector<vector<int>>& intervals) {
        map<int, int> mp;
        for(auto interval: intervals) {
            mp[interval[0]]++;
            mp[interval[1] + 1]--;
        }

        int minGroup = 1, curGroup = 0;
        for(auto it: mp) {
            curGroup += it.second;
            minGroup = max(minGroup, curGroup);
        }

        return minGroup;
    }
};
```

## Source
- [Divide Intervals Into Minimum Number of Groups - LeetCode](https://leetcode.com/problems/divide-intervals-into-minimum-number-of-groups/description/)