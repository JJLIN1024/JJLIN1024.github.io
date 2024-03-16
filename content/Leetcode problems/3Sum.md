---
title: 3Sum
date: 2023-01-28
lastmod: 2024-01-08
author:
  - Jimmy Lin
tags:
  - two_pointer
  - review
draft: false
sr-due: 2024-11-23
sr-interval: 253
sr-ease: 330
---

## Description

Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.

Notice that the solution set must not contain duplicate triplets.

**Example 1:**

**Input:** nums = \[-1,0,1,2,-1,-4\]
**Output:** \[\[-1,-1,2\],\[-1,0,1\]\]
**Explanation:** 
nums\[0\] + nums\[1\] + nums\[2\] = (-1) + 0 + 1 = 0.
nums\[1\] + nums\[2\] + nums\[4\] = 0 + 1 + (-1) = 0.
nums\[0\] + nums\[3\] + nums\[4\] = (-1) + 2 + (-1) = 0.
The distinct triplets are \[-1,0,1\] and \[-1,-1,2\].
Notice that the order of the output and the order of the triplets does not matter.

**Example 2:**

**Input:** nums = \[0,1,1\]
**Output:** \[\]
**Explanation:** The only possible triplet does not sum up to 0.

**Example 3:**

**Input:** nums = \[0,0,0\]
**Output:** \[\[0,0,0\]\]
**Explanation:** The only possible triplet sums up to 0.

**Constraints:**

*   `3 <= nums.length <= 3000`
*   `-105 <= nums[i] <= 105`

## Code 

要注意 skip duplicate 的順序：`while(i + 1 < n && nums[i] == nums[i + 1]) i++;`要擺在最後。

```cpp
class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());

        int n = nums.size();
        vector<vector<int>> res;
        for(int i = 0; i < n; i++) {
            int target = -nums[i];
            int l = i + 1, r = n - 1;
            while(l < r) {
                if(nums[l] + nums[r] == target) {
                    res.push_back({nums[i], nums[l], nums[r]});
                    int left = nums[l], right = nums[r];
                    // skip duplicate
                    while(l < r && nums[l] == left)
                        l++;
                    while(l < r && nums[r] == right)
                        r--;
                } else if(nums[l] + nums[r] > target) {
                    r--;
                } else if(nums[l] + nums[r] < target) {
                    l++;
                }
            }
            // skip duplicate of i
            // case like [-1, -1, -1, 2, ...] 
            // i should point to the last 
            // -1 after this while loop, and then the for loop 
            // will increment it by 1, which points to 2
            while(i + 1 < n && nums[i] == nums[i + 1])
                i++;
        }
        return res;
    }
};
```

## Source
- [3Sum - LeetCode](https://leetcode.com/problems/3sum/)