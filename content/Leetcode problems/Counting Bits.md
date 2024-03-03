---
title: Counting Bits
date: 2023-01-31
lastmod: 2023-12-05
author:
  - Jimmy Lin
tags:
  - DP
  - bit_manipulation
draft: false
---

## Description

Given an integer `n`, return _an array_ `ans` _of length_ `n + 1` _such that for each_ `i` (`0 <= i <= n`)_,_ `ans[i]` _is the **number of**_ `1`_**'s** in the binary representation of_ `i`.

**Example 1:**

**Input:** n = 2
**Output:** \[0,1,1\]
**Explanation:**
0 --> 0
1 --> 1
2 --> 10

**Example 2:**

**Input:** n = 5
**Output:** \[0,1,1,2,1,2\]
**Explanation:**
0 --> 0
1 --> 1
2 --> 10
3 --> 11
4 --> 100
5 --> 101

**Constraints:**

*   `0 <= n <= 105`

**Follow up:**

*   It is very easy to come up with a solution with a runtime of `O(n log n)`. Can you do it in linear time `O(n)` and possibly in a single pass?
*   Can you do it without using any built-in function (i.e., like `__builtin_popcount` in C++)?

## Code 

### DP

Time Complexity: $O(n)$, Space Complexity: $O(n)$

由基本加法與乘法可知，奇數會是前面的偶數 + 1，而偶數會是由乘上 2 而來，而乘上 2 用 bit 來看就是往左 shift 一位而已，因此 1 bit 的數量會和自己的一半的數字擁有的 1 bit 數量一樣。

用 C 寫時要注意 `returnSize`，概念是在 C function 中傳遞 array 時，必須要明確 specify array size，因為 array name 即是 pointer to the first element of the array。

```c
/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* countBits(int n, int* returnSize) {
    int* res = malloc(sizeof(int) * (n + 1));
    res[0] = 0;
    for(int i = 1; i < n + 1; i++) {
        if(i % 2 == 0)
            res[i] = res[i / 2];
        else
            res[i] = res[i / 2] + 1;
    }
    *returnSize = n + 1;
    return res;
}
```

```cpp
class Solution {
public:
    vector<int> countBits(int n) {
        if(n == 0) return {0};
        if(n == 1) return {0, 1};
        if(n == 2) return {0, 1, 1};
        vector<int> answer(n+1, 0);
        answer[0] = 0;
        answer[1] = 1;
        answer[2] = 1;
        for(int i = 3; i <= n; i++) {
            answer[i] = i % 2 == 0? answer[i/2] : answer[i-1] + 1;
        }

        return answer;
    }
};
```

## Source
- [Counting Bits - LeetCode](https://leetcode.com/problems/counting-bits/description/)