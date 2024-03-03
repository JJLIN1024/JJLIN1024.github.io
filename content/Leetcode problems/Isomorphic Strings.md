---
title: Isomorphic Strings
date: 2023-01-01
lastmod: 2023-01-01
author:
  - Jimmy Lin
tags:
  - hashing
  - string
  - review
draft: false
sr-due: 2024-03-16
sr-interval: 15
sr-ease: 290
---
Given two strings `s` and `t`, _determine if they are isomorphic_.

Two strings `s` and `t` are isomorphic if the characters in `s` can be replaced to get `t`.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.

**Example 1:**

**Input:** s = "egg", t = "add"
**Output:** true

**Example 2:**

**Input:** s = "foo", t = "bar"
**Output:** false

**Example 3:**

**Input:** s = "paper", t = "title"
**Output:** true

**Constraints:**

- `1 <= s.length <= 5 * 104`
- `t.length == s.length`
- `s` and `t` consist of any valid ascii character.
## Code

其實就是 [[Word Pattern]]，code 直接複製貼上稍微改一下就 AC了。

```cpp
class Solution {
public:
    bool isIsomorphic(string s, string t) {

        if(s.size() != t.size()) return false;

        unordered_map<char, int> pti;
        unordered_map<char, int> sti;
        for(int i = 0; i < s.size(); i++) {
            if(pti[s[i]] != sti[t[i]]) return false;
            // default is 0 if key not exist!
            pti[s[i]] = i + 1;
            sti[t[i]] = i + 1;
        }

        return true;
    }
};
```

## Link
- [Isomorphic Strings](https://leetcode.com/problems/isomorphic-strings/description/)
