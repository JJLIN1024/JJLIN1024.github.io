---
title: Letter Combinations of a Phone Number
date: 2023-02-14
lastmod: 2023-02-14
author: Jimmy Lin
tags:
  - backtracking
  - review
draft: false
sr-due: 2024-10-18
sr-interval: 209
sr-ease: 310
---

## Description

Given a string containing digits from `2-9` inclusive, return all possible letter combinations that the number could represent. Return the answer in **any order**.

A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

![](https://assets.leetcode.com/uploads/2022/03/15/1200px-telephone-keypad2svg.png)

**Example 1:**

**Input:** digits = "23"
**Output:** \["ad","ae","af","bd","be","bf","cd","ce","cf"\]

**Example 2:**

**Input:** digits = ""
**Output:** \[\]

**Example 3:**

**Input:** digits = "2"
**Output:** \["a","b","c"\]

**Constraints:**

*   `0 <= digits.length <= 4`
*   `digits[i]` is a digit in the range `['2', '9']`.

## Code 

```cpp
class Solution {
    const vector<string> pad = {
        "", "", "abc", "def", "ghi", "jkl",
        "mno", "pqrs", "tuv", "wxyz"
    };
public:
    vector<string> letterCombinations(string digits) {
        vector<string> res;
        if(digits == "") return res;
        int n = digits.length();
        string cur = "";
        dfs(digits, 0, n, cur, res);
        return res;
    }

    void dfs(string& digits, int idx, int n, string& cur, vector<string>& res) {
        if(idx == n) {
            res.push_back(cur);
            return;
        }
        
        int key = digits[idx] - '0';
        for(char k: pad[key]) {
            cur += k;
            dfs(digits, idx + 1, n, cur, res);
            cur.pop_back();
        }
    }
};
```

## Source
- [Letter Combinations of a Phone Number - LeetCode](https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/)