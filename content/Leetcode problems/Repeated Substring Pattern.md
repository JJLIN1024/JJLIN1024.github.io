---
title: Repeated Substring Pattern
date: 2023-12-30
lastmod: 2023-12-30
author:
  - Jimmy Lin
tags:
  - string
  - kmp_algorithm
  - review
draft: false
sr-due: 2024-06-01
sr-interval: 93
sr-ease: 290
---

## Description

Given a string `s`, check if it can be constructed by taking a substring of it and appending multiple copies of the substring together.

**Example 1:**

**Input:** s = "abab"
**Output:** true
**Explanation:** It is the substring "ab" twice.

**Example 2:**

**Input:** s = "aba"
**Output:** false

**Example 3:**

**Input:** s = "abcabcabcabc"
**Output:** true
**Explanation:** It is the substring "abc" four times or the substring "abcabc" twice.

**Constraints:**

*   `1 <= s.length <= 104`
*   `s` consists of lowercase English letters.

## Code 

Time Complexity: $O(N)$, Space Complexity: $O(N)$

use KMP algorithm, same as [[Find the Index of the First Occurrence in a String]].

Key point is the meaning of the `lps` array.

```cpp
class Solution {
public:
    bool repeatedSubstringPattern(string s) {
        int n = s.length();
        vector<int> lps(n, 0);

        int j = 1, i = 0;
        while(j < n) {
            if(s[j] == s[i]) {
                lps[j++] = ++i;
            } else {
                if(i == 0) j++;
                else {
                    i = lps[i - 1];
                }
            }
        }

        return lps[n - 1] && n % (n - lps[n - 1]) == 0;
    }
};
```

## Source
- [Repeated Substring Pattern - LeetCode](https://leetcode.com/problems/repeated-substring-pattern/description/)