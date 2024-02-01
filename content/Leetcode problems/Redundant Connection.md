---
title: Redundant Connection
date: 2023-04-01
lastmod: 2023-04-01
author:
  - Jimmy Lin
tags:
  - union_and_find
  - disjoint_set
draft: false
---

## Description

In this problem, a tree is an **undirected graph** that is connected and has no cycles.

You are given a graph that started as a tree with `n` nodes labeled from `1` to `n`, with one additional edge added. The added edge has two **different** vertices chosen from `1` to `n`, and was not an edge that already existed. The graph is represented as an array `edges` of length `n` where `edges[i] = [ai, bi]` indicates that there is an edge between nodes `ai` and `bi` in the graph.

Return _an edge that can be removed so that the resulting graph is a tree of_ `n` _nodes_. If there are multiple answers, return the answer that occurs last in the input.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/05/02/reduntant1-1-graph.jpg)

**Input:** edges = \[\[1,2\],\[1,3\],\[2,3\]\]
**Output:** \[2,3\]

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/05/02/reduntant1-2-graph.jpg)

**Input:** edges = \[\[1,2\],\[2,3\],\[3,4\],\[1,4\],\[1,5\]\]
**Output:** \[1,4\]

**Constraints:**

*   `n == edges.length`
*   `3 <= n <= 1000`
*   `edges[i].length == 2`
*   `1 <= ai < bi <= edges.length`
*   `ai != bi`
*   There are no repeated edges.
*   The given graph is connected.

## Code 

標準 disjoint set 可以解的題目。

```cpp
class Solution {
public:
    vector<int> findRedundantConnection(vector<vector<int>>& edges) {
        int n = edges.size();
        vector<int> parent(n+1, 0);
        vector<int> size(n+1, 1);
        for(int i = 0; i < n; i++) {
            parent[i] = i;
        }
        
        for(auto& edge: edges) {
            int p1 = find(edge[0], parent);
            int p2 = find(edge[1], parent);
            if(p1 != p2) {
                if(size[p1] < size[p2]) {
                    parent[p1] = p2;
                    size[p2] += size[p1];
                } else {
                    parent[p2] = p1;
                    size[p1] += size[p2];
                }
            } else {
                return {edge[0], edge[1]};
            }
        }

        return {};
    }


    // path compression
    int find(int idx, vector<int>& parent) {
        return parent[idx] = parent[idx] == idx ? idx : find(parent[idx], parent);
    }
};
```

## Source
- [Redundant Connection - LeetCode](https://leetcode.com/problems/redundant-connection/description/)