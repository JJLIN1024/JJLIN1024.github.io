---
title: Reverse Words in a String
date: 2024-02-29
lastmod: 2024-02-29
author:
  - Jimmy Lin
tags:
  - string
  - review
draft: false
sr-due: 2024-03-04
sr-interval: 4
sr-ease: 270
---

## Description

Given an input string `s`, reverse the order of the **words**.

A **word** is defined as a sequence of non-space characters. The **words** in `s` will be separated by at least one space.

Return _a string of the words in reverse order concatenated by a single space._

**Note** that `s` may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words. Do not include any extra spaces.

**Example 1:**

**Input:** s = "the sky is blue"
**Output:** "blue is sky the"

**Example 2:**

**Input:** s = "  hello world  "
**Output:** "world hello"
**Explanation:** Your reversed string should not contain leading or trailing spaces.

**Example 3:**

**Input:** s = "a good   example"
**Output:** "example good a"
**Explanation:** You need to reduce multiple spaces between two words to a single space in the reversed string.

**Constraints:**

*   `1 <= s.length <= 104`
*   `s` contains English letters (upper-case and lower-case), digits, and spaces `' '`.
*   There is **at least one** word in `s`.

**Follow-up:** If the string data type is mutable in your language, can you solve it **in-place** with `O(1)` extra space?

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    string reverseWords(string s) {
        int i = 0, j = 0, n = s.length();
        int wordCount = 0;
        while(j < n) {
            while(j < n && s[j] == ' ') j++;
            if(j == n) break;

            if(wordCount) s[i++] = ' ';

            int l = i;
            while(j < n && s[j] != ' ') {
                s[i++] = s[j++];
            }
            if(i > l) {
                reverse(s.begin() + l, s.begin() + i);
                wordCount++;
            }
        }
        s = s.substr(0, i);
        reverse(s.begin(), s.end());
        return s;
    }
};
```

## Source
- [Reverse Words in a String - LeetCode](https://leetcode.com/problems/reverse-words-in-a-string/description/)