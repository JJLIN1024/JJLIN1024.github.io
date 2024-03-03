---
title: Maximum Odd Binary Number
date: 2024-03-01
lastmod: 2024-03-01
author:
  - Jimmy Lin
tags:
  - string
draft: false
---

## Description

You are given a **binary** string `s` that contains at least one `'1'`.

You have to **rearrange** the bits in such a way that the resulting binary number is the **maximum odd binary number** that can be created from this combination.

Return _a string representing the maximum odd binary number that can be created from the given combination._

**Note** that the resulting string **can** have leading zeros.

**Example 1:**

**Input:** s = "010"
**Output:** "001"
**Explanation:** Because there is just one '1', it must be in the last position. So the answer is "001".

**Example 2:**

**Input:** s = "0101"
**Output:** "1001"
**Explanation:** One of the '1's must be in the last position. The maximum number that can be made with the remaining digits is "100". So the answer is "1001".

**Constraints:**

*   `1 <= s.length <= 100`
*   `s` consists only of `'0'` and `'1'`.
*   `s` contains at least one `'1'`.

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    string maximumOddBinaryNumber(string s) {
        int one_count = 0, zero_count = 0;
        for(auto c: s) {
            if(c == '1') 
                one_count++;
            if(c == '0') 
                zero_count++;
        }

        string res = "";
        for(int i = 0; i < one_count - 1; i++) {
            res += "1";
        }
        for(int i = 0; i < zero_count; i++) {
            res += "0";
        }
        res += "1";
        return res;
    }
};
```

## Source
- [Maximum Odd Binary Number - LeetCode](https://leetcode.com/problems/maximum-odd-binary-number/description/?envType=daily-question&envId=2024-03-01)