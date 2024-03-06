---
title: Gray Code
date: 2024-03-06
lastmod: 2024-03-06
author:
  - Jimmy Lin
tags:
  - bit_manipulation
  - review
draft: false
sr-due: 2024-03-10
sr-interval: 4
sr-ease: 270
---

## Description

An **n-bit gray code sequence** is a sequence of `2n` integers where:

*   Every integer is in the **inclusive** range `[0, 2n - 1]`,
*   The first integer is `0`,
*   An integer appears **no more than once** in the sequence,
*   The binary representation of every pair of **adjacent** integers differs by **exactly one bit**, and
*   The binary representation of the **first** and **last** integers differs by **exactly one bit**.

Given an integer `n`, return _any valid **n-bit gray code sequence**_.

**Example 1:**

**Input:** n = 2
**Output:** \[0,1,3,2\]
**Explanation:**
The binary representation of \[0,1,3,2\] is \[00,01,11,10\].
- 00 and 01 differ by one bit
- 01 and 11 differ by one bit
- 11 and 10 differ by one bit
- 10 and 00 differ by one bit
\[0,2,3,1\] is also a valid gray code sequence, whose binary representation is \[00,10,11,01\].
- 00 and 10 differ by one bit
- 10 and 11 differ by one bit
- 11 and 01 differ by one bit
- 01 and 00 differ by one bit

**Example 2:**

**Input:** n = 1
**Output:** \[0,1\]

**Constraints:**

*   `1 <= n <= 16`

## Code 

觀察：

```
n = 1 : {0, 1}
n = 2 : {0, 1, 10, 11}
n = 3 : {0, 1, 10, 11, 110, 111, 101, 100}
...
```

把以上規律寫成 code：

```cpp
class Solution {
public:
    vector<int> grayCode(int n) {
        vector<int>res(1, 0);
        for(int i = 0; i < n; i++){
            int size = res.size();
            for(int j = size - 1; j >= 0; j--){
                res.push_back(res[j] | 1 << i);
            }
        }
        return res;
    }
};
```

### Math

```cpp
class Solution {
public:
    vector<int> grayCode(int n) {
        vector<int> ans(1<<n);
        for (int i=0; i<(1<<n); i++) 
            ans[i] = i^(i>>1);
        return ans;
    }
};
```

## Source
- [Gray Code - LeetCode](https://leetcode.com/problems/gray-code/description/)