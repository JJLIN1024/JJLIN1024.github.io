---
title: Subarrays with K Different Integers
date: 2023-10-15
lastmod: 2023-10-15
author:
  - Jimmy Lin
tags:
  - sliding_window
  - atMost
  - review
draft: false
sr-due: 2026-09-08
sr-interval: 892
sr-ease: 330
---

## Description

Given an integer array `nums` and an integer `k`, return _the number of **good subarrays** of_ `nums`.

A **good array** is an array where the number of different integers in that array is exactly `k`.

*   For example, `[1,2,3,1,2]` has `3` different integers: `1`, `2`, and `3`.

A **subarray** is a **contiguous** part of an array.

**Example 1:**

**Input:** nums = \[1,2,1,2,3\], k = 2
**Output:** 7
**Explanation:** Subarrays formed with exactly 2 different integers: \[1,2\], \[2,1\], \[1,2\], \[2,3\], \[1,2,1\], \[2,1,2\], \[1,2,1,2\]

**Example 2:**

**Input:** nums = \[1,2,1,3,4\], k = 3
**Output:** 3
**Explanation:** Subarrays formed with exactly 3 different integers: \[1,2,1,3\], \[2,1,3\], \[1,3,4\].

**Constraints:**

*   `1 <= nums.length <= 2 * 104`
*   `1 <= nums[i], k <= nums.length`

## Code 

和 [[Binary Subarrays With Sum|Binary Subarrays With Sum]] 一樣，要求得剛好有 `k` 個 different integers 的 sub-arrays，我們可以用至多 `k` 個 different integers 的 sub-arrays 的數量去減掉至多 `k - 1`個 odd number 的 different integers 的數量。

Time Complexity: $O(n)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    int subarraysWithKDistinct(vector<int>& nums, int k) {
        return atMost(nums, k) - atMost(nums, k - 1);
    }

    int atMost(vector<int>& nums, int k) {
        int i = 0, res = 0;
        unordered_map<int, int> s;
        for(int j = 0; j < nums.size(); j++) {
            s[nums[j]]++;
            while(s.size() > k) {
                s[nums[i]]--;
                if(s[nums[i]] == 0) s.erase(nums[i]);
                i++;
            }
            res += j - i + 1;
        }
        return res;
    }
};
```

## Source
- [Subarrays with K Different Integers - LeetCode](https://leetcode.com/problems/subarrays-with-k-different-integers/description/)