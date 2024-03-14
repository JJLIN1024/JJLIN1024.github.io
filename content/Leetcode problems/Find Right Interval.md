---
title: Find Right Interval
date: 2024-03-14
lastmod: 2024-03-14
author:
  - Jimmy Lin
tags:
  - binary_search
  - review
draft: false
sr-due: 2024-03-18
sr-interval: 4
sr-ease: 270
---

## Description

You are given an array of `intervals`, where `intervals[i] = [starti, endi]` and each `starti` is **unique**.

The **right interval** for an interval `i` is an interval `j` such that `startj >= endi` and `startj` is **minimized**. Note that `i` may equal `j`.

Return _an array of **right interval** indices for each interval `i`_. If no **right interval** exists for interval `i`, then put `-1` at index `i`.

**Example 1:**

**Input:** intervals = \[\[1,2\]\]
**Output:** \[-1\]
**Explanation:** There is only one interval in the collection, so it outputs -1.

**Example 2:**

**Input:** intervals = \[\[3,4\],\[2,3\],\[1,2\]\]
**Output:** \[-1,0,1\]
**Explanation:** There is no right interval for \[3,4\].
The right interval for \[2,3\] is \[3,4\] since start0 = 3 is the smallest start that is >= end1 = 3.
The right interval for \[1,2\] is \[2,3\] since start1 = 2 is the smallest start that is >= end2 = 2.

**Example 3:**

**Input:** intervals = \[\[1,4\],\[2,3\],\[3,4\]\]
**Output:** \[-1,2,-1\]
**Explanation:** There is no right interval for \[1,4\] and \[3,4\].
The right interval for \[2,3\] is \[3,4\] since start2 = 3 is the smallest start that is >= end1 = 3.

**Constraints:**

*   `1 <= intervals.length <= 2 * 104`
*   `intervals[i].length == 2`
*   `-106 <= starti <= endi <= 106`
*   The start point of each interval is **unique**.

## Code 

### Using Vector
Time Complexity: $O(n \log n)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    vector<int> findRightInterval(vector<vector<int>>& intervals) {

        // map of the start_i to index i, since 
        // start_i is unique
        unordered_map<int, int> mp;
        for(int i = 0; i < intervals.size(); i++) {
            mp[intervals[i][0]] = i;
        }

        sort(intervals.begin(), intervals.end());

        int n = intervals.size();
        vector<int> res(n, 0);
        for(int i = 0; i < n; i++) {
            int l = i, r = n - 1;
            
            int start_i = intervals[i][0];
            int end_i = intervals[i][1];
            // find end_i <= start_j
            while(l < r) {
                int m = l + (r - l) / 2;
                int start_j = intervals[m][0];
                if(start_j < end_i) {
                    l = m + 1;
                } else {
                    // start_j >= end_j
                    r = m;
                }
            } 

            res[mp[start_i]] = intervals[l][0] >= end_i ? mp[intervals[l][0]] : -1;
        }
        return res;
    }
};
```


### Using Map
Time Complexity: $O(n \log n)$, Space Complexity: $O(n)$

用 Map 就等於使用 Vector 加上 unordered_map 去紀錄 index。共通點是都有使用到 lower_bound。

```cpp
class Solution {
public:
    vector<int> findRightInterval(vector<vector<int>>& intervals) {
        int n = intervals.size();
        vector<int> res(n);

        map<int, int> mp; // <start_i, index>
        for(int i = 0; i < intervals.size(); i++) {
            mp[intervals[i][0]] = i;
        }

        for(int i = 0; i < intervals.size(); i++) {
		    // find start_i >= end_j(intervals[i][1])
            auto iter = mp.lower_bound(intervals[i][1]);
            res[i] = iter == mp.end() ? -1 : iter->second;
        }

        return res;
    }
};
```
## Source
- [Find Right Interval - LeetCode](https://leetcode.com/problems/find-right-interval/description/?envType=study-plan-v2&envId=binary-search)