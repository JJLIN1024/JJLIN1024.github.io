---
title: Partition to K Equal Sum Subsets
date: 2024-03-16
lastmod: 2024-03-16
author:
  - Jimmy Lin
tags:
  - backtracking
  - review
draft: false
sr-due: 2024-03-20
sr-interval: 4
sr-ease: 270
---

## Description

Given an integer array `nums` and an integer `k`, return `true` if it is possible to divide this array into `k` non-empty subsets whose sums are all equal.

**Example 1:**

**Input:** nums = \[4,3,2,3,5,2,1\], k = 4
**Output:** true
**Explanation:** It is possible to divide it into 4 subsets (5), (1, 4), (2,3), (2,3) with equal sums.

**Example 2:**

**Input:** nums = \[1,2,3,4\], k = 3
**Output:** false

**Constraints:**

*   `1 <= k <= nums.length <= 16`
*   `1 <= nums[i] <= 104`
*   The frequency of each element is in the range `[1, 4]`.

## Code 

[[Partition Equal Subset Sum]] 的延伸題，但是這題並不是 DP，而是類似 [[Subsets]] 的概念。

Time Complexity: $O()$, Space Complexity: $O()$

```cpp
class Solution {
public:
    bool canPartitionKSubsets(vector<int>& nums, int k) {
        int sum = 0;
        sum = accumulate(nums.begin(), nums.end(), sum);
        if (nums.size() < k || sum % k) return false;
        
        vector<int>visited(nums.size(), false);
        
        // prevent TLE
        sort(nums.rbegin(), nums.rend());
        return backtrack(nums, visited, sum / k, 0, 0, k);
    }
    
    bool backtrack(vector<int>& nums, vector<int>& visited, int target, int curr_sum, int i, int k) {
        if (k == 1) 
            return true;
        
        if(i >= nums.size()) // Pruning, this line is important to avoid tle
           return false;

        if (curr_sum == target) 
            return backtrack(nums, visited, target, 0, 0, k-1);
        
        for (int j = i; j < nums.size(); j++) {
            if (visited[j] || curr_sum + nums[j] > target) continue;
            
            visited[j] = true;
            if (backtrack(nums, visited, target, curr_sum + nums[j], j+1, k)) return true;
            visited[j] = false;
        }
        
        return false;
    }
};
```

## Source
- [Partition to K Equal Sum Subsets - LeetCode](https://leetcode.com/problems/partition-to-k-equal-sum-subsets/description/)