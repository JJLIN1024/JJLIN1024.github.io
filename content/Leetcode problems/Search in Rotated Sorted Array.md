---
title: Search in Rotated Sorted Array
date: 2024-01-11
lastmod: 2024-01-11
author: Jimmy Lin
tags:
  - binary_search
  - review
draft: false
sr-due: 2024-12-24
sr-interval: 296
sr-ease: 330
---

## Description

There is an integer array `nums` sorted in ascending order (with **distinct** values).

Prior to being passed to your function, `nums` is **possibly rotated** at an unknown pivot index `k` (`1 <= k < nums.length`) such that the resulting array is `[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]` (**0-indexed**). For example, `[0,1,2,4,5,6,7]` might be rotated at pivot index `3` and become `[4,5,6,7,0,1,2]`.

Given the array `nums` **after** the possible rotation and an integer `target`, return _the index of_ `target` _if it is in_ `nums`_, or_ `-1` _if it is not in_ `nums`.

You must write an algorithm with `O(log n)` runtime complexity.

**Example 1:**

**Input:** nums = \[4,5,6,7,0,1,2\], target = 0
**Output:** 4

**Example 2:**

**Input:** nums = \[4,5,6,7,0,1,2\], target = 3
**Output:** -1

**Example 3:**

**Input:** nums = \[1\], target = 0
**Output:** -1

**Constraints:**

*   `1 <= nums.length <= 5000`
*   `-104 <= nums[i] <= 104`
*   All values of `nums` are **unique**.
*   `nums` is an ascending array that is possibly rotated.
*   `-104 <= target <= 104`

## Code 

Time Complexity: $O(\log n)$, Space Complexity: $O(1)$

找尋偏移量：`if(nums[mid] > nums[r])`

關鍵都在於 `nums[m]`, `nums[r]` 之間的關係，以及必定會有兩段 sorted array。

以 `0, 1, 2, 4, 5, 6, 7` 為例子：

可看出若用 `nums[m]` 是否小於 `nums[r]` 去判斷，可以將所有 cases 分成兩部分。`m < r` 的 `0` 在左半邊，所以要 `r = m`；而 `m > r` 的 `0` 在右半邊，所以要 `l = m + 1`。

這會比使用 `nums[l], nums[m]` 之間的關係去判斷要來的簡單，因為用 `l < m` or `l > m` 會出現三種 cases（如下圖）。

```
l        mid      r
0, 1, 2, 4, 5, 6, 7   l < m < r

7, 0, 1, 2, 4, 5, 6   l > m < r
6, 7, 0, 1, 2, 4, 5   l > m < r
5, 6, 7, 0, 1, 2, 4   l > m < r

4, 5, 6, 7, 0, 1, 2   l < m > r
2, 4, 5, 6, 7, 0, 1   l < m > r
1, 2, 4, 5, 6, 7, 0   l < m > r
```


```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int n = nums.size();
        int l = 0, r = n - 1;
        while(l < r) {
            int mid = (l + r) / 2;
            if(nums[mid] > nums[r]) {
                l = mid + 1;
            } else {
                r = mid;
            }
        }
        
        int rotated = l;
        l = 0, r = n - 1;
        while(l < r) {
            int mid = (l + r) / 2;
            int real_mid = (mid + rotated) % n;
            if(nums[real_mid] < target) {
                l = mid + 1;
            } else {
                r = mid;
            }
        }
        return nums[(l + rotated) % n] == target ? (l + rotated) % n : -1;
    }
};
```

## Source
- [Search in Rotated Sorted Array - LeetCode](https://leetcode.com/problems/search-in-rotated-sorted-array/description/)