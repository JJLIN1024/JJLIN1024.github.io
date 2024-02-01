---
title: H-Index
date: 2023-04-30
lastmod: 2023-12-10
author:
  - Jimmy Lin
tags:
  - sorting
draft: false
---

## Description

Given an array of integers `citations` where `citations[i]` is the number of citations a researcher received for their `ith` paper, return _the researcher's h-index_.

According to the [definition of h-index on Wikipedia](https://en.wikipedia.org/wiki/H-index): The h-index is defined as the maximum value of `h` such that the given researcher has published at least `h` papers that have each been cited at least `h` times.

**Example 1:**

**Input:** citations = \[3,0,6,1,5\]
**Output:** 3
**Explanation:** \[3,0,6,1,5\] means the researcher has 5 papers in total and each of them had received 3, 0, 6, 1, 5 citations respectively.
Since the researcher has 3 papers with at least 3 citations each and the remaining two with no more than 3 citations each, their h-index is 3.

**Example 2:**

**Input:** citations = \[1,3,1\]
**Output:** 1

**Constraints:**

*   `n == citations.length`
*   `1 <= n <= 5000`
*   `0 <= citations[i] <= 1000`

## Code 

用 counting sort 或是其他任何 non-comparison sort 來加速。

```cpp
class Solution {
public:
    int hIndex(vector<int>& citations) {
        int MAX = *max_element(citations.begin(), citations.end());
        int n = citations.size();
        vector<int> count(MAX + 1, 0);
        vector<int> sorted(n, 0); 

        for(auto c: citations) {
            count[c]++;
        }

        for(int i = 1; i < count.size(); i++) {
            count[i] += count[i - 1];
        }

        for(int i = n - 1; i >= 0; i--) {
            sorted[count[citations[i]] - 1] = citations[i];
            count[citations[i]]--;
        }
        
        for(int i = 0; i < n; i++) {
            if(sorted[i] >= n - i) return n - i;
        }

        return 0;
    }
};
```

## Source
- [H-Index - LeetCode](https://leetcode.com/problems/h-index/description/)