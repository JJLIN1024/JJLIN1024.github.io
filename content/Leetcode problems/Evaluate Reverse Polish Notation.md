---
title: Evaluate Reverse Polish Notation
date: 2023-03-21
lastmod: 2023-12-01
author:
  - Jimmy Lin
tags:
  - stack
draft: false
---

## Description

You are given an array of strings `tokens` that represents an arithmetic expression in a [Reverse Polish Notation](http://en.wikipedia.org/wiki/Reverse_Polish_notation).

Evaluate the expression. Return _an integer that represents the value of the expression_.

**Note** that:

*   The valid operators are `'+'`, `'-'`, `'*'`, and `'/'`.
*   Each operand may be an integer or another expression.
*   The division between two integers always **truncates toward zero**.
*   There will not be any division by zero.
*   The input represents a valid arithmetic expression in a reverse polish notation.
*   The answer and all the intermediate calculations can be represented in a **32-bit** integer.

**Example 1:**

**Input:** tokens = \["2","1","+","3","\*"\]
**Output:** 9
**Explanation:** ((2 + 1) \* 3) = 9

**Example 2:**

**Input:** tokens = \["4","13","5","/","+"\]
**Output:** 6
**Explanation:** (4 + (13 / 5)) = 6

**Example 3:**

**Input:** tokens = \["10","6","9","3","+","-11","\*","/","\*","17","+","5","+"\]
**Output:** 22
**Explanation:** ((10 \* (6 / ((9 + 3) \* -11))) + 17) + 5
= ((10 \* (6 / (12 \* -11))) + 17) + 5
= ((10 \* (6 / -132)) + 17) + 5
= ((10 \* 0) + 17) + 5
= (0 + 17) + 5
= 17 + 5
= 22

**Constraints:**

*   `1 <= tokens.length <= 104`
*   `tokens[i]` is either an operator: `"+"`, `"-"`, `"*"`, or `"/"`, or an integer in the range `[-200, 200]`.

## Code 

### Stack

Time Complexity: $O(N)$, Space Complexity: $O(N)$

要注意是 `op2 += op1`，因為從 stack pop 下來順序和原本 strings 是相反的。

```cpp
class Solution {
public:
    int evalRPN(vector<string>& tokens) {
        stack<int> st;
        for(auto& token: tokens) {
            if((token == "+") || (token == "-") || (token == "*") || (token == "/")) {
                int op1 = st.top(); st.pop();
                int op2 = st.top(); st.pop();
                if(token == "+") op2 += op1;
                if(token == "-") op2 -= op1;
                if(token == "*") op2 *= op1;
                if(token == "/") op2 /= op1;
                st.push(op2);
            } else {
                st.push(stoi(token));
            }
        }
        return st.top();
    }
};
```

### Fancy C++ lambda expression solution (using stack)

```cpp
class Solution {
public:
    int evalRPN(vector<string>& tokens) {
        unordered_map<string, function<int (int, int) > > map = {
            { "+" , [] (int a, int b) { return a + b; } },
            { "-" , [] (int a, int b) { return a - b; } },
            { "*" , [] (int a, int b) { return a * b; } },
            { "/" , [] (int a, int b) { return a / b; } }
        };
        std::stack<int> stack;
        for (string& s : tokens) {
            if (!map.count(s)) {
                stack.push(stoi(s));
            } else {
                int op1 = stack.top();
                stack.pop();
                int op2 = stack.top();
                stack.pop();
                stack.push(map[s](op2, op1));
            }
        }
        return stack.top();
    }
};
```
## Source
- [Evaluate Reverse Polish Notation - LeetCode](https://leetcode.com/problems/evaluate-reverse-polish-notation/)