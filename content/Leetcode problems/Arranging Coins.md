---
title: Arranging Coins
date: 2024-03-14
lastmod: 2024-03-14
author:
  - Jimmy Lin
tags:
  - binary_search
draft: false
---

## Description

You have `n` coins and you want to build a staircase with these coins. The staircase consists of `k` rows where the `ith` row has exactly `i` coins. The last row of the staircase **may be** incomplete.

Given the integer `n`, return _the number of **complete rows** of the staircase you will build_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/04/09/arrangecoins1-grid.jpg)

**Input:** n = 5
**Output:** 2
**Explanation:** Because the 3rd row is incomplete, we return 2.

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/04/09/arrangecoins2-grid.jpg)

**Input:** n = 8
**Output:** 3
**Explanation:** Because the 4th row is incomplete, we return 3.

**Constraints:**

*   `1 <= n <= 231 - 1`

## Code 

Time Complexity: $O(\log n)$, Space Complexity: $O(1)$

和 [[Valid Perfect Square]] 一樣。

```cpp
class Solution {
public:
    int arrangeCoins(int n) {
        // 1 + 2 + ... + x = x * (x + 1) / 2
        long long l = 1, r = n;
        while(l < r) {
            long long m = l + (r - l) / 2;
            if((m * (m + 1) / 2) < n) {
                l = m + 1;
            } else {
                r = m;
            }
        }
        return (l * (l + 1) / 2) > n ? l - 1 : l;
    }
};
```

## Source
- [Arranging Coins - LeetCode](https://leetcode.com/problems/arranging-coins/description/?envType=study-plan-v2&envId=binary-search)