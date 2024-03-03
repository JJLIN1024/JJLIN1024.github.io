---
title: Sum of Values at Indices With K Set Bits
date: 2023-12-07
lastmod: 2023-12-07
author:
  - Jimmy Lin
tags:
  - bit_manipulation
draft: false
---

## Description

You are given a **0-indexed** integer array `nums` and an integer `k`.

Return _an integer that denotes the **sum** of elements in_ `nums` _whose corresponding **indices** have **exactly**_ `k` _set bits in their binary representation._

The **set bits** in an integer are the `1`'s present when it is written in binary.

*   For example, the binary representation of `21` is `10101`, which has `3` set bits.

**Example 1:**

**Input:** nums = \[5,10,1,5,2\], k = 1
**Output:** 13
**Explanation:** The binary representation of the indices are: 
0 = 0002
1 = 0012
2 = 0102
3 = 0112
4 = 1002 Indices 1, 2, and 4 have k = 1 set bits in their binary representation.
Hence, the answer is nums\[1\] + nums\[2\] + nums\[4\] = 13.

**Example 2:**

**Input:** nums = \[4,3,2,1\], k = 2
**Output:** 1
**Explanation:** The binary representation of the indices are:
0 = 002
1 = 012
2 = 102
3 = 112 Only index 3 has k = 2 set bits in its binary representation.
Hence, the answer is nums\[3\] = 1.

**Constraints:**

*   `1 <= nums.length <= 1000`
*   `1 <= nums[i] <= 105`
*   `0 <= k <= 10`

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(1)$

使用 [[Number of 1 Bits|Number of 1 Bits]] 就行了。

```cpp
class Solution {
public:
    int sumIndicesWithKSetBits(vector<int>& nums, int k) {
        int res = 0;
        for(int i = 0; i < nums.size(); i++) {
            int b = countBits(i); 
            if(b == k) 
                res += nums[i];
        }
        return res;
    }
    int countBits(int n) {
        int count = 0;
        while(n > 0) {
            count++;
            n = n & (n - 1);
        }
        return count;
    }
};
```

## Source
- [Sum of Values at Indices With K Set Bits - LeetCode](https://leetcode.com/problems/sum-of-values-at-indices-with-k-set-bits/description/)