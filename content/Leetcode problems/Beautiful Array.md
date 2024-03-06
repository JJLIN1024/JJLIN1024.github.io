---
title: Beautiful Array
date: 2024-03-06
lastmod: 2024-03-06
author:
  - Jimmy Lin
tags:
  - divide_and_conquer
  - bit_manipulation
  - review
draft: false
sr-due: 2024-03-07
sr-interval: 1
sr-ease: 230
---

## Description

An array `nums` of length `n` is **beautiful** if:

*   `nums` is a permutation of the integers in the range `[1, n]`.
*   For every `0 <= i < j < n`, there is no index `k` with `i < k < j` where `2 * nums[k] == nums[i] + nums[j]`.

Given the integer `n`, return _any **beautiful** array_ `nums` _of length_ `n`. There will be at least one valid answer for the given `n`.

**Example 1:**

**Input:** n = 4
**Output:** \[2,1,4,3\]

**Example 2:**

**Input:** n = 5
**Output:** \[3,1,2,5,4\]

**Constraints:**

*   `1 <= n <= 1000`

## Code 

### Bit Manipulation

首先觀察到，若將 `[1, 2, 3, 4, 5]` 分成 `[1, 3, 5] [2, 4]`，兩組之間相加必滿足條件，因為 odd + even 除以二必不是 integer。

接下來要想辦法讓組內任意兩數相加也滿足題意。觀察 `1 + 5` 除以二後為何會等於 `3`？

```
   bits
------
1: 001
3: 011
5: 101
```

因為 `3 * 2 = 6` in bits 是 `110`，`110` 是乘二得來的，代表其最後一位必定是 `0`，而若只能由 odd 去相加得到 `6`，必定需要進位。但如果將數字按照 1 bit 由右到左去排序（由少到多），就不可能發生上述情況，下面例子：

```
   bits
------
1: 001
5: 101
3: 011
```

因為後面的數字 1 bit 比較靠右，所以不可能透過某數相加他之後得到一個 1 bit 有出現在左邊同時右邊 1 bit 還不動的數字（進位的話右邊的 1 bit 就會變成 0）！

Time Complexity: $O(n \log n)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    vector<int> beautifulArray(int n) {
        vector<int> res(n);
        for(int i = 0; i < n; i++)
            res[i] = i + 1;
        
        auto cmp = [](const int& n1, const int& n2){
            int mask = n1 ^ n2; // clear same right 1 bits
            mask = mask & (-mask); // fetch the rightmost 1 bit
            return n1 & mask; // check if this 1 bit belongs to n1 or not
        };
        sort(res.begin(), res.end(), cmp);
        return res;
    }
};
```

### Divide and Conquer

```cpp

```
## Source
- [Beautiful Array - LeetCode](https://leetcode.com/problems/beautiful-array/description/)