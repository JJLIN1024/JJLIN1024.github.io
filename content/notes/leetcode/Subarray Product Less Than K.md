---
title: Subarray Product Less Than K
date: 2023-10-15
lastmod: 2023-10-15
author:
  - Jimmy Lin
tags:
  - sliding_window
  - two_pointer
  - review
draft: false
sr-due: 2024-02-22
sr-interval: 23
sr-ease: 290
---

## Description

Given an array of integers `nums` and an integer `k`, return _the number of contiguous subarrays where the product of all the elements in the subarray is strictly less than_ `k`.

**Example 1:**

**Input:** nums = \[10,5,2,6\], k = 100
**Output:** 8
**Explanation:** The 8 subarrays that have product less than 100 are:
\[10\], \[5\], \[2\], \[6\], \[10, 5\], \[5, 2\], \[2, 6\], \[5, 2, 6\]
Note that \[10, 5, 2\] is not included as the product of 100 is not strictly less than k.

**Example 2:**

**Input:** nums = \[1,2,3\], k = 0
**Output:** 0

**Constraints:**

*   `1 <= nums.length <= 3 * 104`
*   `1 <= nums[i] <= 1000`
*   `0 <= k <= 106`

## Code 

1. The idea is always keep an `max-product-window` less than `K`;
2. Every time shift window by adding a new number on the right(`j`), if the product is greater than k, then try to reduce numbers on the left(`i`), until the subarray product fit less than `k` again, (subarray could be empty);
3. Each step introduces `x` new subarrays, where x is the size of the current window `(j + 1 - i)`;  
    example:  
    for window (5, 2), when 6 is introduced, it add 3 new subarray: (5, (2, (6)))

```lisp
        (6)
     (2, 6)
  (5, 2, 6)
```

Time Complexity: $O(n)$, Space Complexity: $O(1)$

`while(i <= j && product >= k)` 可以檢查到若 `i == j` 時，單一元素就大於 `k` ，這時會 `i++`，因此 `i > j`，終止 while loop，而底下的 `j - i + 1` 就會等於 0！

```cpp
class Solution {
public:
    int numSubarrayProductLessThanK(vector<int>& nums, int k) {
        if(k == 0) return 0;
        int res = 0;
        int product = 1;
        for(int i = 0, j = 0; j < nums.size(); j++) {
            product *= nums[j];
            while(i <= j && product >= k) {
                product /= nums[i++];
            }
            res += j - i + 1;
        }
        return res;
        
    }
};
```

## Source
- [Subarray Product Less Than K - LeetCode](https://leetcode.com/problems/subarray-product-less-than-k/description/)