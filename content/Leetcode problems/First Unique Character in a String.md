---
title: First Unique Character in a String
date: 2023-04-06
lastmod: 2023-04-06
author: Jimmy Lin
tags: ["hashmap"]
draft: false
---

## Description

Given a string `s`, _find the first non-repeating character in it and return its index_. If it does not exist, return `-1`.

**Example 1:**

**Input:** s = "leetcode"
**Output:** 0

**Example 2:**

**Input:** s = "loveleetcode"
**Output:** 2

**Example 3:**

**Input:** s = "aabb"
**Output:** -1

**Constraints:**

*   `1 <= s.length <= 105`
*   `s` consists of only lowercase English letters.

## Code 

```cpp
class Solution {
public:
    int firstUniqChar(string s) {
        unordered_map<char, int> mp;
        
        for(auto ch: s) {
            mp[ch]++;
        }

        for(int i = 0; i < s.length(); i++) {
            if(mp[s[i]] == 1) return i;
        }

        return -1;
    }
};
```

## Source
- [First Unique Character in a String - LeetCode](https://leetcode.com/problems/first-unique-character-in-a-string/description/)