---
title: Word Break
date: 2023-04-14
lastmod: 2023-04-14
author: Jimmy Lin
tags:
  - DP
  - dfs
  - review
draft: false
sr-due: 2025-01-11
sr-interval: 318
sr-ease: 310
---

## Description

Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.

**Note** that the same word in the dictionary may be reused multiple times in the segmentation.

**Example 1:**

**Input:** s = "leetcode", wordDict = \["leet","code"\]
**Output:** true
**Explanation:** Return true because "leetcode" can be segmented as "leet code".

**Example 2:**

**Input:** s = "applepenapple", wordDict = \["apple","pen"\]
**Output:** true
**Explanation:** Return true because "applepenapple" can be segmented as "apple pen apple".
Note that you are allowed to reuse a dictionary word.

**Example 3:**

**Input:** s = "catsandog", wordDict = \["cats","dog","sand","and","cat"\]
**Output:** false

**Constraints:**

*   `1 <= s.length <= 300`
*   `1 <= wordDict.length <= 1000`
*   `1 <= wordDict[i].length <= 20`
*   `s` and `wordDict[i]` consist of only lowercase English letters.
*   All the strings of `wordDict` are **unique**.

## Code 

### Brute Force
$O(2^n)$, TLE

$T(n) = T(n-1) + T(n-2) + \cdots$
$T(n - 1) = T(n-2) + T(n-3) + \cdots$
$T(n) - T(n - 1) = T(n-1) \Rightarrow T(n) = 2T(n-1) \Rightarrow T(n) = O(2^n)$

最簡單的分析是：每個 index 都可以被當作斷點，可斷可不斷，總共兩種選擇，所以 $2^n$

```cpp
class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        unordered_set<string> st(wordDict.begin(), wordDict.end());
        return wb(s, st);
    }

    bool wb(string s, unordered_set<string>& st) {
        if(s.length() == 0) return true;
        for(int i = 1; i <= s.length(); i++) {            
            if(st.count(s.substr(0, i)) > 0 && wb(s.substr(i), st)) {
                return true;
            }
        }

        return false;
    }
};
```

### With Memo
```cpp
class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        unordered_set<string> st(wordDict.begin(), wordDict.end());
        vector<int> mem(s.length(), -1);
        return wb(s, 0, st, mem);
    }

    bool wb(string& s, int start, unordered_set<string>& st, vector<int>& mem) {
        if(start == s.length()) return 1;
        if(mem[start] != -1) return mem[start];
        string temp = "";
        for(int i = start; i < s.length(); i++) {     
            temp += s[i];       
            if(st.count(temp) > 0 && wb(s, i + 1, st, mem)) {
                return mem[start] = 1;
            }
        }

        return mem[start] = 0;
    }
};
```

### DP

注意 for loop 的 index， `dp[0] = true;`（例如 `leetcode` 的 `leet` 要是 true，代表去掉 `leet` 後的空字串要是 true），且 `i - j` 剛好就是 substring 的長度。

```cpp
class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        unordered_set<string> st(wordDict.begin(), wordDict.end());
        int n = s.length();

        vector<bool> dp(s.length() + 1);
        dp[0] = true;
        
        for(int i = 1; i <= n; i++) {
            for(int j = i - 1; j >= 0; j--) {
                if(dp[j]) {
                    string word = s.substr(j, i - j);
                    if(st.count(word)) {
                        dp[i] = true;
                        break;
                    }
                }
            }
        }

        return dp[n];

    }
};
```

## Source
- [Word Break - LeetCode](https://leetcode.com/problems/word-break/description/)