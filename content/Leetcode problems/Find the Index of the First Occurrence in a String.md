---
title: Find the Index of the First Occurrence in a String
date: 2023-12-29
lastmod: 2023-12-29
author:
  - Jimmy Lin
tags:
  - string
  - kmp_algorithm
draft: false
---

## Description

Given two strings `needle` and `haystack`, return the index of the first occurrence of `needle` in `haystack`, or `-1` if `needle` is not part of `haystack`.

**Example 1:**

**Input:** haystack = "sadbutsad", needle = "sad"
**Output:** 0
**Explanation:** "sad" occurs at index 0 and 6.
The first occurrence is at index 0, so we return 0.

**Example 2:**

**Input:** haystack = "leetcode", needle = "leeto"
**Output:** -1
**Explanation:** "leeto" did not occur in "leetcode", so we return -1.

**Constraints:**

*   `1 <= haystack.length, needle.length <= 104`
*   `haystack` and `needle` consist of only lowercase English characters.

## Code 

Time Complexity: $O(N + M)$, Space Complexity: $O(N)$

標準 KMP algorithm。

```cpp
class Solution {
public:
    int strStr(string haystack, string needle) {
        int n = needle.length();
        vector<int> lps(n, 0);
        // build lps
        int len = 0;
        for(int i = 1; i < n;) {
            if(needle[i] == needle[len]) {
                lps[i++] = ++len;
            } else {
                if(len == 0) {
                    i++;
                } else {
                    len = lps[len - 1];
                }
            }
        }


        // kmp algorithm
        int m = haystack.length();
        int i = 0, j = 0;
        while(i < m) {
            if(haystack[i] == needle[j]) {
                i++;
                j++;
                if(j == n) return i - j;
            } else {
                if(j == 0) i++;
                else {
                    j = lps[j - 1];
                }
            }
        }
        return -1;
    }
};
```

## Source
- [Find the Index of the First Occurrence in a String - LeetCode](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/description/)