---
title: Count Number of Nice Subarrays
date: 2023-10-15
lastmod: 2023-10-15
author:
  - Jimmy Lin
tags:
  - sliding_window
  - atMost
  - review
draft: false
sr-due: 2024-03-01
sr-interval: 30
sr-ease: 294
---

## Description

Given an array of integers `nums` and an integer `k`. A continuous subarray is called **nice** if there are `k` odd numbers on it.

Return _the number of **nice** sub-arrays_.

**Example 1:**

**Input:** nums = \[1,1,2,1,1\], k = 3
**Output:** 2
**Explanation:** The only sub-arrays with 3 odd numbers are \[1,1,2,1\] and \[1,2,1,1\].

**Example 2:**

**Input:** nums = \[2,4,6\], k = 1
**Output:** 0
**Explanation:** There is no odd numbers in the array.

**Example 3:**

**Input:** nums = \[2,2,2,1,2,2,1,2,2,2\], k = 2
**Output:** 16

**Constraints:**

*   `1 <= nums.length <= 50000`
*   `1 <= nums[i] <= 10^5`
*   `1 <= k <= nums.length`

## Code 

### The atMost Trick

和 [[Binary Subarrays With Sum|Binary Subarrays With Sum]] 、[[Subarrays with K Different Integers]]、[[Count Vowel Substrings of a String]] 一樣，要求得剛好有 `k` 個 odd number 的 sub-arrays，我們可以用至多 `k` 個 odd number 的 sub-arrays 的數量去減掉至多 `k - 1`個 odd number 的 sub-arrays 的數量。

Time Complexity: $O(n)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    int numberOfSubarrays(vector<int>& nums, int k) {
        return atMost(nums, k) - atMost(nums, k - 1);
    }

    int atMost(vector<int>& nums, int k) {
        int i = 0, res = 0;
        int oddCount = 0;
        for(int j = 0; j < nums.size(); j++) {
            if(nums[j] % 2 != 0) oddCount++;
            while(oddCount > k) {
                if(nums[i++] % 2 != 0) oddCount--;
            }
            res += j - i + 1;
        }
        return res;
    }
};
```

## Source
- [Count Number of Nice Subarrays - LeetCode](https://leetcode.com/problems/count-number-of-nice-subarrays/description/)