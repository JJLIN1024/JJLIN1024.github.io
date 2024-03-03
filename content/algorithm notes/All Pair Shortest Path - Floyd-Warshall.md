---
title: All Pair Shortest Path - Floyd-Warshall
date: 2024-02-02
lastmod: 2024-02-02
author:
  - Jimmy Lin
tags:
  - shortest_path
  - floyd_warshall
  - Algorithm
draft: false
---

## Key Idea

induction on **intermediate vertex**, this is a little bit different than **Bellman-Ford algorithm**, Bellman-Ford is induction on **edge**, runs for $n-1$ iterations, while Floyd-Warshall is induction on **vertex**, runs for $n$ iterations.

## Definition

- $d_{ij}^k$: the shortest path length from vertex $i$ to vertex $j$, considering only vertex$1, 2, \cdots, k$ as intermediate vertexes.
- $D^k$ : matrix form for $d_{ij}^k$

關鍵：

```cpp
for(int k = 0; k < n; k++) {
	for(int i = 0; i < n; i++) {
        for(int j = 0; j < n ;j++) {
            D[i][j] = min(D[i][j], D[i][k] + D[k][j]);
        }
    }
}           
```

for more information, see [Floyd–Warshall algorithm](https://en.wikipedia.org/wiki/Floyd%E2%80%93Warshall_algorithm).
