---
title: Find K Pairs with Smallest Sums
date: 2024-02-28
lastmod: 2024-02-28
author:
  - Jimmy Lin
tags:
  - heap
  - review
draft: false
sr-due: 2024-06-02
sr-interval: 73
sr-ease: 310
---

## Description

You are given two integer arrays `nums1` and `nums2` sorted in **non-decreasing order** and an integer `k`.

Define a pair `(u, v)` which consists of one element from the first array and one element from the second array.

Return _the_ `k` _pairs_ `(u1, v1), (u2, v2), ..., (uk, vk)` _with the smallest sums_.

**Example 1:**

**Input:** nums1 = \[1,7,11\], nums2 = \[2,4,6\], k = 3
**Output:** \[\[1,2\],\[1,4\],\[1,6\]\]
**Explanation:** The first 3 pairs are returned from the sequence: \[1,2\],\[1,4\],\[1,6\],\[7,2\],\[7,4\],\[11,2\],\[7,6\],\[11,4\],\[11,6\]

**Example 2:**

**Input:** nums1 = \[1,1,2\], nums2 = \[1,2,3\], k = 2
**Output:** \[\[1,1\],\[1,1\]\]
**Explanation:** The first 2 pairs are returned from the sequence: \[1,1\],\[1,1\],\[1,2\],\[2,1\],\[1,2\],\[2,2\],\[1,3\],\[1,3\],\[2,3\]

**Constraints:**

*   `1 <= nums1.length, nums2.length <= 105`
*   `-109 <= nums1[i], nums2[i] <= 109`
*   `nums1` and `nums2` both are sorted in **non-decreasing order**.
*   `1 <= k <= 104`
*   `k <= nums1.length * nums2.length`

## Code 

Time Complexity: $O(k \log k)$, Space Complexity: $O(k)$

類似 k-way merge 的概念。對於 `[a, b, c], [d, e, f]` 來說，先把 `[a, b, c]` 和 `[d]` 配，然後 pop 出來的 `[a, d]`，因為 `a` 固定了，所以一定必須把 `[a, e]` push 進去（下一個順位）。

```cpp
class Solution {
public:
    vector<vector<int>> kSmallestPairs(vector<int>& nums1, vector<int>& nums2, int k) {
        auto cmp = [&](const pair<int, int>& p1, const pair<int, int>& p2){
            return nums1[p1.first] + nums2[p1.second] > nums1[p2.first] + nums2[p2.second];
        };
        // min heap
        priority_queue<pair<int, int>, vector<pair<int, int>>, decltype(cmp)> pq(cmp);

        for(int i = 0; i < nums1.size(); i++) {
            pq.push({i, 0});
        }
        
        vector<vector<int>> res;
        while(k-- && !pq.empty()) {
            auto P = pq.top();
            pq.pop();
            res.push_back({nums1[P.first], nums2[P.second]});
            if(P.second == nums2.size() - 1)
                continue;
            pq.push({P.first, P.second + 1});
        }
        return res;
    }
};
```

## Source
- [Find K Pairs with Smallest Sums - LeetCode](https://leetcode.com/problems/find-k-pairs-with-smallest-sums/description/?envType=study-plan-v2&envId=top-interview-150)