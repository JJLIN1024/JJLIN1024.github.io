---
title: Edit Distance
date: 2024-02-01
lastmod: 2024-02-01
author:
  - Jimmy Lin
tags:
  - DP
  - review
draft: false
sr-due: Invalid date
sr-interval: NaN
sr-ease: NaN
---

## Description

Given two strings `word1` and `word2`, return _the minimum number of operations required to convert `word1` to `word2`_.

You have the following three operations permitted on a word:

*   Insert a character
*   Delete a character
*   Replace a character

**Example 1:**

**Input:** word1 = "horse", word2 = "ros"
**Output:** 3
**Explanation:** 
horse -> rorse (replace 'h' with 'r')
rorse -> rose (remove 'r')
rose -> ros (remove 'e')

**Example 2:**

**Input:** word1 = "intention", word2 = "execution"
**Output:** 5
**Explanation:** 
intention -> inention (remove 't')
inention -> enention (replace 'i' with 'e')
enention -> exention (replace 'n' with 'x')
exention -> exection (replace 'n' with 'c')
exection -> execution (insert 'u')

**Constraints:**

*   `0 <= word1.length, word2.length <= 500`
*   `word1` and `word2` consist of lowercase English letters.

## Code 

和 [[Distinct Subsequences]] 類似。

To apply DP, we define the state `dp[i][j]` to be the minimum number of operations to convert `word1[0..i)` to `word2[0..j)`.

For the base case, that is, to convert a string to an empty string, the mininum number of operations (deletions) is just the length of the string. So we have `dp[i][0] = i` and `dp[0][j] = j`.

For the general case to convert `word1[0..i)` to `word2[0..j)`, we break this problem down into sub-problems. Suppose we have already known how to convert `word1[0..i - 1)` to `word2[0..j - 1)` (`dp[i - 1][j - 1]`), if `word1[i - 1] == word2[j - 1]`, then no more operation is needed and `dp[i][j] = dp[i - 1][j - 1]`.

If `word1[i - 1] != word2[j - 1]`, we need to consider three cases.

1. **Replace** `word1[i - 1]` by `word2[j - 1]` (`dp[i][j] = dp[i - 1][j - 1] + 1`);
2. If `word1[0..i - 1) = word2[0..j)` then **delete** `word1[i - 1]` (`dp[i][j] = dp[i - 1][j] + 1`);
3. If `word1[0..i) + word2[j - 1] = word2[0..j)` then **insert** `word2[j - 1]` to `word1[0..i)` (`dp[i][j] = dp[i][j - 1] + 1`).

So when `word1[i - 1] != word2[j - 1]`, `dp[i][j]` will just be the minimum of the above three cases.


Time Complexity: $O(mn)$, Space Complexity: $O(mn)$

```
    h o r s e
  0 1 2 3 4 5
r 1 1 2 2 3 4
o 2 2 1 2 3 4
s 3 3 2 2 2 3

if equal: 
	dp[i][j] = dp[i - 1][j - 1]
else:
	replace: dp[i][j] = dp[i - 1][j - 1] + 1
	delete:  dp[i][j] = dp[i - 1][j] + 1
	insert:  dp[i][j] = dp[i][j - 1] + 1
```

`replace: dp[i][j] = dp[i - 1][j - 1] + 1` 比較不直觀，首先，`dp[i][j]` 代表 minimum number of operations to convert `word1[0..i)` to `word2[0..j)`，而要 replace，就是先 delete 再 insert。

```cpp
class Solution {
public:
    int minDistance(string word1, string word2) {
        int m = word1.size(), n = word2.size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        for (int i = 1; i <= m; i++) {
            dp[i][0] = i;
        }
        for (int j = 1; j <= n; j++) {
            dp[0][j] = j;
        }
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1[i - 1] == word2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = min(dp[i - 1][j - 1], min(dp[i][j - 1], dp[i - 1][j])) + 1;
                }
            }
        }
        return dp[m][n];
    }
};
```

## Source
- [Edit Distance - LeetCode](https://leetcode.com/problems/edit-distance/description/)