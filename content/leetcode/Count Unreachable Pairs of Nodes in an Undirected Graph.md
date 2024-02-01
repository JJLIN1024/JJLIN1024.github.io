---
title: Count Unreachable Pairs of Nodes in an Undirected Graph
date: 2022-12-31
lastmod: 2022-12-31
author: Jimmy Lin
tags: ["DFS", "Disjoint Set", "Union and Find"]
draft: false
---

## Code

注意 `sizeMap[p] = max(sizeMap[p], size[i]);`，因為經過 union and find 後，同一個 connected component 中的 element 其 parent 都一樣，但是 size 會不一樣，因此要取 max。

```cpp
class Solution {
public:
    long long countPairs(int n, vector<vector<int>>& edges) {
        typedef long long ll;
        ll pairs = (ll)n * (ll)(n - 1) / 2;
        
        vector<int> parent(n);
        vector<int> size(n);
        for(int i = 0; i < n; i++) {
            parent[i] = i;
            size[i] = 1;
        }

        for(int i = 0; i < edges.size(); i++) {
            int p1 = findParent(parent, edges[i][0]);
            int p2 = findParent(parent, edges[i][1]);
            if(p1 != p2) {
                if(size[p1] < size[p2]) {
                    size[p2] += size[p1];
                    parent[p1] = p2;
                } else {
                    size[p1] += size[p2];
                    parent[p2] = p1;
                }    
            }
        }

        unordered_map<int, int> sizeMap;
        for(int i = 0; i < n; i++) {
            int p = findParent(parent, i);
            sizeMap[p] = max(sizeMap[p], size[i]);
        }

        for (auto& it: sizeMap) {
            pairs -= (ll) it.second * (ll) (it.second - 1) / 2;
        }

        return pairs;
    }

    int findParent(vector<int> &parent, int node) {
        if(parent[node] == node) return node;
        return parent[node] = findParent(parent, parent[node]);
    }
};
```

## Link
- [Count Unreachable Pairs of Nodes in an Undirected Graph](https://leetcode.com/problems/count-unreachable-pairs-of-nodes-in-an-undirected-graph/description/)
