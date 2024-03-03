---
title: Perfect Squares
date: 2023-01-02
lastmod: 2023-01-02
author: Jimmy Lin
tags:
  - DP
  - review
draft: false
sr-due: 2024-05-10
sr-interval: 79
sr-ease: 290
---
Given an integer `n`, return _the least number of perfect square numbers that sum to_ `n`.

A **perfect square** is an integer that is the square of an integer; in other words, it is the product of some integer with itself. For example, `1`, `4`, `9`, and `16` are perfect squares while `3` and `11` are not.

**Example 1:**

**Input:** n = 12
**Output:** 3
**Explanation:** 12 = 4 + 4 + 4.

**Example 2:**

**Input:** n = 13
**Output:** 2
**Explanation:** 13 = 4 + 9.

**Constraints:**

- `1 <= n <= 104`
## Code

Time Complexity: $O(n \sqrt{n})$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    int numSquares(int n) {
        vector<int> DP(n+1, 1e9);
        DP[0] = 0;
        for(int i = 1; i <= n; i++) {
            for(int j = 1; pow(j, 2) <= i; j++) {
                DP[i] = min(DP[i], 1 + DP[i - pow(j, 2)]);
            }
        }
        return DP[n];
    }
};
```

## Link
- [Perfect Squares](https://leetcode.com/problems/perfect-squares/description/)
