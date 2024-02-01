---
title: Maximum Subarray
date: 2023-03-20
lastmod: 2023-03-20
author:
  - Jimmy Lin
tags:
  - DP
  - review
draft: false
sr-due: 2024-02-02
sr-interval: 4
sr-ease: 270
---

## Description

Given an integer array `nums`, find the

subarray

with the largest sum, and return _its sum_.

**Example 1:**

**Input:** nums = \[-2,1,-3,4,-1,2,1,-5,4\]
**Output:** 6
**Explanation:** The subarray \[4,-1,2,1\] has the largest sum 6.

**Example 2:**

**Input:** nums = \[1\]
**Output:** 1
**Explanation:** The subarray \[1\] has the largest sum 1.

**Example 3:**

**Input:** nums = \[5,4,-1,7,8\]
**Output:** 23
**Explanation:** The subarray \[5,4,-1,7,8\] has the largest sum 23.

**Constraints:**

*   `1 <= nums.length <= 105`
*   `-104 <= nums[i] <= 104`

**Follow up:** If you have figured out the `O(n)` solution, try coding another solution using the **divide and conquer** approach, which is more subtle.

## Code 

## Kadane's Algorithm

使用 [[Best Time to Buy and Sell Stock]] 中學到的 Kadane's Algorithm。
  
see [[Kadane Algorithm(Maximum Subarray Problem)]]

```cpp
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int currMax = nums[0];
        int maxSoFar = nums[0];
        for(int i = 1; i < nums.size(); i++) {
            currMax = max(currMax + nums[i], nums[i]);
            maxSoFar = max(maxSoFar, currMax);
        }

        return maxSoFar;

    }
};
```

## Divide and Conquer

$O(n \log n)$ time, $T(n) = 2 T(\frac{n}{2}) + O(n)$

```cpp
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        return helper(nums, 0, nums.size() - 1);
    }

    int helper(vector<int>& nums, int start, int end) {
        if(start > end) return INT_MIN;
        int mid = start + (end - start) / 2;

        int currSum = 0, leftSum = 0, rightSum = 0;
        for(int i = mid + 1; i <= end; i++) {
            currSum += nums[i];
            rightSum = max(rightSum, currSum);
        }
        currSum = 0;
        for(int i = mid - 1; i >= start; i--) {
            currSum += nums[i];
            leftSum = max(leftSum, currSum);
        }

        return max({helper(nums, start, mid - 1), helper(nums, mid + 1, end), nums[mid] + leftSum + rightSum});

    }
};
```

## Source
- [Maximum Subarray - LeetCode](https://leetcode.com/problems/maximum-subarray/description/)