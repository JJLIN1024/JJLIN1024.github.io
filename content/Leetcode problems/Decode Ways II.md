---
title: Decode Ways II
date: 2023-09-10
lastmod: 2023-09-10
author: Jimmy Lin
tags: ["dynamic programming"]
draft: false
---

## Description

A message containing letters from `A-Z` can be **encoded** into numbers using the following mapping:

'A' -> "1"
'B' -> "2"
...
'Z' -> "26"

To **decode** an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways). For example, `"11106"` can be mapped into:

*   `"AAJF"` with the grouping `(1 1 10 6)`
*   `"KJF"` with the grouping `(11 10 6)`

Note that the grouping `(1 11 06)` is invalid because `"06"` cannot be mapped into `'F'` since `"6"` is different from `"06"`.

**In addition** to the mapping above, an encoded message may contain the `'*'` character, which can represent any digit from `'1'` to `'9'` (`'0'` is excluded). For example, the encoded message `"1*"` may represent any of the encoded messages `"11"`, `"12"`, `"13"`, `"14"`, `"15"`, `"16"`, `"17"`, `"18"`, or `"19"`. Decoding `"1*"` is equivalent to decoding **any** of the encoded messages it can represent.

Given a string `s` consisting of digits and `'*'` characters, return _the **number** of ways to **decode** it_.

Since the answer may be very large, return it **modulo** `109 + 7`.

**Example 1:**

**Input:** s = "\*"
**Output:** 9
**Explanation:** The encoded message can represent any of the encoded messages "1", "2", "3", "4", "5", "6", "7", "8", or "9".
Each of these can be decoded to the strings "A", "B", "C", "D", "E", "F", "G", "H", and "I" respectively.
Hence, there are a total of 9 ways to decode "\*".

**Example 2:**

**Input:** s = "1\*"
**Output:** 18
**Explanation:** The encoded message can represent any of the encoded messages "11", "12", "13", "14", "15", "16", "17", "18", or "19".
Each of these encoded messages have 2 ways to be decoded (e.g. "11" can be decoded to "AA" or "K").
Hence, there are a total of 9 \* 2 = 18 ways to decode "1\*".

**Example 3:**

**Input:** s = "2\*"
**Output:** 15
**Explanation:** The encoded message can represent any of the encoded messages "21", "22", "23", "24", "25", "26", "27", "28", or "29".
"21", "22", "23", "24", "25", and "26" have 2 ways of being decoded, but "27", "28", and "29" only have 1 way.
Hence, there are a total of (6 \* 2) + (3 \* 1) = 12 + 3 = 15 ways to decode "2\*".

**Constraints:**

*   `1 <= s.length <= 105`
*   `s[i]` is a digit or `'*'`.

## Code 

### DP
Similar to [[Decode Ways|Decode Ways]].

Time Complexity: $O(n)$, Space Complexity: $O(n)$

```cpp
class Solution {
    int n;
    long mod = 1e9 + 7;
    unordered_map<string, int> mp = {{"*0", 2}, {"*1", 2}, {"*2", 2}, {"*3", 2}, {"*4", 2}, {"*5", 2}, {"*6", 2}, {"*7", 1}, {"*8", 1}, {"*9", 1}, {"1*", 9}, {"2*", 6}, {"**", 15}};
public:
    int numDecodings(string s) {
        n = s.size();
        long memo[n];
        memset(memo, -1, sizeof(memo));
        return s.size() == 0 ? (int) 0 : (int)(numDecodingsHelper(0, s, memo) % mod);
    }

    long numDecodingsHelper(int p, string& s, long memo[]) {  
        if(p == n) return 1;
        if(s[p] == '0') return 0;
        if(memo[p] != -1) return memo[p];

        long res = ((s[p] == '*' ? 9 : 1) * numDecodingsHelper(p + 1, s, memo)) % mod;
        if(p + 1 < n) {
            string ss = s.substr(p, 2);
            if(mp.find(ss) != mp.end()) {
                res += (mp[ss] * numDecodingsHelper(p + 2, s, memo)) % mod;
            }
            else if((s[p] == '1' || (s[p] == '2' && s[p + 1] <= '6'))) {
                res += numDecodingsHelper(p + 2, s, memo) % mod;
            }
        }
        return memo[p] = res % mod;
    }   
};
```

## Source
- [Decode Ways II - LeetCode](https://leetcode.com/problems/decode-ways-ii/)