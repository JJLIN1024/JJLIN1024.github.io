---
title: Remove Max Number of Edges to Keep Graph Fully Traversable
date: 2024-06-30
lastmod: 2024-06-30
author:
  - Jimmy Lin
tags:
  - graph
  - union_and_find
draft: false
---

## Description

Alice and Bob have an undirected graph of `n` nodes and three types of edges:

*   Type 1: Can be traversed by Alice only.
*   Type 2: Can be traversed by Bob only.
*   Type 3: Can be traversed by both Alice and Bob.

Given an array `edges` where `edges[i] = [typei, ui, vi]` represents a bidirectional edge of type `typei` between nodes `ui` and `vi`, find the maximum number of edges you can remove so that after removing the edges, the graph can still be fully traversed by both Alice and Bob. The graph is fully traversed by Alice and Bob if starting from any node, they can reach all other nodes.

Return _the maximum number of edges you can remove, or return_ `-1` _if Alice and Bob cannot fully traverse the graph._

**Example 1:**

**![](https://assets.leetcode.com/uploads/2020/08/19/ex1.png)**

**Input:** n = 4, edges = \[\[3,1,2\],\[3,2,3\],\[1,1,3\],\[1,2,4\],\[1,1,2\],\[2,3,4\]\]
**Output:** 2
**Explanation:** If we remove the 2 edges \[1,1,2\] and \[1,1,3\]. The graph will still be fully traversable by Alice and Bob. Removing any additional edge will not make it so. So the maximum number of edges we can remove is 2.

**Example 2:**

**![](https://assets.leetcode.com/uploads/2020/08/19/ex2.png)**

**Input:** n = 4, edges = \[\[3,1,2\],\[3,2,3\],\[1,1,4\],\[2,1,4\]\]
**Output:** 0
**Explanation:** Notice that removing any edge will not make the graph fully traversable by Alice and Bob.

**Example 3:**

**![](https://assets.leetcode.com/uploads/2020/08/19/ex3.png)**

**Input:** n = 4, edges = \[\[3,2,3\],\[1,1,2\],\[2,3,4\]\]
**Output:** -1
**Explanation:** In the current graph, Alice cannot reach node 4 from the other nodes. Likewise, Bob cannot reach 1. Therefore it's impossible to make the graph fully traversable.

**Constraints:**

*   `1 <= n <= 105`
*   `1 <= edges.length <= min(105, 3 * n * (n - 1) / 2)`
*   `edges[i].length == 3`
*   `1 <= typei <= 3`
*   `1 <= ui < vi <= n`
*   All tuples `(typei, ui, vi)` are distinct.

## Code 

Time Complexity: $O(E)$, Space Complexity: $O(V)$

```cpp
class UnionFind {
    vector<int> parent;
    vector<int> size;
    int components;
public:
    UnionFind(int n): parent(n + 1), size(n + 1, 1), components(n) {
        iota(parent.begin(), parent.end(), 0);
    }

    int Find(int x) {
        if(x == parent[x])
            return x;
        return parent[x] = Find(parent[x]);
    }

    bool Union(int x, int y) {
        x = Find(x), y = Find(y);
        if(x == y) 
            return 0;
        if(size[x] > size[y]) {
            parent[y] = x;
            size[x] += size[y];
        } else {
            parent[x] = y;
            size[y] += size[x];
        }

        components--;
        return 1;
    }

    bool isConnected() {
        return components == 1;
    }
};
class Solution {
public:
    int maxNumEdgesToRemove(int n, vector<vector<int>>& edges) {
        UnionFind Alice(n), Bob(n);
        int edgesNeed=0;
        // Process type 3 edges first
        for (vector<int>& e: edges) {
            if (e[0]==3) {
                edgesNeed+=(Alice.Union(e[1], e[2]) | Bob.Union(e[1], e[2]));
            }
        }
        // Process type 1 and type 2 edges
        for (vector<int>& e: edges){
            if (e[0]==1) edgesNeed+=Alice.Union(e[1], e[2]);
            else if (e[0]==2) edgesNeed+=Bob.Union(e[1], e[2]);
        }

        if (Alice.isConnected() && Bob.isConnected())
            return edges.size()-edgesNeed;
        return -1;
    }
};

```

## Source
- [Remove Max Number of Edges to Keep Graph Fully Traversable - LeetCode](https://leetcode.com/problems/remove-max-number-of-edges-to-keep-graph-fully-traversable/description/?envType=daily-question&envId=2024-06-30)