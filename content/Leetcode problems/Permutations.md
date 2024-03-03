---
title: Permutations
date: 2023-02-14
lastmod: 2023-02-14
author: Jimmy Lin
tags: ["backtracking", "permutation"]
draft: false
---

## Description

Given an array `nums` of distinct integers, return _all the possible permutations_. You can return the answer in **any order**.

**Example 1:**

**Input:** nums = \[1,2,3\]
**Output:** \[\[1,2,3\],\[1,3,2\],\[2,1,3\],\[2,3,1\],\[3,1,2\],\[3,2,1\]\]

**Example 2:**

**Input:** nums = \[0,1\]
**Output:** \[\[0,1\],\[1,0\]\]

**Example 3:**

**Input:** nums = \[1\]
**Output:** \[\[1\]\]

**Constraints:**

*   `1 <= nums.length <= 6`
*   `-10 <= nums[i] <= 10`
*   All the integers of `nums` are **unique**.

## Code 

### backtracking
經典 backtracking 題目，使用 hashmap 是為了降低 time complexity。若沒有使用 hashmap，則對於 `[1, 2, 3]` 而言，結果會是：

```
[[1,1,1],[1,1,2],[1,1,3],[1,2,1],[1,2,2],[1,2,3],[1,3,1],[1,3,2],[1,3,3],[2,1,1],[2,1,2],[2,1,3],[2,2,1],[2,2,2],[2,2,3],[2,3,1],[2,3,2],[2,3,3],[3,1,1],[3,1,2],[3,1,3],[3,2,1],[3,2,2],[3,2,3],[3,3,1],[3,3,2],[3,3,3]]
```

會有重複使用的情況發生。

```cpp
class Solution {
public:
    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> answer;
        int n = nums.size();
        vector<int> curr;
        set<int> h;
        helper(answer, nums, curr, h);
        return answer;
    }

    void helper(vector<vector<int>> &answer, vector<int> nums, vector<int> curr, set<int> hashmap) {
        if(curr.size() == nums.size()) {
            answer.push_back(curr);
            return;
        }

        for(int i = 0; i < nums.size(); i++) {
            if(hashmap.count(nums[i]) > 0) continue;
            curr.push_back(nums[i]);
            hashmap.insert(nums[i]);
            // backtracking
            helper(answer, nums, curr, hashmap);
            curr.pop_back();
            hashmap.erase(nums[i]);
        }
        
    }
};
```

### next permutation

由 [[Next Permutation]] 我們知道如何求出 next permutation，因此也可以直接做 `n!` 次 next permutation，回傳所有的結果。

```cpp
class Solution {
public:
    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> answer;
        int n = nums.size();
        int factorial = 1;
        for(int i = 1; i <= n; i++) {
            factorial *= i;
        }

        for(int i = 0; i < factorial; i++) {
            answer.push_back(nums);
            nextPermutation(nums);
        }
        return answer;
    }

    void nextPermutation(vector<int>& nums) {
        int n = nums.size(), k, l;
        for(k = n - 2; k >= 0; k--) {
            if(nums[k] < nums[k+1]) 
                break;
        }

        if(k < 0) return reverse(nums.begin(), nums.end());

        for(l = n - 1; l >= 0; l--) {
            if(nums[l] > nums[k]) 
                break;
        }

        swap(nums[l], nums[k]);
        reverse(nums.begin() + k + 1, nums.end());
    }
};
```


## Source
- [Permutations - LeetCode](https://leetcode.com/problems/permutations/description/)