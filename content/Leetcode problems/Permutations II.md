---
title: Permutations II
date: 2023-02-14
lastmod: 2023-02-14
author: Jimmy Lin
tags:
  - backtracking
  - permuation
  - review
draft: false
sr-due: 2024-02-22
sr-interval: 20
sr-ease: 274
---

## Description

Given a collection of numbers, `nums`, that might contain duplicates, return _all possible unique permutations **in any order**._

**Example 1:**

**Input:** nums = \[1,1,2\]
**Output:**
\[\[1,1,2\],
 \[1,2,1\],
 \[2,1,1\]\]

**Example 2:**

**Input:** nums = \[1,2,3\]
**Output:** \[\[1,2,3\],\[1,3,2\],\[2,1,3\],\[2,3,1\],\[3,1,2\],\[3,2,1\]\]

**Constraints:**

*   `1 <= nums.length <= 8`
*   `-10 <= nums[i] <= 10`

## Code 

### backtracking
基本邏輯和 [[Permutations]] 一樣，差別只在於要如何避免 duplicates。

避免的方法是先 sort ，然後再判斷。

以 `[1, 1, 2]` 為例，我們使用 `i > 0 && nums[i] == nums[i-1] && !used[i - 1]` 來避免當用第二個 `1` 當開頭時，將第一個 `1` push  到 candidate array 中，因為此 case 和將第一、第二個 `1` 依序 push 進 candidate array 是一樣的。

`nums[i] == nums[i-1] && !used[i - 1]` 避免了任何由後往前的選擇順序，以 `1, 1, 1, 1` 來說，只會有一種選法，就是由前往後照順序 1234。其他所有的選法，不論是從第二個還是第三個、第四個開始（當作第一個），都會被檢查到。

```cpp
class Solution {
    vector<vector<int>> res;
public:
    vector<vector<int>> permuteUnique(vector<int>& nums) {
        vector<int> cur;
        sort(nums.begin(), nums.end());
        int n = nums.size();
        vector<bool> used(n, false);
        dfs(nums, cur, used);
        return res;
    }

    void dfs(vector<int>& nums, vector<int>& cur, vector<bool> used) {
        if(cur.size() == nums.size()) {
            res.push_back(cur);
            return;
        }

        for(int i = 0; i < nums.size(); i++) {
            if(used[i] || i > 0 && nums[i] == nums[i - 1] && !used[i - 1]) continue;
            cur.push_back(nums[i]);
            used[i] = true;
            dfs(nums, cur, used);
            cur.pop_back();
            used[i] = false;
        }
    }
};
```

### next permutation

使用 [[Next Permutation]]。和 [[Permutations]] 不一樣的地方在於 pertation 的數量（`permutation_n`），要用排列組合算出。

```cpp
class Solution {
public:
    vector<vector<int>> permuteUnique(vector<int>& nums) {
        vector<vector<int>> answer;
        unordered_map<int, int> mp;
        for(auto n: nums) {
            mp[n]++;
        }
        
        int n = nums.size();
        int permutation_n = factorial(n);
        for(auto it = mp.begin(); it != mp.end(); it++) {
            permutation_n /= factorial(it->second);
        }

        for(int i = 0; i < permutation_n; i++) {
            answer.push_back(nums);
            nextPermutation(nums);
        }
        return answer;
    }   

    int factorial(int n) {
        int res = 1;
        for(int i = 1; i <= n; i++) {
            res *= i;
        }
        return res;
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
- [Permutations II - LeetCode](https://leetcode.com/problems/permutations-ii/description/)