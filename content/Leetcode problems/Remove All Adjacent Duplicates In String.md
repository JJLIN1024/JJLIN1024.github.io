---
title: Remove All Adjacent Duplicates In String
date: 2024-01-03
lastmod: 2024-01-03
author:
  - Jimmy Lin
tags:
  - stack
  - two_pointer
draft: false
---

## Description

You are given a string `s` consisting of lowercase English letters. A **duplicate removal** consists of choosing two **adjacent** and **equal** letters and removing them.

We repeatedly make **duplicate removals** on `s` until we no longer can.

Return _the final string after all such duplicate removals have been made_. It can be proven that the answer is **unique**.

**Example 1:**

**Input:** s = "abbaca"
**Output:** "ca"
**Explanation:** 
For example, in "abbaca" we could remove "bb" since the letters are adjacent and equal, and this is the only possible move.  The result of this move is that the string is "aaca", of which only "aa" is possible, so the final string is "ca".

**Example 2:**

**Input:** s = "azxxzy"
**Output:** "ay"

**Constraints:**

*   `1 <= s.length <= 105`
*   `s` consists of lowercase English letters.

## Code 

### Stack

Time Complexity: $O(N)$, Space Complexity: $O(N)$

```cpp
class Solution {
public:
    string removeDuplicates(string s) {
        stack<char> st;
        st.push(s[0]);
        for(int i = 1; i < s.length(); i++) {
            if(!st.empty() && s[i] == st.top() ) {
                st.pop();
            } else {
                st.push(s[i]);
            }
        }
        string res = "";
        while(!st.empty()) {
            res += st.top();
            st.pop();
        }
        reverse(res.begin(), res.end());
        return res;

    }
};
```

### Two Pointer
Time Complexity: $O(N)$, Space Complexity: $O(1)$

和 [[Removing Stars From a String]] 同樣的觀念。

```cpp
int i = 0, j = 0, n = s.length();
        while(j < n) {
            s[i] = s[j];
            if(i > 0 && s[i] == s[i - 1])
                i -= 2;
            i++;
            j++;
        }

        return s.substr(0, i);
```
## Source
- [Remove All Adjacent Duplicates In String - LeetCode](https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/description/)