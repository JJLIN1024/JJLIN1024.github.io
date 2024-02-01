---
title: Add Binary
date: 2023-03-14
lastmod: 2023-03-14
author: Jimmy Lin
tags: ["string"]
draft: false
---

## Description

Given two binary strings `a` and `b`, return _their sum as a binary string_.

**Example 1:**

**Input:** a = "11", b = "1"
**Output:** "100"

**Example 2:**

**Input:** a = "1010", b = "1011"
**Output:** "10101"

**Constraints:**

*   `1 <= a.length, b.length <= 104`
*   `a` and `b` consist only of `'0'` or `'1'` characters.
*   Each string does not contain leading zeros except for the zero itself.

## Code 

和 [[Add Two Numbers]] 一樣使用 `while(i >= 0 || j >= 0 || carry) ` 的結構。

Time Complexity: $O(N)$, Space Complexity: $O(N)$

```cpp
class Solution {
public:
    string addBinary(string a, string b) {
        int carry = 0;
        int i = a.length() - 1, j = b.length() - 1;
        string res = "";
        while(i >= 0 || j >= 0 || carry) {
            int cur = carry;
            if(i >= 0) {
                if(a[i] == '1') cur++;
                i--;
            }
            if(j >= 0) {
                if(b[j] == '1') cur++;
                j--;
            }
            carry = cur / 2;
            cur = cur % 2;
            res += cur == 1 ? "1" : "0";
        }
        reverse(res.begin(), res.end());
        return res;
    }
};
```
## Source
- [Add Binary - LeetCode](https://leetcode.com/problems/add-binary/description/)