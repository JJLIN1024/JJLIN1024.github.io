---
title: Classic Binary Search
date: 2023-07-03
lastmod: 2023-07-03
author: Jimmy Lin
tags:
  - binary_search
draft: false
---

## Description

Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`.

You must write an algorithm with `O(log n)` runtime complexity.

**Example 1:**

**Input:** nums = \[-1,0,3,5,9,12\], target = 9
**Output:** 4
**Explanation:** 9 exists in nums and its index is 4

**Example 2:**

**Input:** nums = \[-1,0,3,5,9,12\], target = 2
**Output:** -1
**Explanation:** 2 does not exist in nums so return -1

**Constraints:**

*   `1 <= nums.length <= 104`
*   `-104 < nums[i], target < 104`
*   All the integers in `nums` are **unique**.
*   `nums` is sorted in ascending order.

## Code 

Time Complexity: $O(\log n)$, Space Complexity: $O(1)$

基本概念同 [[Binary Search 101|Binary Search 101]]。

```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int left = 0, right = nums.size() - 1;
        while(left < right) {
            int mid = left + (right - left) / 2;
            if(nums[mid] >= target) right = mid;
            else left = mid + 1;
        }

        return nums[left] == target ? left : -1;
    }
};
```

## Source
- [Binary Search - LeetCode](https://leetcode.com/problems/binary-search/)