---
title: Reverse Words in a String III
date: 2023-10-07
lastmod: 2023-10-07
author:
  - Jimmy Lin
tags:
  - string
draft: false
---

## Description

Given a string `s`, reverse the order of characters in each word within a sentence while still preserving whitespace and initial word order.↳

**Example 1:**

**Input:** s = "Let's take LeetCode contest"
**Output:** "s'teL ekat edoCteeL tsetnoc"

**Example 2:**

**Input:** s = "God Ding"
**Output:** "doG gniD"

**Constraints:**

*   `1 <= s.length <= 5 * 104`
*   `s` contains printable **ASCII** characters.
*   `s` does not contain any leading or trailing spaces.
*   There is **at least one** word in `s`.
*   All the words in `s` are separated by a single space.

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(1)$

相比於 [[Reverse Words in a String]] 而言，因為 preserve the whitespace，簡單許多。

```cpp
class Solution {
public:
    string reverseWords(string s) {
        int i = 0;
        for(int j = i; j < s.size(); j++) {
            if(s[j] == ' ') {
                reverse(s.begin() + i, s.begin() + j);
                i = j + 1;
            }
        }
        reverse(s.begin() + i, s.end());
        return s;
    }
};
```

## Source
- [Reverse Words in a String III - LeetCode](https://leetcode.com/problems/reverse-words-in-a-string-iii/description/?envType=daily-question&envId=2023-10-07)