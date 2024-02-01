---
title: Palindrome Partitioning
date: 2024-01-25
lastmod: 2024-01-25
author: Jimmy Lin
tags:
  - backtracking
  - review
draft: false
sr-due: 2024-02-20
sr-interval: 20
sr-ease: 290
---

## Description

Given a string `s`, partition `s` such that every

substring

of the partition is a

**palindrome**

. Return _all possible palindrome partitioning of_ `s`.

**Example 1:**

**Input:** s = "aab"
**Output:** \[\["a","a","b"\],\["aa","b"\]\]

**Example 2:**

**Input:** s = "a"
**Output:** \[\["a"\]\]

**Constraints:**

*   `1 <= s.length <= 16`
*   `s` contains only lowercase English letters.

## Code 

Time Complexity: $O(2^n)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    vector<vector<string>> partition(string s) {
        vector<vector<string>> res;
        if(s.empty()) return res;
        vector<string> cur;
        dfs(0, s, cur, res);
        return res;
    }

    void dfs(int index, string& s, vector<string>& cur, vector<vector<string>>& res) {
        if(index == s.length()) {
            res.push_back(cur);
            return;
        }
        for(int i = index; i < s.length(); i++) {
            if(isPalindrome(s, index, i)) {
                cur.push_back(s.substr(index, i - index + 1));
                dfs(i + 1, s, cur, res);
                cur.pop_back();
            }
        }
    }

    bool isPalindrome(const string& s, int l, int r) {
        while(l <= r) {
            if(s[l++] != s[r--]) 
                return false;
        }
        return true;
    }
};
```

## Source
- [Palindrome Partitioning - LeetCode](https://leetcode.com/problems/palindrome-partitioning/description/)