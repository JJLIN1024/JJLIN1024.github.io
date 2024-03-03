---
title: Longest Palindromic Subsequence
date: 2023-04-14
lastmod: 2023-04-14
author: Jimmy Lin
tags: ["dynamic programming"]
draft: false
---

## Description

Given a string `s`, find _the longest palindromic **subsequence**'s length in_ `s`.

A **subsequence** is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.

**Example 1:**

**Input:** s = "bbbab"
**Output:** 4
**Explanation:** One possible longest palindromic subsequence is "bbbb".

**Example 2:**

**Input:** s = "cbbd"
**Output:** 2
**Explanation:** One possible longest palindromic subsequence is "bb".

**Constraints:**

*   `1 <= s.length <= 1000`
*   `s` consists only of lowercase English letters.

## Code 

### Brute Force Recursion

$O(2^n)$, Time Limit Exceed.
```cpp
class Solution {
public:
    int longestPalindromeSubseq(string s) {
        int l = 0, r = s.length() - 1;
        return lps(l, r, s);
    }

    int lps(int left, int right, string& s) {
        if(left == right) return 1;
        if(left > right) return 0;
        if(s[left] == s[right]) {
            return lps(left + 1, right - 1, s) + 2;
        } else {
            return max(lps(left+1, right, s), lps(left, right - 1, s));
        }
    }
};
```

### With Memo
$O(n^2)$, pass all tests
```cpp
class Solution {
public:
    int longestPalindromeSubseq(string s) {
        int l = 0, r = s.length() - 1, n = s.length();
        vector<vector<int>> dp(n, vector<int>(n, NULL));
        return lps(l, r, s, dp);
    }

    int lps(int left, int right, string& s, vector<vector<int>>& dp) {
        if(dp[left][right] != NULL) return dp[left][right];

        if(left == right) {
            return dp[left][right] = 1;
        }
        if(left > right) {
            return dp[left][right] = 0;
        }

        if(s[left] == s[right]) {
            return dp[left][right] = lps(left + 1, right - 1, s, dp) + 2;
        } else {
            return dp[left][right] = max(lps(left+1, right, s, dp), lps(left, right - 1, s, dp));
        }
    }
};
```

### DP
```cpp
class Solution {
public:
    int longestPalindromeSubseq(string s) {
        int n = s.length();
        vector<vector<int>> dp(n, vector<int>(n, 0));
        for(int i = 0; i < n; i++) {
            dp[i][i] = 1;
        }

        for(int d = 1; d < n; d++) {
            for(int i = 0; i < n - d; i++) {
                int j = i + d;
                dp[i][j] = s[i] == s[j] ? dp[i + 1][j - 1] + 2 : max(dp[i+1][j], dp[i][j-1]);
            }
        }

        return dp[0][n-1];
    }

};
```

## Source
- [Longest Palindromic Subsequence - LeetCode](https://leetcode.com/problems/longest-palindromic-subsequence/description/)