---
title: Combination Sum IV
date: 2023-10-11
lastmod: 2023-10-11
author:
  - Jimmy Lin
tags:
  - DP
  - dfs
  - memoization
draft: false
---

## Description

Given an array of **distinct** integers `nums` and a target integer `target`, return _the number of possible combinations that add up to_ `target`.

The test cases are generated so that the answer can fit in a **32-bit** integer.

**Example 1:**

**Input:** nums = \[1,2,3\], target = 4
**Output:** 7
**Explanation:**
The possible combination ways are:
(1, 1, 1, 1)
(1, 1, 2)
(1, 2, 1)
(1, 3)
(2, 1, 1)
(2, 2)
(3, 1)
Note that different sequences are counted as different combinations.

**Example 2:**

**Input:** nums = \[9\], target = 3
**Output:** 0

**Constraints:**

*   `1 <= nums.length <= 200`
*   `1 <= nums[i] <= 1000`
*   All the elements of `nums` are **unique**.
*   `1 <= target <= 1000`

**Follow up:** What if negative numbers are allowed in the given array? How does it change the problem? What limitation we need to add to the question to allow negative numbers?

## Code 

### Top Down DP with memoization
Time Complexity: $O(nt)$, Space Complexity: $O(nt)$

```cpp
class Solution {
    int dp[201][1001];
public:
    int combinationSum4(vector<int>& nums, int target) {
        memset(dp, -1, sizeof(dp));
        int res = 0;
        for(int i = 0; i < nums.size(); i++) {
            res += dfs(nums, i, nums[i], target);
        }
        return res;
    }

    int dfs(vector<int>& nums, int idx, int sum, int target) {
        if(sum == target) return 1;
        if(sum > target) return 0;

        if(dp[idx][sum] != -1) return dp[idx][sum];

        int res = 0;
        for(int i = 0; i < nums.size(); i++) {
            res += dfs(nums, i, sum + nums[i], target);
        }
        return dp[idx][sum] = res;
    }
};
```

### Bottom Up DP
Time Complexity: $O(nt)$, Space Complexity: $O(t)$

其實這題有些類似 [[Coin Change II|Coin Change II]] ，差別在於 order 是否 matters。

```cpp
class Solution {
public:
    int combinationSum4(vector<int>& nums, int target) {
        vector<int> dp(target + 1, 0);
        dp[0] = 1;
        for(int i = 1; i <= target; i++) {
            for(int j = 0; j < nums.size(); j++) {
                if(i >= nums[j])
                    dp[i] += dp[i - nums[j]];
            }
        }
        return dp[target];
    }
};

```

某些 test case 會導致在累加的過程中 Integer Overflow，因此要 take mod 且使用 `unsigned long long`。
```cpp
class Solution {
public:
    int combinationSum4(vector<int>& nums, int target) {
        vector<unsigned long long> dp(target + 1, 0);
        dp[0] = 1;
        for(int i = 1; i <= target; i++) {
            for(int j = 0; j < nums.size(); j++) {
                if(i >= nums[j]) {
                    dp[i] = ((dp[i] % INT_MAX) + (dp[i - nums[j]] % INT_MAX)) % INT_MAX;
                }
                dp[i] %= INT_MAX;
            }
        }

        return dp[target];
    }
};
```


## Source
- [Combination Sum IV - LeetCode](https://leetcode.com/problems/combination-sum-iv/description/)