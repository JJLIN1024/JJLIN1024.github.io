---
title: Minimum Remove to Make Valid Parentheses
date: 2023-02-14
lastmod: 2023-02-14
author:
  - Jimmy Lin
tags:
  - stack
  - review
draft: false
sr-due: 2024-04-10
sr-interval: 4
sr-ease: 270
---

## Description

Given a string s of `'('` , `')'` and lowercase English characters.

Your task is to remove the minimum number of parentheses ( `'('` or `')'`, in any positions ) so that the resulting _parentheses string_ is valid and return **any** valid string.

Formally, a _parentheses string_ is valid if and only if:

*   It is the empty string, contains only lowercase characters, or
*   It can be written as `AB` (`A` concatenated with `B`), where `A` and `B` are valid strings, or
*   It can be written as `(A)`, where `A` is a valid string.

**Example 1:**

**Input:** s = "lee(t(c)o)de)"
**Output:** "lee(t(c)o)de"
**Explanation:** "lee(t(co)de)" , "lee(t(c)ode)" would also be accepted.

**Example 2:**

**Input:** s = "a)b(c)d"
**Output:** "ab(c)d"

**Example 3:**

**Input:** s = "))(("
**Output:** ""
**Explanation:** An empty string is also valid.

**Constraints:**

*   `1 <= s.length <= 105`
*   `s[i]` is either`'('` , `')'`, or lowercase English letter`.`

## Code 

和 [[Valid Parenthesis String]] 不一樣，因為這次我們不只是要檢查合不合法，還要修改，因此要用到 stack。

注意 [std::remove](https://cplusplus.com/reference/algorithm/remove/) 以及 [std::erase](https://en.cppreference.com/w/cpp/container/vector/erase2) 的用法，remove 會將指定元素全部從 vector 中刪除，並返回刪除過後的 vector 的尾端 pointer，而 erase 會刪除指定的 begin  到 end。

例子：`10, 3, 3, 12, 13, 5` 經過 remove 3 之後變成 `10, 12, 13, 5, ?, ?`，返回的pointer 指向 `5`，再經過 erase 後變成 `10, 12, 13, 5`。

```cpp
class Solution {
public:
    string minRemoveToMakeValid(string s) {
        stack<int> st;
        for (auto i = 0; i < s.size(); ++i) {
            if (s[i] == '(') st.push(i);
            if (s[i] == ')') {
	            if (!st.empty()) st.pop();
	            else s[i] = '*';
            }
        }
        while (!st.empty()) {
            s[st.top()] = '*';
            st.pop();
        }
        s.erase(remove(s.begin(), s.end(), '*'), s.end());
        return s;
    }
};
```

```cpp
class Solution {
public:
    string minRemoveToMakeValid(string s) {
        stack<int> st;
        int n = s.length();
        vector<bool> valid(n, false);
        for(int i = 0; i < s.length(); i++) {
            if(s[i] == '(') {
                st.push(i);
            } else if(s[i] == ')') {
                if(!st.empty()) {
                    valid[i] = true;
                    valid[st.top()] = true;
                    st.pop();
                }
            }
        }

        string res = "";
        for(int i = 0; i < s.length(); i++) {
            if(s[i] == '(' || s[i] == ')') {
                if(valid[i])
                    res += s[i];
            } else {
                res += s[i];
            }
        }
        return res;
    }

};

```
## Source
- [Minimum Remove to Make Valid Parentheses - LeetCode](https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/description/)