---
title: Longest Palindrome
date: 2023-03-14
lastmod: 2023-03-14
author:
  - Jimmy Lin
tags:
  - string
  - palindrome
draft: false
---

## Description

Given a string `s` which consists of lowercase or uppercase letters, return _the length of the **longest palindrome**_ that can be built with those letters.

Letters are **case sensitive**, for example, `"Aa"` is not considered a palindrome here.

**Example 1:**

**Input:** s = "abccccdd"
**Output:** 7
**Explanation:** One longest palindrome that can be built is "dccaccd", whose length is 7.

**Example 2:**

**Input:** s = "a"
**Output:** 1
**Explanation:** The longest palindrome that can be built is "a", whose length is 1.

**Constraints:**

*   `1 <= s.length <= 2000`
*   `s` consists of lowercase **and/or** uppercase English letters only.

## Code 

The use of `std::count`。

```cpp
class Solution {
public:
    int longestPalindrome(string s) {
        int odd = 0;
        for(int c = 'A'; c <= 'z'; c++) {
            odd += count(s.begin(), s.end(), c) & 1;
        }
        return s.size() - odd + (odd > 0);
    }

};
```

```cpp
class Solution {
public:
    int longestPalindrome(string s) {
        unordered_map<char, int> fre;
        for(auto c: s) {
            fre[c]++;
        }

        int res = 0;
        bool flag = false;
        for(auto f: fre) {
            if(f.second % 2 == 0) res += f.second;
            else {
                flag = true;
                res += (f.second - 1);
            }
        }
        return res + (flag ? 1 : 0);
    }
};
```
## Source
- [Longest Palindrome - LeetCode](https://leetcode.com/problems/longest-palindrome/description/)