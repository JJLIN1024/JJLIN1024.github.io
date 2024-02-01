---
title: Word Break II
date: 2024-01-31
lastmod: 2024-01-31
author: Jimmy Lin
tags:
  - DP
draft: false
---

## Description

Given a string `s` and a dictionary of strings `wordDict`, add spaces in `s` to construct a sentence where each word is a valid dictionary word. Return all such possible sentences in **any order**.

**Note** that the same word in the dictionary may be reused multiple times in the segmentation.

**Example 1:**

**Input:** s = "catsanddog", wordDict = \["cat","cats","and","sand","dog"\]
**Output:** \["cats and dog","cat sand dog"\]

**Example 2:**

**Input:** s = "pineapplepenapple", wordDict = \["apple","pen","applepen","pine","pineapple"\]
**Output:** \["pine apple pen apple","pineapple pen apple","pine applepen apple"\]
**Explanation:** Note that you are allowed to reuse a dictionary word.

**Example 3:**

**Input:** s = "catsandog", wordDict = \["cats","dog","sand","and","cat"\]
**Output:** \[\]

**Constraints:**

*   `1 <= s.length <= 20`
*   `1 <= wordDict.length <= 1000`
*   `1 <= wordDict[i].length <= 10`
*   `s` and `wordDict[i]` consist of only lowercase English letters.
*   All the strings of `wordDict` are **unique**.
*   Input is generated in a way that the length of the answer doesn't exceed 105.

## Code 

只是 [[Word Break]] 然後把結果印出來而已。

```cpp
class Solution {
public:
    vector<string> wordBreak(string s, vector<string>& wordDict) {
        unordered_set<string> st(wordDict.begin(), wordDict.end());
        vector<string> res;
        string cur = "";
        dfs(s, 0, st, cur, res);   
        return res;
    }

    void dfs(string& s, int start, unordered_set<string>& st, string cur, vector<string>& res) {
        if(start == s.length()) {
            cur.pop_back();
            res.push_back(cur);
            return;
        }

        string temp = "";
        for(int i = start; i < s.length(); i++) {     
            temp += s[i];       
            if(st.count(temp) > 0) {
                dfs(s, i + 1, st, cur + temp + " ", res);
            }
        }
    }
};
```

## Source
- [Word Break II - LeetCode](https://leetcode.com/problems/word-break-ii/)