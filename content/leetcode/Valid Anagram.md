---
title: Valid Anagram
date: 2023-02-17
lastmod: 2023-02-17
author: Jimmy Lin
tags: ["hashmap"]
draft: false
---

## Description

Given two strings `s` and `t`, return `true` _if_ `t` _is an anagram of_ `s`_, and_ `false` _otherwise_.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

**Example 1:**

**Input:** s = "anagram", t = "nagaram"
**Output:** true

**Example 2:**

**Input:** s = "rat", t = "car"
**Output:** false

**Constraints:**

*   `1 <= s.length, t.length <= 5 * 104`
*   `s` and `t` consist of lowercase English letters.

**Follow up:** What if the inputs contain Unicode characters? How would you adapt your solution to such a case?

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    bool isAnagram(string s, string t) {
        vector<int> alphabet(26, 0);
        for(auto c: s) {
            alphabet[c - 'a']++;
        }

        for(auto c: t) {
            alphabet[c - 'a']--;
            if(alphabet[c - 'a'] < 0) return false;
        }

        for(auto count: alphabet) {
            if(count > 0) return false;
        }

        return true;
    }
};
```

```cpp
class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.length() != t.length()) return false;
        int n = s.length();
        int counts[26] = {0};
        for (int i = 0; i < n; i++) { 
            counts[s[i] - 'a']++;
            counts[t[i] - 'a']--;
        }
        for (int i = 0; i < 26; i++)
            if (counts[i]) return false;
        return true;
    }
};
```

```cpp
class Solution {
public:
    bool isAnagram(string s, string t) {
       unordered_map<char, int> count;
       for(auto c: s) {
           count[c]++;
       } 

       for(auto c: t) {
           if(count.find(c) == count.end()) return false;
           else {
               count[c]--;
               if(count[c] == 0)
                    count.erase(c);
           }
       }

       return count.size() ? false : true;
    }
};
```

## Source
- [Valid Anagram - LeetCode](https://leetcode.com/problems/valid-anagram/description/)