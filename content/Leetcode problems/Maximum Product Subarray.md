---
title: Maximum Product Subarray
date: 2023-04-09
lastmod: 2023-04-09
author: Jimmy Lin
tags:
  - DP
  - review
draft: false
sr-due: 2024-02-02
sr-interval: 4
sr-ease: 270
---

## Description

Given an integer array `nums`, find a

subarray

that has the largest product, and return _the product_.

The test cases are generated so that the answer will fit in a **32-bit** integer.

**Example 1:**

**Input:** nums = \[2,3,-2,4\]
**Output:** 6
**Explanation:** \[2,3\] has the largest product 6.

**Example 2:**

**Input:** nums = \[-2,0,-1\]
**Output:** 0
**Explanation:** The result cannot be 2, because \[-2,-1\] is not a subarray.

**Constraints:**

*   `1 <= nums.length <= 2 * 104`
*   `-10 <= nums[i] <= 10`
*   The product of any prefix or suffix of `nums` is **guaranteed** to fit in a **32-bit** integer.

## Code 

[[Maximum Subarray]] 的變形，由左到右以及由右到左各做一次 [[Kadane Algorithm(Maximum Subarray Problem)]]。

假設由左到右，一路乘下去，只遇到一個負的，那最大值就會是由右往左然後停在負的那個數字前面。如果有兩個負的，負負得正。因此做兩次 kadane algorithm 就可以得到最佳解。

```cpp
class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int n = nums.size(), res = nums[0], l = 0, r = 0;
        for(int i = 0; i < n; i++) {
            l = (l == 0 ? 1 : l) * nums[i];
            r = (r == 0 ? 1 : r) * nums[n - i - 1];
            res = max(res, max(l, r));
        }
        return res;
    }
};
```

## Source
- [Maximum Product Subarray - LeetCode](https://leetcode.com/problems/maximum-product-subarray/)