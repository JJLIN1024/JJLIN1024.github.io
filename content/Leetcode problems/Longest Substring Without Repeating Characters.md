---
title: Longest Substring Without Repeating Characters
date: 2023-10-15
lastmod: 2023-10-15
author: Jimmy Lin
tags:
  - sliding_window
  - two_pointer
  - review
draft: false
sr-due: 2024-02-28
sr-interval: 44
sr-ease: 290
---

## Description

Given a string `s`, find the length of the **longest**

**substring**

without repeating characters.

**Example 1:**

**Input:** s = "abcabcbb"
**Output:** 3
**Explanation:** The answer is "abc", with the length of 3.

**Example 2:**

**Input:** s = "bbbbb"
**Output:** 1
**Explanation:** The answer is "b", with the length of 1.

**Example 3:**

**Input:** s = "pwwkew"
**Output:** 3
**Explanation:** The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

**Constraints:**

*   `0 <= s.length <= 5 * 104`
*   `s` consists of English letters, digits, symbols and spaces.

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(n)$

和 [[Contiguous Array]] 中一樣將起始點設為 -1（`i = -1`），因為考慮到若整個 array 都是答案的情況。

`if(mp[s[j]] > i)` 是為了 `abba` 這種 case，這時遇到後面的 `a` 時就不應該將 `i` 移往前面的那個 `a`。

```cpp
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_map<char, int> mp;
        int i = -1, j = 0;
        int res = 0;
        for(int j = 0; j < s.length(); j++) {
            if(mp.find(s[j]) != mp.end()) {
                if(mp[s[j]] > i)
                    i = mp[s[j]];
            } 
            mp[s[j]] = j;
            res = max(res, j - i);
        }
        return res;
    }
};
```

## Source
- [Longest Substring Without Repeating Characters - LeetCode](https://leetcode.com/problems/longest-substring-without-repeating-characters/description/)