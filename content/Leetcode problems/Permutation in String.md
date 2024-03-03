---
title: Permutation in String
date: 2024-01-10
lastmod: 2024-01-10
author: Jimmy Lin
tags:
  - sliding_window
  - review
draft: false
sr-due: 2024-08-30
sr-interval: 182
sr-ease: 310
---

## Description

Given two strings `s1` and `s2`, return `true` _if_ `s2` _contains a permutation of_ `s1`_, or_ `false` _otherwise_.

In other words, return `true` if one of `s1`'s permutations is the substring of `s2`.

**Example 1:**

**Input:** s1 = "ab", s2 = "eidbaooo"
**Output:** true
**Explanation:** s2 contains one permutation of s1 ("ba").

**Example 2:**

**Input:** s1 = "ab", s2 = "eidboaoo"
**Output:** false

**Constraints:**

*   `1 <= s1.length, s2.length <= 104`
*   `s1` and `s2` consist of lowercase English letters.

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(n)$

Use one hashmap:

```cpp
class Solution {
public:
    bool checkInclusion(string s1, string s2) {
        unordered_map<char, int> mp;
        for(auto c: s1) {
            mp[c]++;
        }

        vector<int> res;
        int i = 0, n = s2.length(), k = s1.length();
        int count = mp.size();
        for(int j = 0; j < n; j++) {
            if(mp.find(s2[j]) != mp.end()) {
                mp[s2[j]]--;
                if(mp[s2[j]] == 0) count--;
            }

            if(j - i + 1 < k) continue;
            else if(j - i + 1 == k) {
                if(count == 0) res.push_back(i);
                
                if(mp.find(s2[i]) != mp.end()) {
                    if(mp[s2[i]] == 0) count++;
                    mp[s2[i]]++;
                }
                i++;
            }
        }
        return res.size();
    }
};
```

## Source
- [Permutation in String - LeetCode](https://leetcode.com/problems/permutation-in-string/description/)