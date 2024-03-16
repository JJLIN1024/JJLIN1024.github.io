---
title: Find Minimum in Rotated Sorted Array II
date: 2023-04-26
lastmod: 2023-04-26
author:
  - Jimmy Lin
tags:
  - binary_search
  - review
draft: false
sr-due: 2024-03-25
sr-interval: 9
sr-ease: 258
---

## Description

Suppose an array of length `n` sorted in ascending order is **rotated** between `1` and `n` times. For example, the array `nums = [0,1,4,4,5,6,7]` might become:

*   `[4,5,6,7,0,1,4]` if it was rotated `4` times.
*   `[0,1,4,4,5,6,7]` if it was rotated `7` times.

Notice that **rotating** an array `[a[0], a[1], a[2], ..., a[n-1]]` 1 time results in the array `[a[n-1], a[0], a[1], a[2], ..., a[n-2]]`.

Given the sorted rotated array `nums` that may contain **duplicates**, return _the minimum element of this array_.

You must decrease the overall operation steps as much as possible.

**Example 1:**

**Input:** nums = \[1,3,5\]
**Output:** 1

**Example 2:**

**Input:** nums = \[2,2,2,0,1\]
**Output:** 0

**Constraints:**

*   `n == nums.length`
*   `1 <= n <= 5000`
*   `-5000 <= nums[i] <= 5000`
*   `nums` is sorted and rotated between `1` and `n` times.

**Follow up:** This problem is similar to [Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/description/), but `nums` may contain **duplicates**. Would this affect the runtime complexity? How and why?

## Code 

```cpp
class Solution {
public:
    int findMin(vector<int>& nums) {
        int l = 0, r = nums.size() - 1;

        while(l < r) {
            int m = l + (r - l) / 2;
            if(nums[m] < nums[r]) {
            // the right half is sorted
                r = m;
            } else if(nums[m] > nums[r]) {
            // the left half is sorted
                l = m + 1;
            } else if(nums[m] == nums[r]) {
            // we have no clue
                r--;
            }
        }

        return nums[l];
    }
};
```


和 [[Find Minimum in Rotated Sorted Array]] 的差別？

以 `0, 1, 2, 4, 4, 4, 4` 為例：

可發現當 `m < r` 時，pivot 會在左半邊，因此 `r = mid`。當 `m > r` 時，pivot 會在右半邊，因此 `l = mid + 1`。剩下一種 case 就是當 `m == r` 時，因為可以重複，因此有可能出現 `4, 4, 4, 4, 0, 4, 4` 這種 case，pivot 就不一定在左半邊。

```
l        mid      r
0, 1, 2, 4, 4, 4, 4   l < m <= r

4, 0, 1, 2, 4, 4, 4   l > m < r
4, 4, 0, 1, 2, 4, 4   l > m < r
4, 4, 4, 0, 1, 2, 4   l > m < r

4, 4, 4, 4, 0, 1, 2   l <= m > r
2, 4, 4, 4, 4, 0, 1   l < m > r
1, 2, 4, 4, 4, 4, 0   l < m > r
```


## Source
- [Find Minimum in Rotated Sorted Array II - LeetCode](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/description/)