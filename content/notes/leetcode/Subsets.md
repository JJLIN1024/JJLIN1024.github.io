---
title: Subsets
date: 2023-02-15
lastmod: 2023-02-15
author: Jimmy Lin
tags: ["backtracking"]
draft: false
---

## Description

Given an integer array `nums` of **unique** elements, return _all possible_

_subsets_

_(the power set)_.

The solution set **must not** contain duplicate subsets. Return the solution in **any order**.

**Example 1:**

**Input:** nums = \[1,2,3\]
**Output:** \[\[\],\[1\],\[2\],\[1,2\],\[3\],\[1,3\],\[2,3\],\[1,2,3\]\]

**Example 2:**

**Input:** nums = \[0\]
**Output:** \[\[\],\[0\]\]

**Constraints:**

*   `1 <= nums.length <= 10`
*   `-10 <= nums[i] <= 10`
*   All the numbers of `nums` are **unique**.

## Code 

和 [[Permutations]] 的邏輯差不多，差別只在於不需要等到 `curr` 的 size 和 `nums` 一樣才將之 push  進 `answer`，而是每一步都 push。

```cpp
class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> answer;
        vector<int> curr;
        helper(answer, nums, 0, curr);
        return answer;
    }

    void helper(vector<vector<int>> &answer, vector<int> nums, int index, vector<int> curr) {

        answer.push_back(curr);

        for(int i = index; i < nums.size(); i++) {
            curr.push_back(nums[i]);
            // backtracking
            helper(answer, nums, i + 1, curr);
            curr.pop_back();
        }
        
    }
};
```

## Source
- [Subsets - LeetCode](https://leetcode.com/problems/subsets/description/)