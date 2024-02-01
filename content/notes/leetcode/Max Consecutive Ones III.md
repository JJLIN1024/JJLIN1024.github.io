---
title: Max Consecutive Ones III
date: 2023-07-15
lastmod: 2023-10-15
author:
  - Jimmy Lin
tags:
  - sliding_window
  - two_pointer
draft: false
---

## Description

Given a binary array `nums` and an integer `k`, return _the maximum number of consecutive_ `1`_'s in the array if you can flip at most_ `k` `0`'s.

**Example 1:**

**Input:** nums = \[1,1,1,0,0,0,1,1,1,1,0\], k = 2
**Output:** 6
**Explanation:** \[1,1,1,0,0,**1**,1,1,1,1,**1**\]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.

**Example 2:**

**Input:** nums = \[0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1\], k = 3
**Output:** 10
**Explanation:** \[0,0,1,1,**1**,**1**,1,1,1,**1**,1,1,0,0,0,1,1,1,1\]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.

**Constraints:**

*   `1 <= nums.length <= 105`
*   `nums[i]` is either `0` or `1`.
*   `0 <= k <= nums.length`

## Code 

這題和 [[Longest Repeating Character Replacement|Longest Repeating Character Replacement]] 相同，只是從字母變成了零和一。

Time Complexity: $O(n)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    int longestOnes(vector<int>& nums, int k) {
        int start = 0;
        int res = 0;
        for(int i = 0; i < nums.size(); i++) {
            if(nums[i] == 0)
                k--;
            while(k < 0) {
                if(nums[start] == 0)
                    k++;
                start++;
            }

            res = max(res, i - start + 1);
        }

        return res;
    }
};
```

```cpp
class Solution {
public:
    int longestOnes(vector<int>& nums, int k) {
        int res = 0;
        int ones = 0;
        int zeros = 0;
        for(int i = 0, j = 0; j < nums.size(); j++) {
            if(nums[j] == 0) zeros++;
            else ones++;
            while(j - i + 1 - ones > k) {
                if(nums[i] == 1) ones--;
                else zeros--;
                i++;
            }
            res = max(res, j - i + 1);
        }
        return res;
    }
};
```
## Source

- [Max Consecutive Ones III - LeetCode](https://leetcode.com/problems/max-consecutive-ones-iii/)