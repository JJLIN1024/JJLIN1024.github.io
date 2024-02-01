---
title: Binary Subarrays With Sum
date: 2023-10-15
lastmod: 2023-10-15
author:
  - Jimmy Lin
tags:
  - sliding_window
  - two_pointer
  - atMost
  - review
draft: false
sr-due: 2024-02-23
sr-interval: 24
sr-ease: 290
---

## Description

Given a binary array `nums` and an integer `goal`, return _the number of non-empty **subarrays** with a sum_ `goal`.

A **subarray** is a contiguous part of the array.

**Example 1:**

**Input:** nums = \[1,0,1,0,1\], goal = 2
**Output:** 4
**Explanation:** The 4 subarrays are bolded and underlined below:
\[**1,0,1**,0,1\]
\[**1,0,1,0**,1\]
\[1,**0,1,0,1**\]
\[1,0,**1,0,1**\]

**Example 2:**

**Input:** nums = \[0,0,0,0,0\], goal = 0
**Output:** 15

**Constraints:**

*   `1 <= nums.length <= 3 * 104`
*   `nums[i]` is either `0` or `1`.
*   `0 <= goal <= nums.length`

## Code 

### The atMost Trick

和 [[Subarray Product Less Than K]] 一樣：

Each step introduces `x` new subarrays, where x is the size of the current window `(j + 1 - i)`;  example:  for window (5, 2), when 6 is introduced, it add 3 new subarray: (5, (2, (6)))。

關鍵在於：`return atMost(nums, goal) - atMost(nums, goal - 1);`

要注意 edge case：`goal = 0` ！

Time Complexity: $O(n)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    int numSubarraysWithSum(vector<int>& nums, int goal) {
        return atMost(nums, goal) - atMost(nums, goal - 1);
    }

    int atMost(vector<int>& nums, int k) {
	    // edge case
        if(k < 0) return 0;
        
        int j = 0, res = 0, curSum = 0;
        for(int i = 0; i < nums.size(); i++) {
            curSum += nums[i];
            while(curSum > k) {
                curSum -= nums[j];
                j++;
            }
            res += i - j + 1;
        }

        return res;
    }
};
```

## Source
- [Binary Subarrays With Sum - LeetCode](https://leetcode.com/problems/binary-subarrays-with-sum/description/)