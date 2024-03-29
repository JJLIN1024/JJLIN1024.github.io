---
title: Find Minimum in Rotated Sorted Array
date: 2023-04-26
lastmod: 2023-04-26
author: Jimmy Lin
tags:
  - binary_search
  - review
draft: false
sr-due: 2027-07-27
sr-interval: 1229
sr-ease: 350
---

## Description

Suppose an array of length `n` sorted in ascending order is **rotated** between `1` and `n` times. For example, the array `nums = [0,1,2,4,5,6,7]` might become:

*   `[4,5,6,7,0,1,2]` if it was rotated `4` times.
*   `[0,1,2,4,5,6,7]` if it was rotated `7` times.

Notice that **rotating** an array `[a[0], a[1], a[2], ..., a[n-1]]` 1 time results in the array `[a[n-1], a[0], a[1], a[2], ..., a[n-2]]`.

Given the sorted rotated array `nums` of **unique** elements, return _the minimum element of this array_.

You must write an algorithm that runs in `O(log n) time.`

**Example 1:**

**Input:** nums = \[3,4,5,1,2\]
**Output:** 1
**Explanation:** The original array was \[1,2,3,4,5\] rotated 3 times.

**Example 2:**

**Input:** nums = \[4,5,6,7,0,1,2\]
**Output:** 0
**Explanation:** The original array was \[0,1,2,4,5,6,7\] and it was rotated 4 times.

**Example 3:**

**Input:** nums = \[11,13,15,17\]
**Output:** 11
**Explanation:** The original array was \[11,13,15,17\] and it was rotated 4 times. 

**Constraints:**

*   `n == nums.length`
*   `1 <= n <= 5000`
*   `-5000 <= nums[i] <= 5000`
*   All the integers of `nums` are **unique**.
*   `nums` is sorted and rotated between `1` and `n` times.

## Code 

找出 pivot (rotate position) 的技巧同：[[Search in Rotated Sorted Array]]。

```cpp
class Solution {
public:
    int findMin(vector<int>& nums) {
        int l = 0, r = nums.size() - 1;
        while(l < r) {
            int m = l + (r - l) / 2;
            if(nums[m] > nums[r]) {
                l = m + 1;
            } else {
                r = m;
            }
        }
        return nums[l];
    }
};
```

## Source
- [Find Minimum in Rotated Sorted Array - LeetCode](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/description/)