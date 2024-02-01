---
title: 4Sum
date: 2023-01-31
lastmod: 2024-01-08
author:
  - Jimmy Lin
tags:
  - two_pointer
  - review
draft: false
sr-due: 2024-03-07
sr-interval: 43
sr-ease: 274
---

## Description

Given an array `nums` of `n` integers, return _an array of all the **unique** quadruplets_ `[nums[a], nums[b], nums[c], nums[d]]` such that:

*   `0 <= a, b, c, d < n`
*   `a`, `b`, `c`, and `d` are **distinct**.
*   `nums[a] + nums[b] + nums[c] + nums[d] == target`

You may return the answer in **any order**.

**Example 1:**

**Input:** nums = \[1,0,-1,0,-2,2\], target = 0
**Output:** \[\[-2,-1,1,2\],\[-2,0,0,2\],\[-1,0,0,1\]\]

**Example 2:**

**Input:** nums = \[2,2,2,2,2\], target = 8
**Output:** \[\[2,2,2,2\]\]

**Constraints:**

*   `1 <= nums.length <= 200`
*   `-109 <= nums[i] <= 109`
*   `-109 <= target <= 109`

## Code 

邏輯和 [[3Sum]] 一樣，只是在外面多套上一層 for loop，以及因為 Constraints 所以使用 `long` 而非 `int`。

```cpp
class Solution {
public:
    vector<vector<int>> fourSum(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> answer;
        for(int i = 0; i < nums.size(); i++) {
            long outerTarget = target - nums[i];
            // 3Sum with sum equals outerTarget
            for(int j = i + 1; j < nums.size(); j++) {
                long innerTarger = outerTarget - nums[j];
                int left = j + 1;
                int right = nums.size() - 1;
                while(left < right) {
                    if(nums[left] + nums[right] > innerTarger) right--;
                    else if (nums[left] + nums[right] < innerTarger) left++;
                    else {
                        vector<int> fourSum = {nums[i], nums[j], nums[left], nums[right]};
                        answer.push_back(fourSum);
                        
                        // Processing duplicates of Number 2
                        // Rolling the front pointer to the next different number forwards
                        while (left < right && nums[left] == fourSum[2]) left++;

                        // Processing duplicates of Number 3
                        // Rolling the back pointer to the next different number backwards
                        while (left < right && nums[right] == fourSum[3]) right--;
                    }
                }

                // skip duplicate of the first one
                while(j + 1 < nums.size() && nums[j] == nums[j+1]) j++;
            }
            // skip duplicate of the first one
            while(i + 1 < nums.size() && nums[i] == nums[i+1]) i++;
        }
        
        return answer;
    }
};
```

可以使用 recursion 以 [[Two Sum]] 為基礎 scale 到 kSum 問題，同時配合 backtracking 的技巧，讓 `path` 先 `push_back` 再 `pop_back`。

要注意在 dfs 的 function declaration 中 `long target`，去避免 integer overflow。

```cpp
class Solution {
    vector<vector<int>> res;
public:
    vector<vector<int>> fourSum(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        vector<int> path;
        kSum(4, nums, path, 0, (int)nums.size() - 1, target);
        return res;
    }

    void kSum(int k, vector<int>& nums, vector<int>& cur, int l, int r, long target) {
        if(k == 2) {
            while(l < r) {
                if(nums[l] + nums[r] > target) r--;
                else if(nums[l] + nums[r] < target) l++;
                else {
                    cur.push_back(nums[l]);
                    cur.push_back(nums[r]);
                    res.push_back(cur);
                    cur.pop_back();
                    cur.pop_back();
                    while(l + 1 < r && nums[l] == nums[l + 1]) l++;
                    l++;
                    r--;
                }
            }
        } else {
            while(l < r) {
                cur.push_back(nums[l]);
                kSum(k - 1, nums, cur, l + 1, r, target - nums[l]);
                cur.pop_back();
                while(l + 1 < r && nums[l] == nums[l + 1]) l++;
                l++;
            }
        }
    }
};
```
## Source
- [4Sum - LeetCode](https://leetcode.com/problems/4sum/description/)