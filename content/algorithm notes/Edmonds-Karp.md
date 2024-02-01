---
title: Edmonds-Karp
updated: 2022-06-17 07:48:55Z
created: 2022-05-15 23:49:06Z
---

![](https://i.imgur.com/D5XYcin.png)

## Time Complexity 
$O(VE(V+E)) = O(E^2V)$ , key insight: why $O(VE)$ iterations of BFS?

When we push flow, we creates backward edges, that's the intuition behind increasing shortest path distance.

The distance between $s, t$ can be at most $V-1$($V$ will disconnect them), and BFS finds the shortest path, so during the execution of Edmonds-Karp, the distance keeps increasing, and it will increase by one for at least $E$ iterations, since for every iteration, there will be at least an edge that gets saturated. 等所有距離為 1 的 shortest path 都被 saturated，就只剩下距離為 2 的 shortest path 可以走，距離為 2 的 path 是怎麼出現的？透過 residual graph 被 create，而所謂距離，是指 BFS 的 layer 數，所以只會往前（增加），和實際 edge 是 forward or backward 無關。

## Reference

[A Second Course in Algorithms](https://www.youtube.com/watch?v=dorq_YA6plQ)