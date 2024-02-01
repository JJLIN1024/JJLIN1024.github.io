---
title: Subarray Sum Equals K
date: 2023-04-23
lastmod: 2023-04-23
author: Jimmy Lin
tags:
  - hashmap
  - prefix_sum
  - review
draft: false
sr-due: 2024-02-27
sr-interval: 34
sr-ease: 290
---

## Description

Given an array of integers `nums` and an integer `k`, return _the total number of subarrays whose sum equals to_ `k`.

A subarray is a contiguous **non-empty** sequence of elements within an array.

**Example 1:**

**Input:** nums = \[1,1,1\], k = 2
**Output:** 2

**Example 2:**

**Input:** nums = \[1,2,3\], k = 3
**Output:** 2

**Constraints:**

*   `1 <= nums.length <= 2 * 104`
*   `-1000 <= nums[i] <= 1000`
*   `-107 <= k <= 107`

## Code 

### Prefix Sum $O(n^2)$, TLE

觀念：subarray `[i, j]` 的 sum 為 `prefixSum[j] - prefixSum[i-1]`。

```cpp
class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        vector<int> pre;
        pre.push_back(0);
        pre.push_back(nums[0]);
        for(int i = 1; i < nums.size(); i++) {
            nums[i] += nums[i-1];
            pre.push_back(nums[i]);
        }

        int count = 0;
        for(int i = 1; i < pre.size(); i++) {
            for(int j = 0; j < i; j++) {
                if((pre[i] - pre[j]) == k)  {
                    count++;
                } 
            }
        }
        return count;
    }
};
```

要想怎麼優化。

### Prefix Sum with Hash $O(n)$

優化的方法就是使用 `unordered_map`，如此一來就不用使用 for loop 一個一個相減來檢查。

注意：`unordered_map<int, int> mp = {{0, 1}};

```cpp
class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        for(int i = 1; i < nums.size(); i++) {
            nums[i] += nums[i - 1];
        }

        int res = 0;
        unordered_map<int, int> mp = {{0, 1}};
        for(int i = 0; i < nums.size(); i++) {
            if(mp.find(nums[i] - k) != mp.end()) {
                res += mp[nums[i] - k];
            }
            mp[nums[i]]++;
        }
        return res;
    }
};
```


## Source
- [Subarray Sum Equals K - LeetCode](https://leetcode.com/problems/subarray-sum-equals-k/description/)