---
title: Decode Ways
date: 2022-12-23
lastmod: 2022-12-23
author:
  - Jimmy Lin
tags:
  - DP
draft: false
---

## Code

### Recursion with memoization

Time Complexity: $O(n)$, Space Complexity: $O(n)$

```cpp
class Solution {
    int n;
public:
    int numDecodings(string s) {
        n = s.size();
        int memo[n];
        memset(memo, -1, sizeof(memo));
        return s.size() == 0 ? 0 : numDecodingsHelper(0, s, memo);
        
    }

    int numDecodingsHelper(int p, string& s, int memo[]) {  
        if(p == n) return 1;
        if(s[p] == '0') return 0;
        if(memo[p] != -1) return memo[p];

        int res = numDecodingsHelper(p + 1, s, memo);
        if(p + 1 < n && (s[p] == '1' || (s[p] == '2' && s[p + 1] <= '6')))
            res += numDecodingsHelper(p + 2, s, memo);
        
        return memo[p] = res;
    }   
};
```

### Bottom up DP
Time Complexity: $O(n)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    int numDecodings(string s) {
        int n = s.size();
        vector<int> table(n+1, 0);
        table[n] = 1;
        for(int i = n - 1; i >= 0; i--) {
            if (s[i] == '0') {
                table[i] = 0;
            } else {
                table[i] += table[i + 1];
                if ((i < n - 1) && ((s[i] == '1') || ((s[i] == '2') && (s[i+1] <= '6')))) {
                    table[i] += table[i+2];
                }
            }
        }
        return s.empty() ? 0 : table[0];
    }
};
```

### Buttom up DP with constant space

Time Complexity: $O(n)$, Space Complexity: $O(1)$

可以觀察到 `table[i]` 只和 `table[i+1]` and `table[i+2]` 有關係。

```cpp
class Solution {
public:
    int numDecodings(string s) {
        int n = s.size();
        int n1 = 1;
        int n2 = 0;
        int ways = 0;
        for(int i = n - 1; i >= 0; i--) {
            if (s[i] == '0') {
                ways = 0;
            } else {
                ways += n1;
                if ((i < n - 1) && ((s[i] == '1') || ((s[i] == '2') && (s[i+1] <= '6')))) {
                    ways += n2;
                }
            }
            n2 = n1;
            n1 = ways;
            if (i != 0 ) ways = 0;
        }
        return s.empty() ? 0 : ways;
    }
};
```

```cpp
class Solution {
public:
    int numDecodings(string s) {
        int n = s.size();
        int n1 = 1;
        int n2 = 0;
        int ways;
        for(int i = n - 1; i >= 0; i--) {
            ways = 0;
            if (s[i] == '0') {
                ways = 0;
            } else {
                ways += n1;
                if ((i < n - 1) && ((s[i] == '1') || ((s[i] == '2') && (s[i+1] <= '6')))) {
                    ways += n2;
                }
            }
            n2 = n1;
            n1 = ways;
        }
        return s.empty() ? 0 : ways;
    }
};
```

## Link
- [Decode Ways](https://leetcode.com/problems/decode-ways/)
- [Evolve from recursion to dp](https://leetcode.com/problems/decode-ways/solutions/30451/evolve-from-recursion-to-dp/?orderBy=most_votes)
