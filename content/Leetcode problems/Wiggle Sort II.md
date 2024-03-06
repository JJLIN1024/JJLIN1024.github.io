---
title: Wiggle Sort II
date: 2024-03-06
lastmod: 2024-03-06
author:
  - Jimmy Lin
tags:
  - sorting
  - partition
  - quicksort
  - review
draft: false
sr-due: 2024-03-07
sr-interval: 1
sr-ease: 228
---

## Description

Given an integer array `nums`, reorder it such that `nums[0] < nums[1] > nums[2] < nums[3]...`.

You may assume the input array always has a valid answer.

**Example 1:**

**Input:** nums = \[1,5,1,1,6,4\]
**Output:** \[1,6,1,5,1,4\]
**Explanation:** \[1,4,1,5,1,6\] is also accepted.

**Example 2:**

**Input:** nums = \[1,3,2,2,3,1\]
**Output:** \[2,3,1,3,1,2\]

**Constraints:**

*   `1 <= nums.length <= 5 * 104`
*   `0 <= nums[i] <= 5000`
*   It is guaranteed that there will be an answer for the given input `nums`.

**Follow Up:** Can you do it in `O(n)` time and/or **in-place** with `O(1)` extra space?

## Code 

可以直接 $O(n \log n)$ sort，然後取 median 兩邊的一個一個按照 wiggle 的方式擺放。

有點類似 [[Beautiful Array]] 用 evens, odds 去分組，這題是用 median 的兩邊去分組。

也有點類似 [[Sort Colors]] 。

Time Complexity: $O(n)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    void wiggleSort(vector<int>& nums) {

        #define A(i) nums[(1 + 2 * i) % (n | 1)]
        #define map(i) ((1 + 2 * i) % (n | 1))

        int n = nums.size(), i = 0, j = 0, k = n - 1;
        auto midptr = nums.begin() + n / 2;
        nth_element(nums.begin(), midptr, nums.end());
        int mid = *midptr;
        
        for(auto n: nums) {
                cout << n << " ";
            }
            cout << endl;

        while (j <= k) {
            cout << "i , j , k : " << i << "," << j << "," << k << endl;
            cout << "Ai, Aj, Ak: " << map(i) << "," << map(j) << "," << map(k) << endl;
            cout << "Ai, Aj, Ak: " << A(i) << "," << A(j) << "," << A(k) << endl;
            if (A(j) > mid) swap(A(i++), A(j++));
            else if (A(j) < mid) swap(A(j), A(k--));
            else ++j;

            for(auto n: nums) {
                cout << n << " ";
            }
            cout << endl;
        }
    }

};


```

## Source
- [Wiggle Sort II - LeetCode](https://leetcode.com/problems/wiggle-sort-ii/description/)