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
sr-due: 2024-02-02
sr-interval: 4
sr-ease: 270
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

- for start = end (e.g. 'a'), state(start, end) is True 
- for start + 1 = end (e.g. 'aa'), state(start, end) is True if `s[start] = s[end] `
- for start + 2 = end (e.g. 'aba'), state(start, end) is True if `s[start] = s[end]` and state(start + 1, end - 1) 
- for start + 3 = end (e.g. 'abba'), state(start, end) is True if `s[start] = s[end]` and state(start + 1, end - 1) ...

Time Complexity: $O(n^2)$, Space Complexity: $O(n^2)$

```cpp
class Solution {
public:
    string longestPalindrome(string s) {
        int n = s.length();
        vector<vector<bool>> dp(n, vector<bool>(n, false));
        int start = 0, len = 1;
        for(int i = n - 1; i >= 0; i--) {
            for(int j = i; j < n; j++) {
                if(s[i] == s[j]) {
                    if((i == j) || (j == i + 1)) dp[i][j] = true;
                    else dp[i][j] = dp[i + 1][j - 1];
                }
                
                if(dp[i][j] == true) {
                    if((j - i + 1) > len) {
                        len = j - i + 1;
                        start = i;
                    }

                }
            }
        }
        return s.substr(start, len);
    }
};
```

## Source
- [Longest Palindromic Substring - LeetCode](https://leetcode.com/problems/longest-palindromic-substring/description/)