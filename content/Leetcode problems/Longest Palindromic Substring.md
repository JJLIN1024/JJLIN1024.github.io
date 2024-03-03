---
title: Longest Palindromic Substring
date: 2024-01-29
lastmod: 2024-01-29
author: Jimmy Lin
tags:
  - DP
  - palindrome
  - review
draft: false
sr-due: 2024-07-20
sr-interval: 143
sr-ease: 290
---

## Description

Given a string `s`, return _the longest_

_palindromic_

_substring_

in `s`.

**Example 1:**

**Input:** s = "babad"
**Output:** "bab"
**Explanation:** "aba" is also a valid answer.

**Example 2:**

**Input:** s = "cbbd"
**Output:** "bb"

**Constraints:**

*   `1 <= s.length <= 1000`
*   `s` consist of only digits and English letters.

## Code 

就是 [[Palindromic Substrings]] 找最長的而已。

Time Complexity: $O(n^2)$, Space Complexity: $O(n^2)$

```cpp
class Solution {
public:
    string longestPalindrome(std::string s) {
        int n = s.length();
        vector<vector<bool>> dp(n, vector<bool>(n, false));
        int lps = 1, start = 0;
        for(int len = 1; len <= n; len++) {
            for(int i = 0; i < n - len + 1; i++) {
                if(s[i] == s[i + len - 1] && (len <= 2 || dp[i + 1][i + len - 2])) {
                    dp[i][i + len - 1] = true;
                    if(len > lps) {
                        lps = len;
                        start = i;
                    }
                }   
            }
        }
        return s.substr(start, lps);
    }
};
```

## Source
- [Longest Palindromic Substring - LeetCode](https://leetcode.com/problems/longest-palindromic-substring/description/)