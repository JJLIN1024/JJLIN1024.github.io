---
title: Longest Subarray of 1's After Deleting One Element
date: 2023-10-15
lastmod: 2023-10-15
author:
  - Jimmy Lin
tags:
  - sliding_window
  - two_pointer
draft: false
---

## Description

Given a binary array `nums`, you should delete one element from it.

Return _the size of the longest non-empty subarray containing only_ `1`_'s in the resulting array_. Return `0` if there is no such subarray.

**Example 1:**

**Input:** nums = \[1,1,0,1\]
**Output:** 3
**Explanation:** After deleting the number in position 2, \[1,1,1\] contains 3 numbers with value of 1's.

**Example 2:**

**Input:** nums = \[0,1,1,1,0,1,1,0,1\]
**Output:** 5
**Explanation:** After deleting the number in position 4, \[0,1,1,1,1,1,0,1\] longest subarray with value of 1's is \[1,1,1,1,1\].

**Example 3:**

**Input:** nums = \[1,1,1\]
**Output:** 2
**Explanation:** You must delete one element.

**Constraints:**

*   `1 <= nums.length <= 105`
*   `nums[i]` is either `0` or `1`.

## Code 

[[Max Consecutive Ones III|Max Consecutive Ones III]] 的 `k = 1`版本。
Time Complexity: $O(n)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    int longestSubarray(vector<int>& nums) {
        int res = 0;
        int ones = 0, zeros = 0;
        for(int i = 0, j = 0; j < nums.size(); j++) {
            if(nums[j] == 1) ones++;
            else zeros++;
            while(j - i + 1 - ones > 1) {
                if(nums[i] == 1) ones--;
                else zeros--;
                i++;
            }
            res = max(res, j - i + 1 - zeros);
        }

        return res == nums.size() ? res - 1 : res;
    }
};
```

## Source
- [Longest Subarray of 1's After Deleting One Element - LeetCode](https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/description/)