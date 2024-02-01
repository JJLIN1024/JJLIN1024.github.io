---
title: 2 Keys Keyboard
date: 2023-10-09
lastmod: 2023-10-09
author:
  - Jimmy Lin
tags:
  - DP
  - memoization
draft: false
---

## Description

There is only one character `'A'` on the screen of a notepad. You can perform one of two operations on this notepad for each step:

*   Copy All: You can copy all the characters present on the screen (a partial copy is not allowed).
*   Paste: You can paste the characters which are copied last time.

Given an integer `n`, return _the minimum number of operations to get the character_ `'A'` _exactly_ `n` _times on the screen_.

**Example 1:**

**Input:** n = 3
**Output:** 3
**Explanation:** Initially, we have one character 'A'.
In step 1, we use Copy All operation.
In step 2, we use Paste operation to get 'AA'.
In step 3, we use Paste operation to get 'AAA'.

**Example 2:**

**Input:** n = 1
**Output:** 0

**Constraints:**

*   `1 <= n <= 1000`

## Code 

### Top Down DP with memoization
Time Complexity: $O(n^2)$, Space Complexity: $O(n)$

關鍵在於 $T(n) = T(i) + \frac{n}{i}, \forall i \in 1 \cdots, n - 1$, and `n mod i == 0`.

$\frac{n}{i}$ 是計算由 $i$ 個 $A$ Copy and Paste 到 $n$ 個 $A$ 所需要的 steps 次數，由 $\frac{n - i}{i} + 1$ 組成，其中 $\frac{n - i}{i}$ 是 paste 的次數，$1$ 則是 copy 的次數。

```cpp
class Solution {
public:
    int minSteps(int n) {
        vector<int> memo(n + 1, -1);
        return solve(n, memo);
    }

    int solve(int n, vector<int>& memo) {
        if(n == 1) return 0;
        if(memo[n] != -1) return memo[n];
        int res = INT_MAX;
        for(int i = 1; i < n; i++) {
            if(n % i != 0) continue;
            res = min(res, (n / i) + minSteps(i));
        }
        return memo[n] = res;
    }
};
```

### Bottom Up DP
Time Complexity: $O(n^2)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    int minSteps(int n) {
        vector<int> dp(n + 1, 1001);
        dp[1] = 0;

        for(int i = 2; i <= n; i++) {
            for(int j = 1; j < i; j++) {
                if(i % j != 0) continue;
                dp[i] = min(dp[i], (i / j) + dp[j]);
            }
        }
        return dp[n];
    }

};
```
## Source
- [2 Keys Keyboard - LeetCode](https://leetcode.com/problems/2-keys-keyboard/description/)