---
title: 3Sum Closest
date: 2023-01-28
lastmod: 2024-01-08
author:
  - Jimmy Lin
tags:
  - two_pointer
  - review
draft: false
sr-due: 2024-02-29
sr-interval: 46
sr-ease: 294
---

## Description

Given an integer array `nums` of length `n` and an integer `target`, find three integers in `nums` such that the sum is closest to `target`.

Return _the sum of the three integers_.

You may assume that each input would have exactly one solution.

**Example 1:**

**Input:** nums = \[-1,2,1,-4\], target = 1
**Output:** 2
**Explanation:** The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).

**Example 2:**

**Input:** nums = \[0,0,0\], target = 1
**Output:** 0
**Explanation:** The sum that is closest to the target is 0. (0 + 0 + 0 = 0).

**Constraints:**

*   `3 <= nums.length <= 500`
*   `-1000 <= nums[i] <= 1000`
*   `-104 <= target <= 104`

## Code 

[[3Sum]] 的變形版。

```cpp
class Solution {
public:
    int threeSumClosest(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        int i = 0, l, r, n = nums.size();
        int closestSum;
        int distance = INT_MAX;
        while(i < n) {
            int l = i + 1, r = n - 1;
            while(l < r) {
                int Sum = nums[i] + nums[l] + nums[r];
                if(Sum > target) {
                    if(abs(Sum - target) < distance) {
                        closestSum = Sum;
                        distance = abs(Sum - target);
                    }
                    r--;
                } else if(Sum < target) {
                    if(abs(Sum - target) < distance) {
                        closestSum = Sum;
                        distance = abs(Sum - target);
                    }
                    l++;
                } else if(Sum == target) {
                    closestSum = Sum;
                    return closestSum;
                    distance = 0;
                    int left = nums[l];
                    int right = nums[r];
                    while(l < r && nums[l] == left) l++;
                    while(l < r && nums[r] == right) r--;
                }
            }
            while(i + 1 < n && nums[i] == nums[i + 1]) i++;
            i++;
        }
        return closestSum;
    }
};
```

## Source
- [3Sum Closest - LeetCode](https://leetcode.com/problems/3sum-closest/description/)