---
title: Partitioning Into Minimum Number Of Deci-Binary Numbers
date: 2023-07-23
lastmod: 2023-07-23
author: Jimmy Lin
tags: ["greedy"]
draft: false
---

## Description

A decimal number is called **deci-binary** if each of its digits is either `0` or `1` without any leading zeros. For example, `101` and `1100` are **deci-binary**, while `112` and `3001` are not.

Given a string `n` that represents a positive decimal integer, return _the **minimum** number of positive **deci-binary** numbers needed so that they sum up to_ `n`_._

**Example 1:**

**Input:** n = "32"
**Output:** 3
**Explanation:** 10 + 11 + 11 = 32

**Example 2:**

**Input:** n = "82734"
**Output:** 8

**Example 3:**

**Input:** n = "27346209830709182346"
**Output:** 9

**Constraints:**

*   `1 <= n.length <= 105`
*   `n` consists of only digits.
*   `n` does not contain any leading zeros and represents a positive integer.

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    int minPartitions(string n) {
        int res = 0;
        for(int i = 0; i < n.size(); i++) {
            res = max(res, n[i] - '0');
        }
        return res;
    }
};
```

可以簡化成 1-line C++。

```cpp
class Solution {
public:
    int minPartitions(string n) {
        return *max_element(n.begin(), n.end()) - '0';
    }
};
```
## Source
- [Partitioning Into Minimum Number Of Deci-Binary Numbers - LeetCode](https://leetcode.com/problems/partitioning-into-minimum-number-of-deci-binary-numbers/description/)