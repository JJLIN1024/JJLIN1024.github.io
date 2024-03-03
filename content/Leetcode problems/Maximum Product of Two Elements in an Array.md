---
title: Maximum Product of Two Elements in an Array
date: 2023-07-18
lastmod: 2023-07-18
author:
  - Jimmy Lin
tags:
  - sorting
  - review
draft: false
sr-due: 2024-03-07
sr-interval: 4
sr-ease: 270
---

## Description

Given the array of integers `nums`, you will choose two different indices `i` and `j` of that array. _Return the maximum value of_ `(nums[i]-1)*(nums[j]-1)`.

**Example 1:**

**Input:** nums = \[3,4,5,2\]
**Output:** 12 
**Explanation:** If you choose the indices i=1 and j=2 (indexed from 0), you will get the maximum value, that is, (nums\[1\]-1)\*(nums\[2\]-1) = (4-1)\*(5-1) = 3\*4 = 12. 

**Example 2:**

**Input:** nums = \[1,5,4,5\]
**Output:** 16
**Explanation:** Choosing the indices i=1 and j=3 (indexed from 0), you will get the maximum value of (5-1)\*(5-1) = 16.

**Example 3:**

**Input:** nums = \[3,7\]
**Output:** 12

**Constraints:**

*   `2 <= nums.length <= 500`
*   `1 <= nums[i] <= 10^3`

## Code 

### Sorting
Time Complexity: $O(n \log n)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int n = nums.size();
        sort(nums.begin(), nums.end());
        return (nums[n-1] - 1) * (nums[n-2] - 1);
    }
};
```

### Linear Search
Time Complexity: $O(n)$, Space Complexity: $O(1)$

find the bigger two. 要用 else if 不是 if。

```cpp
if(n > b1) {
	...
} else if (n > b2) {
	...
}
```

相當於在找 n 到底落在哪個區間，是 b1 以上，還是介於 b2, b1 之間，還是小於 b2。

```cpp
class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int b1 = 1, b2 = 1;
        for(auto& n: nums) {
            if(n > b1) {
                b2 = b1;
                b1 = n;
            } else if (n > b2) {
                b2 = n;
            }
        }

        return (b1 - 1) * (b2 - 1);
    }
};
```

## Source
- [Maximum Product of Two Elements in an Array - LeetCode](https://leetcode.com/problems/maximum-product-of-two-elements-in-an-array/description/)