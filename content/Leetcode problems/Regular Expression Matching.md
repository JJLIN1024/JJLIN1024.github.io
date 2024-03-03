---
title: Regular Expression Matching
date: 2024-02-01
lastmod: 2024-02-01
author: Jimmy Lin
tags:
  - DP
draft: false
---

## Description

Given an input string `s` and a pattern `p`, implement regular expression matching with support for `'.'` and `'*'` where:

*   `'.'` Matches any single character.​​​​
*   `'*'` Matches zero or more of the preceding element.

The matching should cover the **entire** input string (not partial).

**Example 1:**

**Input:** s = "aa", p = "a"
**Output:** false
**Explanation:** "a" does not match the entire string "aa".

**Example 2:**

**Input:** s = "aa", p = "a\*"
**Output:** true
**Explanation:** '\*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".

**Example 3:**

**Input:** s = "ab", p = ".\*"
**Output:** true
**Explanation:** ".\*" means "zero or more (\*) of any character (.)".

**Constraints:**

*   `1 <= s.length <= 20`
*   `1 <= p.length <= 20`
*   `s` contains only lowercase English letters.
*   `p` contains only lowercase English letters, `'.'`, and `'*'`.
*   It is guaranteed for each appearance of the character `'*'`, there will be a previous valid character to match.

## Code 

### Top Down DP with memo

- 對於 index i 來說
	- 如果目前字串（s）和 regex（p）相同，比較 index i + 1 之後的部分
		-  `dp[i][j] = dp[i + 1][j + 1]`
	- 如果 p 目前是 . 代表可以 match 任何字母，所以一樣比較  index i + 1 之後的部分 
		- `dp[i][j] = dp[i + 1][j + 1]`
	- 如果 p 在 i + 1 的部分是 star ，一個 star 代表可以 match 0 或是多個 preceding character，例如 `a*` 代表可以 match 0 或是多個 a，因此分成兩種 case
		- match 0: 比較 i + 2 之後的部分
			-  `dp[i][j] = dp[i][j + 2]`
		- match 1 ~ n：比較 i + 1, i + 2, i + 3 ... ... 之後的部分
			- `dp[i][j] = dp[i + 1][j + 2] || dp[i + 2][j + 2] || dp[i + 3][j + 2] || ......`

```cpp
class Solution {
public:
    bool isMatch(string s, string p) {
        int m = s.length(), n = p.length();
        vector<vector<int>> memo(m + 1, vector<int>(n + 1, -1));
        return isMatch(0, 0, s, p, memo);
    }

    bool isMatch(int i, int j, string& s, string& p, vector<vector<int>>& memo) {
        int sn = s.length(), pn = p.length();
        if(j == pn) return i == sn;
        if(memo[i][j] != -1) return memo[i][j];
        if(p[j + 1] == '*') {
            if(isMatch(i, j + 2, s, p, memo)) return memo[i][j] = true; // case: *a match zero a
            while(i < sn && (p[j] == s[i] || p[j] == '.')) { // case: *a match one or more a
                if(isMatch(++i, j + 2, s, p, memo)) return memo[i][j] = true;
            }
        } else if(i < sn && (p[j] == '.' || s[i] == p[j])) {
            return memo[i][j] = isMatch(i + 1, j + 1, s, p, memo);
        }
        return memo[i][j] = false;
    }
};
```

## Bottom Up

和 [[Edit Distance]] 以及 [[Distinct Subsequences]] 類似。
 
Time Complexity: $O(nm)$, Space Complexity: $O(nm)$

注意 `for(int i = m ; i >= 0; i--) ` 是從 `i = m` 開始，以 `s = "aa", p = "a*` 去 dry run 就會知道為何。

```cpp
class Solution {
public:
    bool isMatch(string s, string p) {
        int m = s.length(), n = p.length();
        vector<vector<bool>> dp(m + 1, vector<bool>(n + 1, false));
        dp[m][n] = true;
        for(int i = m ; i >= 0; i--) {
            for(int j = n - 1; j >= 0; j--) {
                if(p[j + 1] == '*') {
                    dp[i][j] = dp[i][j + 2] || i < m && (p[j] == '.' || s[i] == p[j]) && dp[i + 1][j];
                } else {
                    dp[i][j] = i < m && (p[j] == '.' || s[i] == p[j]) && dp[i + 1][j + 1];
                }  
            }
        }
        return dp[0][0];
    }


};
```

## Source
- [Regular Expression Matching - LeetCode](https://leetcode.com/problems/regular-expression-matching/description/)