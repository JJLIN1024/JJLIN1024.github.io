---
title: Maximum Sum Circular Subarray
date: 2023-10-29
lastmod: 2023-10-29
author:
  - Jimmy Lin
tags:
  - DP
  - review
draft: false
sr-due: 2024-02-01
sr-interval: 3
sr-ease: 252
---

## Description

Given a **circular integer array** `nums` of length `n`, return _the maximum possible sum of a non-empty **subarray** of_ `nums`.

A **circular array** means the end of the array connects to the beginning of the array. Formally, the next element of `nums[i]` is `nums[(i + 1) % n]` and the previous element of `nums[i]` is `nums[(i - 1 + n) % n]`.

A **subarray** may only include each element of the fixed buffer `nums` at most once. Formally, for a subarray `nums[i], nums[i + 1], ..., nums[j]`, there does not exist `i <= k1`, `k2 <= j` with `k1 % n == k2 % n`.

**Example 1:**

**Input:** nums = \[1,-2,3,-2\]
**Output:** 3
**Explanation:** Subarray \[3\] has maximum sum 3.

**Example 2:**

**Input:** nums = \[5,-3,5\]
**Output:** 10
**Explanation:** Subarray \[5,5\] has maximum sum 5 + 5 = 10.

**Example 3:**

**Input:** nums = \[-3,-2,-3\]
**Output:** -2
**Explanation:** Subarray \[-2\] has maximum sum -2.

**Constraints:**

*   `n == nums.length`
*   `1 <= n <= 3 * 104`
*   `-3 * 104 <= nums[i] <= 3 * 104`

## Code 

### Kadane's Algorithm
知道如何解 [[Maximum Subarray|Maximum Subarray]]的話，這題只是 circular 變形版。

解題關鍵在於：

![](https://i.imgur.com/DnPnZ64.png)

因此：

答案就是 max(maxSum, total - minSum) 

# Corner case

Just one to pay attention:  
If all numbers are negative, `maxSum = max(A)` and `minSum = sum(A)`.  
In this case, `max(maxSum, total - minSum) = 0`, which means the sum of an empty subarray.  
According to the deacription, We need to return the `max(A)`, instead of sum of am empty subarray.  
So we return the `maxSum` to handle this corner case.

```cpp
class Solution {
public:
    int maxSubarraySumCircular(vector<int>& nums) {
        int n = nums.size();
        int curMax = nums[0];
        int Max = nums[0];
        int curMin = nums[0];
        int Min = nums[0];
        int total = nums[0];
        for(int i = 1; i < n; i++) {
            total += nums[i];
            curMax = max(curMax + nums[i], nums[i]);
            Max = max(Max, curMax);
            curMin = min(curMin + nums[i], nums[i]);
            Min = min(Min, curMin);
        }

        return Max > 0 ? max(Max, total - Min) : Max;
    }
};
```

### NOTE

本題不能像 [[House Robber|House Robber]] 到 [[House Robber II|House Robber II]] 一樣，做兩遍 DP 就可以得到最佳解，因為就像上圖中標示的 case 2，max subarray 可能會取頭取尾不包含中間。

也不能像 [[Next Greater Element II]] 一樣 circular 的做（那裏可以是因為沒有累加的 DP 關係，只是單純求 next greater），因為 DP 關係會被破壞，例如以下的 code。

考慮 `[5, -3, 5]`，展開變成 `[5, -3, 5, 5, -3 ,5]` ，我們沒辦法在做到 index 3 時知道目前的 DP 是否包含原本的第一個 5，因此有可能會重複計算。

```cpp
class Solution {
public:
    int maxSubarraySumCircular(vector<int>& nums) {
        int n = nums.size();
        int curMax = nums[0];
        int Max = nums[0];
        for(int i = 1; i < n * 2; i++) {
            int real_i = i % n;
            curMax = max(curMax + nums[real_i], nums[real_i]);
            Max = max(Max, curMax);
        }
        return Max;
    }
    
};
```

## Source
- [Maximum Sum Circular Subarray - LeetCode](https://leetcode.com/problems/maximum-sum-circular-subarray/description/)