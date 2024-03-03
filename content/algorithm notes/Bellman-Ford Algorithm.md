---
title: Bellman-Ford Algorithm
date: 2024-02-01
lastmod: 2024-02-01
author:
  - Jimmy Lin
tags:
  - shortest_path
  - DP
draft: false
---

- [Bellman–Ford algorithm](https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm)

![[bellman-ford-example-graph.png]]

Bellman-Ford 的關鍵在於，對於一組中間相隔最遠有 n 個 edge 的 source node & destination node 來說，最多只需要對每個 edge 都 relax n 次，就一定可以求出他們之間的 shortest path。以上圖來說，只需要對中間那四條 edge relax 4 次，就可以得出 A 到 E 的 shortest path。

也就是說，對於一個有 n 個 node 的 graph 來說，因為任意兩個 node 的最遠距離不會超過 n - 1 條 edge，因此最多只需要對每條 edge 各 relax n - 1 次就可以求出任意的 single source shortest path。

```code
function BellmanFord(list vertices, list edges, vertex source) is

    // This implementation takes in a graph, represented as
    // lists of vertices (represented as integers [0..n-1]) and edges,
    // and fills two arrays (distance and predecessor) holding
    // the shortest path from the source to each vertex

    distance := list of size n
    predecessor := list of size n

    // Step 1: initialize graph
    for each vertex v in vertices do
        // Initialize the distance to all vertices to infinity
        distance[v] := inf
        // And having a null predecessor
        predecessor[v] := null
    
    // The distance from the source to itself is, of course, zero
    distance[source] := 0

    // Step 2: relax edges repeatedly
    repeat |V|−1 times:
        for each edge (u, v) with weight w in edges do
            if distance[u] + w < distance[v] then
                distance[v] := distance[u] + w
                predecessor[v] := u

    // Step 3: check for negative-weight cycles
    for each edge (u, v) with weight w in edges do
        if distance[u] + w < distance[v] then
            predecessor[v] := u
            // A negative cycle exists; find a vertex on the cycle 
            visited := list of size n initialized with false
            visited[v] := true
            while not visited[u] do
                visited[u] := true
                u := predecessor[u]
            // u is a vertex in a negative cycle, find the cycle itself
            ncycle := [u]
            v := predecessor[u]
            while v != u do
                ncycle := concatenate([v], ncycle)
                v := predecessor[v]
            error "Graph contains a negative-weight cycle", ncycle
    return distance, predecessor
```

至於 detect negative cycle，請見 [[use Bellman-Ford to Detect Negative Cycle]]。