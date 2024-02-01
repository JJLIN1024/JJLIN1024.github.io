---
title: Minimum Number of Operations to Make Array Continuous
date: 2023-10-10
lastmod: 2023-10-10
author:
  - Jimmy Lin
tags:
  - sliding_window
  - two_pointer
draft: false
---

## Description

You are given an integer array `nums`. In one operation, you can replace **any** element in `nums` with **any** integer.

`nums` is considered **continuous** if both of the following conditions are fulfilled:

*   All elements in `nums` are **unique**.
*   The difference between the **maximum** element and the **minimum** element in `nums` equals `nums.length - 1`.

For example, `nums = [4, 2, 5, 3]` is **continuous**, but `nums = [1, 2, 3, 5, 6]` is **not continuous**.

Return _the **minimum** number of operations to make_ `nums` **_continuous_**.

**Example 1:**

**Input:** nums = \[4,2,5,3\]
**Output:** 0
**Explanation:** nums is already continuous.

**Example 2:**

**Input:** nums = \[1,2,3,5,6\]
**Output:** 1
**Explanation:** One possible solution is to change the last element to 4.
The resulting array is \[1,2,3,5,4\], which is continuous.

**Example 3:**

**Input:** nums = \[1,10,100,1000\]
**Output:** 3
**Explanation:** One possible solution is to:
- Change the second element to 2.
- Change the third element to 3.
- Change the fourth element to 4.
The resulting array is \[1,2,3,4\], which is continuous.

**Constraints:**

*   `1 <= nums.length <= 105`
*   `1 <= nums[i] <= 109`

## Code 

### Binary Search
Time Complexity: $O(n \log n)$, Space Complexity: $O(n)$

```cpp
class Solution {

public:
    int minOperations(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int N = nums.size();
        nums.erase(unique(nums.begin(), nums.end()), nums.end());
        
        int res = N;
        for(int i = 0; i < nums.size(); i++) {
            // pick nums[i] as the smallest number
            // the end should be nums[i] + N - 1
            int end = nums[i] + N - 1;
            // the first element that is greater then the end, whose value should be changed
            // and the inserted into range (nums[i], end)
            auto out_of_bound_idx = upper_bound(nums.begin(), nums.end(), end) - nums.begin();
            int unique_len = out_of_bound_idx - i;

            // N - unique_len is the number of elements that is outside of range (nums[i], end)
            // both in the front and back, that needs to be changed
            res = min(res, N - unique_len);
        }

        return res;

    }
};
```

### Sliding Window
Time Complexity: $O(n \log n)$, Space Complexity: $O(n)$

和 binary search 的解法差別只在於如何找到第一個在 range 之外的 element。

```cpp
class Solution {

public:
    int minOperations(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int N = nums.size();
        nums.erase(unique(nums.begin(), nums.end()), nums.end());
        
        int res = N;
        int j = 0;
        for(int i = 0; i < nums.size(); i++) {
            
            // pick nums[i] as the smallest number
            // the end should be nums[i] + N - 1
            while(j < nums.size() && nums[i] + N - 1 >= nums[j]) j++;
            // now nums[j] is the the first element that is greater then the end, 
            // whose value should be changed and inserted into range (nums[i], end)
            
            int unique_len = j - i;

            // N - unique_len is the number of elements that is outside of range (nums[i], end)
            // both in the front and back, that needs to be changed
            res = min(res, N - unique_len);
        }

        return res;

    }
};
```

## Source
- [Minimum Number of Operations to Make Array Continuous - LeetCode](https://leetcode.com/problems/minimum-number-of-operations-to-make-array-continuous/description/?envType=daily-question&envId=2023-10-10)