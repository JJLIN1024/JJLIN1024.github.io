---
title: Next Greater Element III
date: 2023-03-25
lastmod: 2023-03-25
author:
  - Jimmy Lin
tags:
  - next_permutation
  - review
draft: false
sr-due: 2024-08-06
sr-interval: 159
sr-ease: 292
---

## Description

Given a positive integer `n`, find _the smallest integer which has exactly the same digits existing in the integer_ `n` _and is greater in value than_ `n`. If no such positive integer exists, return `-1`.

**Note** that the returned integer should fit in **32-bit integer**, if there is a valid answer but it does not fit in **32-bit integer**, return `-1`.

**Example 1:**

**Input:** n = 12
**Output:** 21

**Example 2:**

**Input:** n = 21
**Output:** -1

**Constraints:**

*   `1 <= n <= 231 - 1`

## Code 

使用 [[Next Permutation]] ，將 input int 轉成 string 來處理。

要注意將 string 轉回數字時，不行轉成 int，因為 next greater element 有可能會超過 int 的範圍，因此要使用 `stoll` 並進行 bound check。

```cpp
class Solution {
public:
    int nextGreaterElement(int n) {
        string number = to_string(n);
        int m = number.size(), k, l;
        for(k = m - 2; k >= 0; k--) {
            if(number[k] < number[k+1]) 
                break;
        }

        if(k < 0) return -1;

        for(l = m - 1; l >= 0; l--) {
            if(number[l] > number[k]) 
                break;
        }

        swap(number[l], number[k]);
        reverse(number.begin() + k + 1, number.end());
        auto res = stoll(number);
        return (res > INT_MAX) ? -1 : res;
    }

};
```

## Source
- [Next Greater Element III - LeetCode](https://leetcode.com/problems/next-greater-element-iii/description/)