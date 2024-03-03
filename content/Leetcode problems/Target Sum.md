---
title: Target Sum
date: 2023-10-07
lastmod: 2023-10-07
author:
  - Jimmy Lin
tags:
  - DP
  - dfs
  - memoization
  - review
draft: false
---

## Description

You are given an integer array `nums` and an integer `target`.

You want to build an **expression** out of nums by adding one of the symbols `'+'` and `'-'` before each integer in nums and then concatenate all the integers.

*   For example, if `nums = [2, 1]`, you can add a `'+'` before `2` and a `'-'` before `1` and concatenate them to build the expression `"+2-1"`.

Return the number of different **expressions** that you can build, which evaluates to `target`.

**Example 1:**

**Input:** nums = \[1,1,1,1,1\], target = 3
**Output:** 5
**Explanation:** There are 5 ways to assign symbols to make the sum of nums be target 3.
-1 + 1 + 1 + 1 + 1 = 3
+1 - 1 + 1 + 1 + 1 = 3
+1 + 1 - 1 + 1 + 1 = 3
+1 + 1 + 1 - 1 + 1 = 3
+1 + 1 + 1 + 1 - 1 = 3

**Example 2:**

**Input:** nums = \[1\], target = 1
**Output:** 1

**Constraints:**

*   `1 <= nums.length <= 20`
*   `0 <= nums[i] <= 1000`
*   `0 <= sum(nums[i]) <= 1000`
*   `-1000 <= target <= 1000`

## Code 

### DP with memoization
Time Complexity: $O(nm)$, Space Complexity: $O(nm)$
where $n$ is the length of `nums`, and $m$ is the amount of possible current sum.

```cpp
class Solution {

public:
    int findTargetSumWays(vector<int>& nums, int target) {
        int n = nums.size();
        vector<unordered_map<int,int>> memo(nums.size());
        return dfs(0, nums, 0, target, memo);
    }

    int dfs(int i, vector<int>& nums, int cur, int target, vector<unordered_map<int,int>>& memo) {
        if(i == nums.size()) {
            if(cur == target) return 1;
            else return 0;
        }

        if(memo[i].find(cur) != memo[i].end()) return memo[i][cur];

        int take_i = dfs(i + 1, nums, cur + nums[i], target, memo);
        int no_take_i = dfs(i + 1, nums, cur - nums[i], target, memo);
        return memo[i][cur] = take_i + no_take_i;
    }
};


```


## Source
- [Target Sum - LeetCode](https://leetcode.com/problems/target-sum/description/)