---
title: Constrained Subsequence Sum
date: 2023-10-26
lastmod: 2023-10-26
author:
  - Jimmy Lin
tags:
  - monotonic_queue
  - review
  - DP
draft: false
sr-due: 2024-03-09
sr-interval: 4
sr-ease: 278
---

## Description

Given an integer array `nums` and an integer `k`, return the maximum sum of a **non-empty** subsequence of that array such that for every two **consecutive** integers in the subsequence, `nums[i]` and `nums[j]`, where `i < j`, the condition `j - i <= k` is satisfied.

A _subsequence_ of an array is obtained by deleting some number of elements (can be zero) from the array, leaving the remaining elements in their original order.

**Example 1:**

**Input:** nums = \[10,2,-10,5,20\], k = 2
**Output:** 37
**Explanation:** The subsequence is \[10, 2, 5, 20\].

**Example 2:**

**Input:** nums = \[-1,-2,-3\], k = 1
**Output:** -1
**Explanation:** The subsequence must be non-empty, so we choose the largest number.

**Example 3:**

**Input:** nums = \[10,-2,-10,-5,20\], k = 2
**Output:** 23
**Explanation:** The subsequence is \[10, -2, -5, 20\].

**Constraints:**

*   `1 <= k <= nums.length <= 105`
*   `-104 <= nums[i] <= 104`

## Code 

### Monotonic Queue
Time Complexity: $O(n)$, Space Complexity: $O(n)$

關鍵在於：`A[i] = max(0, A[i - k], A[i - k + 1], .., A[i - 1]) + A[i]`，因此我們要求的就是在滿足 `j - i <= k` 的 window 中的 max element，而如何求得我們已經在 [[Sliding Window Maximum|Sliding Window Maximum]] 中學到了。

- Base case: `dp[0] = nums[0]`
- state transition: `dp[i] = max(dp[i - k], dp[i-k+1], ..., dp[i - 1], 0) + x`
    - NOTE that x can be a fresh start when all the previous dp are negative.

The Idea is straight-forward, we can maintain an non-increasing deque `decrease` that records the maximum value among `dp[i - k], dp[i-k+1], ..., dp[i - 1]`

```cpp
class Solution {
public:
    int constrainedSubsetSum(vector<int>& nums, int k) {
        int n = nums.size();
        deque<int> d;

        vector<int> dp(n, 0);
        int max_sum = nums[0];
        dp[0] = nums[0];

        for (int i = 0; i < n; i++) {
            if (d.empty()) {
                // will run only for the first element
                d.push_back(i);
            } else {
                // Remove all outside window index
                while (!d.empty() && d.front() < i - k) {
                    d.pop_front();
                }

                // Update sum
                dp[i] = max(dp[d.front()] + nums[i], nums[i]);
                max_sum = max(max_sum, dp[i]);

                // Maintain decreasing deque of DP
                while (!d.empty() && dp[d.back()] <= dp[i]) {
                    d.pop_back();
                }
                d.push_back(i);
            }
        }

        return max_sum;

    }
};
```

## Source
- [Constrained Subsequence Sum - LeetCode](https://leetcode.com/problems/constrained-subsequence-sum/description/)