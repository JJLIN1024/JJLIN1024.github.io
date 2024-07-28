---
title: Second Minimum Time to Reach Destination
date: 2024-07-28
lastmod: 2024-07-28
author:
  - Jimmy Lin
tags:
  - BFS
  - graph
  - shortest_path
draft: false
---

## Description

A city is represented as a **bi-directional connected** graph with `n` vertices where each vertex is labeled from `1` to `n` (**inclusive**). The edges in the graph are represented as a 2D integer array `edges`, where each `edges[i] = [ui, vi]` denotes a bi-directional edge between vertex `ui` and vertex `vi`. Every vertex pair is connected by **at most one** edge, and no vertex has an edge to itself. The time taken to traverse any edge is `time` minutes.

Each vertex has a traffic signal which changes its color from **green** to **red** and vice versa every `change` minutes. All signals change **at the same time**. You can enter a vertex at **any time**, but can leave a vertex **only when the signal is green**. You **cannot wait** at a vertex if the signal is **green**.

The **second minimum value** is defined as the smallest value **strictly larger** than the minimum value.

*   For example the second minimum value of `[2, 3, 4]` is `3`, and the second minimum value of `[2, 2, 4]` is `4`.

Given `n`, `edges`, `time`, and `change`, return _the **second minimum time** it will take to go from vertex_ `1` _to vertex_ `n`.

**Notes:**

*   You can go through any vertex **any** number of times, **including** `1` and `n`.
*   You can assume that when the journey **starts**, all signals have just turned **green**.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/09/29/e1.png)        ![](https://assets.leetcode.com/uploads/2021/09/29/e2.png)

**Input:** n = 5, edges = \[\[1,2\],\[1,3\],\[1,4\],\[3,4\],\[4,5\]\], time = 3, change = 5
**Output:** 13
**Explanation:**
The figure on the left shows the given graph.
The blue path in the figure on the right is the minimum time path.
The time taken is:
- Start at 1, time elapsed=0
- 1 -> 4: 3 minutes, time elapsed=3
- 4 -> 5: 3 minutes, time elapsed=6
Hence the minimum time needed is 6 minutes.

The red path shows the path to get the second minimum time.
- Start at 1, time elapsed=0
- 1 -> 3: 3 minutes, time elapsed=3
- 3 -> 4: 3 minutes, time elapsed=6
- Wait at 4 for 4 minutes, time elapsed=10
- 4 -> 5: 3 minutes, time elapsed=13
Hence the second minimum time is 13 minutes.      

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/09/29/eg2.png)

**Input:** n = 2, edges = \[\[1,2\]\], time = 3, change = 2
**Output:** 11
**Explanation:**
The minimum time path is 1 -> 2 with time = 3 minutes.
The second minimum time path is 1 -> 2 -> 1 -> 2 with time = 11 minutes.

**Constraints:**

*   `2 <= n <= 104`
*   `n - 1 <= edges.length <= min(2 * 104, n * (n - 1) / 2)`
*   `edges[i].length == 2`
*   `1 <= ui, vi <= n`
*   `ui != vi`
*   There are no duplicate edges.
*   Each vertex can be reached directly or indirectly from every other vertex.
*   `1 <= time, change <= 103`

## Code 

首先，edge 都一樣長 -> BFS。
第二，shortest path 和 second shortest path 的關係是什麼？假設 shortest path 總共用了 L 個 edge，則必定會有 L + 2 個 edge 的 shortest path（因為 bidirectional edge），因此只需要檢查是否存在 L + 1 個 edge 的 shortest path。

Time Complexity: $O(V + E)$, Space Complexity: $O(V + E)$

```cpp
class Solution {
public:
    int secondMinimum(int n, vector<vector<int>>& edges, int time, int change) {
        // build adj
        vector<vector<int>> adj(n);
        for(auto e: edges) {
            adj[e[0] - 1].push_back(e[1] - 1);
            adj[e[1] - 1].push_back(e[0] - 1);
        }
        queue<int> q;
        // bfs from target
        q.push(n - 1);
        vector<int> dis(n, INT_MAX);
        dis[n - 1] = 0;
        while(!q.empty()) {
            auto n = q.front(); q.pop();
            for(auto nei: adj[n]) {
                if(dis[nei] == INT_MAX) {
                    dis[nei] = dis[n] + 1;
                    q.push(nei);
                }
            }
        }

        // check L + 1 path
        int len = dis[0] + 2;
        q.push(0);
        bool done = false;
        while(!q.empty()) {
            auto n = q.front(); q.pop();
            for(auto nei: adj[n]) {
                if(dis[nei] == dis[n]) {
                    len--;
                    done = true;
                    break;
                } else {
                    if(dis[nei] == dis[n] - 1) {
                        q.push(nei);
                    }
                }
            }
            if(done) 
                break;
        }

        // now we have shortest path len(number of edges) from 0 to n - 1
        int currTime = 0;
        for(int i = 0; i < len; i++) {
            if((currTime / change) % 2 == 1) {
                currTime += (change - (currTime % change));
            }
            currTime += time;
        }
        return currTime;
    }
};

/*
0 1 2 3 4 5 6 7 8 9 10 11
G.  R.  G   R.  G.   R
      2.    1.          2
if red, cur_time += change
*/
```

## Source
- [Second Minimum Time to Reach Destination - LeetCode](https://leetcode.com/problems/second-minimum-time-to-reach-destination/description/?envType=daily-question&envId=2024-07-28)