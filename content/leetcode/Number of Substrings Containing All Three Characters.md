---
title: Number of Substrings Containing All Three Characters
date: 2023-10-23
lastmod: 2023-10-23
author:
  - Jimmy Lin
tags:
  - sliding_window
  - two_pointer
draft: false
---

## Description

Given a string `s` consisting only of characters _a_, _b_ and _c_.

Return the number of substrings containing **at least** one occurrence of all these characters _a_, _b_ and _c_.

**Example 1:**

**Input:** s = "abcabc"
**Output:** 10
**Explanation:** The substrings containing at least one occurrence of the characters _a_, _b_ and _c are "_abc_", "_abca_", "_abcab_", "_abcabc_", "_bca_", "_bcab_", "_bcabc_", "_cab_", "_cabc_"_ and _"_abc_"_ (**again**)_._ 

**Example 2:**

**Input:** s = "aaacb"
**Output:** 3
**Explanation:** The substrings containing at least one occurrence of the characters _a_, _b_ and _c are "_aaacb_", "_aacb_"_ and _"_acb_"._ 

**Example 3:**

**Input:** s = "abc"
**Output:** 1

**Constraints:**

*   `3 <= s.length <= 5 x 10^4`
*   `s` only consists of _a_, _b_ or _c_ characters.

## Code 

### Two Pointer - 1
Time Complexity: $O(n)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    int numberOfSubstrings(string s) {
        int count[3] = {0, 0, 0};
        int i = 0, res = 0;

        for(int j = 0; j < s.length(); j++) {
            ++count[s[j] - 'a'];
            while(count[0] && count[1] && count[2]) {
                --count[s[i++] - 'a'];
            }
            res += i;
        }

        return res;
    }
};
```

### Two Pointer - 2
Time Complexity: $O(n)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    int numberOfSubstrings(string s) {
        int r = 0;
        int count1 = 0, count2 = 0, count3 = 0;
        int res = 0;
        for(int l = 0; l < s.size(); l++) {
            while (r < s.size() && (count1 * count2 * count3 == 0)){
                if(s[r] == 'a') count1++;
                else if (s[r] == 'b') count2++;
                else if (s[r] == 'c') count3++;
                r++;
            }
  
            if(count1 * count2 * count3 > 0) {
                res += s.size() - r + 1;
            }

            if(s[l] == 'a') count1--;
            else if (s[l] == 'b') count2--;
            else if (s[l] == 'c') count3--;
        }

        return res;
    }
};
```
## Source
- [Number of Substrings Containing All Three Characters - LeetCode](https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/)