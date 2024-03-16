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
sr-due: 2024-09-08
sr-interval: 176
sr-ease: 290
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

```cpp
class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int sum = accumulate(nums.begin(), nums.end(), 0);
        if(sum % 2 != 0)
            return false;
        int target = sum / 2, n = nums.size();
        /*
        dp[i][j]: can use nums[0:i] to add up to j
        so dp[i][0] = true because we can always use
        0 to add up to 0.

        dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i - 1]];
        dp[i - 1][j]: do not use nums[i - 1], use only nums[0: i - 2] to adds up to j;
        dp[i - 1][j - nums[i - 1]]: use nums[i - 1], and use nums[0: i - 2] to adds up to j - nums[i - 1];
        */
        vector<vector<bool>> dp(n + 1, vector<bool>(target + 1, false));
        // base case
        for(int i = 0; i < n + 1; i++)
            dp[i][0] = true;

        for(int i = 1; i < n + 1; i++) {
            for(int j = 1; j < target + 1; j++) {
                dp[i][j] = dp[i][j] || dp[i - 1][j];
                if(j >= nums[i - 1])
                    dp[i][j] = dp[i][j] || dp[i - 1][j - nums[i - 1]];
            }
        }

        return dp[n][target];
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
