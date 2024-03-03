---
title: Valid Palindrome II
date: 2024-02-29
lastmod: 2024-02-29
author:
  - Jimmy Lin
tags:
  - string
draft: false
---

## Description

Given a string `s`, return `true` _if the_ `s` _can be palindrome after deleting **at most one** character from it_.

**Example 1:**

**Input:** s = "aba"
**Output:** true

**Example 2:**

**Input:** s = "abca"
**Output:** true
**Explanation:** You could delete the character 'c'.

**Example 3:**

**Input:** s = "abc"
**Output:** false

**Constraints:**

*   `1 <= s.length <= 105`
*   `s` consists of lowercase English letters.

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    bool validPalindrome(string s) {
        int i = 0, j = s.length() - 1, k = 1;
        return dfs(s, i, j, k);
    }

    bool dfs(string& s, int i, int  j, int k) {
        if(k < 0 && i < j) 
            return false;
        if(i >= j) {
            return k >= 0;
        }
        if(s[i] == s[j]) {
            return dfs(s, i + 1, j - 1, k);
        } else {
            return dfs(s, i + 1, j, k - 1) || dfs(s, i, j - 1, k - 1);
        }
    }
};
```

## Source
- [Valid Palindrome II - LeetCode](https://leetcode.com/problems/valid-palindrome-ii/description/)