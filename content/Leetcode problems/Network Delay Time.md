---
title: Network Delay Time
date: 2023-04-24
lastmod: 2023-04-24
author: Jimmy Lin
tags: ["shortest path", "Dijkstra", "Bellman Ford"]
draft: false
---

## Description

You are given a network of `n` nodes, labeled from `1` to `n`. You are also given `times`, a list of travel times as directed edges `times[i] = (ui, vi, wi)`, where `ui` is the source node, `vi` is the target node, and `wi` is the time it takes for a signal to travel from source to target.

We will send a signal from a given node `k`. Return _the **minimum** time it takes for all the_ `n` _nodes to receive the signal_. If it is impossible for all the `n` nodes to receive the signal, return `-1`.

**Example 1:**

![](https://assets.leetcode.com/uploads/2019/05/23/931_example_1.png)

**Input:** times = \[\[2,1,1\],\[2,3,1\],\[3,4,1\]\], n = 4, k = 2
**Output:** 2

**Example 2:**

**Input:** times = \[\[1,2,1\]\], n = 2, k = 1
**Output:** 1

**Example 3:**

**Input:** times = \[\[1,2,1\]\], n = 2, k = 2
**Output:** -1

**Constraints:**

*   `1 <= k <= n <= 100`
*   `1 <= times.length <= 6000`
*   `times[i].length == 3`
*   `1 <= ui, vi <= n`
*   `ui != vi`
*   `0 <= wi <= 100`
*   All the pairs `(ui, vi)` are **unique**. (i.e., no multiple edges.)

## Code 

same as [[Cheapest Flights Within K Stops]], 都是 shortest path 的題目。

### Dijkstra
```cpp
typedef pair<int, int> pa;
class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {
        vector<vector<pair<int, int>>> adj(n + 1); 
        priority_queue<pa, vector<pa>, greater<pa>> pq;
        for(auto time: times) {
            adj[time[0]].push_back({time[1], time[2]});
        }
        vector<int> dist(n + 1, INT_MAX);
        dist[k] = 0;
        pq.push({0, k});
        while(!pq.empty()) {
            auto [cost, u] = pq.top(); pq.pop();
            for(auto [v, w]: adj[u]) {
                if(dist[v] > dist[u] + w) {
                    dist[v] = dist[u] + w;
                    pq.push({dist[v], v});
                }
            }
        }   

        int ans = *max_element(dist.begin() + 1, dist.end());
        return ans == INT_MAX ? -1 : ans;
    }
};
```

### Bellman Ford
```cpp
class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {
        vector<int> dp(n + 1, INT_MAX);
        dp[k] = 0;
        for(int i = 0; i < n; i++) {
            vector<int> temp(dp);
            for(auto time: times) {
                if(dp[time[0]] != INT_MAX)
                    temp[time[1]] = min(temp[time[1]], dp[time[0]] + time[2]);
            }
            dp = temp;
        }

        int ans = *max_element(dp.begin() + 1, dp.end());
        return ans == INT_MAX ? -1 : ans;

    }
};
```



## Source
- [Network Delay Time - LeetCode](https://leetcode.com/problems/network-delay-time/)