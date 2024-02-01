---
title: Backspace String Compare
date: 2023-03-16
lastmod: 2023-03-16
author: Jimmy Lin
tags: ["stack", "string"]
draft: false
---

## Description

Given two strings `s` and `t`, return `true` _if they are equal when both are typed into empty text editors_. `'#'` means a backspace character.

Note that after backspacing an empty text, the text will continue empty.

**Example 1:**

**Input:** s = "ab#c", t = "ad#c"
**Output:** true
**Explanation:** Both s and t become "ac".

**Example 2:**

**Input:** s = "ab##", t = "c#d#"
**Output:** true
**Explanation:** Both s and t become "".

**Example 3:**

**Input:** s = "a#c", t = "b"
**Output:** false
**Explanation:** s becomes "c" while t becomes "b".

**Constraints:**

*   `1 <= s.length, t.length <= 200`
*   `s` and `t` only contain lowercase letters and `'#'` characters.

**Follow up:** Can you solve it in `O(n)` time and `O(1)` space?

## Code 

### Stack
Time Complexity: $O(N)$, Space Complexity: $O(N)$

```cpp
class Solution {
public:
    bool backspaceCompare(string s, string t) {
        stack<char> s1;
        stack<char> s2;

        for(auto c1: s) {
            if(!s1.empty() && c1 == '#') s1.pop();
            else if(c1 != '#') s1.push(c1);
        }

        for(auto c2: t) {
            if(!s2.empty() && c2 == '#') s2.pop();
            else if (c2 != '#') s2.push(c2);
        }

        if(s1.size() != s2.size()) return false;
        while(!s1.empty()) {
            if(s1.top() != s2.top()) return false;
            s1.pop();
            s2.pop();
        }

        return true;
    }
};
```

Time Complexity: $O(N)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    bool backspaceCompare(string s, string t) {
        int s1 = 0, t1 = 0;
        for(int i = 0; i < s.length(); i++) {
            if(s[i] == '#') {
                s1--;
                s1 = max(0, s1);
            } else {
                s[s1] = s[i];
                s1++;
            }
        }

        for(int i = 0; i < t.length(); i++) {
            if(t[i] == '#') {
                t1--;
                t1 = max(0, t1);
            } else {
                t[t1] = t[i];
                t1++;
            }
        }

        if(s1 != t1) return false;
        for(int i = 0; i < s1; i++) {
            if(s[i] != t[i]) return false;
        }
        return true;
    }
};
```


## Source
- [Backspace String Compare - LeetCode](https://leetcode.com/problems/backspace-string-compare/description/)