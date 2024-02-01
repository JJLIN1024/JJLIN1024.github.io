---
title: Combinations
date: 2023-02-15
lastmod: 2023-02-15
author: Jimmy Lin
tags: ["backtracking"]
draft: false
---

## Description

Given two integers `n` and `k`, return _all possible combinations of_ `k` _numbers chosen from the range_ `[1, n]`.

You may return the answer in **any order**.

**Example 1:**

**Input:** n = 4, k = 2
**Output:** \[\[1,2\],\[1,3\],\[1,4\],\[2,3\],\[2,4\],\[3,4\]\]
**Explanation:** There are 4 choose 2 = 6 total combinations.
Note that combinations are unordered, i.e., \[1,2\] and \[2,1\] are considered to be the same combination.

**Example 2:**

**Input:** n = 1, k = 1
**Output:** \[\[1\]\]
**Explanation:** There is 1 choose 1 = 1 total combination.

**Constraints:**

*   `1 <= n <= 20`
*   `1 <= k <= n`

## Code 

介於 [[Subsets]] 和 [[Permutations]] 之間（以所求的 set size 的而言）。

```cpp
class Solution {
public:
    vector<vector<int>> combine(int n, int k) {
        vector<vector<int>> answer;
        vector<int> curr;
        vector<int> nums;
        for(int i = 1; i <= n; i++) {
            nums.push_back(i);
        }
        helper(answer, nums, 0, curr, k);
        return answer;
    }

    void helper(vector<vector<int>> &answer, vector<int> nums, int index, vector<int> curr, int k) {
        
        if(curr.size() == k) {
            answer.push_back(curr);
            return;
        }
            
        for(int i = index; i < nums.size(); i++) {
            curr.push_back(nums[i]);
            // backtracking
            helper(answer, nums, i + 1, curr, k);
            curr.pop_back();
        }
        
    }
};
```

## Source
- [Combinations - LeetCode](https://leetcode.com/problems/combinations/description/)