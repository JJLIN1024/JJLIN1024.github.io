---
title: Ones and Zeroes
date: 2023-09-18
lastmod: 2023-09-18
author:
  - Jimmy Lin
tags:
  - DP
  - knapsack
draft: false
---

## Description

You are given an array of binary strings `strs` and two integers `m` and `n`.

Return _the size of the largest subset of `strs` such that there are **at most**_ `m` `0`_'s and_ `n` `1`_'s in the subset_.

A set `x` is a **subset** of a set `y` if all elements of `x` are also elements of `y`.

**Example 1:**

**Input:** strs = \["10","0001","111001","1","0"\], m = 5, n = 3
**Output:** 4
**Explanation:** The largest subset with at most 5 0's and 3 1's is {"10", "0001", "1", "0"}, so the answer is 4.
Other valid but smaller subsets include {"0001", "1"} and {"10", "1", "0"}.
{"111001"} is an invalid subset because it contains 4 1's, greater than the maximum of 3.

**Example 2:**

**Input:** strs = \["10","0","1"\], m = 1, n = 1
**Output:** 2
**Explanation:** The largest subset is {"0", "1"}, so the answer is 2.

**Constraints:**

*   `1 <= strs.length <= 600`
*   `1 <= strs[i].length <= 100`
*   `strs[i]` consists only of digits `'0'` and `'1'`.
*   `1 <= m, n <= 100`

## Code 

和 [[Partition Equal Subset Sum|Partition Equal Subset Sum]] 一樣是 knapsack 類型的題目。不過這題是一個 3D 的  DP。

Time Complexity: $O(kmn)$, Space Complexity: $O(kmn)$

```cpp
class Solution {
public:
    int findMaxForm(vector<string>& strs, int m, int n) {
        int k = strs.size();
        int dp[k + 1][m + 1][n + 1];
        memset(dp, 0, sizeof(dp));

        for(int i = 1; i < k + 1; i++) {
            auto count = convert(strs[i - 1]);
            auto zeros = count[0];
            auto ones = count[1];
            for(int j = 0; j < m + 1; j++) {
                for(int l = 0; l < n + 1; l++) {
                    int res = dp[i - 1][j][l];
                    if((j >= zeros) && (l >= ones)) {
                        res = max(res, dp[i - 1][j - zeros][l - ones] + 1);
                    }
                    dp[i][j][l] = res;
                }
            }
        }

        return dp[k][m][n];


    }

    vector<int> convert(string s) {
        int zero = 0, one = 0;
        for(auto c: s) {
            if(c == '0') {
                zero++;
            } else if (c == '1') {
                one++;
            }
        }

        return {zero, one};
    }
};
```

## Source
- [Ones and Zeroes - LeetCode](https://leetcode.com/problems/ones-and-zeroes/description/)