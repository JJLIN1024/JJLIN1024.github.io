---
title: Interleaving String
date: 2024-01-31
lastmod: 2024-01-31
author: Jimmy Lin
tags:
  - DP
  - dfs
  - review
draft: false
sr-due: 2024-04-29
sr-interval: 68
sr-ease: 250
---

## Description

Given strings `s1`, `s2`, and `s3`, find whether `s3` is formed by an **interleaving** of `s1` and `s2`.

An **interleaving** of two strings `s` and `t` is a configuration where `s` and `t` are divided into `n` and `m`

substrings

respectively, such that:

*   `s = s1 + s2 + ... + sn`
*   `t = t1 + t2 + ... + tm`
*   `|n - m| <= 1`
*   The **interleaving** is `s1 + t1 + s2 + t2 + s3 + t3 + ...` or `t1 + s1 + t2 + s2 + t3 + s3 + ...`

**Note:** `a + b` is the concatenation of strings `a` and `b`.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/09/02/interleave.jpg)

**Input:** s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
**Output:** true
**Explanation:** One way to obtain s3 is:
Split s1 into s1 = "aa" + "bc" + "c", and s2 into s2 = "dbbc" + "a".
Interleaving the two splits, we get "aa" + "dbbc" + "bc" + "a" + "c" = "aadbbcbcac".
Since s3 can be obtained by interleaving s1 and s2, we return true.

**Example 2:**

**Input:** s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
**Output:** false
**Explanation:** Notice how it is impossible to interleave s2 with any other string to obtain s3.

**Example 3:**

**Input:** s1 = "", s2 = "", s3 = ""
**Output:** true

**Constraints:**

*   `0 <= s1.length, s2.length <= 100`
*   `0 <= s3.length <= 200`
*   `s1`, `s2`, and `s3` consist of lowercase English letters.

**Follow up:** Could you solve it using only `O(s2.length)` additional memory space?

## Code 


### DFS with memo

Time Complexity: $O(m * n)$, Space Complexity: $O(m * n)$

注意 memo 的大小是 `(m + 1) * (n + 1)`，因為遞迴可能會有 `i == m` 或是 `j  == n` 的 case。

```cpp
class Solution {
public:
    bool isInterleave(string s1, string s2, string s3) {
        if(s1.length() + s2.length() != s3.length()) return false;
        int m = s1.length(), n = s2.length();
        vector<vector<int>> memo(m + 1, vector<int>(n + 1, -1));
        return dfs(0, 0, s1, s2, s3, memo);
    }

    bool dfs(int i, int j, string& s1, string& s2, string& s3, vector<vector<int>>& memo) {
        if(i >= s1.length() && j >= s2.length() && (i + j) == s3.length()) return true;

        if(memo[i][j] != -1) return memo[i][j];

        bool a = (i < s1.length() && s1[i] == s3[i + j]) ? dfs(i + 1, j, s1, s2, s3, memo) : false;
        bool b = (j < s2.length() && s2[j] == s3[i + j]) ? dfs(i, j + 1, s1, s2, s3, memo) : false;
        memo[i][j] = a || b;
        return memo[i][j];
    }
};
```

## Source
- [Interleaving String - LeetCode](https://leetcode.com/problems/interleaving-string/description/)