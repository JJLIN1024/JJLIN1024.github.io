---
title: Count Complete Subarrays in an Array
date: 2024-01-24
lastmod: 2024-01-24
author: Jimmy Lin
tags:
  - review
  - sliding_window
draft: false
sr-due: 2024-02-25
sr-interval: 25
sr-ease: 290
---

## Description

You are given an array `nums` consisting of **positive** integers.

We call a subarray of an array **complete** if the following condition is satisfied:

*   The number of **distinct** elements in the subarray is equal to the number of distinct elements in the whole array.

Return _the number of **complete** subarrays_.

A **subarray** is a contiguous non-empty part of an array.

**Example 1:**

**Input:** nums = \[1,3,1,2,2\]
**Output:** 4
**Explanation:** The complete subarrays are the following: \[1,3,1,2\], \[1,3,1,2,2\], \[3,1,2\] and \[3,1,2,2\].

**Example 2:**

**Input:** nums = \[5,5,5,5\]
**Output:** 10
**Explanation:** The array consists only of the integer 5, so any subarray is complete. The number of subarrays that we can choose is 10.

**Constraints:**

*   `1 <= nums.length <= 1000`
*   `1 <= nums[i] <= 2000`

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(n)$

關鍵在於滑動 `i` 使得 `i` 移動的一個位置讓 `i` 到 `j` 的 distinct elements 個數小於 `k`，如此一來代表此時的 array 若從 `i - 1` 的元素開始加上去，一路加上位置 `0`，總共 `i` 個 subarray 的 distinct elements 個數都會大於等於 `k`。

```cpp
class Solution {
public:
    int countCompleteSubarrays(vector<int>& nums) {
        int n = nums.size(), k = unordered_set<int>(nums.begin(), nums.end()).size(), res = 0, j = 0;
        unordered_map<int, int> mp;
        for(int i = 0; i < nums.size(); i++) {
            mp[nums[i]]++;
            while(mp.size() >= k) {
                mp[nums[j]]--;
                if(mp[nums[j]] == 0) mp.erase(nums[j]);
                j++;
            }
            res += j;
        }
        return res;
    }
};
```

```cpp
class Solution {
public:
    int countCompleteSubarrays(vector<int>& nums) {
       int n = nums.size(), k = unordered_set<int>(nums.begin(), nums.end()).size(), res = 0, i = 0;
        unordered_map<int, int> count;
        for (int j = 0; j < n; ++j) {
            k -= count[nums[j]]++ == 0;
            while (k == 0)
                k += --count[nums[i++]] == 0;
            res += i;
        }
        return res;
    }
};
```

## Source
- [Count Complete Subarrays in an Array - LeetCode](https://leetcode.com/problems/count-complete-subarrays-in-an-array/description/)