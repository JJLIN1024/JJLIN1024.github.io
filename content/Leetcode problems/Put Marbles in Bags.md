---
title: Put Marbles in Bags
date: 2023-07-20
lastmod: 2023-07-20
author: Jimmy Lin
tags: [""]
draft: false
---

## Description

You have `k` bags. You are given a **0-indexed** integer array `weights` where `weights[i]` is the weight of the `ith` marble. You are also given the integer `k.`

Divide the marbles into the `k` bags according to the following rules:

*   No bag is empty.
*   If the `ith` marble and `jth` marble are in a bag, then all marbles with an index between the `ith` and `jth` indices should also be in that same bag.
*   If a bag consists of all the marbles with an index from `i` to `j` inclusively, then the cost of the bag is `weights[i] + weights[j]`.

The **score** after distributing the marbles is the sum of the costs of all the `k` bags.

Return _the **difference** between the **maximum** and **minimum** scores among marble distributions_.

**Example 1:**

**Input:** weights = \[1,3,5,1\], k = 2
**Output:** 4
**Explanation:** 
The distribution \[1\],\[3,5,1\] results in the minimal score of (1+1) + (3+1) = 6. 
The distribution \[1,3\],\[5,1\], results in the maximal score of (1+3) + (5+1) = 10. 
Thus, we return their difference 10 - 6 = 4.

**Example 2:**

**Input:** weights = \[1, 3\], k = 2
**Output:** 0
**Explanation:** The only distribution possible is \[1\],\[3\]. 
Since both the maximal and minimal score are the same, we return 0.

**Constraints:**

*   `1 <= k <= weights.length <= 105`
*   `1 <= weights[i] <= 109`

## Code 

Time Complexity: $O(n \log n)$, Space Complexity: $O(n)$

KEY: Compare to putting all marbles into one bag, when we put a bar after `i-th` marble, the score of such distribution would increase by `weights[i]+weights[i+1]`

Take `weights = [1,3,5,1], k = 2` as a example, when all marbles are in one bag, `max score = min score = 1 + 3 + 5 + 1 = 10`.

不管我們怎麼樣分袋，頭和尾的 marble 的 weight 一定都會被計算到，因此我們只需要考慮中間的 marble 對於 score 的影響。

When we put marbles into two bags, say `[1, 3], [5, 1]`, i.e., put a bar after the `2-th` marble, then the score is `1 + 3` & `5 + 1`，扣掉頭尾， score 增加了 `3 & 5`，也就是增加了 `weights[1]+weights[2]`。

因此 `max score, min score` 的差就會是這些 bar 所造成的增加量的差異。

```cpp
class Solution {
public:
    long long putMarbles(vector<int>& weights, int k) {
        int n = weights.size();
        if (k == 1 || n == k) return 0;
        vector<int> candidates;
        for (int i = 0; i < n-1; i++)
        {
            candidates.push_back(weights[i] + weights[i+1]);
        }
        sort(candidates.begin(), candidates.end());
        long long mins = 0, maxs = 0;
        for (int i = 0; i < k-1; i++)
        {
            mins += candidates[i];
            maxs += candidates[n-2-i];
        }
        return maxs - mins;
    }
};
```

## Source
- [Put Marbles in Bags - LeetCode](https://leetcode.com/problems/put-marbles-in-bags/description/)