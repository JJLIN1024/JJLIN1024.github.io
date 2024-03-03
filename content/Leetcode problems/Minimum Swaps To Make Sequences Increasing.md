---
title: Minimum Swaps To Make Sequences Increasing
date: 2023-10-09
lastmod: 2023-10-09
author:
  - Jimmy Lin
tags:
  - DP
  - dfs
  - backtracking
  - memoization
  - knapsack
draft: false
---

## Description

You are given two integer arrays of the same length `nums1` and `nums2`. In one operation, you are allowed to swap `nums1[i]` with `nums2[i]`.

*   For example, if `nums1 = [1,2,3,8]`, and `nums2 = [5,6,7,4]`, you can swap the element at `i = 3` to obtain `nums1 = [1,2,3,4]` and `nums2 = [5,6,7,8]`.

Return _the minimum number of needed operations to make_ `nums1` _and_ `nums2` _**strictly increasing**_. The test cases are generated so that the given input always makes it possible.

An array `arr` is **strictly increasing** if and only if `arr[0] < arr[1] < arr[2] < ... < arr[arr.length - 1]`.

**Example 1:**

**Input:** nums1 = \[1,3,5,4\], nums2 = \[1,2,3,7\]
**Output:** 1
**Explanation:** 
Swap nums1\[3\] and nums2\[3\]. Then the sequences are:
nums1 = \[1, 3, 5, 7\] and nums2 = \[1, 2, 3, 4\]
which are both strictly increasing.

**Example 2:**

**Input:** nums1 = \[0,3,5,8,9\], nums2 = \[2,1,4,6,9\]
**Output:** 1

**Constraints:**

*   `2 <= nums1.length <= 105`
*   `nums2.length == nums1.length`
*   `0 <= nums1[i], nums2[i] <= 2 * 105`

## Code 

### DP with memoization
Time Complexity: $O(n)$, Space Complexity: $O(n)$

Intuition 是：對於每個 index，都只有 swap or do not swap 兩種選擇。和 [[Shopping Offers|Shopping Offers]] 類似。

```cpp
class Solution {
public:
    int minSwap(vector<int>& nums1, vector<int>& nums2) {
        int n = nums1.size();
        vector<vector<int>> memo(n + 1, vector<int>(2, -1));
        return solve(0, nums1, nums2, -1, -1, 0, memo);
    }

    int solve(int idx, vector<int>& nums1, vector<int>& nums2, int pre1, int pre2, int swapped, vector<vector<int>>& memo) {
        if(idx == nums1.size()) {
            return 0;
        }

        if(memo[idx][swapped] != -1) return memo[idx][swapped];
        
        int res = 100001;

        if(nums1[idx] > pre1 && nums2[idx] > pre2)
            res = min(res, solve(idx + 1, nums1, nums2, nums1[idx], nums2[idx], 0, memo));

        swap(nums1[idx], nums2[idx]);
        if(nums1[idx] > pre1 && nums2[idx] > pre2)
            res = min(res, 1 + solve(idx + 1, nums1, nums2, nums1[idx], nums2[idx], 1, memo));

        swap(nums1[idx], nums2[idx]);
        
        return memo[idx][swapped] = res;
    }
};
```

## Source
- [Minimum Swaps To Make Sequences Increasing - LeetCode](https://leetcode.com/problems/minimum-swaps-to-make-sequences-increasing/)