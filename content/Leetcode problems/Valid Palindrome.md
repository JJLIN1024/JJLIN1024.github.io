---
title: Valid Palindrome
date: 2023-02-17
lastmod: 2023-02-17
author:
  - Jimmy Lin
tags:
  - two_pointer
draft: false
---

## Description

A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string `s`, return `true` _if it is a **palindrome**, or_ `false` _otherwise_.

**Example 1:**

**Input:** s = "A man, a plan, a canal: Panama"
**Output:** true
**Explanation:** "amanaplanacanalpanama" is a palindrome.

**Example 2:**

**Input:** s = "race a car"
**Output:** false
**Explanation:** "raceacar" is not a palindrome.

**Example 3:**

**Input:** s = " "
**Output:** true
**Explanation:** s is an empty string "" after removing non-alphanumeric characters.
Since an empty string reads the same forward and backward, it is a palindrome.

**Constraints:**

*   `1 <= s.length <= 2 * 105`
*   `s` consists only of printable ASCII characters.

## Code 

Time Complexity: $O(N)$, Space Complexity: $O(1)$

### Two Pass

First Pass：先用 [[Removing Stars From a String]] 的邏輯將非相關的 char 都 prune 掉。
Second Pass：檢查是否為 palindrome。

```cpp
class Solution {
public:
    bool isPalindrome(string s) {
        int j = 0;
        for(int i = 0; i < s.length(); i++) {
            if(isalnum(s[i])) {
                if(isupper(s[i])) s[i] = tolower(s[i]);
                s[j++] = s[i];
            }
        }
        s = s.substr(0, j);
        if(s.length() == 0) return true;
        int l = 0, r = s.length() - 1;
        while(l < r) {
            if(s[l++] != s[r--]) return false;
        }

        return true;
    }
};
```

### One Pass

其實上述的兩個 pass 是可以合在一起做的。

```cpp
class Solution {
public:
    bool isPalindrome(string s) {
        int l = 0, r = s.length() - 1;
        while(l < r) {
            while(l < r && !isalnum(s[l])) l++;
            while(l < r && !isalnum(s[r])) r--;
            if(tolower(s[l++]) != tolower(s[r--])) return false;
        }
        return true;
    }
};
```


## Source
- [Valid Palindrome - LeetCode](https://leetcode.com/problems/valid-palindrome/description/)