---
title: House Robber IV
date: 2024-03-15
lastmod: 2024-03-15
author:
  - Jimmy Lin
tags:
  - binary_search
  - review
draft: false
sr-due: 2024-03-19
sr-interval: 3
sr-ease: 250
---

## Description

There are several consecutive houses along a street, each of which has some money inside. There is also a robber, who wants to steal money from the homes, but he **refuses to steal from adjacent homes**.

The **capability** of the robber is the maximum amount of money he steals from one house of all the houses he robbed.

You are given an integer array `nums` representing how much money is stashed in each house. More formally, the `ith` house from the left has `nums[i]` dollars.

You are also given an integer `k`, representing the **minimum** number of houses the robber will steal from. It is always possible to steal at least `k` houses.

Return _the **minimum** capability of the robber out of all the possible ways to steal at least_ `k` _houses_.

**Example 1:**

**Input:** nums = \[2,3,5,9\], k = 2
**Output:** 5
**Explanation:** 
There are three ways to rob at least 2 houses:
- Rob the houses at indices 0 and 2. Capability is max(nums\[0\], nums\[2\]) = 5.
- Rob the houses at indices 0 and 3. Capability is max(nums\[0\], nums\[3\]) = 9.
- Rob the houses at indices 1 and 3. Capability is max(nums\[1\], nums\[3\]) = 9.
Therefore, we return min(5, 9, 9) = 5.

**Example 2:**

**Input:** nums = \[2,7,9,3,1\], k = 2
**Output:** 2
**Explanation:** There are 7 ways to rob the houses. The way which leads to minimum capability is to rob the house at index 0 and 4. Return max(nums\[0\], nums\[4\]) = 2.

**Constraints:**

*   `1 <= nums.length <= 105`
*   `1 <= nums[i] <= 109`
*   `1 <= k <= (nums.length + 1)/2`

## Code 

### DP (TLE)
Time Complexity: $O(nk)$, Space Complexity: $O(nk)$

```cpp
class Solution {
public:
    int f(int i, vector<int>& nums, int k, vector<vector<int> > &dp) {
        if (k == 0)
            return 0;
        if (i>=nums.size()) return INT_MAX;
        if (dp[i][k] != -1) return dp[i][k];

        int take = max(nums[i], f(i+2, nums, k-1, dp));
        int not_take = f(i+1, nums, k, dp);
        return dp[i][k] = min(take, not_take);
    }
    
    int minCapability(vector<int>& nums, int k) {
        vector<vector<int> > dp(nums.size(), vector<int>(k+1, -1));
        return f(0, nums, k, dp);
    }
};
```

### Binary Search

Time Complexity: $O(n \log n)$, Space Complexity: $O(1)$

Intuition: 這題是 Min-Max Problem，所以使用 Binary Search。

至於 `canRob` 為何使用 greedy ？

考慮 `[2, 8, 5, 10], k = 2, m = 5`，則可以 rob `2, 5` ，但這樣做可能會有問題，如果說最好的選擇不是從 `2` 開始而是從 index = 1 開始呢？

考慮 `[8, 2, 10, 5], k = 2, m = 5`，把 8 放在第一個是因為我們假設第一個不是最好的起點（如果是，比如說 `[3, 2, 10, 5]`，那解一樣可以找到），這個情況下依舊有解，因此我們可以 greedy 的去挑解，反正若被迫從比較後面 index 開始最後沒找到，那代表從前面的開始也不會找到。

```cpp
class Solution {
public:
    int minCapability(vector<int>& nums, int k) {
        int l = *min_element(nums.begin(), nums.end());
        int r = *max_element(nums.begin(), nums.end());

        while(l < r) {
            int m = l + (r - l) / 2;
            if(canRob(m, nums, k)) {
                r = m;
            } else {
                l = m + 1;
            }
        }

        return l;
    }

    bool canRob(int m, vector<int>& nums, int k) {
        int i = 0, n = nums.size();
        while(i < n) {
            if(nums[i] <= m) {
                i += 2;
                k--;
            } else {
                i++;
            }
            if(k == 0)
                return true;
        }
        return false;
    }
};
```
## Source
- [House Robber IV - LeetCode](https://leetcode.com/problems/house-robber-iv/description/)