---
title: Find Subarrays With Equal Sum
date: 2023-01-06
lastmod: 2023-01-06
author: Jimmy Lin
tags: ["hashmap"]
draft: false
---

## Description

Given a **0-indexed** integer array `nums`, determine whether there exist **two** subarrays of length `2` with **equal** sum. Note that the two subarrays must begin at **different** indices.

Return `true` _if these subarrays exist, and_ `false` _otherwise._

A **subarray** is a contiguous non-empty sequence of elements within an array.

**Example 1:**

**Input:** nums = \[4,2,4\]
**Output:** true
**Explanation:** The subarrays with elements \[4,2\] and \[2,4\] have the same sum of 6.

**Example 2:**

**Input:** nums = \[1,2,3,4,5\]
**Output:** false
**Explanation:** No two subarrays of size 2 have the same sum.

**Example 3:**

**Input:** nums = \[0,0,0\]
**Output:** true
**Explanation:** The subarrays \[nums\[0\],nums\[1\]\] and \[nums\[1\],nums\[2\]\] have the same sum of 0. 
Note that even though the subarrays have the same content, the two subarrays are considered different because they are in different positions in the original array.

**Constraints:**

*   `2 <= nums.length <= 1000`
*   `-109 <= nums[i] <= 109`

## Code 

```cpp
class Solution {
public:
    bool findSubarrays(vector<int>& nums) {
        unordered_map<int, pair<int,int>> m;
        for(int i = 0; i < nums.size() - 1; i++) {
            int total = nums[i] + nums[i+1];
            if(m.find(total) != m.end()) {
                return true;
            }
            m[total] = {i, i+1};
        }

        return false;
    }
};
```

後來想了想，其實只需要記錄 sum 就行了，因為 for loop iterate 的一定是 index 不同的組合，所以不需要 `unordered_map`，直接用 `set`。

```cpp
class Solution {
public:
    bool findSubarrays(vector<int>& nums) {
        set<int> m;
        for(int i = 0; i < nums.size() - 1; i++) {
            int total = nums[i] + nums[i+1];
            if(m.count(total) > 0) {
                return true;
            }
            m.insert(total);
        }

        return false;
    }
};
```

## Source
- [Find Subarrays With Equal Sum - LeetCode](https://leetcode.com/problems/find-subarrays-with-equal-sum/description/)