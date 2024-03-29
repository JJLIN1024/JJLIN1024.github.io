---
title: Removing Stars From a String
date: 2023-04-12
lastmod: 2023-04-12
author:
  - Jimmy Lin
tags:
  - two_pointer
  - stack
draft: false
---

## Description

You are given a string `s`, which contains stars `*`.

In one operation, you can:

*   Choose a star in `s`.
*   Remove the closest **non-star** character to its **left**, as well as remove the star itself.

Return _the string after **all** stars have been removed_.

**Note:**

*   The input will be generated such that the operation is always possible.
*   It can be shown that the resulting string will always be unique.

**Example 1:**

**Input:** s = "leet\*\*cod\*e"
**Output:** "lecoe"
**Explanation:** Performing the removals from left to right:
- The closest character to the 1st star is 't' in "lee**t**\*\*cod\*e". s becomes "lee\*cod\*e".
- The closest character to the 2nd star is 'e' in "le**e**\*cod\*e". s becomes "lecod\*e".
- The closest character to the 3rd star is 'd' in "leco**d**\*e". s becomes "lecoe".
There are no more stars, so we return "lecoe".

**Example 2:**

**Input:** s = "erase\*\*\*\*\*"
**Output:** ""
**Explanation:** The entire string is removed, so we return an empty string.

**Constraints:**

*   `1 <= s.length <= 105`
*   `s` consists of lowercase English letters and stars `*`.
*   The operation above can be performed on `s`.

## Code 

### Stack

Time Complexity: $O(N)$, Space Complexity: $O(N)$

```cpp
class Solution {
public:
    string removeStars(string s) {
        string answer = "";
        stack<char> st;
        for(int i = 0; i < s.length(); i++) {
            if(s[i] != '*') st.push(s[i]);
            else st.pop();
        }

        while(!st.empty()) {
            answer += st.top(); st.pop();
        }

        reverse(answer.begin(), answer.end());
        return answer;
        
    }
};
```

### Two pointer

用 two pointer 模擬 stack 的 pop & push 相對位置（index）。

Time Complexity: $O(N)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    string removeStars(string s) {
        
        int j = 0;
        for(int i = 0; i < s.length(); i++) {
            if(s[i] != '*') {
                s[j++] = s[i];
            } else {
                j--;
            };
        }

        return s.substr(0, j);
        
    }
};
```

## Source
- [Removing Stars From a String - LeetCode](https://leetcode.com/problems/removing-stars-from-a-string/description/)