---
title: Reverse String II
date: 2023-10-07
lastmod: 2023-10-07
author:
  - Jimmy Lin
tags:
  - string
draft: false
---

## Description

Given a string `s` and an integer ↳`k`, reverse the first `k` characters for every `2k` characters counting from the start of the string.

If there are fewer than `k` characters left, reverse all of them. If there are less than `2k` but greater than or equal to `k` characters, then reverse the first `k` characters and leave the other as original.

**Example 1:**

**Input:** s = "abcdefg", k = 2
**Output:** "bacdfeg"

**Example 2:**

**Input:** s = "abcd", k = 2
**Output:** "bacd"

**Constraints:**

*   `1 <= s.length <= 104`
*   `s` consists of only lowercase English letters.
*   `1 <= k <= 104`

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    string reverseStr(string s, int k) {
        int i = 0, j = 0;
        int n = s.size();
        while(j < n) {
            j += 2 * k;
            if(j >= n) break;
            reverse(s.begin() + i, s.begin() + j - k);
            i = j;
        }
        
        if((n - i) < k) reverse(s.begin() + i, s.end());
        else {
            reverse(s.begin() + i, s.begin() + i + k);
        }
        return s;
    }   
};
```

## Source
- [Reverse String II - LeetCode](https://leetcode.com/problems/reverse-string-ii/)