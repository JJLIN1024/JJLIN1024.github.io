---
title: First Missing Positive
date: 2023-12-06
lastmod: 2023-12-06
author:
  - Jimmy Lin
tags:
  - array
  - review
draft: false
sr-due: 2024-02-02
sr-interval: 19
sr-ease: 290
---

## Description

Given an unsorted integer array `nums`, return the smallest missing positive integer.

You must implement an algorithm that runs in `O(n)` time and uses constant extra space.

**Example 1:**

```
Input: nums = [1,2,0]
Output: 3
Explanation: The numbers in the range [1,2] are all in the array.

```

**Example 2:**

```
Input: nums = [3,4,-1,1]
Output: 2
Explanation: 1 is in the array but 2 is missing.

```

**Example 3:**

```
Input: nums = [7,8,9,11,12]
Output: 1
Explanation: The smallest positive integer 1 is missing.

```

**Constraints:**

-   `1 <= nums.length <= 10<sup>5</sup>`
-   $-2^{31}$ <= `nums[i]` <= $2^{31} - 1$

## Code 

Key：只關心重要的，也就是將每個數字擺放到正確的位置，for number `i`，place it to index `i - 1`。剩下沒對應到正確位置的就是我們要找的 missing positive。

`nums[i] > 0` 處理小於零的狀況，`nums[i] <= n` 處理數字大於 `nums` 長度的狀況。

Time Complexity: $O(N)$, Space Complexity: $O(1)$

因為每個 number 都只有一個正確的位置，所以要不就是被放到正確的位置，要不就是 swap 之後當前處理的 index `i` 上的數字不合規定（小於零或是大於 `n`），所以 Time Complexity 會是 $O(N)$。

```cpp
class Solution {
public: 
    int firstMissingPositive(vector<int>& nums) {
        int n = nums.size(); 
        for (int i = 0; i < n; i++)
            while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i])
                swap(nums[i], nums[nums[i] - 1]);
        for (int i = 0; i < n; i++)
            if (nums[i] != i + 1)
                return i + 1;
        return n + 1;
    }
};


```

## Source
- [First Missing Positive - LeetCode](https://leetcode.com/problems/first-missing-positive/description/)