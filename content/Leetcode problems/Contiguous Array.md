---
title: Contiguous Array
date: 2023-04-18
lastmod: 2023-04-18
author:
  - Jimmy Lin
tags:
  - array
  - hashmap
  - review
draft: false
sr-due: 2024-03-01
sr-interval: 1
sr-ease: 234
---

## Description

Given a binary array `nums`, return _the maximum length of a contiguous subarray with an equal number of_ `0` _and_ `1`.

**Example 1:**

**Input:** nums = \[0,1\]
**Output:** 2
**Explanation:** \[0, 1\] is the longest contiguous subarray with an equal number of 0 and 1.

**Example 2:**

**Input:** nums = \[0,1,0\]
**Output:** 2
**Explanation:** \[0, 1\] (or \[1, 0\]) is a longest contiguous subarray with equal number of 0 and 1.

**Constraints:**

*   `1 <= nums.length <= 105`
*   `nums[i]` is either `0` or `1`.

## Code 

```cpp
class Solution {
public:
    int findMaxLength(vector<int>& nums) {

        unordered_map<int, int> mp;
        mp[0] = -1; 

        int sum = 0, maxLen = 0;
        for(int i = 0; i < nums.size(); i++) {
            sum += nums[i] == 1 ? 1 : -1;
            if(mp.count(sum)) maxLen = max(maxLen, i - mp[sum]);
            else mp[sum] = i;
        }

        return maxLen;
    }
};
```

## Source
- [Contiguous Array - LeetCode](https://leetcode.com/problems/contiguous-array/description/)