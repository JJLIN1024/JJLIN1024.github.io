---
title: Find First and Last Position of Element in Sorted Array
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

Given an array of integers `nums` sorted in non-decreasing order, find the starting and ending position of a given `target` value.

If `target` is not found in the array, return `[-1, -1]`.

You must write an algorithm with `O(log n)` runtime complexity.

**Example 1:**

**Input:** nums = \[5,7,7,8,8,10\], target = 8
**Output:** \[3,4\]

**Example 2:**

**Input:** nums = \[5,7,7,8,8,10\], target = 6
**Output:** \[-1,-1\]

**Example 3:**

**Input:** nums = \[\], target = 0
**Output:** \[-1,-1\]

**Constraints:**

*   `0 <= nums.length <= 105`
*   `-109 <= nums[i] <= 109`
*   `nums` is a non-decreasing array.
*   `-109 <= target <= 109`

## Code 

Time Complexity: $O(\log n)$, Space Complexity: $O(1)$

`upper_bound` 回傳的會是嚴格大於的位置，沒找到的話會回傳 `end`，因此若回傳 `begin` 代表 `begin` 的位置上必定是嚴格大於 target 的。

```cpp
if(last_iter != nums.begin() && *prev(last_iter) == target) 
```

```cpp
class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        int first, last;
        auto first_iter = lower_bound(nums.begin(), nums.end(), target);
        if(first_iter == nums.end() || *first_iter != target)
            first = -1;
        else
            first = first_iter - nums.begin();

        auto last_iter = upper_bound(nums.begin(), nums.end(), target);
        if(last_iter != nums.begin() && *prev(last_iter) == target) {
            last = last_iter - nums.begin() - 1;
        } else {
            last = -1;
        }

        return {first, last};
    }
};
```

## Source
- [Find First and Last Position of Element in Sorted Array - LeetCode](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/description/?envType=study-plan-v2&envId=binary-search)