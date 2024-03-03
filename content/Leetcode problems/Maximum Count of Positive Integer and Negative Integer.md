---
title: Maximum Count of Positive Integer and Negative Integer - LeetCode
date: 2023-07-15
lastmod: 2023-07-15
author: Jimmy Lin
tags: ["binary search"]
draft: false
---

## Description

Given an array `nums` sorted in **non-decreasing** order, return _the maximum between the number of positive integers and the number of negative integers._

*   In other words, if the number of positive integers in `nums` is `pos` and the number of negative integers is `neg`, then return the maximum of `pos` and `neg`.

**Note** that `0` is neither positive nor negative.

**Example 1:**

**Input:** nums = \[-2,-1,-1,1,2,3\]
**Output:** 3
**Explanation:** There are 3 positive integers and 3 negative integers. The maximum count among them is 3.

**Example 2:**

**Input:** nums = \[-3,-2,-1,0,0,1,2\]
**Output:** 3
**Explanation:** There are 2 positive integers and 3 negative integers. The maximum count among them is 3.

**Example 3:**

**Input:** nums = \[5,20,66,1314\]
**Output:** 4
**Explanation:** There are 4 positive integers and 0 negative integers. The maximum count among them is 4.

**Constraints:**

*   `1 <= nums.length <= 2000`
*   `-2000 <= nums[i] <= 2000`
*   `nums` is sorted in a **non-decreasing order**.

**Follow up:** Can you solve the problem in `O(log(n))` time complexity?

## Code 

Time Complexity: $O(\log n)$, Space Complexity: $O(1)$

基本概念同：[[Binary Search 101|Binary Search 101]]

在這題中我們使用 Binary Search 兩次，一次找第一個大於 0 的 index，一次找第一個小於 0 的 index。

edge case 為：全部都是 0 的 case。

```cpp
class Solution {
public:
    int maximumCount(vector<int>& nums) {
        int l = 0, r = nums.size() - 1;
        while(l < r) {
            int m = l + (r - l) / 2;
            if(nums[m] <= 0) 
                l = m + 1;
            else
                r = m;
        }
        
        int positive = nums[l] == 0 ? 0 : (nums.size() - 1 - l + 1);

        l = 0, r = nums.size() - 1;
        while(l < r) {
            int m = (l + r + 1) / 2;
            if(nums[m] >= 0) 
                r = m - 1;
            else
                l = m;
        }

        int negative = nums[r] == 0 ? 0 : r + 1;

        return max(positive, negative);
    }
};
```

## Source
- [Maximum Count of Positive Integer and Negative Integer - LeetCode](https://leetcode.com/problems/maximum-count-of-positive-integer-and-negative-integer/description/)