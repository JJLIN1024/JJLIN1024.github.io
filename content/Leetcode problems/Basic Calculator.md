---
title: Basic Calculator
date: 2024-02-26
lastmod: 2024-02-26
author:
  - Jimmy Lin
tags:
  - stack
  - review
draft: false
sr-due: 2024-04-10
sr-interval: 34
sr-ease: 270
---

## Description

Given a string `s` representing a valid expression, implement a basic calculator to evaluate it, and return _the result of the evaluation_.

**Note:** You are **not** allowed to use any built-in function which evaluates strings as mathematical expressions, such as `eval()`.

**Example 1:**

**Input:** s = "1 + 1"
**Output:** 2

**Example 2:**

**Input:** s = " 2-1 + 2 "
**Output:** 3

**Example 3:**

**Input:** s = "(1+(4+5+2)-3)+(6+8)"
**Output:** 23

**Constraints:**

*   `1 <= s.length <= 3 * 105`
*   `s` consists of digits, `'+'`, `'-'`, `'('`, `')'`, and `' '`.
*   `s` represents a valid expression.
*   `'+'` is **not** used as a unary operation (i.e., `"+1"` and `"+(2 + 3)"` is invalid).
*   `'-'` could be used as a unary operation (i.e., `"-1"` and `"-(2 + 3)"` is valid).
*   There will be no two consecutive operators in the input.
*   Every number and running calculation will fit in a signed 32-bit integer.

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(n)$

```cpp
// order matters
sum += sign * num;
num = 0;
```

這段 code 必須放在 if else 判斷的前面，放在後面的話會產生錯誤的計算，以 `"2-1 + 2"` 為例，若放在後面，則 `-` 反而會作用在 `2` 身上，而非我們想要的 `1` 身上。

```cpp
class Solution {
public:
    int calculate(string s) {
        stack<long long> nums, ops;
        long long num = 0;
        long long  sum = 0;
        long long  sign = 1;
        for(char c: s) {
            if(isdigit(c)) {
                num = num * 10 + c - '0';
            } else {
		        // order matters
                sum += sign * num;
                num = 0;
                
                if(c == '(') {
                    nums.push(sum);
                    ops.push(sign);
                    sum = 0;
                    sign = 1;
                }
                if(c == ')') {
                    sum = ops.top() * sum + nums.top();
                    nums.pop();
                    ops.pop();
                }
                if(c == '+') sign = 1;
                if(c == '-') sign = -1;
            }
        }
        sum += sign * num;
        return sum;
    }
};
```

## Source
- [Basic Calculator - LeetCode](https://leetcode.com/problems/basic-calculator/description/?envType=study-plan-v2&envId=top-interview-150)