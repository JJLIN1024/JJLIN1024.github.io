---
title: Correctness of Connected Component
date: 2022-06-17
author: Jimmy Lin
tags: 
---


![](https://i.imgur.com/gjgw5KH.png)

## 證明

目標：在 $G$ 中的 Connected Component 為 $G^t$ 中的 DFS tree。

在 [Algorithm to find SCC](notes/algorithm/Algorithm%20to%20find%20SCC.md) 中的最後一步，在 $G^t$ 中做 DFS，是從 discovery time 最大的開始，假設 node $v$ 為 discovery time 最大的 node，而大圈圈代表 $v$ 所在的 DFS tree，DFS 代表沒有 outgoing edge 可以連到 $u$。用反證法，假設有這條 edge $(w, u)$ ，代表在 $G$ 中有 edge $(u, w)$，但是根據假設 $v$ 的 discovery time 為最大，所以如果有 $(u, w)$，$u$ 的 discovery time 一定比 $v$ 還要大，造成矛盾，故 $(w, u), (u, w)$ 不存在，找到的 DFS tree 及為 connected component。

## Reference

- 台大資工演算法投影片