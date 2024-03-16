---
title: Search in Rotated Sorted Array II
date: 2024-03-06
lastmod: 2024-03-06
author:
  - Jimmy Lin
tags:
  - review
  - binary_search
draft: false
sr-due: 2024-03-18
sr-interval: 3
sr-ease: 230
---

## Description

There is an integer array `nums` sorted in non-decreasing order (not necessarily with **distinct** values).

Before being passed to your function, `nums` is **rotated** at an unknown pivot index `k` (`0 <= k < nums.length`) such that the resulting array is `[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]` (**0-indexed**). For example, `[0,1,2,4,4,4,5,6,6,7]` might be rotated at pivot index `5` and become `[4,5,6,6,7,0,1,2,4,4]`.

Given the array `nums` **after** the rotation and an integer `target`, return `true` _if_ `target` _is in_ `nums`_, or_ `false` _if it is not in_ `nums`_._

You must decrease the overall operation steps as much as possible.

**Example 1:**

**Input:** nums = \[2,5,6,0,0,1,2\], target = 0
**Output:** true

**Example 2:**

**Input:** nums = \[2,5,6,0,0,1,2\], target = 3
**Output:** false

**Constraints:**

*   `1 <= nums.length <= 5000`
*   `-104 <= nums[i] <= 104`
*   `nums` is guaranteed to be rotated at some pivot.
*   `-104 <= target <= 104`

**Follow up:** This problem is similar to [Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/description/), but `nums` may contain **duplicates**. Would this affect the runtime complexity? How and why?

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(1)$

和 [[Search in Rotated Sorted Array]] 一樣，只是 duplicate，因此會有

```cpp
else if(nums[m] == nums[r]) {
	r--;    
}
```

的狀況。和 [[Find Minimum in Rotated Sorted Array II]] 裡用到的技巧相同。

```cpp
class Solution {
public:
    bool search(vector<int>& nums, int target) {
        int n = nums.size();
        int l = 0, r = n - 1;
        while(l < r) {
            int m = l + (r - l) / 2;

            if(nums[m] > nums[r]) {
                // the left half is sorted
                if(target < nums[l] || target > nums[m]) 
                    l = m + 1;
                else 
                    r = m;
            } else if(nums[m] < nums[r]) {
                // the right half is sorted
                if(target > nums[m] && target <= nums[r])
                    l = m + 1;
                else 
                    r = m;
            } else if(nums[m] == nums[r]) {
                r--;    
            }
        }

        return nums[l] == target;
    }
};
```

## Source
- [Search in Rotated Sorted Array II - LeetCode](https://leetcode.com/problems/search-in-rotated-sorted-array-ii/description/)