---
title: Basic Calculator II
date: 2024-03-07
lastmod: 2024-03-07
author:
  - Jimmy Lin
tags:
  - stack
  - review
draft: false
sr-due: 2024-03-08
sr-interval: 1
sr-ease: 230
---

## Description

Given a string `s` which represents an expression, _evaluate this expression and return its value_. 

The integer division should truncate toward zero.

You may assume that the given expression is always valid. All intermediate results will be in the range of `[-231, 231 - 1]`.

**Note:** You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as `eval()`.

**Example 1:**

**Input:** s = "3+2\*2"
**Output:** 7

**Example 2:**

**Input:** s = " 3/2 "
**Output:** 1

**Example 3:**

**Input:** s = " 3+5 / 2 "
**Output:** 5

**Constraints:**

*   `1 <= s.length <= 3 * 105`
*   `s` consists of integers and operators `('+', '-', '*', '/')` separated by some number of spaces.
*   `s` represents **a valid expression**.
*   All the integers in the expression are non-negative integers in the range `[0, 231 - 1]`.
*   The answer is **guaranteed** to fit in a **32-bit integer**.

## Code 

和 [[Basic Calculator]] 一樣的解法。

Time Complexity: $O(n)$, Space Complexity: $O(n)$

```cpp
class Result {
public:
    int equationResult;
    int charsInEquation;
    Result(int equationResult, int charsInEquation) {
        this->equationResult = equationResult;
        this->charsInEquation = charsInEquation;
    }
};

class Solution {
public:
    int calculate(string s) {
        return calculateResult(s).equationResult;
    }

    void update(stack<int>& st, int num, int sign) {
        if(sign == '+') st.push(num);
        if(sign == '-') st.push(-num);
        if(sign == '*') {
            int num2 = st.top();
            st.pop();  
            st.push(num2 * num);  
        }
        if(sign == '/') {
            int num2 = st.top();
            st.pop();  
            st.push(num2 / num);  
        }
    }

    int sum(stack<int> st) {
        int result = 0;
        while(!st.empty()){
            result += st.top();
            st.pop();
        }
        return result;
    }

    Result calculateResult(string s) {
        stack<int> st;
        int i = 0, num = 0;
        char sign = '+';
        unordered_set<char> ops = {'+', '-', '/', '*'};

        while(i < s.length()) {
            char c = s[i];
            if(isdigit(c)) {
                num = num * 10 + (c - '0');
            } else if(ops.find(c) != ops.end()) {
                update(st, num, sign);
                num = 0;
                sign = c;
            } else if(c == '(') {
                Result innerEquationResult = calculateResult(s.substr(i+1));
                num = innerEquationResult.equationResult;
                i += innerEquationResult.charsInEquation;
            } else if(c == ')') {
                update(st, num, sign);
                return Result(sum(st), i+1); 
            }
            i++;
        }

        update(st, num, sign);
        return Result(sum(st), i);
    }
};
```

## Source
- [Basic Calculator II - LeetCode](https://leetcode.com/problems/basic-calculator-ii/description/)