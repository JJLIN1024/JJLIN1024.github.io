---
title: Number of Ways to Stay in the Same Place After Some Steps
date: 2023-10-15
lastmod: 2023-10-15
author:
  - Jimmy Lin
tags:
  - DP
  - dfs
  - memoization
draft: false
---

## Description

You have a pointer at index `0` in an array of size `arrLen`. At each step, you can move 1 position to the left, 1 position to the right in the array, or stay in the same place (The pointer should not be placed outside the array at any time).

Given two integers `steps` and `arrLen`, return the number of ways such that your pointer is still at index `0` after **exactly** `steps` steps. Since the answer may be too large, return it **modulo** `109 + 7`.

**Example 1:**

**Input:** steps = 3, arrLen = 2
**Output:** 4
**Explanation:** There are 4 differents ways to stay at index 0 after 3 steps.
Right, Left, Stay
Stay, Right, Left
Right, Stay, Left
Stay, Stay, Stay

**Example 2:**

**Input:** steps = 2, arrLen = 4
**Output:** 2
**Explanation:** There are 2 differents ways to stay at index 0 after 2 steps
Right, Left
Stay, Stay

**Example 3:**

**Input:** steps = 4, arrLen = 2
**Output:** 8

**Constraints:**

*   `1 <= steps <= 500`
*   `1 <= arrLen <= 106`

## Code 

### Top Down DP with Memoization
Time Complexity: $O(n^2)$, Space Complexity: $O(n^2)$

```cpp
class Solution {
    long mod = 1e9 + 7;
public:
    int numWays(int steps, int arrLen) {
        vector<vector<long>> dp(steps / 2 + 1, vector<long>(steps + 1, -1));
        return dfs(steps, 0, arrLen, dp);
    }

    int dfs(int step, int i, int n, vector<vector<long>>& dp) {
        if(i >= n || i < 0 || i > step) return 0;
        if(step == 0) {
            return i == 0;
        }
        
        if(dp[i][step] != -1) return dp[i][step];

        dp[i][step] = (((dfs(step - 1, i + 1, n, dp) % mod) + 
        dfs(step - 1, i - 1, n, dp) % mod) + dfs(step - 1, i, n, dp)) % mod;

        return (int) dp[i][step];
    }
};
```

## Source
- [Number of Ways to Stay in the Same Place After Some Steps - LeetCode](https://leetcode.com/problems/number-of-ways-to-stay-in-the-same-place-after-some-steps/?envType=daily-question&envId=2023-10-15)