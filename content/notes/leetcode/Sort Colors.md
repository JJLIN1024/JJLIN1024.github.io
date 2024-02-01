---
title: Sort Colors - LeetCode
date: 2023-02-16
lastmod: 2023-02-16
author: Jimmy Lin
tags: ["two pointer"]
draft: false
---

## Description

Given an array `nums` with `n` objects colored red, white, or blue, sort them **[in-place](https://en.wikipedia.org/wiki/In-place_algorithm)** so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers `0`, `1`, and `2` to represent the color red, white, and blue, respectively.

You must solve this problem without using the library's sort function.

**Example 1:**

**Input:** nums = \[2,0,2,1,1,0\]
**Output:** \[0,0,1,1,2,2\]

**Example 2:**

**Input:** nums = \[2,0,1\]
**Output:** \[0,1,2\]

**Constraints:**

*   `n == nums.length`
*   `1 <= n <= 300`
*   `nums[i]` is either `0`, `1`, or `2`.

**Follow up:** Could you come up with a one-pass algorithm using only constant extra space?

## Code 

Basic idea 是將沿路遇到的 `2` or `0` 換到右邊跟左邊，最後剩下在中間的都會是 `1`。

注意 `for` 迴圈的終止條件是 `i <= two`，因為 `two` 被更新時是向左移動一格，我們並不知道 `two` 新的位置的值是否需要被 swap，所以要檢查。

```cpp
class Solution {
public:
    void sortColors(vector<int>& nums) {
        int zero = 0, two = nums.size() - 1;
        for(int i = 0; i <= two; i++) {
            while(nums[i] == 2 && i < two) {
                swap(nums[i], nums[two--]);
            }
            while(nums[i] == 0 && i > zero) {
                swap(nums[i], nums[zero++]);
            }
        }
    }
};
```

## Source
- [Sort Colors - LeetCode](https://leetcode.com/problems/sort-colors/description/)