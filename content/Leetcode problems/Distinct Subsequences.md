---
title: Distinct Subsequences
date: 2024-02-24
lastmod: 2024-02-24
author:
  - Jimmy Lin
tags:
  - DP
  - review
draft: false
sr-due: 2024-05-19
sr-interval: 56
sr-ease: 290
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

### Top-Down DP with memo

Time Complexity: $O(mn)$, Space Complexity: $O(mn)$

```cpp
class Solution {
public:
    
    int numDistinct(string s, string t) {
        int m = s.length(), n = t.length();
        vector<vector<int>> memo(m + 1, vector<int>(n + 1, -1));

        int j = 0;
        int res = 0;
        for(int i = 0; i < s.length(); i++) {
            if(s[i] == t[j])
                res += dfs(s, t, i + 1, j + 1, memo);
        }   
        return res;
    }

    int dfs(string& s, string& t, int i, int j, vector<vector<int>>& memo) {
        if(memo[i][j] != -1)
            return memo[i][j];
        if(j == t.length()) 
            return memo[i][j] = 1;
        if(i >= s.length())
            return memo[i][j] = 0;
        
        int res = 0;
        for(int k = i; k < s.length(); k++) {
            if(s[k] == t[j])
                res += dfs(s, t, k + 1, j + 1, memo);
        }
        return  memo[i][j] = res;
    }
};
```


### Bottom Up
Time Complexity: $O(mn)$, Space Complexity: $O(mn)$

`dp[i][j]`: the number of distinct subsequences of `s[0:i]` which equals `t[0:j]`.

Base case:

```cpp
// base case
for(int j = 0; j <= m; j++) 
	dp[j][0] = 1;
```

考慮下面的例子，最左邊那排都是 1 ，因為這排代表的是當 s 某個 index 和 t 的第一個 index 的 char 相等時，會產生的 distinct subsequence 的數量。

以 babgb 和 b 一組為例，要計算的是 `dp[5][1]`，因為 b 都相等，因此要 + 1，也就是 `dp[4][0]` 的值，但同時，先前已經計算好 babg 和 b 會有多少個 distinct subsequence 了，也就是 `dp[4][1] = 2`，所以說 `dp[5][1] = 2 + 1 = 3`。

```
s = "babgbag", t = "bag"

	   b a g
------------
	|1 0 0 0 
b	|1 1 0 0 
a	|1 1 1 0 
b	|1 2 1 0 
g	|1 2 1 1 
b	|1 3 1 1 
a	|1 3 4 1 
g	|1 3 4 5 
```

t 不可以被 skip，s 可以，不 match 就跳過即可。

```cpp
class Solution {
public:
    int numDistinct(string s, string t) {
        int m = s.length(), n = t.length();
        vector<vector<unsigned>> dp(m + 1, vector<unsigned>(n + 1, 0));
		// base case
        for(int j = 0; j <= m; j++) 
            dp[j][0] = 1;

        for(int i = 1; i < m + 1; i++) {
            for(int j = 1; j < n + 1; j++) {
                dp[i][j] = dp[i - 1][j] + ((s[i - 1] == t[j - 1]) ? dp[i - 1][j - 1] : 0);
                dp[i][j] %= INT_MAX;
            }
        }

        return dp[m][n];
    }
};
```
## Source
- [Distinct Subsequences - LeetCode](https://leetcode.com/problems/distinct-subsequences/description/)