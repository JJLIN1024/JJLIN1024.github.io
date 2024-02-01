---
title: Ransom Note
date: 2023-03-13
lastmod: 2023-03-13
author: Jimmy Lin
tags: ["hashmap"]
draft: false
---

## Description

Given two strings `ransomNote` and `magazine`, return `true` _if_ `ransomNote` _can be constructed by using the letters from_ `magazine` _and_ `false` _otherwise_.

Each letter in `magazine` can only be used once in `ransomNote`.

**Example 1:**

**Input:** ransomNote = "a", magazine = "b"
**Output:** false

**Example 2:**

**Input:** ransomNote = "aa", magazine = "ab"
**Output:** false

**Example 3:**

**Input:** ransomNote = "aa", magazine = "aab"
**Output:** true

**Constraints:**

*   `1 <= ransomNote.length, magazine.length <= 105`
*   `ransomNote` and `magazine` consist of lowercase English letters.

## Code 

Time Complexity: $O(N)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    bool canConstruct(string ransomNote, string magazine) {
        vector<int> d(26, 0);
        for(auto c: magazine) {
            d[c - 'a']++;
        }

        for(auto c: ransomNote) {
            if(d[c - 'a'] <= 0) return false;
            d[c - 'a']--;
        }

        return true;
    }
};
```

## Source
- [Ransom Note - LeetCode](https://leetcode.com/problems/ransom-note/)