---
title: Valid Parentheses
date: 2023-02-13
lastmod: 2023-02-13
author:
  - Jimmy Lin
tags:
  - stack
  - hashmap
draft: false
---

## Description

Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.

An input string is valid if:

1.  Open brackets must be closed by the same type of brackets.
2.  Open brackets must be closed in the correct order.
3.  Every close bracket has a corresponding open bracket of the same type.

**Example 1:**

**Input:** s = "()"
**Output:** true

**Example 2:**

**Input:** s = "()\[\]{}"
**Output:** true

**Example 3:**

**Input:** s = "(\]"
**Output:** false

**Constraints:**

*   `1 <= s.length <= 104`
*   `s` consists of parentheses only `'()[]{}'`.

## Code 

### Stack
Time Complexity: $O(N)$, Space Complexity: $O(N)$

```cpp
class Solution {
public:
    bool isValid(string s) {
        unordered_map<char, char> mp;
        mp[')'] = '(';
        mp['}'] = '{';
        mp[']'] = '[';
        stack<char> st;
        for(auto c: s) {
            if(c == '(' || c == '{' || c == '[') st.push(c);
            else {
                if(st.empty() || st.top() != mp[c]) return false;
                st.pop();
            }
        }
        return st.empty();
    }
};
```

## Source
- [Valid Parentheses - LeetCode](https://leetcode.com/problems/valid-parentheses/description/)