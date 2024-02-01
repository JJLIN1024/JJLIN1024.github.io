---
title: Longest Happy Prefix
date: 2023-12-30
lastmod: 2023-12-30
author:
  - Jimmy Lin
tags:
  - string
  - kmp_algorithm
draft: false
---

## Description

A string is called a **happy prefix** if is a **non-empty** prefix which is also a suffix (excluding itself).

Given a string `s`, return _the **longest happy prefix** of_ `s`. Return an empty string `""` if no such prefix exists.

**Example 1:**

**Input:** s = "level"
**Output:** "l"
**Explanation:** s contains 4 prefix excluding itself ("l", "le", "lev", "leve"), and suffix ("l", "el", "vel", "evel"). The largest prefix which is also suffix is given by "l".

**Example 2:**

**Input:** s = "ababab"
**Output:** "abab"
**Explanation:** "abab" is the largest prefix which is also suffix. They can overlap in the original string.

**Constraints:**

*   `1 <= s.length <= 105`
*   `s` contains only lowercase English letters.

## Code 

Time Complexity: $O(N)$, Space Complexity: $O(N)$

經典 KMP Algorithm 的應用。和 [[Find the Index of the First Occurrence in a String]] 同樣解法。

關鍵在於 `lps` array 的意義。

```cpp
class Solution {
public:
    string longestPrefix(string s) {
        int n = s.length();
        vector<int> lps(n, 0);
        int len = 0, i = 1;
        while(i < n) {
            if(s[i] == s[len]) {
                lps[i++] = ++len;
            } else {
                if(len == 0) lps[i++] = 0;
                else {
                    len = lps[len - 1];
                }
            }
        }

        return s.substr(0, lps.back());
    }
};
```

## Source
- [Longest Happy Prefix - LeetCode](https://leetcode.com/problems/longest-happy-prefix/description/)