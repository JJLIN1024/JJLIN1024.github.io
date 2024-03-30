---
title: Count Subarrays Where Max Element Appears at Least K Times
date: 2024-03-29
lastmod: 2024-03-29
author:
  - Jimmy Lin
tags:
  - sliding_window
  - review
draft: false
sr-due: 2024-04-02
sr-interval: 4
sr-ease: 270
---

## Description

You are given an integer array `nums` and a **positive** integer `k`.

Return _the number of subarrays where the **maximum** element of_ `nums` _appears **at least**_ `k` _times in that subarray._

A **subarray** is a contiguous sequence of elements within an array.

**Example 1:**

**Input:** nums = \[1,3,2,3,3\], k = 2
**Output:** 6
**Explanation:** The subarrays that contain the element 3 at least 2 times are: \[1,3,2,3\], \[1,3,2,3,3\], \[3,2,3\], \[3,2,3,3\], \[2,3,3\] and \[3,3\].

**Example 2:**

**Input:** nums = \[1,4,2,1\], k = 3
**Output:** 0
**Explanation:** No subarray contains the element 4 at least 3 times.

**Constraints:**

*   `1 <= nums.length <= 105`
*   `1 <= nums[i] <= 106`
*   `1 <= k <= 105`

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(1)$

第一種想法是，全部 subarray 數量有 $\frac{n \cdot (n - 1)}{1 \cdot 2} + n$。我們只需要扣掉 array 中最多有 k - 1 個 max element 的 subarray 數量，剩下的就會是至少有 k 個 max element 的 sub array 數量。

```cpp
class Solution {
public:
    long long countSubarrays(vector<int>& nums, int k) {
        int MAX = *max_element(nums.begin(), nums.end());
        int i = 0;
        int MAX_COUNT = 0;
        long long n = nums.size();
        long long res = n + (n * (n - 1LL) / 2LL);
        // minus those subarray that has at most k - 1 MAX
        for(int j = 0; j < nums.size(); j++) {
            if(nums[j] == MAX) 
                MAX_COUNT++;
            while(MAX_COUNT > k - 1) {
                if(nums[i] == MAX)
                    MAX_COUNT--;
                i++;
            }
            res -= (long long)(j - i + 1);
        }
        return res;
    }
};
```

第二種想法是，當發現有 k 個以上的 max element 後，移動 i，使 max element 數量下降至小於 k，這就代表 i 前面的 index 都可以用來當做左端點，使得這個 sliding window 具有大於等於 k 個 max element。這個技巧在 [[Count Complete Subarrays in an Array]] 也有使用到。

```cpp
class Solution {
public:
    long long countSubarrays(vector<int>& nums, int k) {
        int MAX = *max_element(nums.begin(), nums.end());
        int i = 0;
        long long res = 0;
        int MAX_COUNT = 0;
        for(int j = 0; j < nums.size(); j++) {
            MAX_COUNT += nums[j] == MAX;
            while(MAX_COUNT >= k) 
                MAX_COUNT -= nums[i++] == MAX;
            res += i;
        }
        return res;
    }
};
```

## Source
- [Count Subarrays Where Max Element Appears at Least K Times - LeetCode](https://leetcode.com/problems/count-subarrays-where-max-element-appears-at-least-k-times/description/?envType=daily-question&envId=2024-03-29)