---
title: Number of Provinces
date: 2023-03-08
lastmod: 2023-11-04
author:
  - Jimmy Lin
tags:
  - disjoint_set
  - union_and_find
draft: false
---

## Description

There are `n` cities. Some of them are connected, while some are not. If city `a` is connected directly with city `b`, and city `b` is connected directly with city `c`, then city `a` is connected indirectly with city `c`.

A **province** is a group of directly or indirectly connected cities and no other cities outside of the group.

You are given an `n x n` matrix `isConnected` where `isConnected[i][j] = 1` if the `ith` city and the `jth` city are directly connected, and `isConnected[i][j] = 0` otherwise.

Return _the total number of **provinces**_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/12/24/graph1.jpg)

**Input:** isConnected = \[\[1,1,0\],\[1,1,0\],\[0,0,1\]\]
**Output:** 2

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/12/24/graph2.jpg)

**Input:** isConnected = \[\[1,0,0\],\[0,1,0\],\[0,0,1\]\]
**Output:** 3

**Constraints:**

*   `1 <= n <= 200`
*   `n == isConnected.length`
*   `n == isConnected[i].length`
*   `isConnected[i][j]` is `1` or `0`.
*   `isConnected[i][i] == 1`
*   `isConnected[i][j] == isConnected[j][i]`

## Code 
### Union and Find
- [Union By Rank and Path Compression in Union-Find Algorithm](https://www.geeksforgeeks.org/union-by-rank-and-path-compression-in-union-find-algorithm/)
Time Complexity: $O(n)$, Space Complexity: $O(n)$

```cpp
class Solution {
    int res;
    unordered_map<int, int> f;
public:
    int findCircleNum(vector<vector<int>>& isConnected) {
        res = isConnected.size();
        for(int i = 0; i < isConnected.size(); i++) {
            for(int j = 0; j < isConnected[i].size(); j++) {
                if(isConnected[i][j] == 1) {
                    uni(i, j);
                }
            }
        }
        return res;
    }

    int find(int x) {
        if(!f.count(x)) {
            f[x] = x;
        }
        if(f[x] != x) {
            f[x] = find(f[x]);
        }
        return f[x];
    }

    void uni(int x, int y) {
        x = find(x), y = find(y);
        if(x != y) {
            res--;
            f[x] = y;
        }
    }
};
```

## Source
- [Number of Provinces - LeetCode](https://leetcode.com/problems/number-of-provinces/description/)