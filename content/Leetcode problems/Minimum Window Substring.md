---
title: Minimum Window Substring
date: 2024-01-17
lastmod: 2024-01-17
author: Jimmy Lin
tags:
  - sliding_window
draft: false
---

## Description

Given two strings `s` and `t` of lengths `m` and `n` respectively, return _the **minimum window**_

**_substring_**

_of_ `s` _such that every character in_ `t` _(**including duplicates**) is included in the window_. If there is no such substring, return _the empty string_ `""`.

The testcases will be generated such that the answer is **unique**.

**Example 1:**

**Input:** s = "ADOBECODEBANC", t = "ABC"
**Output:** "BANC"
**Explanation:** The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.

**Example 2:**

**Input:** s = "a", t = "a"
**Output:** "a"
**Explanation:** The entire string s is the minimum window.

**Example 3:**

**Input:** s = "a", t = "aa"
**Output:** ""
**Explanation:** Both 'a's from t must be included in the window.
Since the largest window of s only has one 'a', return empty string.

**Constraints:**

*   `m == s.length`
*   `n == t.length`
*   `1 <= m, n <= 105`
*   `s` and `t` consist of uppercase and lowercase English letters.

**Follow up:** Could you find an algorithm that runs in `O(m + n)` time?

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(m)$

```cpp
class Solution {
public:
    string minWindow(string s, string t) {
        unordered_map<char, int> mp;
        for(auto c: t) {
            mp[c]++;
        }

        int count = mp.size();
        int i = 0, j = 0;
        int n = s.length();
        int res = n;
        int start = 0;
        bool find = false;
        while(j < n) {
            while(i < n && count > 0) {
                if(mp.find(s[i]) != mp.end()) {
                    mp[s[i]]--;
                    if(mp[s[i]] == 0) count--;
                }
                i++;
            }

            if(count == 0) {
                find = true;
                if(i - j < res) {
                    res = i - j;
                    start = j;
                }
                
            }

            if(mp.find(s[j]) != mp.end()) {
                if(mp[s[j]] == 0) count++;
                mp[s[j]]++;
            }
            j++;
        }

        return find ? s.substr(start, res) : "";
    }
};
```

## Source
- [Minimum Window Substring - LeetCode](https://leetcode.com/problems/minimum-window-substring/description/)