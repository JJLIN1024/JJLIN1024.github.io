---
title: Delete and Earn
date: 2023-09-04
lastmod: 2023-09-04
author: Jimmy Lin
tags: ["dynamic programming"]
draft: false
---

## Description

You are given an integer array `nums`. You want to maximize the number of points you get by performing the following operation any number of times:

*   Pick any `nums[i]` and delete it to earn `nums[i]` points. Afterwards, you must delete **every** element equal to `nums[i] - 1` and **every** element equal to `nums[i] + 1`.

Return _the **maximum number of points** you can earn by applying the above operation some number of times_.

**Example 1:**

**Input:** nums = \[3,4,2\]
**Output:** 6
**Explanation:** You can perform the following operations:
- Delete 4 to earn 4 points. Consequently, 3 is also deleted. nums = \[2\].
- Delete 2 to earn 2 points. nums = \[\].
You earn a total of 6 points.

**Example 2:**

**Input:** nums = \[2,2,3,3,3,4\]
**Output:** 9
**Explanation:** You can perform the following operations:
- Delete a 3 to earn 3 points. All 2's and 4's are also deleted. nums = \[3,3\].
- Delete a 3 again to earn 3 points. nums = \[3\].
- Delete a 3 once more to earn 3 points. nums = \[\].
You earn a total of 9 points.

**Constraints:**

*   `1 <= nums.length <= 2 * 104`
*   `1 <= nums[i] <= 104`

## Code 

### DP
同 [[House Robber|House Robber]]。

Denote `10004` as $N$.
Time Complexity: $O(N)$, Space Complexity: $O(N)$

```cpp
class Solution {
public:
    int deleteAndEarn(vector<int>& nums) {
        int n = 10001;
        int values[n];
        memset(values, 0, sizeof(values));
        for(int i = 0; i < nums.size(); i++) {
            values[nums[i]] += nums[i];
        }

        int dp[n];
        memset(dp, 0, sizeof(dp));
        dp[0] = values[0];
        dp[1] = values[1];
        for(int i = 2; i < n; i++) {
            dp[i] = max(dp[i - 2] + values[i], dp[i-1]);
        }

        return dp[n - 1];
    }
};
```


### DP-Optimized

Time Complexity: $O(N)$, Space Complexity: $O(N)$

`dp[i]` only depends on `dp[i-1] & dp[i-2]`, so we can use only three variables `a, b, c`, corresponds to `dp[i-2], dp[i-1], dp[i]`.

```cpp
class Solution {
public:
    int deleteAndEarn(vector<int>& nums) {
        int n = 10001;
        int values[n];
        memset(values, 0, sizeof(values));
        for(int i = 0; i < nums.size(); i++) {
            values[nums[i]] += nums[i];
        }

        int a = values[0];
        int b = values[1];
        for(int i = 2; i < n; i++) {
            int c = max(a + values[i], b);
            a = b;
            b = c;
        }

        return b;
    }
};

```


## Source
- [Delete and Earn - LeetCode](https://leetcode.com/problems/delete-and-earn/description/)