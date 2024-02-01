---
title: Missing Number
date: 2023-07-15
lastmod: 2023-12-07
author:
  - Jimmy Lin
tags:
  - binary_search
  - bit_manipulation
draft: false
---

## Description

Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return _the only number in the range that is missing from the array._

**Example 1:**

**Input:** nums = \[3,0,1\]
**Output:** 2
**Explanation:** n = 3 since there are 3 numbers, so all numbers are in the range \[0,3\]. 2 is the missing number in the range since it does not appear in nums.

**Example 2:**

**Input:** nums = \[0,1\]
**Output:** 2
**Explanation:** n = 2 since there are 2 numbers, so all numbers are in the range \[0,2\]. 2 is the missing number in the range since it does not appear in nums.

**Example 3:**

**Input:** nums = \[9,6,4,2,3,5,7,0,1\]
**Output:** 8
**Explanation:** n = 9 since there are 9 numbers, so all numbers are in the range \[0,9\]. 8 is the missing number in the range since it does not appear in nums.

**Constraints:**

*   `n == nums.length`
*   `1 <= n <= 104`
*   `0 <= nums[i] <= n`
*   All the numbers of `nums` are **unique**.

**Follow up:** Could you implement a solution using only `O(1)` extra space complexity and `O(n)` runtime complexity?

## Code 

### Binary Search
Time Complexity: $O(n \log n)$, Space Complexity: $O(1)$

在 missing number 之前出現的 number 都滿足：`nums[i] = i`，所以我們要找的就是第一個不滿足此條件之數字的 index。

```cpp
class Solution {
public:
    int missingNumber(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int l = 0, r = nums.size();
        while(l < r) {
            int mid = (l + r) / 2;
            if(nums[mid] > mid) {
                r = mid;
            } else {
                l = mid + 1;
            }
        }

        return l;
    }
};
```

### Bit Manipulation
Time Complexity: $O(n)$, Space Complexity: $O(1)$

KEY: `a ^ a = 0`

```cpp
class Solution {
public:
    int missingNumber(vector<int>& nums) {
        int t = 0;
        for(int i = 0; i < nums.size(); i++) {
            t ^= nums[i];
            t ^= i;
        }
        return t ^= nums.size();
    }
};
```

## Source
- [Missing Number - LeetCode](https://leetcode.com/problems/missing-number/)