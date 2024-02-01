---
title: Subsets II
date: 2023-02-15
lastmod: 2023-02-15
author: Jimmy Lin
tags:
  - backtracking
  - review
draft: false
sr-due: 2024-01-31
sr-interval: 4
sr-ease: 270
---

## Description

Given an integer array `nums` that may contain duplicates, return _all possible_

_subsets_

_(the power set)_.

The solution set **must not** contain duplicate subsets. Return the solution in **any order**.

**Example 1:**

**Input:** nums = \[1,2,2\]
**Output:** \[\[\],\[1\],\[1,2\],\[1,2,2\],\[2\],\[2,2\]\]

**Example 2:**

**Input:** nums = \[0\]
**Output:** \[\[\],\[0\]\]

**Constraints:**

*   `1 <= nums.length <= 10`
*   `-10 <= nums[i] <= 10`

## Code 

和 [[Permutations II]] 的一樣，要避免 duplicate 的方式就是要保證相同 element 按照順序出現。

以 `[1,2,2]` 為例，即是要保證第二個 `2` 一定在第一個 `1` 之後才出現。

避免 duplicate 的 code 也一樣，直接複製貼上。
```cpp
if(used[i] || i > 0 && nums[i] == nums[i-1] && !used[i-1]) continue;
```

```cpp
class Solution {
public:
    vector<vector<int>> subsetsWithDup(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> answer;
        vector<int> curr;
        int n = nums.size();
        vector<bool> used(n, false);
        helper(answer, nums, 0, curr, used);
        return answer;
    }


    void helper(vector<vector<int>> &answer, vector<int> nums, int index, vector<int> curr, vector<bool> used) {

        answer.push_back(curr);

        for(int i = index; i < nums.size(); i++) {
            if(used[i] || i > 0 && nums[i] == nums[i-1] && !used[i-1]) continue;
            curr.push_back(nums[i]);
            used[i] = true;
            // backtracking
            helper(answer, nums, i + 1, curr, used);
            curr.pop_back();
            used[i] = false;
        }
        
    }

};
```

## Source
- [Subsets II - LeetCode](https://leetcode.com/problems/subsets-ii/description/)