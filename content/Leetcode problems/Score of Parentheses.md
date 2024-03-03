---
title: Score of Parentheses
date: 2023-03-30
lastmod: 2023-03-30
author: Jimmy Lin
tags: ["stack"]
draft: false
---

## Description

Given a balanced parentheses string `s`, return _the **score** of the string_.

The **score** of a balanced parentheses string is based on the following rule:

*   `"()"` has score `1`.
*   `AB` has score `A + B`, where `A` and `B` are balanced parentheses strings.
*   `(A)` has score `2 * A`, where `A` is a balanced parentheses string.

**Example 1:**

**Input:** s = "()"
**Output:** 1

**Example 2:**

**Input:** s = "(())"
**Output:** 2

**Example 3:**

**Input:** s = "()()"
**Output:** 2

**Constraints:**

*   `2 <= s.length <= 50`
*   `s` consists of only `'('` and `')'`.
*   `s` is a balanced parentheses string.

## Code 

```cpp
class Solution {
public:
    int scoreOfParentheses(string s) {
        int score = 0;
        stack<char> st;
        for(auto ch: s) {
            if(ch == '(') {
                st.push(score);
                score = 0;
            } else {
                score = st.top() + max(2 * score, 1);
                st.pop();
            }
        }

        return score;
    }
};
```

## Source
- [Score of Parentheses - LeetCode](https://leetcode.com/problems/score-of-parentheses/description/)