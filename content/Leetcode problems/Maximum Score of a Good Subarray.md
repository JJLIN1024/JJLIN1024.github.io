---
title: Maximum Score of a Good Subarray
date: 2023-10-22
lastmod: 2023-10-22
author:
  - Jimmy Lin
tags:
  - sliding_window
  - two_pointer
  - monotonic_stack
  - review
draft: false
sr-due: 2024-07-19
sr-interval: 120
sr-ease: 305
---

## Description

You are given an array of integers `nums` **(0-indexed)** and an integer `k`.

The **score** of a subarray `(i, j)` is defined as `min(nums[i], nums[i+1], ..., nums[j]) * (j - i + 1)`. A **good** subarray is a subarray where `i <= k <= j`.

Return _the maximum possible **score** of a **good** subarray._

**Example 1:**

**Input:** nums = \[1,4,3,7,4,5\], k = 3
**Output:** 15
**Explanation:** The optimal subarray is (1, 5) with a score of min(4,3,7,4,5) \* (5-1+1) = 3 \* 5 = 15. 

**Example 2:**

**Input:** nums = \[5,5,4,5,4,1,1,1\], k = 0
**Output:** 20
**Explanation:** The optimal subarray is (0, 4) with a score of min(5,5,4,5,4) \* (4-0+1) = 4 \* 5 = 20.

**Constraints:**

*   `1 <= nums.length <= 105`
*   `1 <= nums[i] <= 2 * 104`
*   `0 <= k < nums.length`

## Code 

### Two Pointer
Time Complexity: $O(n)$, Space Complexity: $O(1)$

Intuition：我們想要 mini 盡可能的大，且 `j - i + 1` 盡可能的長。因此由 index k 開始，往左右兩側延伸，取大者（因為要 mini 盡可能的大）。

這個 intuition （i, j 向左向右移動的優先順序）類似 [[Container With Most Water]]，只是在這題是由內往兩側延伸，而在 Container With Most Water 中是由兩側往中心點去找。

We start from `k` and track the current maximum score. We have two choices - expand left or right. To maximize the score, we expand towards the higher number.

```cpp
class Solution {
public:
    int maximumScore(vector<int>& nums, int k) {
        int res = nums[k], mini = nums[k], i = k, j = k, n = nums.size();
        while(i > 0 || j < n - 1) {
            if((i > 0 ? nums[i - 1] : 0) < (j < n - 1 ? nums[j + 1] : 0)) {
                mini = min(mini, nums[++j]);
            } else {
                mini = min(mini, nums[--i]);
            }
            res = max(res, mini * (j - i + 1));
        }

        return res;
    }
};
```

### Monotonic Stack

Time Complexity: $O(n)$, Space Complexity: $O(1)$

其實就是在找 [[Largest Rectangle in Histogram|Largest Rectangle in Histogram]]。只是多了一個 constraint： `if(idx < k && i > k)`。

```cpp
class Solution {
public:
    int maximumScore(vector<int>& nums, int k) {
        stack<int> s;
        nums.push_back(0);

        int res = 0;
        for(int i = 0; i < nums.size(); i++) {
            while(!s.empty() && nums[s.top()] >= nums[i]) {
                int h = nums[s.top()];
                s.pop();
                int idx = s.empty() ? -1 : s.top();
                int width = i - idx - 1;
                int area = h * width;

                if(idx < k && i > k)
                    res = max(res, area);
            }
            s.push(i);
        }

        return res;
    }
};
```




## Source
- [Maximum Score of a Good Subarray - LeetCode](https://leetcode.com/problems/maximum-score-of-a-good-subarray/description/?envType=daily-question&envId=2023-10-22)