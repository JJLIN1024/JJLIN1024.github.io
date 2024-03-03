---
title: Roman to Integer
date: 2023-03-15
lastmod: 2023-03-15
author:
  - Jimmy Lin
tags:
  - hashmap
  - review
draft: false
sr-due: 2024-03-05
sr-interval: 4
sr-ease: 270
---

## Description

Roman numerals are represented by seven different symbols: `I`, `V`, `X`, `L`, `C`, `D` and `M`.

**Symbol**       **Value**
I             1
V             5
X             10
L             50
C             100
D             500
M             1000

For example, `2` is written as `II` in Roman numeral, just two ones added together. `12` is written as `XII`, which is simply `X + II`. The number `27` is written as `XXVII`, which is `XX + V + II`.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not `IIII`. Instead, the number four is written as `IV`. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as `IX`. There are six instances where subtraction is used:

*   `I` can be placed before `V` (5) and `X` (10) to make 4 and 9. 
*   `X` can be placed before `L` (50) and `C` (100) to make 40 and 90. 
*   `C` can be placed before `D` (500) and `M` (1000) to make 400 and 900.

Given a roman numeral, convert it to an integer.

**Example 1:**

**Input:** s = "III"
**Output:** 3
**Explanation:** III = 3.

**Example 2:**

**Input:** s = "LVIII"
**Output:** 58
**Explanation:** L = 50, V= 5, III = 3.

**Example 3:**

**Input:** s = "MCMXCIV"
**Output:** 1994
**Explanation:** M = 1000, CM = 900, XC = 90 and IV = 4.

**Constraints:**

*   `1 <= s.length <= 15`
*   `s` contains only the characters `('I', 'V', 'X', 'L', 'C', 'D', 'M')`.
*   It is **guaranteed** that `s` is a valid roman numeral in the range `[1, 3999]`.

## Code 

觀察規律，得出結論：`IV` 可以被分解成 `-1 + 5 = 4`，因此 `if(mp[s[i]] < mp[s[i+1]])`，且從後面開始 iterate 到前面。

```cpp
class Solution {
public:
    int romanToInt(string s) {
        unordered_map<char,int> mp{
            {'I',1},
            {'V',5},
            {'X',10},
            {'L',50},
            {'C',100},
            {'D',500},
            {'M',1000},
        };
        int res = 0;
        res += mp[s.back()];
        for(int i = s.length() - 2; i >= 0; i--) {
            if(mp[s[i]] < mp[s[i+1]])
                res -= mp[s[i]];
            else
                res += mp[s[i]];
        }

        return res;
    }
};
```

## Source
- [Roman to Integer - LeetCode](https://leetcode.com/problems/roman-to-integer/)