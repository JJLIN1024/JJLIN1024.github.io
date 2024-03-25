---
title: Find All Duplicates in an Array
date: 2024-03-25
lastmod: 2024-03-25
author:
  - Jimmy Lin
tags:
  - array
  - review
draft: false
---

## Description

Given an integer array `nums` of length `n` where all the integers of `nums` are in the range `[1, n]` and each integer appears **once** or **twice**, return _an array of all the integers that appears **twice**_.

You must write an algorithm that runs in `O(n)` time and uses only constant extra space.

**Example 1:**

**Input:** nums = \[4,3,2,7,8,2,3,1\]
**Output:** \[2,3\]

**Example 2:**

**Input:** nums = \[1,1,2\]
**Output:** \[1\]

**Example 3:**

**Input:** nums = \[1\]
**Output:** \[\]

**Constraints:**

*   `n == nums.length`
*   `1 <= n <= 105`
*   `1 <= nums[i] <= n`
*   Each element in `nums` appears **once** or **twice**.

## Code 

有點像 [[Find the Duplicate Number]]。

利用 `nums` 本身的 index 進行 counting，因為最多只會出現兩次，所以可以用正負號來判斷。

Time Complexity: $O(n)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    vector<int> findDuplicates(vector<int>& nums) { 
        if(nums.empty()) 
            return {};
        vector<int> res;
        for(int i = 0; i < nums.size(); i++) {
            if(nums[abs(nums[i]) - 1] < 0)
                res.push_back(abs(nums[i]));
            nums[abs(nums[i]) - 1] = -nums[abs(nums[i]) - 1];
        }
        return res;
    }
};
```

## Source
- [Find All Duplicates in an Array - LeetCode](https://leetcode.com/problems/find-all-duplicates-in-an-array/description/?envType=daily-question&envId=2024-03-25)