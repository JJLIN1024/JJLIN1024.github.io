---
title: Generate Parentheses
date: 2023-02-13
lastmod: 2023-02-13
author:
  - Jimmy Lin
tags:
  - backtracking
  - DP
  - review
draft: false
sr-due: 2024-02-03
sr-interval: 20
sr-ease: 290
---

## Description

Given `n` pairs of parentheses, write a function to _generate all combinations of well-formed parentheses_.

**Example 1:**

**Input:** n = 3
**Output:** \["((()))","(()())","(())()","()(())","()()()"\]

**Example 2:**

**Input:** n = 1
**Output:** \["()"\]

**Constraints:**

*   `1 <= n <= 8`

## Code 

### Backtracking

對於一組 parenthesis 而言，其是否 valid 的關鍵點在於 number of open brackets == number of closed brackets，其排列順序並不重要，不影響正確性。

[[Valid Parentheses]] 有三種 parentheses，所以必須用 stack 來檢查，像是 `{ )` 的組合就是 invalid 的，但是在這裡 `()` 就可以用 `(` 數量為 1 以及 `)` 數量也是 1 來檢查合法性。

注意遞迴的條件：`open < n` 以及 `close < open`，要先有 open 才可以有 close，而 open 只需要數量不超過一半即可，隨時想開都可以。

此重要觀察可以應用在 [[Check if a Parentheses String Can Be Valid]]。

```cpp
class Solution {
public:
    vector<string> generateParenthesis(int n) {
        vector<string> results;
        helper(0, 0, n, "", results);
        return results;
    }

    void helper(int open, int close, int n, string curr, vector<string> &results) {
        if(curr.length() == n * 2) {
            results.push_back(curr);
            return;
        }
        if(open < n) helper(open + 1, close, n, curr + "(", results);
        if(open > close) helper(open, close + 1, n, curr + ")", results);
    }
};
```

### DP

Intuition：類似 [[Unique Binary Search Trees]] 的想法。

關鍵點在於新增 `()` 的方式，下面解法切成兩半，新增在左半邊（包起來），右邊放剩下可以放的數量。

以 `n = 3` 為例：`(0) 2, (1) 1, (2) 0` ，其中 `(0) 2` 即是 `() ()(), () (())`，`(1) 1` 即是 `(()) ()`，`(0) 2` 即是 `() (()), () ()()`。

```cpp
class Solution {
public:
    vector<string> generateParenthesis(int n) {
        vector<vector<string>> answer(n + 1);
        answer[0] = {""};

        for(int i = 1; i <= n; i++) {
            for(int j = 0; j < i; j++) {
                for(auto s1: answer[j]) {
                    for(auto s2: answer[i - 1 - j]) {
                        answer[i].emplace_back("(" + s1 + ")" + s2);
                    }
                }
            }
        }
        return answer[n];
    }
};
```

## Source
- [Generate Parentheses - LeetCode](https://leetcode.com/problems/generate-parentheses/description/)