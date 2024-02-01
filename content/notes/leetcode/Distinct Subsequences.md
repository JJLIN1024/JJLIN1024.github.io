---
title: Distinct Subsequences
date: 2024-01-31
lastmod: 2024-01-31
author: Jimmy Lin
tags:
  - DP
  - review
draft: false
sr-due: 2024-02-04
sr-interval: 3
sr-ease: 250
---

## Description

Given two strings s and t, return _the number of distinct_ **_subsequences_** _of_ s _which equals_ t.

The test cases are generated so that the answer fits on a 32-bit signed integer.

**Example 1:**

**Input:** s = "rabbbit", t = "rabbit"
**Output:** 3
**Explanation:**
As shown below, there are 3 ways you can generate "rabbit" from s.
`**rabb**b**it**`
`**ra**b**bbit**`
`**rab**b**bit**`

**Example 2:**

**Input:** s = "babgbag", t = "bag"
**Output:** 5
**Explanation:**
As shown below, there are 5 ways you can generate "bag" from s.
`**ba**b**g**bag`
`**ba**bgba**g**`
`**b**abgb**ag**`
`ba**b**gb**ag**`
`babg**bag**`

**Constraints:**

*   `1 <= s.length, t.length <= 1000`
*   `s` and `t` consist of English letters.

## Code 

Well, a dynamic programming problem. Let's first define its state `dp[i][j]` to be the number of distinct subsequences of `t[0..i - 1]` in `s[0..j - 1]`. Then we have the following state equations:

1. General case 1: `dp[i][j] = dp[i][j - 1]` if `t[i - 1] != s[j - 1]`;
2. General case 2: `dp[i][j] = dp[i][j - 1] + dp[i - 1][j - 1]` if `t[i - 1] == s[j - 1]`;
3. Boundary case 1: `dp[0][j] = 1` for all `j`;
4. Boundary case 2: `dp[i][0] = 0` for all **positive** `i`.

Now let's give brief explanations to the four equations above.

1. If `t[i - 1] != s[j - 1]`, the distinct subsequences will not include `s[j - 1]` and thus all the number of distinct subsequences will simply be those in `s[0..j - 2]`, which corresponds to `dp[i][j - 1]`;
2. If `t[i - 1] == s[j - 1]`, the number of distinct subsequences include two parts: those with `s[j - 1]` and those without;
3. An empty string will have exactly one subsequence in any string :-)
4. Non-empty string will have no subsequences in an empty string.


Time Complexity: $O(mn)$, Space Complexity: $O(mn)$

use `vector<unsigned>` and mod `INT_MAX`, since The test cases are generated so that the answer fits on a 32-bit signed integer.

```cpp
class Solution {
public:
    int numDistinct(string s, string t) {
        int m = t.length(), n = s.length();
        vector<vector<unsigned>> dp(m + 1, vector<unsigned>(n + 1, 0));
        for(int j = 0; j <= n; j++) dp[0][j] = 1;
        for(int j = 1; j <= n; j++) {
            for(int i = 1; i <= m; i++) {
                dp[i][j] = dp[i][j - 1] + ((t[i - 1] == s[j - 1]) ? dp[i - 1][j - 1] : 0);
                dp[i][j] %= INT_MAX;
            }
        }
        return dp[m][n];
    }
};
```

## Source
- [Distinct Subsequences - LeetCode](https://leetcode.com/problems/distinct-subsequences/description/)