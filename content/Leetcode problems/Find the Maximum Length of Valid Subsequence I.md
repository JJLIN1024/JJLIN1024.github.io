---
title: Find the Maximum Length of Valid Subsequence I
date: 2024-06-30
lastmod: 2024-06-30
author:
  - Jimmy Lin
tags:
  - DP
draft: false
---

## Description

You are given an integer array `nums`.

A

subsequence

`sub` of `nums` with length `x` is called **valid** if it satisfies:

*   `(sub[0] + sub[1]) % 2 == (sub[1] + sub[2]) % 2 == ... == (sub[x - 2] + sub[x - 1]) % 2.`

Return the length of the **longest** **valid** subsequence of `nums`.

A **subsequence** is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.

**Example 1:**

**Input:** nums = \[1,2,3,4\]

**Output:** 4

**Explanation:**

The longest valid subsequence is `[1, 2, 3, 4]`.

**Example 2:**

**Input:** nums = \[1,2,1,1,2,1,2\]

**Output:** 6

**Explanation:**

The longest valid subsequence is `[1, 2, 1, 2, 1, 2]`.

**Example 3:**

**Input:** nums = \[1,3\]

**Output:** 2

**Explanation:**

The longest valid subsequence is `[1, 3]`.

**Constraints:**

*   `2 <= nums.length <= 2 * 105`
*   `1 <= nums[i] <= 107`

## Code 

### TLE 

Time Complexity: $O(N^2k)$, Space Complexity: $O(Nk)$

```cpp
class Solution {
public:
    int maximumLength(vector<int>& nums) {
        if(nums.size() == 2)
            return 2;
        int n = nums.size();
        vector<vector<int>> dp(n, vector<int>(2, 1));
        int res = -1;
        for(int i = 1; i < n; i++) {
            for(int k = 0; k < 2; k++) {
                for(int j = i - 1; j >= 0; j--) {
                    if((nums[i] + nums[j]) % 2 == k) {
                        dp[i][k] = max(dp[i][k], dp[j][k] + 1);
                        res = max(res, dp[i][k]);
                    }
                }
            }
        }
        return res;
    }
};
```

### 2D DP

Time Complexity: $O(Nk)$, Space Complexity: $O(k^2)$

關鍵在於將 state 轉換從 nums 的順序中抽離，因為要求 subsequence，所以順序不重要。

題目要求 `(sub[0] + sub[1]) % 2 == (sub[1] + sub[2]) % 2 == ... == (sub[x - 2] + sub[x - 1]) % 2.`，所以令 `(sub[i] + sub[i + 1]) % 2 = mod`，定義 `dp[current_mod][mod]` 為到目前 iterate 的數字為止，`mod` 對應的最長 subsequence。

其中 `current_mod = nums[i] % 2`，`mod` 在此可為 `0` or `1`。

state transition: 

`dp[current_mod][mod] = max(dp[current_mod][mod], dp[prev_mod][mod] + 1)`

其中 `(current_mod + prev_mod) % 2 = mod`，且 `prev_mod = (mod - current_mod + k) % k`。

以 `current_mod = 1`  為例，若想創造 `mod = 1` 的 subsequence，就必須找到 `prev_mod = (1 - 1 + 2) % 2 = 0` ，也就是 `dp[0][1]`，代表在過去的某個 index 上，其餘數為 0，且創造了 `mod = 1` 的 subsequence，這樣一來，當前的餘數為 1 加上過去的餘數為 0，最後的餘數就會是 1，就可以創造 `mod = 1` 的 subsequence。

```cpp
class Solution {
public:
    int maximumLength(vector<int>& nums) {
        if(nums.size() == 2)
            return 2;
        int k = 2;
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
- [Find the Maximum Length of Valid Subsequence I - LeetCode](https://leetcode.com/problems/find-the-maximum-length-of-valid-subsequence-i/description/)