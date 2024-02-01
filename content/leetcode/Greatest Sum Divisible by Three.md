---
title: Greatest Sum Divisible by Three
date: 2023-09-11
lastmod: 2023-09-11
author: Jimmy Lin
tags: ["dynamic programming"]
draft: false
---

## Description

Given an integer array `nums`, return _the **maximum possible sum** of elements of the array such that it is divisible by three_.

**Example 1:**

**Input:** nums = \[3,6,5,1,8\]
**Output:** 18
**Explanation:** Pick numbers 3, 6, 1 and 8 their sum is 18 (maximum sum divisible by 3).

**Example 2:**

**Input:** nums = \[4\]
**Output:** 0
**Explanation:** Since 4 is not divisible by 3, do not pick any number.

**Example 3:**

**Input:** nums = \[1,2,3,4,4\]
**Output:** 12
**Explanation:** Pick numbers 1, 3, 4 and 4 their sum is 12 (maximum sum divisible by 3).

**Constraints:**

*   `1 <= nums.length <= 4 * 104`
*   `1 <= nums[i] <= 104`

## Code 


### DP
Time Complexity: $O(n)$, Space Complexity: $O(n)$

關鍵就在於 `3n, 3n + 1, 3n + 2`。

```cpp
class Solution {
public:
    int maxSumDivThree(vector<int>& nums) {
        int n = nums.size();
        vector<vector<int>> dp(n + 1, vector<int>(3, 0));
        
        dp[0][0] = 0;
        dp[0][1] = INT_MIN, dp[0][2] = INT_MIN;

        for(int i = 1; i <= n; i++) {
            int idx = i - 1;
            if(nums[idx] % 3 == 0) {
                dp[i][0] = max(dp[i - 1][0], dp[i - 1][0] + nums[idx]);
                dp[i][1] = max(dp[i - 1][1], dp[i - 1][1] + nums[idx]);
                dp[i][2] = max(dp[i - 1][2], dp[i - 1][2] + nums[idx]);
            } else if (nums[idx] % 3 == 1) {
                dp[i][0] = max(dp[i - 1][0], dp[i - 1][2] + nums[idx]);
                dp[i][1] = max(dp[i - 1][1], dp[i - 1][0] + nums[idx]);
                dp[i][2] = max(dp[i - 1][2], dp[i - 1][1] + nums[idx]);
            } else if (nums[idx] % 3 == 2) {
                dp[i][0] = max(dp[i - 1][0], dp[i - 1][1] + nums[idx]);
                dp[i][1] = max(dp[i - 1][1], dp[i - 1][2] + nums[idx]);
                dp[i][2] = max(dp[i - 1][2], dp[i - 1][0] + nums[idx]);
            }       
       }

       return dp[n][0];
 
    }
};
```

## Source
- [Greatest Sum Divisible by Three - LeetCode](https://leetcode.com/problems/greatest-sum-divisible-by-three/description/)