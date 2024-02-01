---
title: Palindromic Substrings
date: 2024-01-29
lastmod: 2024-01-29
author: Jimmy Lin
tags:
  - DP
  - review
draft: false
sr-due: 2024-02-03
sr-interval: 4
sr-ease: 270
---

## Description

Given a string `s`, return _the number of **palindromic substrings** in it_.

A string is a **palindrome** when it reads the same backward as forward.

A **substring** is a contiguous sequence of characters within the string.

**Example 1:**

**Input:** s = "abc"
**Output:** 3
**Explanation:** Three palindromic strings: "a", "b", "c".

**Example 2:**

**Input:** s = "aaa"
**Output:** 6
**Explanation:** Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".

**Constraints:**

*   `1 <= s.length <= 1000`
*   `s` consists of lowercase English letters.

## Code 

### Expands

Simply expand in Odd length and Even Length.

```cpp
class Solution {
public:
    int countSubstrings(string s) {
        int res = 1, n = s.length();
        int count = 0;

        for(int i = 0; i < n; i++) {
            count += expand(s, i, i);
            count += expand(s, i, i + 1);
        }
        
        return count;
    }

    int expand(string& s, int l, int r) {
        int count = 0;
        while(l >= 0 && r < s.length() && s[l] == s[r]) {
            count++;
            l--;
            r++;
        }
        return count;
    }
};

```

### DP
Time Complexity: $O(n^2)$, Space Complexity: $O(n^2)$

- for start = end (e.g. 'a'), state(start, end) is True 
- for start + 1 = end (e.g. 'aa'), state(start, end) is True if `s[start] = s[end] `
- for start + 2 = end (e.g. 'aba'), state(start, end) is True if `s[start] = s[end]` and state(start + 1, end - 1) 
- for start + 3 = end (e.g. 'abba'), state(start, end) is True if `s[start] = s[end]` and state(start + 1, end - 1) ...

`DP[i][j] = DP[i + 1][j - 1] if s[i] == s[j]`，注意這題是 count how many，不是 count the length。

```cpp
class Solution {
public:
    int countSubstrings(string s) {
        int n = s.length();
        int dp[n][n];
        memset(dp, 0, sizeof(dp));

        int count = 0;
        for(int i = n - 1; i >= 0; i--) {
            for(int j = i; j < n; j++) {
                if(s[i] == s[j]) {
                    if(i == j) dp[i][j] = 1;
                    else if(i + 1 == j) dp[i][j] = 1;
                    else dp[i][j] = dp[i + 1][j - 1];
                }
                count += dp[i][j];
            }
        }
        return count;
    }
};

```

## Source
- [Palindromic Substrings - LeetCode](https://leetcode.com/problems/palindromic-substrings/description/)