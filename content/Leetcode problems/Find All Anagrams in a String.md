---
title: Find All Anagrams in a String
date: 2023-04-16
lastmod: 2023-04-16
author: Jimmy Lin
tags:
  - hashmap
  - sliding_window
  - review
draft: false
sr-due: 2024-02-03
sr-interval: 19
sr-ease: 290
---

## Description

Given two strings `s` and `p`, return _an array of all the start indices of_ `p`_'s anagrams in_ `s`. You may return the answer in **any order**.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

**Example 1:**

**Input:** s = "cbaebabacd", p = "abc"
**Output:** \[0,6\]
**Explanation:**
The substring with start index = 0 is "cba", which is an anagram of "abc".
The substring with start index = 6 is "bac", which is an anagram of "abc".

**Example 2:**

**Input:** s = "abab", p = "ab"
**Output:** \[0,1,2\]
**Explanation:**
The substring with start index = 0 is "ab", which is an anagram of "ab".
The substring with start index = 1 is "ba", which is an anagram of "ab".
The substring with start index = 2 is "ab", which is an anagram of "ab".

**Constraints:**

*   `1 <= s.length, p.length <= 3 * 104`
*   `s` and `p` consist of lowercase English letters.

## Code 

和 [[Permutation in String]] 一樣。

```cpp
class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        unordered_map<char, int> mp;
        for(auto c: p) {
            mp[c]++;
        }

        vector<int> res;
        int i = 0, n = s.length(), k = p.length();
        int count = mp.size();
        for(int j = 0; j < n; j++) {
            if(mp.find(s[j]) != mp.end()) {
                mp[s[j]]--;
                if(mp[s[j]] == 0) count--;
            }

            if(j - i + 1 < k) continue;
            else if(j - i + 1 == k) {
                if(count == 0) res.push_back(i);
                
                if(mp.find(s[i]) != mp.end()) {
                    if(mp[s[i]] == 0) count++;
                    mp[s[i]]++;
                }
                i++;
            }
        }
        return res;
    }
};
```

## Source
- [Find All Anagrams in a String - LeetCode](https://leetcode.com/problems/find-all-anagrams-in-a-string/description/)