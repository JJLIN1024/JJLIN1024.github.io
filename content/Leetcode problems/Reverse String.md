---
title: Reverse String
date: 2023-10-07
lastmod: 2023-10-07
author:
  - Jimmy Lin
tags:
  - string
draft: false
---

## Description

Write a function that reverses a string. The input string is given as an array of characters `s`.↳

You must do this by modifying the input array [in-place](https://en.wikipedia.org/wiki/In-place_algorithm) with `O(1)` extra memory.↳

**Example 1:**

**Input:** s = \["h","e","l","l","o"\]
**Output:** \["o","l","l","e","h"\]

**Example 2:**

**Input:** s = \["H","a","n","n","a","h"\]
**Output:** \["h","a","n","n","a","H"\]

**Constraints:**

*   `1 <= s.length <= 105`
*   `s[i]` is a [printable ascii character](https://en.wikipedia.org/wiki/ASCII#Printable_characters).

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    void reverseString(vector<char>& s) {
        int n = s.size();
        for(int i = 0; i < n / 2; i++) {
            swap(s[i], s[n - 1 - i]);
        }
    }
};
```

## Source
- [Reverse String - LeetCode](https://leetcode.com/problems/reverse-string/description/)