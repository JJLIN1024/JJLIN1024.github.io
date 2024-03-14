---
title: Remove Duplicate Letters
date: 2024-01-28
lastmod: 2024-01-28
author: Jimmy Lin
tags:
  - monotonic_stack
  - stack
  - review
draft: false
sr-due: 2024-05-18
sr-interval: 66
sr-ease: 270
---

## Description

Given a string `s`, remove duplicate letters so that every letter appears once and only once. You must make sure your result is

**the smallest in lexicographical order**

among all possible results.

**Example 1:**

**Input:** s = "bcabc"
**Output:** "abc"

**Example 2:**

**Input:** s = "cbacdcbc"
**Output:** "acdb"

**Constraints:**

*   `1 <= s.length <= 104`
*   `s` consists of lowercase English letters.

**Note:** This question is the same as 1081: [https://leetcode.com/problems/smallest-subsequence-of-distinct-characters/](https://leetcode.com/problems/smallest-subsequence-of-distinct-characters/)

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(n)$

使用 monotonic increasing stack，因為題目要求 **the smallest in lexicographical order。

同時利用 `count[result.back()]` 來確認可不可以 pop，例如 `bca` 的 `a` 就不可以 pop 掉前面的 `bc`，但是 `bcac` 的 `a` 可以，因為 iterate 到 `a` 時， `count[c] = 1`，我們知道後面還有 `c` 可以補回來。

```cpp
class Solution {
public:
    string removeDuplicateLetters(string s) {
        vector<int> count(256, 0);
        vector<bool> visited(256, false);
        for (char c : s)
            count[c]++;
            
        string result = "";
        for (char c : s) {
            count[c]--;
            if (visited[c]) continue;
            while (!result.empty() && c < result.back() && count[result.back()]) {
                visited[result.back()] = false;
                result.pop_back();
            }
            result += c;
            visited[c] = true;
        }
        return result;
    }
};
```

## Source
- [Remove Duplicate Letters - LeetCode](https://leetcode.com/problems/remove-duplicate-letters/description/)