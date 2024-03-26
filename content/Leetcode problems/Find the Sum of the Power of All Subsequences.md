---
title: Find the Sum of the Power of All Subsequences
date: 2024-03-26
lastmod: 2024-03-26
author:
  - Jimmy Lin
tags:
  - DP
  - review
  - knapsack
draft: false
sr-due: 2024-03-29
sr-interval: 3
sr-ease: 252
---

## Description

You are given an integer array `nums` of length `n` and a **positive** integer `k`.

The **power** of an array of integers is defined as the number of

subsequences

with their sum **equal** to `k`.

Return _the **sum** of **power** of all subsequences of_ `nums`_._

Since the answer may be very large, return it **modulo** `109 + 7`.

**Example 1:**

**Input:** nums = \[1,2,3\], k = 3

**Output:** 6

**Explanation:**

There are `5` subsequences of nums with non-zero power:

*   The subsequence `[**1**,**2**,**3**]` has `2` subsequences with `sum == 3`: `[1,2,3]` and `[1,2,3]`.
*   The subsequence `[**1**,2,**3**]` has `1` subsequence with `sum == 3`: `[1,2,3]`.
*   The subsequence `[1,**2**,**3**]` has `1` subsequence with `sum == 3`: `[1,2,3]`.
*   The subsequence `[**1**,**2**,3]` has `1` subsequence with `sum == 3`: `[1,2,3]`.
*   The subsequence `[1,2,**3**]` has `1` subsequence with `sum == 3`: `[1,2,3]`.

Hence the answer is `2 + 1 + 1 + 1 + 1 = 6`.

**Example 2:**

**Input:** nums = \[2,3,3\], k = 5

**Output:** 4

**Explanation:**

There are `3` subsequences of nums with non-zero power:

*   The subsequence `[**2**,**3**,**3**]` has 2 subsequences with `sum == 5`: `[2,3,3]` and `[2,3,3]`.
*   The subsequence `[**2**,3,**3**]` has 1 subsequence with `sum == 5`: `[2,3,3]`.
*   The subsequence `[**2**,**3**,3]` has 1 subsequence with `sum == 5`: `[2,3,3]`.

Hence the answer is `2 + 1 + 1 = 4`.

**Example 3:**

**Input:** nums = \[1,2,3\], k = 7

**Output:** 0

**Explanation:** There exists no subsequence with sum `7`. Hence all subsequences of nums have `power = 0`.

**Constraints:**

*   `1 <= n <= 100`
*   `1 <= nums[i] <= 104`
*   `1 <= k <= 100`

## Code 

先看一個 Python 的解去理解背後邏輯：When we find `cnt` elements that sum to k, those elements appear in $2 ^ {n - cnt}$ subsequences.

```Python
class Solution:
    def sumOfPower(self, nums: List[int], k: int) -> int:
        m = int(1e9) + 7
        @cache
        def calc(i, k, count):
            if k < 0:
                return 0
            if k == 0:
                return pow(2, len(nums) - count, m)
            if i == len(nums):
                return 0
            
            return (calc(i+1, k-nums[i], count+1) + calc(i+1, k, count))%m
        
        return calc(0, k, 0)
```


Time Complexity: $O(nnk)$, Space Complexity: $O(nnk)$

其中 `power` 有用到 [[Pow(x, n)]] 中學到的技巧。

```cpp
class Solution {
public:
    int mod = 1e9 + 7;
    vector<vector<vector<int>>> dp;

    int sumOfPower(vector<int>& nums, int k) {
        dp.resize(100, vector<vector<int>>(110, vector<int>(110, -1)));
        return dfs(nums, k, 0, 0, 0);
    }

    long long power(int n){
        if(n <= 1) 
            return (n + 1);
        long long res = power(n/2);
        if(n % 2) 
            return (((res * res) % mod) * 2) % mod;
        return ((res * res) % mod);
    }

    int dfs(vector<int>& nums, int k, int i, int sum, int count) {

        if(sum == k) {
            return power(nums.size() - count);
        }
        if(i >= nums.size() || sum > k) {
            return 0;
        }

        if(dp[i][count][sum] != -1)
            return dp[i][count][sum];

        long long take = dfs(nums, k, i + 1, sum + nums[i], count + 1) % mod;
        long long notTake = dfs(nums, k, i + 1, sum, count) % mod;
        return dp[i][count][sum] = (take + notTake) % mod;
    }
};
```

## Source
- [Find the Sum of the Power of All Subsequences - LeetCode](https://leetcode.com/problems/find-the-sum-of-the-power-of-all-subsequences/description/)