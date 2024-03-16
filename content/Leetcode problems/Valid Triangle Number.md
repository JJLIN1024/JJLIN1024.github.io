---
title: Valid Triangle Number
date: 2024-03-14
lastmod: 2024-03-14
author:
  - Jimmy Lin
tags:
  - binary_search
  - review
draft: false
sr-due: 2024-03-18
sr-interval: 4
sr-ease: 270
---

## Description

Given an integer array `nums`, return _the number of triplets chosen from the array that can make triangles if we take them as side lengths of a triangle_.

**Example 1:**

**Input:** nums = \[2,2,3,4\]
**Output:** 3
**Explanation:** Valid combinations are: 
2,3,4 (using the first 2)
2,3,4 (using the second 2)
2,2,3

**Example 2:**

**Input:** nums = \[4,2,3,4\]
**Output:** 4

**Constraints:**

*   `1 <= nums.length <= 1000`
*   `0 <= nums[i] <= 1000`

## Code 

### Two Pointer

固定最大的那個邊，這題就變成 [[3Sum]] 類似的題目。

```cpp
class Solution {
public:
    int triangleNumber(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int n = nums.size(), ans = 0;
        for (int k = 2; k < n; ++k) {
            int i = 0, j = k - 1;
            while (i < j) {
                if (nums[i] + nums[j] > nums[k]) {
                    ans += j - i;
                    j -= 1;
                } else {
                    i += 1;
                }
            }
        }
        return ans;
    }
};
```
### Binary Search

Time Complexity: $O(n^2 \log n)$, Space Complexity: $O(1)$

以 `[2, 3, 4, 4]` 為例，當 a, b 分別為 2, 3 時，4, 4 都是解，因此要加上 `(int)(iter - (nums.begin() + j + 1)`，也就是從 end 減第一個 4 的位置，剛好就是 4 的數量。

```cpp
class Solution {
public:
    int triangleNumber(vector<int>& nums) {
        int count = 0, n = nums.size();
        sort(nums.begin(), nums.end());
        /*
        a + b > c
        prev(>= a + b) -> < a + b, which is c
        */

        for(int i = 0; i < n; i++) {
            for(int j = i + 1; j < n; j++) {
                int ab = nums[i] + nums[j];
                auto iter = lower_bound(nums.begin() + j + 1, nums.end(), ab);
                count += max((int)(iter - (nums.begin() + j + 1)), 0);
            }
        }
        
        return count;
    }
};
```

## Source
- [Valid Triangle Number - LeetCode](https://leetcode.com/problems/valid-triangle-number/description/?envType=study-plan-v2&envId=binary-search)