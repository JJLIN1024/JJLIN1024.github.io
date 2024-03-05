---
title: Continuous Subarrays
date: 2023-10-29
lastmod: 2023-10-29
author:
  - Jimmy Lin
tags:
  - monotonic_queue
  - two_pointer
  - sliding_window
  - review
draft: false
sr-due: 2024-03-09
sr-interval: 4
sr-ease: 274
---

## Description

You are given a **0-indexed** integer array `nums`. A subarray of `nums` is called **continuous** if:

*   Let `i`, `i + 1`, ..., `j` be the indices in the subarray. Then, for each pair of indices `i <= i1, i2 <= j`, `0 <= |nums[i1] - nums[i2]| <= 2`.

Return _the total number of **continuous** subarrays._

A subarray is a contiguous **non-empty** sequence of elements within an array.

**Example 1:**

**Input:** nums = \[5,4,2,4\]
**Output:** 8
**Explanation:** 
Continuous subarray of size 1: \[5\], \[4\], \[2\], \[4\].
Continuous subarray of size 2: \[5,4\], \[4,2\], \[2,4\].
Continuous subarray of size 3: \[4,2,4\].
Thereare no subarrys of size 4.
Total continuous subarrays = 4 + 3 + 1 = 8.
It can be shown that there are no more continuous subarrays.

**Example 2:**

**Input:** nums = \[1,2,3\]
**Output:** 6
**Explanation:** 
Continuous subarray of size 1: \[1\], \[2\], \[3\].
Continuous subarray of size 2: \[1,2\], \[2,3\].
Continuous subarray of size 3: \[1,2,3\].
Total continuous subarrays = 3 + 2 + 1 = 6.

**Constraints:**

*   `1 <= nums.length <= 105`
*   `1 <= nums[i] <= 109`

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(n)$

這題和 [[Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit]] 很像。

`j - i + 1` 的原理和 [[Binary Subarrays With Sum]] 中提到的一樣，今天找到一個 j 使 sliding window 為 valid window 時，不管前面的 i 怎麼移動，都是 j 使得新的 sub array 得以產生。

以 `[5, 4, 2]` 為例：一開始先找到 `[5]`，然後找到 `[5, 4]`，這時，`4` 可以使得 `[5, 4], [4]` 兩個新的 subarray 產生，而 `[5]` 在上一步就考慮過了，不需要計入這次的累加中，所以新的 subarray 數量就是 `j - i + 1 = 2`。

```cpp
class Solution {
public:
    long long continuousSubarrays(vector<int>& nums) {
        deque<int> Max, Min;
        int i = 0;
        long long res = 0;
        for(int j = 0; j < nums.size(); j++) {
            while(!Max.empty() && nums[Max.back()] <= nums[j]) Max.pop_back();
            while(!Min.empty() && nums[Min.back()] >= nums[j]) Min.pop_back();
            Max.push_back(j);
            Min.push_back(j);

            while(nums[Max.front()] - nums[Min.front()] > 2) {
                if(Max.front() == i) Max.pop_front();
                if(Min.front() == i) Min.pop_front();
                i++;
            }

            res += j - i + 1;
        }

        return res;
    }
};
```

## Source
- [Continuous Subarrays - LeetCode](https://leetcode.com/problems/continuous-subarrays/description/)