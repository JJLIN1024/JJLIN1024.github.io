---
title: Find Target Indices After Sorting Array
date: 2023-07-05
lastmod: 2023-07-05
author: Jimmy Lin
tags: ["binary search", "counting sort", "binary search for upper/lower bound index"]
draft: false
---

## Description

You are given a **0-indexed** integer array `nums` and a target element `target`.

A **target index** is an index `i` such that `nums[i] == target`.

Return _a list of the target indices of_ `nums` after _sorting_ `nums` _in **non-decreasing** order_. If there are no target indices, return _an **empty** list_. The returned list must be sorted in **increasing** order.

**Example 1:**

**Input:** nums = \[1,2,5,2,3\], target = 2
**Output:** \[1,2\]
**Explanation:** After sorting, nums is \[1,**2**,**2**,3,5\].
The indices where nums\[i\] == 2 are 1 and 2.

**Example 2:**

**Input:** nums = \[1,2,5,2,3\], target = 3
**Output:** \[3\]
**Explanation:** After sorting, nums is \[1,2,2,**3**,5\].
The index where nums\[i\] == 3 is 3.

**Example 3:**

**Input:** nums = \[1,2,5,2,3\], target = 5
**Output:** \[4\]
**Explanation:** After sorting, nums is \[1,2,2,3,**5**\].
The index where nums\[i\] == 5 is 4.

**Constraints:**

*   `1 <= nums.length <= 100`
*   `1 <= nums[i], target <= 100`

## Code 
### Binary Search
Time Complexity: $O(n \log n)$, Space Complexity: $O(1)$

基本概念同 [[Binary Search 101|Binary Search 101]]，但是延伸成要尋找一個 value 在 array 中 index 的上下界。

關鍵在於判斷 `if (nums[mid] < target)` 還是 `if (nums[mid] <= target)` 以及最後在 while loop 結束後用於判斷的是 `l` 還是 `r` 所指向的 value。

在這部使用 `while(l < r)` 是因為這樣還需要在 while loop 結束之後去判斷 `l` 所指向的 value 是否為 target，因為我們有可能會 overshoot，使得真正等於 target 的 value 其 index 剛好為 `l - 1`。

```cpp
class Solution {
public:
    vector<int> targetIndices(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        int lb = lower_bound(nums, target);
        int ub = upper_bound(nums, target);
        vector<int> res;
        if(lb != -1 && ub != -1) {
            for(int i = lb; i <= ub; i++) {
                res.push_back(i);
            }
        }
        return res;
    }

    int lower_bound(vector<int>& nums, int target) {
        int l = 0, r = nums.size() - 1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (nums[mid] < target)
                l = mid + 1;
            else
                r = mid - 1;
        }
        if (l < nums.size() && nums[l] == target)
            return l;
        else 
            return -1;
    }

    int upper_bound(vector<int>& nums, int target) {
        int l = 0, r = nums.size() - 1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (nums[mid] <= target)
                l = mid + 1;
            else
                r = mid - 1;
        }
        if (r >= 0 && nums[r] == target)
            return r;
        else 
            return -1;
    }
};
```

### Counting Sort

```cpp
class Solution {
public:
    vector<int> targetIndices(vector<int>& nums, int target) {
        int count = 0, smaller = 0;
        for(auto& n: nums) {
            if(n == target) count++;
            else if(n < target) smaller++;
        }

        vector<int> res;
        for(int i = 0; i < count; i++) {
            res.push_back(smaller++);
        }

        return res;
    }
};
```
## Source
- [Find Target Indices After Sorting Array - LeetCode](https://leetcode.com/problems/find-target-indices-after-sorting-array/description/)