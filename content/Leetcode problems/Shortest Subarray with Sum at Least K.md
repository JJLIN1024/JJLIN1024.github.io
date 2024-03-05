---
title: Shortest Subarray with Sum at Least K
date: 2023-10-28
lastmod: 2023-10-28
author:
  - Jimmy Lin
tags:
  - monotonic_queue
  - prefix_sum
  - review
draft: false
sr-due: 2024-06-24
sr-interval: 111
sr-ease: 250
---

## Description

Given an integer array `nums` and an integer `k`, return _the length of the shortest non-empty **subarray** of_ `nums` _with a sum of at least_ `k`. If there is no such **subarray**, return `-1`.

A **subarray** is a **contiguous** part of an array.

**Example 1:**

**Input:** nums = \[1\], k = 1
**Output:** 1

**Example 2:**

**Input:** nums = \[1,2\], k = 4
**Output:** -1

**Example 3:**

**Input:** nums = \[2,-1,2\], k = 3
**Output:** 3

**Constraints:**

*   `1 <= nums.length <= 105`
*   `-105 <= nums[i] <= 105`
*   `1 <= k <= 109`

## Code 

這題有負數，若直接使用 [[Minimum Size Subarray Sum]] 的 sliding window approach 會出錯，例如：

`nums = [84,-37,32,40,95], k = 167`，sliding window approach 會回傳 5，但答案應該是 3，原因就在於 `-37` 使得 sliding window 在 shrink 的過程中，會停在 `-37`，`32 + 40 + 95 = 167`，但是沒有了 `84` 把 `-37` 帶來的影響給抵銷，就會使得 sliding window 誤判。
### Monotonic Queue
Time Complexity: $O(n)$, Space Complexity: $O(n)$

Key observation: If we accumulate array A to obtain B, then `B[l] <= B[r] - K` indicates `sum(A[l:r]) >= K`. Given `B[r]`, the problem is equivalent to finding the **nearest** previous element `B[l]` such that `B[l] <= B[r] - K`.

找 shortest subarray，所以距離當前的 `B[r]` 越近越好，所以很適合使用 monotonic queue，這題使用 monotonic increasing 的 queue，因為我們要找的是 sum >= k，所以後面的必須大於前面的。

注意 `prefix_sum` 裝的是 `long`！避免 signed integer overflow。

```cpp
class Solution {
public:
    int shortestSubarray(vector<int>& nums, int k) {
        int n = nums.size();
        vector<long> prefix_sum(n + 1, 0);

        for(int i = 1; i < n + 1; i++) {
            prefix_sum[i] = prefix_sum[i - 1] + nums[i - 1];
        }

        deque<int> d;
        int res = INT_MAX;
        for(int i = 0; i < prefix_sum.size(); i++) {
            while(!d.empty() && (prefix_sum[i] - prefix_sum[d.front()]) >= k) {
                res = min(res, i - d.front());
                d.pop_front();
            }

            while(!d.empty() && prefix_sum[i] <= prefix_sum[d.back()]) {
                d.pop_back();
            }

            d.push_back(i);
        }

        return res == INT_MAX ? -1 : res;
    }
};
```

## Source
- [Shortest Subarray with Sum at Least K - LeetCode](https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/description/)