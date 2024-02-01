---
title: Find Common Characters
date: 2023-12-29
lastmod: 2023-12-29
author:
  - Jimmy Lin
tags:
  - hashmap
  - review
draft: false
sr-due: 2024-02-03
sr-interval: 20
sr-ease: 290
---

## Description

Given a string array `words`, return _an array of all characters that show up in all strings within the_ `words` _(including duplicates)_. You may return the answer in **any order**.

**Example 1:**

**Input:** words = \["bella","label","roller"\]
**Output:** \["e","l","l"\]

**Example 2:**

**Input:** words = \["cool","lock","cook"\]
**Output:** \["c","o"\]

**Constraints:**

*   `1 <= words.length <= 100`
*   `1 <= words[i].length <= 100`
*   `words[i]` consists of lowercase English letters.

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    vector<string> commonChars(vector<string>& words) {
        vector<int> count(26, INT_MAX);
        for(int i = 0; i < words.size(); i++) {
            vector<int> count2(26, 0);
            for(auto c: words[i]) {
                count2[c - 'a']++;
            }
            for(int i = 0; i < 26; i++) {
                count[i] = min(count[i], count2[i]);
            }
        }

        vector<string> res;
        for(int i = 0; i < 26; i++) {
            for(int k = 0; k < count[i]; k++)
                res.push_back(string(1, (i + 'a')));
        }
        return res;
    }
};
```

## Source
- [Find Common Characters - LeetCode](https://leetcode.com/problems/find-common-characters/description/)