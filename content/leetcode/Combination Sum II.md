---
title: Combination Sum II
date: 2023-02-15
lastmod: 2023-02-15
author: Jimmy Lin
tags:
  - backtracking
  - review
draft: false
sr-due: 2024-02-03
sr-interval: 4
sr-ease: 270
---

## Description

Given a collection of candidate numbers (`candidates`) and a target number (`target`), find all unique combinations in `candidates` where the candidate numbers sum to `target`.

Each number in `candidates` may only be used **once** in the combination.

**Note:** The solution set must not contain duplicate combinations.

**Example 1:**

**Input:** candidates = \[10,1,2,7,6,1,5\], target = 8
**Output:** 
\[
\[1,1,6\],
\[1,2,5\],
\[1,7\],
\[2,6\]
\]

**Example 2:**

**Input:** candidates = \[2,5,2,1,2\], target = 5
**Output:** 
\[
\[1,2,2\],
\[5\]
\]

**Constraints:**

*   `1 <= candidates.length <= 100`
*   `1 <= candidates[i] <= 50`
*   `1 <= target <= 30`

## Code 

延續 [[Combination Sum]] 的思路，只是將 `helper` 呼叫的 `start` 設為 `i + 1` 而不是 `i` ，因為 candidate 不能被 reuse。

另外使用在 [[Permutations II]] 中學到的技巧去避免 duplicate。

```cpp
if(used[i] || i > 0 && candidates[i] == candidates[i-1] && !used[i-1]) continue;
```

```cpp
class Solution {
public:
    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        vector<vector<int>> answer;
        vector<int> curr;
        sort(candidates.begin(), candidates.end());
        int n = candidates.size();
        vector<bool> used(n, false);
        helper(answer, candidates, curr, 0, 0, target, used);
        return answer;
    }

    void helper(vector<vector<int>> &answer, vector<int> &candidates, vector<int> curr, int currSum, int start, int target, vector<bool> used) {

        if(currSum > target) return;
        if(currSum == target) {
            answer.push_back(curr);
            return;
        }

        for(int i = start; i < candidates.size(); i++) {
            // avoid duplicate
            if(used[i] || i > 0 && candidates[i] == candidates[i-1] && !used[i-1]) continue;
            currSum += candidates[i];
            used[i] = true;
            curr.push_back(candidates[i]);
            // set start to i + 1, since elements cannot be reuse
            helper(answer, candidates, curr, currSum, i + 1, target, used);
            currSum -= candidates[i];
            used[i] = false;
            curr.pop_back();
        }
    }
};
```

## Source
- [Combination Sum II - LeetCode](https://leetcode.com/problems/combination-sum-ii/description/)