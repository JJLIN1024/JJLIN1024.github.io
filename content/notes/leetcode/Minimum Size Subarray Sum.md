---
title: Minimum Size Subarray Sum
date: 2023-10-27
lastmod: 2023-10-27
author:
  - Jimmy Lin
tags:
  - sliding_window
  - review
draft: false
sr-due: 2024-02-26
sr-interval: 26
sr-ease: 290
---

## Description

Given an array of positive integers `nums` and a positive integer `target`, return _the **minimal length** of a_

_subarray_

_whose sum is greater than or equal to_ `target`. If there is no such subarray, return `0` instead.

**Example 1:**

**Input:** target = 7, nums = \[2,3,1,2,4,3\]
**Output:** 2
**Explanation:** The subarray \[4,3\] has the minimal length under the problem constraint.

**Example 2:**

**Input:** target = 4, nums = \[1,4,4\]
**Output:** 1

**Example 3:**

**Input:** target = 11, nums = \[1,1,1,1,1,1,1,1\]
**Output:** 0

**Constraints:**

*   `1 <= target <= 109`
*   `1 <= nums.length <= 105`
*   `1 <= nums[i] <= 104`

**Follow up:** If you have figured out the `O(n)` solution, try coding another solution of which the time complexity is `O(n log(n))`.

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int j = 0;
        int res = INT_MAX;
        int cur = 0;
        for(int i = 0; i < nums.size(); i++) {
            cur += nums[i];
            while(cur >= target) {
                res = min(res, i - j + 1);
                cur -= nums[j++];
            }
        }
        return res == INT_MAX ? 0 : res;
    }
};
```

```cpp
class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int res = INT_MAX;
        int n = nums.size();
        int r = 0;
        int sum = 0;
        for(int l = 0; l < n; l++) {
            while(r < n && sum < target) {
                sum += nums[r];
                r++;
            };
            if(sum >= target)
                res = min(res, r - l);
            sum -= nums[l];
        }


        if(res == INT_MAX) return 0;
        return res;
    }
};
```

## Source
- [Minimum Size Subarray Sum - LeetCode](https://leetcode.com/problems/minimum-size-subarray-sum/description/)