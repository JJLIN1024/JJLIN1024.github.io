---
title: Valid Parenthesis String
date: 2023-02-14
lastmod: 2023-02-14
author: Jimmy Lin
tags: ["string"]
draft: false
---

## Description

Given a string `s` containing only three types of characters: `'('`, `')'` and `'*'`, return `true` _if_ `s` _is **valid**_.

The following rules define a **valid** string:

*   Any left parenthesis `'('` must have a corresponding right parenthesis `')'`.
*   Any right parenthesis `')'` must have a corresponding left parenthesis `'('`.
*   Left parenthesis `'('` must go before the corresponding right parenthesis `')'`.
*   `'*'` could be treated as a single right parenthesis `')'` or a single left parenthesis `'('` or an empty string `""`.

**Example 1:**

**Input:** s = "()"
**Output:** true

**Example 2:**

**Input:** s = "(\*)"
**Output:** true

**Example 3:**

**Input:** s = "(\*))"
**Output:** true

**Constraints:**

*   `1 <= s.length <= 100`
*   `s[i]` is `'('`, `')'` or `'*'`.

## Code 

解法和 [[Check if a Parentheses String Can Be Valid]] 幾乎一模一樣，只是將 unlock 的判斷條件換成 `if(s[i] == '*')` 而已，code 幾乎直接複製貼上就 AC 了。

為何是 close - open：

考慮 `()(((` ，這個 case 從左到右時，open 為 '('，close 為 ')'，valid，但是從右到左的時候會被檢查出是 invalid。這也是為什麼要做兩遍，由左到右再由右到左。

```cpp
class Solution {
public:
    bool checkValidString(string s) {


        int open = 0, close = 0, unlock = 0, unpaired = 0;
        for(int i = 0; i < s.length(); i++) {
            if(s[i] == '*') {
                unlock++;
            } else if (s[i] == '(') {
                open++;
            } else if (s[i] == ')') {
                close++;
            }

            unpaired = close - open;
            if(unpaired > unlock) return false;
        }

        open = 0, close = 0, unlock = 0, unpaired = 0;
        for(int i = s.length() - 1; i >= 0; i--) {
            if(s[i] == '*') {
                unlock++;
            } else if (s[i] == ')') {
                open++;
            } else if (s[i] == '(') {
                close++;
            }

            unpaired = close - open;
            if(unpaired > unlock) return false;
        }


        return true;
    }
};
```

## Source
- [Valid Parenthesis String - LeetCode](https://leetcode.com/problems/valid-parenthesis-string/description/)