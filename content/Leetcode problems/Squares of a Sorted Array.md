---
title: Squares of a Sorted Array
date: 2023-03-19
lastmod: 2023-03-19
author:
  - Jimmy Lin
tags:
  - two_pointer
  - sort
draft: false
---

## Description

Given an integer array `nums` sorted in **non-decreasing** order, return _an array of **the squares of each number** sorted in non-decreasing order_.

**Example 1:**

**Input:** nums = \[-4,-1,0,3,10\]
**Output:** \[0,1,9,16,100\]
**Explanation:** After squaring, the array becomes \[16,1,0,9,100\].
After sorting, it becomes \[0,1,9,16,100\].

**Example 2:**

**Input:** nums = \[-7,-3,2,3,11\]
**Output:** \[4,9,9,49,121\]

**Constraints:**

*   `1 <= nums.length <= 104`
*   `-104 <= nums[i] <= 104`
*   `nums` is sorted in **non-decreasing** order.

**Follow up:** Squaring each element and sorting the new array is very trivial, could you find an `O(n)` solution using a different approach?

## Code 

$O(n\log n)$ time, $O(1)$ space

```cpp
class Solution {
public:
    vector<int> sortedSquares(vector<int>& nums) {
        for(auto& n: nums) {
            n = n * n;
        }
        sort(nums.begin(), nums.end());
        return nums;
    }
};
```

$O(n)$ time, $O(n)$ space Using two pointer

```cpp
class Solution {
public:
    vector<int> sortedSquares(vector<int>& nums) {
        vector<int> answer(nums.size());
        int l = 0, r = nums.size() - 1;
        for(int k = nums.size() - 1; k >= 0; k--) {
            if(abs(nums[l]) > abs(nums[r])) {
                answer[k] = pow(nums[l++], 2);
            } else {
                answer[k] = pow(nums[r--], 2);     
            }
        }
        return answer;
    }
};
```

## Source
- [Squares of a Sorted Array - LeetCode](https://leetcode.com/problems/squares-of-a-sorted-array/)