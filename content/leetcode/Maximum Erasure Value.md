---
title: Maximum Erasure Value
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

You are given an array of positive integers `nums` and want to erase a subarray containing **unique elements**. The **score** you get by erasing the subarray is equal to the **sum** of its elements.

Return _the **maximum score** you can get by erasing **exactly one** subarray._

An array `b` is called to be a subarray of `a` if it forms a contiguous subsequence of `a`, that is, if it is equal to `a[l],a[l+1],...,a[r]` for some `(l,r)`.

**Example 1:**

**Input:** nums = \[4,2,4,5,6\]
**Output:** 17
**Explanation:** The optimal subarray here is \[2,4,5,6\].

**Example 2:**

**Input:** nums = \[5,2,1,2,5,2,1,2,5\]
**Output:** 8
**Explanation:** The optimal subarray here is \[5,2,1\] or \[1,2,5\].

**Constraints:**

*   `1 <= nums.length <= 105`
*   `1 <= nums[i] <= 104`

## Code 

和 [[Longest Substring Without Repeating Characters]] 很類似。

要注意初始 `int i = 0` 和 `if(mp[nums[j]] >= i)` 的設定。在 [[Longest Substring Without Repeating Characters|Longest Substring Without Repeating Characters]] 中的設定是  `int i = -1` 和 `if(mp[nums[j]] > i)` （設定成 `if(mp[nums[j]] >= i)` 也會 AC）。

不論如何，重點都是要能順利正確的更新 `i` 的值。

Time Complexity: $O(n)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    int maximumUniqueSubarray(vector<int>& nums) {
        int score = 0;
        int maxScore = 0;
        unordered_map<int, int> mp;
        for(int i = 0, j = 0; j < nums.size(); j++) {
            score += nums[j];

            int old_i = i;
            if(mp.find(nums[j]) != mp.end()) {
                if(mp[nums[j]] >= i) {
                    i = mp[nums[j]] + 1;
                }
            }

            for(int k = old_i; k < i; k++) {
                score -= nums[k];
            }

            maxScore = max(maxScore, score);
            mp[nums[j]] = j;
        }

        return maxScore;
    }
};
```

## Source
- [Maximum Erasure Value - LeetCode](https://leetcode.com/problems/maximum-erasure-value/description/)