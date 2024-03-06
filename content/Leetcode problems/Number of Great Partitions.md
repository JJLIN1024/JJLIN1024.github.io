---
title: Number of Great Partitions
date: 2023-09-25
lastmod: 2023-09-25
author:
  - Jimmy Lin
tags:
  - knapsack
  - DP
draft: false
---

## Description

You are given an array `nums` consisting of **positive** integers and an integer `k`.

**Partition** the array into two ordered **groups** such that each element is in exactly **one** group. A partition is called great if the **sum** of elements of each group is greater than or equal to `k`.

Return _the number of **distinct** great partitions_. Since the answer may be too large, return it **modulo** `109 + 7`.

Two partitions are considered distinct if some element `nums[i]` is in different groups in the two partitions.

**Example 1:**

**Input:** nums = \[1,2,3,4\], k = 4
**Output:** 6
**Explanation:** The great partitions are: (\[1,2,3\], \[4\]), (\[1,3\], \[2,4\]), (\[1,4\], \[2,3\]), (\[2,3\], \[1,4\]), (\[2,4\], \[1,3\]) and (\[4\], \[1,2,3\]).

**Example 2:**

**Input:** nums = \[3,3,3\], k = 4
**Output:** 0
**Explanation:** There are no great partitions for this array.

**Example 3:**

**Input:** nums = \[6,6\], k = 2
**Output:** 2
**Explanation:** We can either put nums\[0\] in the first partition or in the second partition.
The great partitions will be (\[6\], \[6\]) and (\[6\], \[6\]).

**Constraints:**

*   `1 <= nums.length, k <= 1000`
*   `1 <= nums[i] <= 109`

## Code 

和 [[Partition Equal Subset Sum|Partition Equal Subset Sum]] 一樣屬於 knapsack problem 系列。只是在這題中我們要找的是 `sum < k` 的組合。

```markdown
we are asked to find the number of arrangement that both have size > k.
We can find out the number of cases that have size <= k,
then that a more regular Knapsack problem.
```

### DP - 2D knapsack
Time Complexity: $O(nk)$, Space Complexity: $O(nk)$

注意 `total = (total % mod + mod) % mod;` ，因為有取 mod，所以在 `total -= 2*ways;` 之後值有可能是負的。就像是在計算 `-3 mod 7` 時，要先做 `-3 + 7 = 4`，再做 `4 % 7 = 4`。（ `%` 代表除法取餘數）

```cpp
#define ll long long
class Solution {
public:
    int countPartitions(vector<int>& nums, int k) {

        ll sum = 0;
        for(int &n: nums) {
            sum += n;
        }
        if(sum < 2 * 1ll * k || nums.size() <= 1) return 0;

        ll n = nums.size();
        ll mod = 1e9 + 7;
        ll total = mpow(2, n, mod);    

        vector<vector<ll>> dp(n + 1, vector<ll>(k, 0));
        
        // base case
        for(int i = 0; i < n + 1; i++) {
            dp[i][0] = 1;
        }

        for(int i = 1; i < n + 1; i++) {
            for(int j = 1; j < k; j++) {
                if(j >= nums[i - 1]) {
                    dp[i][j] = (dp[i - 1][j] % mod) + (dp[i - 1][j - nums[i - 1]] % mod);
                } else {
                    dp[i][j] = dp[i - 1][j];
                }
                
                dp[i][j] = dp[i][j] % mod;
            }
        }

        ll ways = 0;
        for(int i = 0; i < k; i++) {
            ways = (ways + dp[n][i]) % mod;
        }

        ways %= mod;

        total -= 2*ways;
        total = (total % mod + mod) % mod;

        return total;

    }

    ll mpow(ll a, ll b, ll m){
        if (b == 0)
            return 1;
        ll x = mpow(a, b / 2, m);
        x = (x * x) % m;
        if (b % 2)
        {
            x = (x * a) % m;
        }
        return x;
    }
};
```

## Source
- [Number of Great Partitions - LeetCode](https://leetcode.com/problems/number-of-great-partitions/description/)