---
title: Apply Operations to Make Two Strings Equal
date: 2023-10-08
lastmod: 2023-10-08
author:
  - Jimmy Lin
tags:
  - DP
  - dfs
  - memoization
draft: false
---

## Description

You are given two **0-indexed** binary strings `s1` and `s2`, both of length `n`, and a positive integer `x`.

You can perform any of the following operations on the string `s1` **any** number of times:

*   Choose two indices `i` and `j`, and flip both `s1[i]` and `s1[j]`. The cost of this operation is `x`.
*   Choose an index `i` such that `i < n - 1` and flip both `s1[i]` and `s1[i + 1]`. The cost of this operation is `1`.

Return _the **minimum** cost needed to make the strings_ `s1` _and_ `s2` _equal, or return_ `-1` _if it is impossible._

**Note** that flipping a character means changing it from `0` to `1` or vice-versa.

**Example 1:**

**Input:** s1 = "1100011000", s2 = "0101001010", x = 2
**Output:** 4
**Explanation:** We can do the following operations:
- Choose i = 3 and apply the second operation. The resulting string is s1 = "110**11**11000".
- Choose i = 4 and apply the second operation. The resulting string is s1 = "1101**00**1000".
- Choose i = 0 and j = 8 and apply the first operation. The resulting string is s1 = "**0**1010010**1**0" = s2.
The total cost is 1 + 1 + 2 = 4. It can be shown that it is the minimum cost possible.

**Example 2:**

**Input:** s1 = "10110", s2 = "00011", x = 4
**Output:** -1
**Explanation:** It is not possible to make the two strings equal.

**Constraints:**

*   `n == s1.length == s2.length`
*   `1 <= n, x <= 500`
*   `s1` and `s2` consist only of the characters `'0'` and `'1'`.

## Code 

### DP with memoization
Time Complexity: $O()$, Space Complexity: $O()$

`1001` & `0000` 可以由兩種方式變換成相同：

1. 換 index `0` & `3`，with cost `x`
2. 將 `0000` 換成 `1100`，再換成 `1010`，再換成 `1001`，with cost `3`。

```cpp
class Solution {
    int dp[501][501];
public:
    int minOperations(string s1, string s2, int x) {
        vector<int> diff;
        for(int i = 0; i < s1.size(); i++) {
            if(s1[i] != s2[i]) 
                diff.push_back(i);
        }
        
        if(diff.size() % 2 != 0) return -1;
        if(diff.size() == 0) return 0;

        for(int i = 0; i < 501; i++) {
            for(int j = 0; j < 501; j++) {
                dp[i][j] = -1;
            }
        }

        return solve(diff, 0, x, 0);
    }

    int solve(vector<int>& d, int i, int x, int n) {
        if(i == d.size()) return 0;
        if(dp[i][n] != -1) return dp[i][n];

        int res = INT_MAX;
        if(i + 1 < d.size()) {
            res = min(res, d[i + 1] - d[i] + solve(d, i + 2, x, n)); // second operation
        }
        
        res = min(res, x + solve(d, i + 1, x, n + 1)); // first operation, n + 1 means we have + 1 operation to pair with in the future subproblem

        if(n > 0) 
            res = min(res, solve(d, i + 1, x, n - 1));
        
        return dp[i][n] = res;
    }


};

```

## Source
- [Apply Operations to Make Two Strings Equal - LeetCode](https://leetcode.com/problems/apply-operations-to-make-two-strings-equal/description/)