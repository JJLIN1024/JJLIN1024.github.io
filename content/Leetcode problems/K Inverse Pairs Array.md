---
title: K Inverse Pairs Array
date: 2024-01-27
lastmod: 2024-01-27
author: Jimmy Lin
tags:
  - DP
  - review
draft: false
sr-due: 2024-06-13
sr-interval: 79
sr-ease: 290
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

`dp[n][k]` 代表組成為 1, 2, 3, ..., n，且有 k 個 inverse pair 的 array 數量。

觀察 `dp[n][k]` 和 `dp[n - 1][k]` 的關係：

把 n 加進一個由 1, 2, ..., n - 1 組成的 array，擺放位置（insert 的 index）有 n 種。

舉例：

`[1, 3, 2]` 代表 `dp[3][1]`，若要將 4 加入，可以創造出：

1. `[4, 1, 3, 2] -> (dp[4][4])
2. `[1, 4 ,3, 2] -> (dp[4][3])`
3. `[1, 3, 4, 2] -> (dp[4][2])`
4. `[1, 3, 2, 4] -> (dp[4][1])`

因為要加入的是最大的，所以可以選擇插入的位置，去創造出想要的 inverse 數量，例如上例的 2. 就是將 4 放在 2, 3 之前，創造出 2 個 inverse pair，再加上原本就有的 1 個（3, 2），總共會是 3 個，對應到 `dp[4][3]`。

因此我們可知：

`dp[n][k] = dp[n-1][k] + dp[n-1][k-1] + dp[n-1][k-2] + ... + dp[n-1][k-n+2] + dp[n-1][k-n+1]`  

`dp[n-1][k-n+1]` 就是 `dp[n-1][k - (n - 1)]`，即是完全利用原本的 array 的每個元素去創造最多（原本只有 `n - 1` 個元素）的 inverse pair 時，例如：

`dp[4][4]` 對應到 `dp[3][1]`，也就是將 4 放在 `[1, 3, 2]` 的最前面變成 `[4, 1, 3, 2]`。

對於 `dp[n][k]` 來說，就相當於在 `dp[n][k]` 的情況下，把 `n` 放在最後面，`k` 就不會變，因為 `n` 是最大的，不會增加任何 inverse pair。而 `dp[n-1][k-1]` 代表原本有 `k - 1` 個 inverse pair，因此只要把 `n` 放到剛好可以產生一個 inverse pair 的位置，就會形成 `dp[n][k]`，以此類推。

 `dp[n-1][k-n+1]`的情況是將 `n` 放到最前面，這樣 `n` 本身就會和後面所有的 element 形成 (n-1) 個 inverse pair，因此要找 `dp[n - 1][k - (n - 1)]`。

觀察下一項：

1. `dp[n][k] = dp[n-1][k] + dp[n-1][k-1] + dp[n-1][k-2] + ... + dp[n-1][k-n+2] + dp[n-1][k-n+1]`  
2.  `dp[n][k+1] = dp[n-1][k+1] + dp[n-1][k] + dp[n-1][k-1] + dp[n-1][k-2] + ... + dp[n-1][k+1-n+1]`

綜合兩式：

`dp[n][k+1] = dp[n-1][k+1] + (dp[n-1][k] + dp[n-1][k-1] + dp[n-1][k-2] + ... + dp[n-1][k+1-n+1] + dp[n-1][k-n+1]) - dp[n-1][k-n+1] = dp[n-1][k+1] + dp[n][k] - dp[n-1][k-n+1]`

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