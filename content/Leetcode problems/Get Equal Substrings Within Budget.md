---
title: Get Equal Substrings Within Budget
date: 2023-10-15
lastmod: 2023-10-15
author:
  - Jimmy Lin
tags:
  - sliding_window
  - two_pointer
draft: false
---

## Description

You are given two strings `s` and `t` of the same length and an integer `maxCost`.

You want to change `s` to `t`. Changing the `ith` character of `s` to `ith` character of `t` costs `|s[i] - t[i]|` (i.e., the absolute difference between the ASCII values of the characters).

Return _the maximum length of a substring of_ `s` _that can be changed to be the same as the corresponding substring of_ `t` _with a cost less than or equal to_ `maxCost`. If there is no substring from `s` that can be changed to its corresponding substring from `t`, return `0`.

**Example 1:**

**Input:** s = "abcd", t = "bcdf", maxCost = 3
**Output:** 3
**Explanation:** "abc" of s can change to "bcd".
That costs 3, so the maximum length is 3.

**Example 2:**

**Input:** s = "abcd", t = "cdef", maxCost = 3
**Output:** 1
**Explanation:** Each character in s costs 2 to change to character in t,  so the maximum length is 1.

**Example 3:**

**Input:** s = "abcd", t = "acde", maxCost = 0
**Output:** 1
**Explanation:** You cannot make any change, so the maximum length is 1.

**Constraints:**

*   `1 <= s.length <= 105`
*   `t.length == s.length`
*   `0 <= maxCost <= 106`
*   `s` and `t` consist of only lowercase English letters.

## Code 

和 [[Max Consecutive Ones III|Max Consecutive Ones III]]、[[Subarray Product Less Than K|Subarray Product Less Than K]] 類似。

Time Complexity: $O(n)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    int equalSubstring(string s, string t, int maxCost) {
        int res = 0;
        int cost = 0;
        for(int i = 0, j = 0; j < s.length(); j++) {
            cost += abs(s[j] - t[j]);
            while(cost > maxCost) {
                cost -= abs(s[i] - t[i]);
                i++;
            }
            res = max(res, j - i + 1);
        }
        return res;
    }
};
```

## Source
- [Get Equal Substrings Within Budget - LeetCode](https://leetcode.com/problems/get-equal-substrings-within-budget/description/)