---
title: Find the Maximum Length of Valid Subsequence II
date: 2024-06-30
lastmod: 2024-06-30
author:
  - Jimmy Lin
tags:
  - DP
draft: false
---

## Description

You are given an integer array `nums` and a **positive** integer `k`.

A subsequence

`sub` of `nums` with length `x` is called **valid** if it satisfies:

*   `(sub[0] + sub[1]) % k == (sub[1] + sub[2]) % k == ... == (sub[x - 2] + sub[x - 1]) % k.`

Return the length of the **longest** **valid** subsequence of `nums`.

**Example 1:**

**Input:** nums = \[1,2,3,4,5\], k = 2

**Output:** 5

**Explanation:**

The longest valid subsequence is `[1, 2, 3, 4, 5]`.

**Example 2:**

**Input:** nums = \[1,4,2,3,1,4\], k = 3

**Output:** 4

**Explanation:**

The longest valid subsequence is `[1, 4, 1, 4]`.

**Constraints:**

*   `2 <= nums.length <= 103`
*   `1 <= nums[i] <= 107`
*   `1 <= k <= 103`

## Code 

generalization of [[Find the Maximum Length of Valid Subsequence I]].

Time Complexity: $O(NK)$, Space Complexity: $O(K^2)$

```cpp
class Solution {
public:
    int maximumLength(vector<int>& nums, int k) {
        if(nums.size() == 2)
            return 2;
        vector<vector<int>> dp(k, vector<int>(k, 0));
        int res = -1;
        for(int i = 0; i < nums.size(); i++) {
            int current_mod = nums[i] % k;
            for(int mod = 0; mod < k; mod++) {
                int prev_mod = (mod - current_mod + k) % k;
                dp[current_mod][mod] = max(dp[current_mod][mod], dp[prev_mod][mod] + 1);
                res = max(res, dp[current_mod][mod]);
            }
        }
        return res;
    }
};
```

## Source
- [Find the Maximum Length of Valid Subsequence II - LeetCode](https://leetcode.com/problems/find-the-maximum-length-of-valid-subsequence-ii/description/)