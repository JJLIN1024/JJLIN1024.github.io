---
title: Combination Sum III
date: 2023-02-15
lastmod: 2023-02-15
author: Jimmy Lin
tags: ["backtracking"]
draft: false
---

## Description

Find all valid combinations of `k` numbers that sum up to `n` such that the following conditions are true:

*   Only numbers `1` through `9` are used.
*   Each number is used **at most once**.

Return _a list of all possible valid combinations_. The list must not contain the same combination twice, and the combinations may be returned in any order.

**Example 1:**

**Input:** k = 3, n = 7
**Output:** \[\[1,2,4\]\]
**Explanation:**
1 + 2 + 4 = 7
There are no other valid combinations.

**Example 2:**

**Input:** k = 3, n = 9
**Output:** \[\[1,2,6\],\[1,3,5\],\[2,3,4\]\]
**Explanation:**
1 + 2 + 6 = 9
1 + 3 + 5 = 9
2 + 3 + 4 = 9
There are no other valid combinations.

**Example 3:**

**Input:** k = 4, n = 1
**Output:** \[\]
**Explanation:** There are no valid combinations.
Using 4 different numbers in the range \[1,9\], the smallest sum we can get is 1+2+3+4 = 10 and since 10 > 1, there are no valid combination.

**Constraints:**

*   `2 <= k <= 9`
*   `1 <= n <= 60`

## Code 

結合 [[Combination Sum II]] 以及 [[Combinations]] 的概念。

```cpp
class Solution {
public:
    vector<vector<int>> combinationSum3(int k, int n) {
        vector<vector<int>> answer;
        vector<int> curr;
        vector<int> candidates = {1, 2, 3, 4, 5, 6, 7, 8, 9};
        helper(answer, candidates, curr, 0, 0, n, k);
        return answer;
    }

    void helper(vector<vector<int>> &answer, vector<int> &candidates, vector<int> curr, int currSum, int start, int target, int k) {

        if(currSum > target || curr.size() > k) return;
        if(currSum == target && curr.size() == k) {
            answer.push_back(curr);
            return;
        }

        for(int i = start; i < candidates.size(); i++) {

            currSum += candidates[i];
            curr.push_back(candidates[i]);
            // set start to i + 1, since elements cannot be reuse
            helper(answer, candidates, curr, currSum, i + 1, target, k);
            currSum -= candidates[i];
            curr.pop_back();
        }
    }

};
```

## Source
- [Combination Sum III - LeetCode](https://leetcode.com/problems/combination-sum-iii/description/)