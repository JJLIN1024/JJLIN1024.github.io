---
title: Restore The Array
date: 2023-10-04
lastmod: 2023-10-04
author:
  - Jimmy Lin
tags:
  - DP
  - dfs
draft: false
---

## Description

A program was supposed to print an array of integers. The program forgot to print whitespaces and the array is printed as a string of digits `s` and all we know is that all integers in the array were in the range `[1, k]` and there are no leading zeros in the array.

Given the string `s` and the integer `k`, return _the number of the possible arrays that can be printed as_ `s` _using the mentioned program_. Since the answer may be very large, return it **modulo** `109 + 7`.

**Example 1:**

**Input:** s = "1000", k = 10000
**Output:** 1
**Explanation:** The only possible array is \[1000\]

**Example 2:**

**Input:** s = "1000", k = 10
**Output:** 0
**Explanation:** There cannot be an array that was printed this way and has all integer >= 1 and <= 10.

**Example 3:**

**Input:** s = "1317", k = 2000
**Output:** 8
**Explanation:** Possible arrays are \[1317\],\[131,7\],\[13,17\],\[1,317\],\[13,1,7\],\[1,31,7\],\[1,3,17\],\[1,3,1,7\]

**Constraints:**

*   `1 <= s.length <= 105`
*   `s` consists of only digits and does not contain leading zeros.
*   `1 <= k <= 109`

## Code 

Time Complexity: $O(n \log k)$, Space Complexity: $O(n)$

$O(n \log k)$ ：每個 state 最多會需要 $\log_{10} k$ 個 iteration（因為 `if(num > k) break;`）。
### DFS + Memoization

```cpp
class Solution {
public:
    int numberOfArrays(string s, int k) {
        int n = s.size();
        vector<int> memo(n, -1);
        return dfs(s, 0, k, memo);
    }

    int dfs(string& s, int i, int k, vector<int>& memo) {
        if(i == s.size()) return 1;
        if(s[i] == '0') return 0;
        if(memo[i] != -1) return memo[i];

        int ans = 0;
        long num = 0;
        for(int j = i; j < s.size(); j++) {
            num = num * 10 + s[j] - '0';
            if(num > k) break;
            ans += dfs(s, j + 1, k, memo);
            ans %= 1000000007;
        }

        return memo[i] = ans;
    }
};
```

## Source
- [Restore The Array - LeetCode](https://leetcode.com/problems/restore-the-array/description/)