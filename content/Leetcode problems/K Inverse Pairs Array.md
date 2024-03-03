---
title: K Inverse Pairs Array
date: 2024-01-27
lastmod: 2024-01-27
author: Jimmy Lin
tags:
  - DP
  - review
draft: false
sr-due: 2024-03-05
sr-interval: 6
sr-ease: 250
---

## Description

For an integer array `nums`, an **inverse pair** is a pair of integers `[i, j]` where `0 <= i < j < nums.length` and `nums[i] > nums[j]`.

Given two integers n and k, return the number of different arrays consist of numbers from `1` to `n` such that there are exactly `k` **inverse pairs**. Since the answer can be huge, return it **modulo** `109 + 7`.

**Example 1:**

**Input:** n = 3, k = 0
**Output:** 1
**Explanation:** Only the array \[1,2,3\] which consists of numbers from 1 to 3 has exactly 0 inverse pairs.

**Example 2:**

**Input:** n = 3, k = 1
**Output:** 2
**Explanation:** The array \[1,3,2\] and \[2,1,3\] have exactly 1 inverse pair.

**Constraints:**

*   `1 <= n <= 1000`
*   `0 <= k <= 1000`

## Code 

Time Complexity: $O(nk)$, Space Complexity: $O(nk)$

寫出 DP 定義：

`dp[i][j]` 代表組成為 1, 2, 3, ..., i，且有 j 個 inverse pair 的  array 數量。

觀察 `dp[i + 1][j]` 和 `dp[i][j]` 的關係：

把 i 加進一個已經有 1, 2, ..., i - 1 的 array，擺放位置有 i 種。

`dp[n][k] = dp[n-1][k] + dp[n-1][k-1] + dp[n-1][k-2] + ... + dp[n-1][k+1 n+1] + dp[n-1][k-n+1]`  

對於 `dp[n][k]` 來說，就相當於在 `dp[n][k]` 的情況下，把 `n` 放在最後面，`k` 就不會變，因為 `n` 是最大的，不會增加任何 inverse pair。而 `dp[n-1][k-1]` 代表原本有 `k - 1` 個 inverse pair，因此只要把 `n` 放到剛好可以產生一個 inverse pair 的位置，就會形成 `dp[n][k]`，以此類推。

 `dp[n-1][k-n+1]`的情況是將 `n` 放到最前面，這樣 `n` 本身就會和後面所有的 element 形成 (n-1) 個 inverse pair，因此要找 `dp[n - 1][k - (n - 1)]`。

觀察下一項：

`dp[n][k+1] = dp[n-1][k+1]+dp[n-1][k]+dp[n-1][k-1]+dp[n-1][k-2]+...+dp[n-1][k+1-n+1]`

綜合兩式：

`dp[n][k+1] = dp[n-1][k+1] + (dp[n-1][k] + dp[n-1][k-1] + dp[n-1][k-2] + ... + dp[n-1][k-n+1]) + dp[n-1][k+1-n+1] = dp[n][k] + dp[n-1][k+1] - dp[n-1][k+1-n]`

```
First look for 2D dp,

1. If n=0, no inverse pairs exist. Thus, dp[0][k]=0.
    
2. If k=0, only one arrangement is possible, which is all numbers sorted in ascending order. Thus, dp[n][0]=1.
    
3. Otherwise, dp[i,j] = sum( for(p=0 to min(j, i-1) dp[i-1][j-p] ) )
    
Now, in the 3rd step, in the loop every time we are just adding a value to right and removing a value from left  
Thus our next optimization in this step =>  
dp[i][j] = d[i][j-1] + (dp[i-1][j-1] - (i>=j ? dp[i-1][j-i] : 0));
```

```cpp
class Solution {
public:
    int kInversePairs(int n, int k) {
        // edge cases
        if (k > n * (n-1) / 2) return 0;
        if (k == 0 || k == n * (n-1) / 2) return 1;

        vector<vector<long>> dp(n + 1, vector<long>(k + 1, 0));
        
        int mod = 1e9 + 7;
        dp[2][0] = 1;
        dp[2][1] = 1;
        for (int i = 3; i <= n; i++) {
            dp[i][0] = 1;
            for (int j = 1; j <= min(k, i * (i-1) / 2); j++) {
                dp[i][j] = dp[i][j-1] + dp[i-1][j];
                if (j >= i) dp[i][j] -= dp[i-1][j-i];
                dp[i][j] = (dp[i][j] + mod) % mod;
            }
        }
        return dp[n][k];
    }
};

```

## Source
- [K Inverse Pairs Array - LeetCode](https://leetcode.com/problems/k-inverse-pairs-array/description/?envType=daily-question&envId=2024-01-27)