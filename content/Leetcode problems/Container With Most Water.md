---
title: Container With Most Water
date: 2024-01-08
lastmod: 2024-01-08
author:
  - Jimmy Lin
tags:
  - two_pointer
  - greedy
  - review
draft: false
sr-due: 2024-10-07
sr-interval: 206
sr-ease: 310
---

## Description

You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `ith` line are `(i, 0)` and `(i, height[i])`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return _the maximum amount of water a container can store_.

**Notice** that you may not slant the container.

**Example 1:**

![](https://s3-lc-upload.s3.amazonaws.com/uploads/2018/07/17/question_11.jpg)

**Input:** height = \[1,8,6,2,5,4,8,3,7\]
**Output:** 49
**Explanation:** The above vertical lines are represented by array \[1,8,6,2,5,4,8,3,7\]. In this case, the max area of water (blue section) the container can contain is 49.

**Example 2:**

**Input:** height = \[1,1\]
**Output:** 1

**Constraints:**

*   `n == height.length`
*   `2 <= n <= 105`
*   `0 <= height[i] <= 104`

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(1)$

關鍵在於 `height[l], height[r]` 兩者中比較矮的對於未來創造一個更大的 container 是沒有幫助的，因為向內移動，width 減少，所以需要更高的 height，而去移動兩者中比較矮的，是有機會換到一根更高的，但若移動的是比較高的那根，可能換到更矮的，結果只會更糟不會更好。

```cpp
class Solution {
public:
    int maxArea(vector<int>& height) {
        int l = 0, r = height.size() - 1;
        int res = 0;
        while(l < r) {
            res = max(res, min(height[l], height[r]) * (r - l));
            if(height[l] < height[r]) l++;
            else r--;
        }
        return res;
    }
};
```

## Source
- [Container With Most Water - LeetCode](https://leetcode.com/problems/container-with-most-water/description/)