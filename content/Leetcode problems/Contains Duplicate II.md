---
title: Contains Duplicate II
date: 2023-03-15
lastmod: 2024-01-08
author:
  - Jimmy Lin
tags:
  - hashmap
  - review
draft: false
sr-due: 2024-01-31
sr-interval: 17
sr-ease: 290
---

## Description

Given an integer array `nums` and an integer `k`, return `true` _if there are two **distinct indices**_ `i` _and_ `j` _in the array such that_ `nums[i] == nums[j]` _and_ `abs(i - j) <= k`.

**Example 1:**

**Input:** nums = \[1,2,3,1\], k = 3
**Output:** true

**Example 2:**

**Input:** nums = \[1,0,1,1\], k = 1
**Output:** true

**Example 3:**

**Input:** nums = \[1,2,3,1,2,3\], k = 2
**Output:** false

**Constraints:**

*   `1 <= nums.length <= 105`
*   `-109 <= nums[i] <= 109`
*   `0 <= k <= 105`

## Code 

關於 `m[nums[i]] = i;`：

我們可以一直更新 `m` 中的 `nums[i]` 對應的 index，因為如果叫靠後的 index 也無法滿足條件 `abs(i - j) <= k`，更之前的就更沒辦法，所以可以直接用後面的 index 取代前面的。

```cpp
class Solution {
public:
    bool containsNearbyDuplicate(vector<int>& nums, int k) {
        unordered_map<int, int> m;
        for(int i = 0; i < nums.size(); i++) {
            if(m.find(nums[i]) != m.end()) {
                int j = m[nums[i]];
                if(abs(i - j) <= k) return true;
            } 
            m[nums[i]] = i;
        }

        return false;
    }
};
```

## Source
- [Contains Duplicate II - LeetCode](https://leetcode.com/problems/contains-duplicate-ii/description/)