---
title: Maximum Product Subarray
date: 2023-04-09
lastmod: 2023-04-09
author: Jimmy Lin
tags:
  - DP
  - review
draft: false
sr-due: 2024-09-07
sr-interval: 176
sr-ease: 290
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
        int pos = nums[0], neg = nums[0], res = nums[0];
        for(int i = 1; i < nums.size(); i++) {
            int new_pos, new_neg;
            if(nums[i] >= 0) {
                new_pos = max(pos * nums[i], nums[i]);
                new_neg = min(neg * nums[i], nums[i]);
            } else if(nums[i] < 0) {
                new_pos = max(neg * nums[i], nums[i]);
                new_neg = min(pos * nums[i], nums[i]);
            } 
            pos = new_pos;
            neg = new_neg;
            res = max(res, pos);
        }
        return res;
    }
};
```

```cpp
class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int positive = nums[0];
        int negative = nums[0];
        int maxP = nums[0];

        for(int i = 1; i < nums.size(); i++) {
            if(nums[i] < 0) swap(positive, negative);

            positive = max(nums[i], positive * nums[i]);
            negative = min(nums[i], negative * nums[i]);

            maxP = max(maxP, positive);
        }

        return maxP;
    }
};
```


## Source
- [Maximum Product Subarray - LeetCode](https://leetcode.com/problems/maximum-product-subarray/)