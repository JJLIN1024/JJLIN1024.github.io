---
title: Special Array With X Elements Greater Than or Equal X
date: 2023-07-01
lastmod: 2023-07-01
author: Jimmy Lin
tags: ["binary search"]
draft: false
---

## Description

You are given an array `nums` of non-negative integers. `nums` is considered **special** if there exists a number `x` such that there are **exactly** `x` numbers in `nums` that are **greater than or equal to** `x`.

Notice that `x` **does not** have to be an element in `nums`.

Return `x` _if the array is **special**, otherwise, return_ `-1`. It can be proven that if `nums` is special, the value for `x` is **unique**.

**Example 1:**

**Input:** nums = \[3,5\]
**Output:** 2
**Explanation:** There are 2 values (3 and 5) that are greater than or equal to 2.

**Example 2:**

**Input:** nums = \[0,0\]
**Output:** -1
**Explanation:** No numbers fit the criteria for x.
If x = 0, there should be 0 numbers >= x, but there are 2.
If x = 1, there should be 1 number >= x, but there are 0.
If x = 2, there should be 2 numbers >= x, but there are 0.
x cannot be greater since there are only 2 numbers in nums.

**Example 3:**

**Input:** nums = \[0,4,3,0,4\]
**Output:** 3
**Explanation:** There are 3 values that are greater than or equal to 3.

**Constraints:**

*   `1 <= nums.length <= 100`
*   `0 <= nums[i] <= 1000`

## Code 

### binary Search

Time Complexity: $O(n \log n)$, Space Complexity: $O(1)$

基本觀念同 [[Binary Search 101|Binary Search 101]]。

#### Version 2

```cpp
class Solution {
public:
    int specialArray(vector<int>& nums) {
        int l = 0, r = nums.size();
        while(l < r) {
            int mid = (l + r) / 2;
            int bigger = countBigger(mid, nums);
            if (bigger > mid) {
                l = mid + 1;
            } else {
                r = mid;
            } 
        }
        return countBigger(l, nums) == l ? l : -1;
    }

    int countBigger(int x, vector<int>& nums) {
        int count = 0;
        for(auto& n: nums) {
            if(n >= x) 
                count++;
        }
        return count;
    }
};
```

#### Version 2

使用 `while(l <= r)`，因為此題保證有唯一解。

```cpp
class Solution {
public:
    int specialArray(vector<int>& nums) {
        int l = 0, r = nums.size();
        while(l <= r) {
            int mid = (l + r) / 2;
            int bigger = countBigger(mid, nums);
            if (bigger == mid) {
                return mid;
            }
            if (bigger > mid) {
                l = mid + 1;
            } else {
                r = mid - 1;
            } 
        }
        return -1;
    }

    int countBigger(int x, vector<int>& nums) {
        int count = 0;
        for(auto& n: nums) {
            if(n >= x) 
                count++;
        }
        return count;
    }
};
```


## Source
- [Special Array With X Elements Greater Than or Equal X - LeetCode](https://leetcode.com/problems/special-array-with-x-elements-greater-than-or-equal-x/)