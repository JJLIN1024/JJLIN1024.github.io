---
title: Count All Valid Pickup and Delivery Options
date: 2023-09-25
lastmod: 2023-09-25
author: Jimmy Lin
tags: ["dynamic programming", "math"]
draft: false
---

## Description

Given `n` orders,each order consists of a pickup and a delivery service.

Count all valid pickup/delivery possible sequences such that delivery(i) is always after of pickup(i). 

Since the answer may be too large, return it modulo 10^9 + 7.

**Example 1:**

**Input:** n = 1
**Output:** 1
**Explanation:** Unique order (P1, D1), Delivery 1 always is after of Pickup 1.

**Example 2:**

**Input:** n = 2
**Output:** 6
**Explanation:** All possible orders: 
(P1,P2,D1,D2), (P1,P2,D2,D1), (P1,D1,P2,D2), (P2,P1,D1,D2), (P2,P1,D2,D1) and (P2,D2,P1,D1).
This is an invalid order (P1,D2,P2,D1) because Pickup 2 is after of Delivery 2.

**Example 3:**

**Input:** n = 3
**Output:** 90

**Constraints:**

*   `1 <= n <= 500`

## Code 

### DP
Time Complexity: $O(n)$, Space Complexity: $O(n)$

仔細觀察規律即可得出此解法。對於給定的 `n` 而言，`n - 1` 的 case 為長度為 `(n - 1) * 2` 的序列，以 `n = 3` 為例，`n = 2` 時 `P1 P2 D1 D2` 任意組合的長度為 `4`。而長度 `4` 的序列會有 `5` 個空格可以進行插入，要插入什麼呢？也就是新的 `Pn Dn`，而插入的方式又有兩種，一種是 `Pn Dn` 連在一起，插入一個空格 (`k = space_to_insert`)，另一種是分開插入兩個不同的空格（ $C^k_2$ )。

```cpp
#define ll long long
class Solution {
public:
    int countOrders(int n) {
        vector<ll> dp(n + 1, 0);
        dp[0] = 0;
        dp[1] = 1;
        ll mod = 1e9 + 7;
        for(int i = 2; i <= n; i++) {
            ll space_to_insert = (((i - 1) * 2) + 1);
            dp[i] =  ((space_to_insert + C(space_to_insert, 2)) * dp[i - 1]) % mod;
        }

        return (int) dp[n] % mod;
    }

    ll C(int n, int m) {
        ll s = 1;
        ll c = 1;
        for(int i = 0; i < m; i++) {
            s *= n--;
            s /= c++;
        }
        return s;
    }
};
```

### DP - Optimized
Time Complexity: $O(n)$, Space Complexity: $O(1)$

```
ll space_to_insert = (((i - 1) * 2) + 1);
dp[i] =  ((space_to_insert + C(space_to_insert, 2)) * dp[i - 1]) % mod;
```

關於 `dp[i]`這串計算，整理之後會發現整串東西會等於 `(2i - 1) * i`。

```cpp
class Solution {
public:
    int countOrders(int n) {
        long res = 1, mod = 1e9 + 7;
        for(int i = 2; i <= n; i++) {
            res = res * (2 * i - 1) * i % mod;
        }
        return res % mod;
    }

};
```

### More Math

```markdown
The total number of all permutation obviously eauqls to (2n)!.
For each pair, the order is determined, so we need to divide by 2.
So the final result is (2n)!/(2^n)
```

## Source
- [Count All Valid Pickup and Delivery Options - LeetCode](https://leetcode.com/problems/count-all-valid-pickup-and-delivery-options/)