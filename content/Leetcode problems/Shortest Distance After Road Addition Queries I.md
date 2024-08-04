---
title: Shortest Distance After Road Addition Queries I
date: 2024-08-04
lastmod: 2024-08-04
author:
  - Jimmy Lin
tags:
  - shortest_path
  - disjoint_set
  - bellman_ford
  - Dijkstra
draft: false
---

## Description

You are given an integer `n` and a 2D integer array `queries`.

There are `n` cities numbered from `0` to `n - 1`. Initially, there is a **unidirectional** road from city `i` to city `i + 1` for all `0 <= i < n - 1`.

`queries[i] = [ui, vi]` represents the addition of a new **unidirectional** road from city `ui` to city `vi`. After each query, you need to find the **length** of the **shortest path** from city `0` to city `n - 1`.

Return an array `answer` where for each `i` in the range `[0, queries.length - 1]`, `answer[i]` is the _length of the shortest path_ from city `0` to city `n - 1` after processing the **first** `i + 1` queries.

**Example 1:**

**Input:** n = 5, queries = \[\[2,4\],\[0,2\],\[0,4\]\]

**Output:** \[3,2,1\]

**Explanation:**

![](https://assets.leetcode.com/uploads/2024/06/28/image8.jpg)

After the addition of the road from 2 to 4, the length of the shortest path from 0 to 4 is 3.

![](https://assets.leetcode.com/uploads/2024/06/28/image9.jpg)

After the addition of the road from 0 to 2, the length of the shortest path from 0 to 4 is 2.

![](https://assets.leetcode.com/uploads/2024/06/28/image10.jpg)

After the addition of the road from 0 to 4, the length of the shortest path from 0 to 4 is 1.

**Example 2:**

**Input:** n = 4, queries = \[\[0,3\],\[0,2\]\]

**Output:** \[1,1\]

**Explanation:**

![](https://assets.leetcode.com/uploads/2024/06/28/image11.jpg)

After the addition of the road from 0 to 3, the length of the shortest path from 0 to 3 is 1.

![](https://assets.leetcode.com/uploads/2024/06/28/image12.jpg)

After the addition of the road from 0 to 2, the length of the shortest path remains 1.

**Constraints:**

*   `3 <= n <= 500`
*   `1 <= queries.length <= 500`
*   `queries[i].length == 2`
*   `0 <= queries[i][0] < queries[i][1] < n`
*   `1 < queries[i][1] - queries[i][0]`
*   There are no repeated roads among the queries.

## Code 

類似 [[Shortest Distance After Road Addition Queries II]] ，但是只能用 shortest path 來解。

Time Complexity: $O(q * n \log n)$, Space Complexity: $O(V + E)$

### Bellman-Ford

```cpp
class Solution {
public:
    vector<int> shortestDistanceAfterQueries(int n, vector<vector<int>>& queries) {
        vector<int> dp(n, n + 2);
        vector<vector<int>> edges;
        vector<int> res;
        for(int i = 0; i < n; i++) {
            dp[i] = i;
            if(i < n - 1)
                edges.push_back({i, i + 1});
        }

        for(auto query: queries) {
            edges.push_back(query);

            for(int i = 0; i < n; i++) {
                for(auto edge: edges) {
                    int u = edge[0];
                    int v = edge[1];
                    if(dp[v] > dp[u] + 1)
                        dp[v] = dp[u] + 1;
                }
            }
            res.push_back(dp[n - 1]);
        }

        return res;
    }
};
```


## Dijkstra

```cpp
if(d > dp[i])
	continue;
```

就不用擔心 priority queue 只進不出的問題。


```cpp
class Solution {
public:
    vector<int> shortestDistanceAfterQueries(int n, vector<vector<int>>& queries) {
        vector<int> res;
        vector<vector<int>> adj(n);
        for(int i = 0; i < n; i++) {
            adj[i].push_back(i + 1);
        }

        for(auto q: queries) {
            int u = q[0];
            int v = q[1];
            adj[u].push_back(v);
            res.push_back(Dijkstra(adj, 0, n - 1));
        }
        return res;
    }

    int Dijkstra(vector<vector<int>>& adj, int source, int sink) {
        int n = adj.size();
        vector<int> dp(n, INT_MAX);
        dp[source] = 0;

        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
        pq.push({0, source});

        while(!pq.empty()) {
            auto node = pq.top(); pq.pop();
            int d = node.first;
            int i = node.second;
            if(i == n - 1)
                return dp[n - 1];
            if(d > dp[i])
                continue;
            for(auto neighbor: adj[i]) {
                if(dp[neighbor] > dp[i] + 1) {
                    dp[neighbor] = dp[i] + 1;
                    pq.push({dp[neighbor], neighbor});
                }   
            }
        }
        return dp[n-1];
    }
};
```

## Source
- [Shortest Distance After Road Addition Queries I - LeetCode](https://leetcode.com/problems/shortest-distance-after-road-addition-queries-i/description/)