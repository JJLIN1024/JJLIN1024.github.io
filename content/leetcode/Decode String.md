---
title: Decode String
date: 2023-04-18
lastmod: 2023-12-02
author:
  - Jimmy Lin
tags:
  - stack
draft: false
---

## Description

Given an encoded string, return its decoded string.

The encoding rule is: `k[encoded_string]`, where the `encoded_string` inside the square brackets is being repeated exactly `k` times. Note that `k` is guaranteed to be a positive integer.

You may assume that the input string is always valid; there are no extra white spaces, square brackets are well-formed, etc. Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, `k`. For example, there will not be input like `3a` or `2[4]`.

The test cases are generated so that the length of the output will never exceed `105`.

**Example 1:**

**Input:** s = "3\[a\]2\[bc\]"
**Output:** "aaabcbc"

**Example 2:**

**Input:** s = "3\[a2\[c\]\]"
**Output:** "accaccacc"

**Example 3:**

**Input:** s = "2\[abc\]3\[cd\]ef"
**Output:** "abcabccdcdcdef"

**Constraints:**

*   `1 <= s.length <= 30`
*   `s` consists of lowercase English letters, digits, and square brackets `'[]'`.
*   `s` is guaranteed to be **a valid** input.
*   All the integers in `s` are in the range `[1, 300]`.

## Code 

### Stack

Time Complexity: $O(N)$, Space Complexity: $O(N)$

以 `3[a2[c]]` 為例：

當遇到 `[`，要將前面的數字和字母 push 上 stack 等下用，因為 `[` 開始代表新的數字加字母組合要開始了。

```cpp
class Solution {
public:
    string decodeString(string s) {
        stack<string> string_stack;
        stack<int> num_stack;
        string res = "";
        int num = 0;
        for(auto ch: s) {
            if(isdigit(ch)) {
                // handle case like 22
                num = num * 10 + (ch - '0');
            } else if (ch == '[') {
                string_stack.push(res);
                num_stack.push(num);
                res = "";
                num = 0;
            } else if (ch == ']') {
                string temp = res;
                for(int i = 0; i < num_stack.top() - 1; i++) {
                    res += temp;
                }   
                res = string_stack.top() + res;
                string_stack.pop();
                num_stack.pop();
            } else {
                res += ch;
            }
        }  
        

        return res;
    }
};
```

## Source
- [Decode String - LeetCode](https://leetcode.com/problems/decode-string/description/)