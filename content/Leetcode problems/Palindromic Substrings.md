---
title: Palindromic Substrings
date: 2024-01-29
lastmod: 2024-01-29
author: Jimmy Lin
tags:
  - DP
  - review
draft: false
sr-due: 2024-03-04
sr-interval: 5
sr-ease: 250
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

我們知道長度為 1 必定是 palindrome，長度為 2 若相同則也是 palindrome，長度 3 以上，就要看頭尾是否相等，以及去掉頭尾之後是否是 palindrome。

```cpp
class Solution {
public:
    int countSubstrings(string s) {
        int n = s.length();
        vector<vector<bool>> dp(n, vector<bool>(n, false));
        int ans = 0;
        for(int len = 1; len <= n; len++) {
            for(int i = 0; i < n - len + 1; i++) {
                if(s[i] == s[i + len - 1] && (len <= 2 || dp[i + 1][i + len - 2])) {
                    dp[i][i + len - 1] = true;
                    ans++;
                }
            }
        }
        return ans;
    }
};

/*
dp[i][j] : s[i ... j] is a palindrome
dp[i][j] = true if s[i] == s[j] && dp[i + 1][j - 1] = true;
*/
```

## Source
- [Palindromic Substrings - LeetCode](https://leetcode.com/problems/palindromic-substrings/description/)