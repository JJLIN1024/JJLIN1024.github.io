---
title: Minimum Sum of Four Digit Number After Splitting Digits
date: 2023-07-23
lastmod: 2023-07-23
author: Jimmy Lin
tags: ["greedy"]
draft: false
---

## Description

You are given a **positive** integer `num` consisting of exactly four digits. Split `num` into two new integers `new1` and `new2` by using the **digits** found in `num`. **Leading zeros** are allowed in `new1` and `new2`, and **all** the digits found in `num` must be used.

*   For example, given `num = 2932`, you have the following digits: two `2`'s, one `9` and one `3`. Some of the possible pairs `[new1, new2]` are `[22, 93]`, `[23, 92]`, `[223, 9]` and `[2, 329]`.

Return _the **minimum** possible sum of_ `new1` _and_ `new2`.

**Example 1:**

**Input:** num = 2932
**Output:** 52
**Explanation:** Some possible pairs \[new1, new2\] are \[29, 23\], \[223, 9\], etc.
The minimum sum can be obtained by the pair \[29, 23\]: 29 + 23 = 52.

**Example 2:**

**Input:** num = 4009
**Output:** 13
**Explanation:** Some possible pairs \[new1, new2\] are \[0, 49\], \[490, 0\], etc. 
The minimum sum can be obtained by the pair \[4, 9\]: 4 + 9 = 13.

**Constraints:**

*   `1000 <= num <= 9999`

## Code 

Time Complexity: $O(n \log n)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    int minimumSum(int num) {
        string s = to_string(num);
        sort(s.begin(), s.end());
        int a = s[0] - '0', b = s[1] - '0', c = s[2] - '0', d = s[3] - '0';
        return a * 10 + c + b * 10 + d;
    }
};
```

## Source
- [Minimum Sum of Four Digit Number After Splitting Digits - LeetCode](https://leetcode.com/problems/minimum-sum-of-four-digit-number-after-splitting-digits/)