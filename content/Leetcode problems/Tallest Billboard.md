---
title: Tallest Billboard
date: 2023-10-10
lastmod: 2023-10-10
author:
  - Jimmy Lin
tags:
  - DP
  - memoization
  - knapsack
draft: false
---

## Description

You are installing a billboard and want it to have the largest height. The billboard will have two steel supports, one on each side. Each steel support must be an equal height.

You are given a collection of `rods` that can be welded together. For example, if you have rods of lengths `1`, `2`, and `3`, you can weld them together to make a support of length `6`.

Return _the largest possible height of your billboard installation_. If you cannot support the billboard, return `0`.

**Example 1:**

**Input:** rods = \[1,2,3,6\]
**Output:** 6
**Explanation:** We have two disjoint subsets {1,2,3} and {6}, which have the same sum = 6.

**Example 2:**

**Input:** rods = \[1,2,3,4,5,6\]
**Output:** 10
**Explanation:** We have two disjoint subsets {2,3,5} and {4,6}, which have the same sum = 10.

**Example 3:**

**Input:** rods = \[1,2\]
**Output:** 0
**Explanation:** The billboard cannot be supported, so we return 0.

**Constraints:**

*   `1 <= rods.length <= 20`
*   `1 <= rods[i] <= 1000`
*   `sum(rods[i]) <= 5000`

## Code 
### Brute Force - TLE
Time Complexity: $O(3^n)$, Space Complexity: $O(3^n)$

每個 rod 都有三種選擇，放進 subgroup 1 or subgroup 2，或是不考慮。

```cpp
class Solution {
public:
    int tallestBillboard(vector<int>& rods) {
        return solve(rods, 0, 0, 0);
    }

    int solve(vector<int>& rods, int idx,  int s1, int s2) {

        if(idx == rods.size()) {
            if(s1 == s2) return s1;
            else return 0;
        }

        auto topile1 = solve(rods, idx + 1, s1 + rods[idx], s2);
        auto topile2 = solve(rods, idx + 1, s1, s2 + rods[idx]);
        auto ignore = solve(rods, idx + 1, s1, s2);

        return max({topile1, topile2, ignore});
    }
};
```


### Memoization

這題如果 `memo` 用 `int memo[21][5001][5001]` 去紀錄 `idx, s1, s2` 三個變數，會超過 memory limit。

所以要改成 `s1, s2` 的 diff，使用 `int memo[21][10001]` 去紀錄各個 state。

以下是 two variable 的 brute force。

```cpp
class Solution {
public:
    int tallestBillboard(vector<int>& rods) {
        return solve(rods, 0, 0);
    }

    int solve(vector<int>& rods, int idx, int diff) {

        if(idx == rods.size()) {
            if(diff == 0) return 0;
            else return INT_MIN;
        }

        auto topile1 = rods[idx] + solve(rods, idx + 1, diff + rods[idx]);
        auto topile2 = solve(rods, idx + 1, diff - rods[idx]);
        auto ignore = solve(rods, idx + 1, diff);

        return max({topile1, topile2, ignore});
    }
};
```

With memoization:

`diff + 5000` 是因為題幹說 `sum(rods[i]) <= 5000`，因此差距 range 為 `-5000 ~ 5000`，因此 `+5000` 使之平移到 `0 ~ 10000`。

Time Complexity: $O(nm)$, Space Complexity: $O(nm)$

```cpp
class Solution {
    int memo[21][10001];
public:
    int tallestBillboard(vector<int>& rods) {
        memset(memo, -1, sizeof(memo));
        return solve(rods, 0, 0);
    }

    int solve(vector<int>& rods, int idx, int diff) {

        if(idx == rods.size()) {
            if(diff == 0) return 0;
            else return INT_MIN;
        }

        if(memo[idx][diff + 5000] != -1) return memo[idx][diff + 5000];

        auto topile1 = rods[idx] + solve(rods, idx + 1, diff + rods[idx]);
        auto topile2 = solve(rods, idx + 1, diff - rods[idx]);
        auto ignore = solve(rods, idx + 1, diff);

        return memo[idx][diff + 5000] = max({topile1, topile2, ignore});
    }
};
```
## Source
- [Tallest Billboard - LeetCode](https://leetcode.com/problems/tallest-billboard/description/)