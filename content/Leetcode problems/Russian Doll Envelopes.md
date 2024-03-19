---
title: Russian Doll Envelopes
date: 2024-03-14
lastmod: 2024-03-14
author:
  - Jimmy Lin
tags:
  - binary_search
  - review
  - greedy
draft: false
sr-due: 2024-03-26
sr-interval: 9
sr-ease: 254
---

## Description

You are given a 2D array of integers `envelopes` where `envelopes[i] = [wi, hi]` represents the width and the height of an envelope.

One envelope can fit into another if and only if both the width and height of one envelope are greater than the other envelope's width and height.

Return _the maximum number of envelopes you can Russian doll (i.e., put one inside the other)_.

**Note:** You cannot rotate an envelope.

**Example 1:**

**Input:** envelopes = \[\[5,4\],\[6,4\],\[6,7\],\[2,3\]\]
**Output:** 3
**Explanation:** The maximum number of envelopes you can Russian doll is `3` (\[2,3\] => \[5,4\] => \[6,7\]).

**Example 2:**

**Input:** envelopes = \[\[1,1\],\[1,1\],\[1,1\]\]
**Output:** 1

**Constraints:**

*   `1 <= envelopes.length <= 105`
*   `envelopes[i].length == 2`
*   `1 <= wi, hi <= 105`

## Code 

[[Longest Increasing Subsequence]] 的 2D 版本。不過這題巧妙的運用了 sorting 將 width sort in increasing order while height is sort in decreasing order ，使得 2D 變成了 1D 的題目。

以 `[2, 3], [5, 4], [6, 7], [6, 5], [6, 4]` 為例：`[2, 3], [5, 4], [6, 5]` 會是答案。不過在計算過程中 `[6, 4]` 會取代 `[5, 4]` ，不過這不影響最終答案。

Time Complexity: $O(n \log n)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    int maxEnvelopes(vector<vector<int>>& envelopes) {
        sort(envelopes.begin(), envelopes.end(), [](const vector<int>& v1, const vector<int>& v2){
            if(v1[0] == v2[0])
                return v1[1] > v2[1];
            return v1[0] < v2[0];
        });

        vector<int> russian_doll;
        for(auto& envelope: envelopes) {
            int w = envelope[0], h = envelope[1];
            auto iter = lower_bound(russian_doll.begin(), russian_doll.end(), h);
            if(iter == russian_doll.end())
                russian_doll.push_back(h);
            else
                *iter = h;
        }
        return russian_doll.size();
    }
};
```

## Source
- [Russian Doll Envelopes - LeetCode](https://leetcode.com/problems/russian-doll-envelopes/description/?envType=study-plan-v2&envId=binary-search)