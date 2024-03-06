---
title: Restore IP Addresses
date: 2024-03-06
lastmod: 2024-03-06
author:
  - Jimmy Lin
tags:
  - dfs
  - review
draft: false
sr-due: 2024-03-10
sr-interval: 4
sr-ease: 270
---

## Description

A **valid IP address** consists of exactly four integers separated by single dots. Each integer is between `0` and `255` (**inclusive**) and cannot have leading zeros.

*   For example, `"0.1.2.201"` and `"192.168.1.1"` are **valid** IP addresses, but `"0.011.255.245"`, `"192.168.1.312"` and `"192.168@1.1"` are **invalid** IP addresses.

Given a string `s` containing only digits, return _all possible valid IP addresses that can be formed by inserting dots into_ `s`. You are **not** allowed to reorder or remove any digits in `s`. You may return the valid IP addresses in **any** order.

**Example 1:**

**Input:** s = "25525511135"
**Output:** \["255.255.11.135","255.255.111.35"\]

**Example 2:**

**Input:** s = "0000"
**Output:** \["0.0.0.0"\]

**Example 3:**

**Input:** s = "101023"
**Output:** \["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"\]

**Constraints:**

*   `1 <= s.length <= 20`
*   `s` consists of digits only.

## Code 

可以學習的地方在於：`num = num * 10 + (s[j] - '0');`

不需要用字串去比較，也不需要使用 `stoi` 之類的。

```cpp
class Solution {
public:
    vector<string> res;
    vector<string> restoreIpAddresses(string s) {
        dfs(s, 0, "", 0);
        return res;
    }

    void dfs(string& s, int i, string cur, int n) {
        if(i == s.length() && n == 4) {
            cur.pop_back(); // pop the last "."
            res.push_back(cur);
            return;
        }  

        int num = 0;
        for(int j = i; j < i + 3; j++) {
            if(j >= s.length())
                break;
            num = num * 10 + (s[j] - '0');
            if(num <= 255) {
                cur += s[j];
                dfs(s, j + 1, cur + '.', n + 1);
            }
            if(num == 0) break;
        }
    }
};
```

## Source
- [Restore IP Addresses - LeetCode](https://leetcode.com/problems/restore-ip-addresses/description/)