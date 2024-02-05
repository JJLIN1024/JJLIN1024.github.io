---
title: Max-flow Min-cut
date: 2022-06-17
author: Jimmy Lin
tags: 
---


![](https://i.imgur.com/7GaaHgX.png)

## Proof

Denote $A/B$ for an edge as the remaining capacity($B$) and flow pushed($A$). $Ai \le Bi, Ci \le Di,\forall i$. When we do any flow network algorithm, at the end, we'll be stuck at some **cut**, where **in the residual graph, there's no more way to reach $t$ from $s$.** 

Take the figure above as an example, for outgoing edges, $A$ should equal the capacity, $B$ should be $0$, because if $B$ is not zero, then in $G$ we can push more flow through this cur. 

And for edges coming in $G$, $C$ should be $0$, and $D$ should equal the original capacity, since if $C$ is not $0$, then there would be an edge sticking out in the residual graph $G^T$, and we can push more flow through this cut.

The key questions is how do we know that at this point, **the flow we pushed is the maximum flow** ?

The value of a **flow** for a **cut** is defined as $\sum_{i} Ai - \sum_{j} Cj$, we can easily observed that the **maximum flow** happens when $\sum_{i} Bi = 0$, and $\sum_{j} Cj = 0$, and  $\sum_{i} Ai \le \sum_{i} Bi, \sum_{i} Ci \le \sum_{i} Di$, we know $\sum_{i} Bi + \sum_{i} Di$  is the capacity of that cut, so the maximum flow will equals to the **minimum capacity**. Hence, the max-flow min-cut theorem, and the correctness of those algorithm that pushes flow through the network.

## Links
- [Flow Network](notes/algorithm/Flow%20Network.md)

## Reference
- [A Second Course in Algorithms](https://www.youtube.com/watch?v=dorq_YA6plQ)