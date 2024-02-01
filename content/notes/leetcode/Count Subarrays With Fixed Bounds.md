---
title: Count Subarrays With Fixed Bounds
date: 2023-10-29
lastmod: 2023-10-29
author:
  - Jimmy Lin
tags:
  - monotonic_queue
  - two_pointer
  - sliding_window
draft: false
---

## Description

You are given an integer array `nums` and two integers `minK` and `maxK`.

A **fixed-bound subarray** of `nums` is a subarray that satisfies the following conditions:

*   The **minimum** value in the subarray is equal to `minK`.
*   The **maximum** value in the subarray is equal to `maxK`.

Return _the **number** of fixed-bound subarrays_.

A **subarray** is a **contiguous** part of an array.

**Example 1:**

**Input:** nums = \[1,3,5,2,7,5\], minK = 1, maxK = 5
**Output:** 2
**Explanation:** The fixed-bound subarrays are \[1,3,5\] and \[1,3,5,2\].

**Example 2:**

**Input:** nums = \[1,1,1,1\], minK = 1, maxK = 1
**Output:** 10
**Explanation:** Every subarray of nums is a fixed-bound subarray. There are 10 possible subarrays.

**Constraints:**

*   `2 <= nums.length <= 105`
*   `1 <= nums[i], minK, maxK <= 106`

## Code 

一開始我覺得這題和 [[Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit|Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit]] 很像。

後來看了解答發現不需要這麼麻煩，只需要單純的 two pointer 就行了。

Time Complexity: $O(n)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    long long countSubarrays(vector<int>& nums, int minK, int maxK) {
        long long res = 0, start = -1, minFound = -1, maxFound = -1;

        for(int i = 0; i < nums.size(); i++) {
            if(nums[i] == minK) minFound = i;
            if(nums[i] == maxK) maxFound = i;
            if(nums[i] < minK || nums[i] > maxK) start = i;
            res += max(0ll, min(minFound, maxFound) - start);
        }
        return res;
    }
};
```


```cpp
class Solution {
public:
    long long countSubarrays(vector<int>& nums, int minK, int maxK) {
        long res = 0;
        bool minFound = false, maxFound = false;
        int start = 0, minStart = 0, maxStart = 0;
        for (int i = 0; i < nums.size(); i++) {
            int num = nums[i];
            if (num < minK || num > maxK) {
                minFound = false;
                maxFound = false;
                start = i+1;
            }
            if (num == minK) {
                minFound = true;
                minStart = i;
            }
            if (num == maxK) {
                maxFound = true;
                maxStart = i;
            }
            if (minFound && maxFound) {
                res += (min(minStart, maxStart) - start + 1);
            }
        }
        return res;
    }
};
```
## Source
- [Count Subarrays With Fixed Bounds - LeetCode](https://leetcode.com/problems/count-subarrays-with-fixed-bounds/)