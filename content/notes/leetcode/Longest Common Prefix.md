---
title: Longest Common Prefix
date: 2023-03-18
lastmod: 2023-03-18
author: Jimmy Lin
tags: ["string"]
draft: false
---

## Description

Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string `""`.

**Example 1:**

**Input:** strs = \["flower","flow","flight"\]
**Output:** "fl"

**Example 2:**

**Input:** strs = \["dog","racecar","car"\]
**Output:** ""
**Explanation:** There is no common prefix among the input strings.

**Constraints:**

*   `1 <= strs.length <= 200`
*   `0 <= strs[i].length <= 200`
*   `strs[i]` consists of only lowercase English letters.

## Code 

Time Complexity: $O(N)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        string answer = "";
        for(int i = 0; i < strs[0].length(); i++) {
            char first = strs[0][i];
            for(int j = 0; j < strs.size(); j++) {
                if(strs[j].length() - 1 < i) return answer;
                if(strs[j][i] != first) return answer;
            }   
            answer += first;
        }
        return answer;
    }
};
```

和 [[Delete Columns to Make Sorted]] 一樣的 `for loop` 結構。

```cpp
class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        int res = 0;
        for(int i = 0; i < strs[0].size(); i++) {
            for(int j = 1; j < strs.size(); j++) {
                if(i > strs[j].size() || i > strs[j - 1].size() || strs[j-1][i] != strs[j][i]) {
                    return strs[0].substr(0, res);
                }
            }
            res++;
        }
        return strs[0].substr(0, res);
    }
};
```
## Source
- [Longest Common Prefix - LeetCode](https://leetcode.com/problems/longest-common-prefix/)