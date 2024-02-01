---
title: Burst Balloons
date: 2024-02-01
lastmod: 2024-02-01
author: Jimmy Lin
tags:
  - DP
  - review
draft: false
sr-due: 2024-02-02
sr-interval: 1
sr-ease: 228
---

## Description

You are given `n` balloons, indexed from `0` to `n - 1`. Each balloon is painted with a number on it represented by an array `nums`. You are asked to burst all the balloons.

If you burst the `ith` balloon, you will get `nums[i - 1] * nums[i] * nums[i + 1]` coins. If `i - 1` or `i + 1` goes out of bounds of the array, then treat it as if there is a balloon with a `1` painted on it.

Return _the maximum coins you can collect by bursting the balloons wisely_.

**Example 1:**

**Input:** nums = \[3,1,5,8\]
**Output:** 167
**Explanation:**
nums = \[3,1,5,8\] --> \[3,5,8\] --> \[3,8\] --> \[8\] --> \[\]
coins =  3\*1\*5    +   3\*5\*8   +  1\*3\*8  + 1\*8\*1 = 167

**Example 2:**

**Input:** nums = \[1,5\]
**Output:** 10

**Constraints:**

*   `n == nums.length`
*   `1 <= n <= 300`
*   `0 <= nums[i] <= 100`

## Code 

```
dp[i][j]: coins obtained from bursting all the balloons between index i and j (not including i or j)  

dp[i][j] = max(nums[i] * nums[k] * nums[j] + dp[i][k] + dp[k][j]) (k in (i+1,j))  

If k is the index of the last balloon burst in (i, j), the coins that burst will get are nums[i] * nums[k] * nums[j], and to calculate dp[i][j], we also need to add the coins obtained from bursting balloons between i and k, and between k and j, i.e., dp[i][k] and dp[k][j]
```

### Top Down DP with memoization
Time Complexity: $O(n^2)$, Space Complexity: $O(n^2)$

```cpp
class Solution {
public:
    int maxCoins(vector<int>& nums) {
        vector<int> A;
        A.push_back(1);
        for(int i = 0; i < nums.size(); i++) A.push_back(nums[i]);
        A.push_back(1);
        
        int n = A.size();
        vector<vector<int>> memo(n + 1, vector<int>(n + 1, 0));
        return burst(A, 0, n - 1, memo);
    }

    int burst(vector<int>& A, int l, int r, vector<vector<int>>& memo) {
        if(l + 1 == r) return 0;
        if(memo[l][r] > 0) return memo[l][r];
        int res = 0;
        for(int i = l + 1; i < r; i++) {
            res = max(res, A[l] * A[i] * A[r] + burst(A, l, i, memo) + burst(A, i, r, memo));
        }
        
        return memo[l][r] = res;
    }
};
```


### Bottom Up DP

Time Complexity: $O(n^3)$, Space Complexity: $O(n^2)$

`len` from 1 to n - 1，dry run `[3, 1, 5, 8]` 就會懂了。

```cpp
class Solution {
public:
    int maxCoins(vector<int>& nums) {
        vector<int> A;
        A.push_back(1);
        for(int i = 0; i < nums.size(); i++) A.push_back(nums[i]);
        A.push_back(1);

        int n = A.size();
        vector<vector<int>> dp(n + 1, vector<int>(n + 1, 0));

        for(int len = 1; len < n; len++) {
            for(int i = 0; i <= n - len - 1; i++) {
                int j = i + len;
                for(int k = i + 1; k < j; k++) {
                    dp[i][j] = max(dp[i][j], dp[i][k] + dp[k][j] + A[i] * A[k] * A[j]);
                }
            }
        }
        return dp[0][n - 1];
    }

};
```
## Source
- [Burst Balloons - LeetCode](https://leetcode.com/problems/burst-balloons/description/)