---
title: Successful Pairs of Spells and Potions
date: 2024-03-14
lastmod: 2024-03-14
author:
  - Jimmy Lin
tags:
  - binary_search
draft: false
---

## Description

You are given two positive integer arrays `spells` and `potions`, of length `n` and `m` respectively, where `spells[i]` represents the strength of the `ith` spell and `potions[j]` represents the strength of the `jth` potion.

You are also given an integer `success`. A spell and potion pair is considered **successful** if the **product** of their strengths is **at least** `success`.

Return _an integer array_ `pairs` _of length_ `n` _where_ `pairs[i]` _is the number of **potions** that will form a successful pair with the_ `ith` _spell._

**Example 1:**

**Input:** spells = \[5,1,3\], potions = \[1,2,3,4,5\], success = 7
**Output:** \[4,0,3\]
**Explanation:**
- 0th spell: 5 \* \[1,2,3,4,5\] = \[5,**10**,**15**,**20**,**25**\]. 4 pairs are successful.
- 1st spell: 1 \* \[1,2,3,4,5\] = \[1,2,3,4,5\]. 0 pairs are successful.
- 2nd spell: 3 \* \[1,2,3,4,5\] = \[3,6,**9**,**12**,**15**\]. 3 pairs are successful.
Thus, \[4,0,3\] is returned.

**Example 2:**

**Input:** spells = \[3,1,2\], potions = \[8,5,8\], success = 16
**Output:** \[2,0,2\]
**Explanation:**
- 0th spell: 3 \* \[8,5,8\] = \[**24**,15,**24**\]. 2 pairs are successful.
- 1st spell: 1 \* \[8,5,8\] = \[8,5,8\]. 0 pairs are successful. 
- 2nd spell: 2 \* \[8,5,8\] = \[**16**,10,**16**\]. 2 pairs are successful. 
Thus, \[2,0,2\] is returned.

**Constraints:**

*   `n == spells.length`
*   `m == potions.length`
*   `1 <= n, m <= 105`
*   `1 <= spells[i], potions[i] <= 105`
*   `1 <= success <= 1010`

## Code 

Time Complexity: $O(m \log m + n \log m)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    vector<int> successfulPairs(vector<int>& spells, vector<int>& potions, long long success) {
        sort(potions.begin(), potions.end());

        vector<int> res;
        for(auto spell: spells) {
            double v = (double)success / spell;
            res.push_back(potions.end() - lower_bound(potions.begin(), potions.end(), v));
        }
        return res;
    }
};
```

觀察 ` double v = (double)success / spell;` ，其實可以用 `long need = (success + spell - 1) / spell;` 取代，就是在做無條件進位，就是我們要的，使用這個技巧（[[Koko Eating Bananas]] 有用過）就可以避免浮點數的運算。

```cpp
class Solution {
public:
    vector<int> successfulPairs(vector<int>& spells, vector<int>& potions, long long success) {
        sort(potions.begin(), potions.end());

        vector<int> res;
        for(auto spell: spells) {
            long need = (success + spell - 1) / spell;
            res.push_back(potions.end() - lower_bound(potions.begin(), potions.end(), need));
        }
        return res;
    }
};
```
## Source
- [Successful Pairs of Spells and Potions - LeetCode](https://leetcode.com/problems/successful-pairs-of-spells-and-potions/description/?envType=study-plan-v2&envId=binary-search)