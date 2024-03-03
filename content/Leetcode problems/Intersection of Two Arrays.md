---
title: Intersection of Two Arrays
date: 2023-12-29
lastmod: 2023-12-29
author:
  - Jimmy Lin
tags:
  - hashmap
draft: false
---

## Description

Given two integer arrays `nums1` and `nums2`, return _an array of their intersection_. Each element in the result must be **unique** and you may return the result in **any order**.

**Example 1:**

**Input:** nums1 = \[1,2,2,1\], nums2 = \[2,2\]
**Output:** \[2\]

**Example 2:**

**Input:** nums1 = \[4,9,5\], nums2 = \[9,4,9,8,4\]
**Output:** \[9,4\]
**Explanation:** \[4,9\] is also accepted.

**Constraints:**

*   `1 <= nums1.length, nums2.length <= 1000`
*   `0 <= nums1[i], nums2[i] <= 1000`

## Code 

Time Complexity: $O(N)$, Space Complexity: $O(N)$

```cpp
class Solution {
public:
    vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {
        unordered_set<int> m(nums1.begin(), nums1.end());
        vector<int> res;
        for(auto n: nums2) {
            if(m.count(n)) {
                res.push_back(n);
                m.erase(n);
            }
        }

        return res;
    }
};
```

## Source
- [Intersection of Two Arrays - LeetCode](https://leetcode.com/problems/intersection-of-two-arrays/description/)