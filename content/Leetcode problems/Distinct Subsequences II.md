---
title: Distinct Subsequences II
date: 2024-03-05
lastmod: 2024-03-05
author:
  - Jimmy Lin
tags:
  - DP
  - review
draft: false
sr-due: 2024-03-24
sr-interval: 15
sr-ease: 290
---

## Description

Given a string s, return _the number of **distinct non-empty subsequences** of_ `s`. Since the answer may be very large, return it **modulo** `109 + 7`.

A **subsequence** of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., `"ace"` is a subsequence of `"abcde"` while `"aec"` is not.

**Example 1:**

**Input:** s = "abc"
**Output:** 7
**Explanation:** The 7 distinct subsequences are "a", "b", "c", "ab", "ac", "bc", and "abc".

**Example 2:**

**Input:** s = "aba"
**Output:** 6
**Explanation:** The 6 distinct subsequences are "a", "b", "ab", "aa", "ba", and "aba".

**Example 3:**

**Input:** s = "aaa"
**Output:** 3
**Explanation:** The 3 distinct subsequences are "a", "aa" and "aaa".

**Constraints:**

*   `1 <= s.length <= 2000`
*   `s` consists of lowercase English letters.

## Code 

考慮 `abcca`：

一開始是 `a`，然後是 `ab, b`，然後是 `ac, abc, bc, c`，遇到第二個 `c` 時，不重複的 subsequence 只有可能是把第二個 c 直接貼到第一個 c 後面，因為若把第二個 c 當成第一個 c 來用就重複了。

而 `acc, abcc, bcc, cc` 的個數會剛好跟 `a, ab, b` 加上 `c` 本身相等，所以對於第二個 c 來說，在 dp 累加時，就不用加第一個 c 的 dp 數了。

Time Complexity: $O(n^2)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    int distinctSubseqII(string s) {
        int n = s.length(), mod = 1e9 + 7, res = 0;

        // dp[i]: #unique subsequences ends in i
        vector<int> dp(n, 1);
        for(int i = 0; i < n; i++) {
            for(int j = 0; j < i; j++) {
                if(s[i] != s[j]) {
                    dp[i] = (dp[i] + dp[j]) % mod;
                }
            }
            res = (res + dp[i]) % mod;
        }
        return res;
    }
};
```

Time Complexity: $O(n)$, Space Complexity: $O(n)$

嚴格來說是 `O(26 n)` ，概念是一樣的，只是用 26 constant 讓解法變成 $O(n)$。

```cpp
class Solution {
public:
    int distinctSubseqII(string S) {
        long endsWith[26] = {}, mod = 1e9 + 7;
        for (char c : S)
            endsWith[c - 'a'] = accumulate(begin(endsWith), end(endsWith), 1L) % mod;
        return accumulate(begin(endsWith), end(endsWith), 0L) % mod;
    }
};
```
## Source
- [Distinct Subsequences II - LeetCode](https://leetcode.com/problems/distinct-subsequences-ii/description/)