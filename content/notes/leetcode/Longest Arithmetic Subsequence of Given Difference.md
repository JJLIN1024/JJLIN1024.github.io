---
title: Longest Arithmetic Subsequence of Given Difference
date: 2023-09-11
lastmod: 2023-09-11
author: Jimmy Lin
tags: ["dynamic programming"]
draft: false
---

## Description

Given an integer array `arr` and an integer `difference`, return the length of the longest subsequence in `arr` which is an arithmetic sequence such that the difference between adjacent elements in the subsequence equals `difference`.

A **subsequence** is a sequence that can be derived from `arr` by deleting some or no elements without changing the order of the remaining elements.

**Example 1:**

**Input:** arr = \[1,2,3,4\], difference = 1
**Output:** 4
**Explanation:** The longest arithmetic subsequence is \[1,2,3,4\].

**Example 2:**

**Input:** arr = \[1,3,5,7\], difference = 1
**Output:** 1
**Explanation:** The longest arithmetic subsequence is any single element.

**Example 3:**

**Input:** arr = \[1,5,7,8,5,3,4,2,1\], difference = -2
**Output:** 4
**Explanation:** The longest arithmetic subsequence is \[7,5,3,1\].

**Constraints:**

*   `1 <= arr.length <= 105`
*   `-104 <= arr[i], difference <= 104`

## Code 

### DP - TLE
Time Complexity: $O(n^2)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    int longestSubsequence(vector<int>& arr, int difference) {
        int n = arr.size();
        // vector<int> dp(n, 1);

        // don't use memset(dp, 1, sizeof(dp)) !!, since memset works
        // on byte-to-byte basis.
        int dp[n];
        for(int i = 0; i < n; i++) {
            dp[i] = 1;
        }

        int res = 1;
        for(int i = 1; i < n; i++) {
            for(int j = i - 1; j >= 0; j--) {
                if((arr[i] - arr[j]) == difference) {
                    dp[i] = max(dp[i], dp[j] + 1);
                    res = max(res, dp[i]);
                }
            }
        }

        return res;
    }
};
```

### DP - with hashmap

因為 TLE，所以必須加速，要加速找到 `(arr[i] - arr[j]) == difference` 的方式就是使用 hashmap。

Time Complexity: $O(n)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    int longestSubsequence(vector<int>& arr, int difference) {
        unordered_map<int, int> dp;

        int res = 1;
        for(int i = 0; i < arr.size(); i++) {
            if(dp.find(arr[i] - difference) != dp.end()) {
                dp[arr[i]] = dp[arr[i] - difference] + 1;
                res = max(res, dp[arr[i]]);
            } else {
                dp[arr[i]] = 1;
            }
        }

        return res;
    }
};
```


## Source
- [Longest Arithmetic Subsequence of Given Difference - LeetCode](https://leetcode.com/problems/longest-arithmetic-subsequence-of-given-difference/description/)