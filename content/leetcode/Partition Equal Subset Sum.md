---
title: Partition Equal Subset Sum
date: 2023-01-04
lastmod: 2023-01-04
author: Jimmy Lin
tags:
  - knapsack
  - DP
  - review
draft: false
sr-due: 2024-02-03
sr-interval: 4
sr-ease: 270
---
## Description

Given an integer array `nums`, return `true` _if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or_ `false` _otherwise_.

**Example 1:**

**Input:** nums = \[1,5,11,5\]
**Output:** true
**Explanation:** The array can be partitioned as \[1, 5, 5\] and \[11\].

**Example 2:**

**Input:** nums = \[1,2,3,5\]
**Output:** false
**Explanation:** The array cannot be partitioned into equal sum subsets.

**Constraints:**

*   `1 <= nums.length <= 200`
*   `1 <= nums[i] <= 100`

## Code

### Top Down with memoization
Time Complexity: $O(MN)$, Space Complexity: $O(MN)$

注意 `memo` 的 size 為 $n \cdot (m + 1)$。

```cpp
class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int sum = accumulate(nums.begin(), nums.end(), 0);
        if(sum & 1) return false;

        int target = sum / 2;
        int n = nums.size();
        vector<vector<int>> memo(n, vector<int>(target + 1, -1));
        return subsetSum(nums, memo, 0, target);
    }

    bool subsetSum(vector<int>& nums, vector<vector<int>>& memo, int idx, int sum) {
        if(sum == 0) return true;
        if(idx >= nums.size() || sum < 0) return false;
        if(memo[idx][sum] != -1) return memo[idx][sum];

        return memo[idx][sum] = (subsetSum(nums, memo, idx + 1, sum - nums[idx]) || subsetSum(nums, memo, idx + 1, sum));
    }
};
```

### DP

Denote $M$ as `target`, and $N$ as `nums.size()`.
Time Complexity: $O(MN)$, Space Complexity: $O(MN)$
注意 base case 的設定，若不知道該怎麼設，就 dry run 幾組 test case 就會知道了。

注意 `DP` 的 size 為 $(n + 1) \cdot (m + 1)$。

```cpp
class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int sum = accumulate(nums.begin(), nums.end(), 0);
        if(sum % 2 != 0) return false;
        int target = sum / 2;
        int n = nums.size();
        vector<vector<int>> DP(n + 1, vector<int>(target + 1, 0));
        
		// Base case
        for(int i = 0; i < n + 1; i++) {
            DP[i][0] = 1;
        }
        
        for(int i = 1; i < n + 1; i++) {
            for(int j = 0; j < target + 1; j++) {
                if(j >= nums[i - 1]) {
                    if(DP[i-1][j - nums[i - 1]] == 1) DP[i][j] = 1;
                }
                if(DP[i-1][j] == 1) DP[i][j] = 1;
            }
        }

        return DP[n][target];
    }
};
```

### DP-Optimized

Denote $M$ as `target`, and $N$ as `nums.size()`.
Time Complexity: $O(MN)$, Space Complexity: $O(M)$

原本的遞迴關係式為：`DP[i][j] = DP[i-1][j - nums[i - 1]] || DP[i-1][j]`

等於說在 2D DP Table 當中，每一個格子都只和上一列左前方和正前方的格子有關係，又因為和左前方的格子有關係，因此要從最右邊開始填起（`for(int j = target; j >= 1; j--)`）。

```cpp
class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int sum = accumulate(nums.begin(), nums.end(), 0);
        if(sum % 2 != 0) return false;

        int target = sum / 2;
        int n = nums.size();
        int DP[target + 1];
        memset(DP, 0, sizeof(DP));

        DP[0] = 1;

        for(int i = 1; i < n + 1; i++) {
            for(int j = target; j >= 1; j--) {
                if(j >= nums[i - 1]) {
                    if(DP[j - nums[i - 1]] == 1)
                        DP[j] = 1;
                }
                if(DP[j] == 1) DP[j] = 1;
            }
        }

        return DP[target];
    }
};
```

## Link
- [Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum/)
