---
title: Combination Sum
date: 2023-02-15
lastmod: 2023-02-15
author: Jimmy Lin
tags: ["backtracking"]
draft: false
---

## Description

Given an array of **distinct** integers `candidates` and a target integer `target`, return _a list of all **unique combinations** of_ `candidates` _where the chosen numbers sum to_ `target`_._ You may return the combinations in **any order**.

The **same** number may be chosen from `candidates` an **unlimited number of times**. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

The test cases are generated such that the number of unique combinations that sum up to `target` is less than `150` combinations for the given input.

**Example 1:**

**Input:** candidates = \[2,3,6,7\], target = 7
**Output:** \[\[2,2,3\],\[7\]\]
**Explanation:**
2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
7 is a candidate, and 7 = 7.
These are the only two combinations.

**Example 2:**

**Input:** candidates = \[2,3,5\], target = 8
**Output:** \[\[2,2,2,2\],\[2,3,3\],\[3,5\]\]

**Example 3:**

**Input:** candidates = \[2\], target = 1
**Output:** \[\]

**Constraints:**

*   `1 <= candidates.length <= 30`
*   `2 <= candidates[i] <= 40`
*   All elements of `candidates` are **distinct**.
*   `1 <= target <= 40`

## Code 

延續 [[Combinations]]  的概念，要注意的就是 `for` 迴圈的 `i = start` 以及呼叫 `helper` 時要將 `start` 設為 `i`，因為 element 是可以被重複選擇的。

```cpp
class Solution {
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        vector<vector<int>> answer;
        vector<int> curr;
        sort(candidates.begin(), candidates.end());
        helper(answer, candidates, curr, 0, 0, target);
        return answer;
    }

    void helper(vector<vector<int>> &answer, vector<int> &candidates, vector<int> curr, int currSum, int start, int target) {

        if(currSum > target) return;
        if(currSum == target) {
            answer.push_back(curr);
            return;
        }

        for(int i = start; i < candidates.size(); i++) {
            currSum += candidates[i];
            curr.push_back(candidates[i]);
            // note we pass i instead of i + 1
            // since the element can be reuse
            helper(answer, candidates, curr, currSum, i, target);
            currSum -= candidates[i];
            curr.pop_back();
        }
    }
};
```

## Source
- [Combination Sum - LeetCode](https://leetcode.com/problems/combination-sum/description/)