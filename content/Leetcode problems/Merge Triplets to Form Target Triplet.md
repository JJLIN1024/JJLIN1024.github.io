---
title: Merge Triplets to Form Target Triplet
date: 2024-03-01
lastmod: 2024-03-01
author:
  - Jimmy Lin
tags:
  - greedy
draft: false
---

## Description

A **triplet** is an array of three integers. You are given a 2D integer array `triplets`, where `triplets[i] = [ai, bi, ci]` describes the `ith` **triplet**. You are also given an integer array `target = [x, y, z]` that describes the **triplet** you want to obtain.

To obtain `target`, you may apply the following operation on `triplets` **any number** of times (possibly **zero**):

*   Choose two indices (**0-indexed**) `i` and `j` (`i != j`) and **update** `triplets[j]` to become `[max(ai, aj), max(bi, bj), max(ci, cj)]`.
    *   For example, if `triplets[i] = [2, 5, 3]` and `triplets[j] = [1, 7, 5]`, `triplets[j]` will be updated to `[max(2, 1), max(5, 7), max(3, 5)] = [2, 7, 5]`.

Return `true` _if it is possible to obtain the_ `target` _**triplet**_ `[x, y, z]` _as an **element** of_ `triplets`_, or_ `false` _otherwise_.

**Example 1:**

**Input:** triplets = \[\[2,5,3\],\[1,8,4\],\[1,7,5\]\], target = \[2,7,5\]
**Output:** true
**Explanation:** Perform the following operations:
- Choose the first and last triplets \[\[2,5,3\],\[1,8,4\],\[1,7,5\]\]. Update the last triplet to be \[max(2,1), max(5,7), max(3,5)\] = \[2,7,5\]. triplets = \[\[2,5,3\],\[1,8,4\],\[2,7,5\]\]
The target triplet \[2,7,5\] is now an element of triplets.

**Example 2:**

**Input:** triplets = \[\[3,4,5\],\[4,5,6\]\], target = \[3,2,5\]
**Output:** false
**Explanation:** It is impossible to have \[3,2,5\] as an element because there is no 2 in any of the triplets.

**Example 3:**

**Input:** triplets = \[\[2,5,3\],\[2,3,4\],\[1,2,5\],\[5,2,3\]\], target = \[5,5,5\]
**Output:** true
**Explanation:** Perform the following operations:
- Choose the first and third triplets \[\[2,5,3\],\[2,3,4\],\[1,2,5\],\[5,2,3\]\]. Update the third triplet to be \[max(2,1), max(5,2), max(3,5)\] = \[2,5,5\]. triplets = \[\[2,5,3\],\[2,3,4\],\[2,5,5\],\[5,2,3\]\].
- Choose the third and fourth triplets \[\[2,5,3\],\[2,3,4\],\[2,5,5\],\[5,2,3\]\]. Update the fourth triplet to be \[max(2,5), max(5,2), max(5,3)\] = \[5,5,5\]. triplets = \[\[2,5,3\],\[2,3,4\],\[2,5,5\],\[5,5,5\]\].
The target triplet \[5,5,5\] is now an element of triplets.

**Constraints:**

*   `1 <= triplets.length <= 105`
*   `triplets[i].length == target.length == 3`
*   `1 <= ai, bi, ci, x, y, z <= 1000`

## Code 

重要觀察：對於任意一個 triplet，只要任何一個數字大於 target 相對應的數字，這個 triplet 就不能被使用在 max 運算式當中。因此只要對通通小於 target 的 triplet 去做 max，看最後是否相等即可。

Time Complexity: $O(n)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    bool mergeTriplets(vector<vector<int>>& triplets, vector<int>& target) {
        vector<int> candidate(3);
        for(auto t: triplets) {
            if(t[0] <= target[0] && t[1] <= target[1] && t[2] <= target[2]) {
                candidate = {max(candidate[0], t[0]), max(candidate[1], t[1]), max(candidate[2], t[2])};
            }
        }
        return candidate == target;
    }
};
```

## Source
- [Merge Triplets to Form Target Triplet - LeetCode](https://leetcode.com/problems/merge-triplets-to-form-target-triplet/description/)