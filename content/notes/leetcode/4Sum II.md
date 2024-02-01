---
title: 4Sum II
date: 2023-12-29
lastmod: 2023-12-29
author:
  - Jimmy Lin
tags:
  - hashmap
  - review
draft: false
sr-due: 2024-01-31
sr-interval: 17
sr-ease: 290
---

## Description

Given four integer arrays `nums1`, `nums2`, `nums3`, and `nums4` all of length `n`, return the number of tuples `(i, j, k, l)` such that:

*   `0 <= i, j, k, l < n`
*   `nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0`

**Example 1:**

**Input:** nums1 = \[1,2\], nums2 = \[-2,-1\], nums3 = \[-1,2\], nums4 = \[0,2\]
**Output:** 2
**Explanation:**
The two tuples are:
1. (0, 0, 0, 1) -> nums1\[0\] + nums2\[0\] + nums3\[0\] + nums4\[1\] = 1 + (-2) + (-1) + 2 = 0
2. (1, 1, 0, 0) -> nums1\[1\] + nums2\[1\] + nums3\[0\] + nums4\[0\] = 2 + (-1) + (-1) + 0 = 0

**Example 2:**

**Input:** nums1 = \[0\], nums2 = \[0\], nums3 = \[0\], nums4 = \[0\]
**Output:** 1

**Constraints:**

*   `n == nums1.length`
*   `n == nums2.length`
*   `n == nums3.length`
*   `n == nums4.length`
*   `1 <= n <= 200`
*   `-228 <= nums1[i], nums2[i], nums3[i], nums4[i] <= 228`

## Code 

Time Complexity: $O(N^2)$, Space Complexity: $O(N^2)$

Brute force 會是 $O(N^4)$，但是可以用 [[Two Sum]] 的概念配合 hash table 降低至 $O(N^2)$。

```cpp
class Solution {
public:
    int fourSumCount(vector<int>& nums1, vector<int>& nums2, vector<int>& nums3, vector<int>& nums4) {
        unordered_map<int, int> mp;
        for(auto i: nums1) {
            for(auto j: nums2) {
                mp[i + j]++;
            }
        }

        int res = 0;
        for(auto i: nums3) {
            for(auto j: nums4) {
                res += mp[-(i + j)];
            }
        }

        return res;
    }
};
```

## Source
- [4Sum II - LeetCode](https://leetcode.com/problems/4sum-ii/description/)