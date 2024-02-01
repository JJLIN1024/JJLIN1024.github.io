---
title: Flow Network
updated: 2022-06-17 08:43:59Z
created: 2022-05-14 07:36:43Z
---


![](https://i.imgur.com/UYdvDNA.png)

## Definition

A direct graph $G(V, E)$, with a **non-negative and integer** capacity $u_e$ on each edge $e \in E$, a source vertex $s \in V$, and a sink vertex $t \in V$.


## Constraints
- capacity constrain
	- $f_{e}\le u_{e}, \forall e \in E$
- conservation constrain
	- $\forall v \in V$, other than $s, t$, we have: incoming flow = outgoing flow.
	
We want to push the flow from $s$ to $t$ as much as possible, while satisfying two constraints

## Residual Graph

![](https://i.imgur.com/FyfwDmZ.png)
The residual graph enables us to **undo** what we have pushed early, in terms of greedily pushed flow through the network.

## Correctness

- [Max-flow Min-cut](notes/algorithm/Max-flow%20Min-cut.md)

## Algorithm

- Greedily push flow with residual network is the **Ford-Fulkerson algorithm**, which runs in $O(EC)$, where $C$ is the sum of capacity out of $s$, because each iteration the flow value will increase at least one, and we use $O(E)$ to find the $s-t$ path.
- Use **BFS** to compute shortest $s-t$ path is [Edmonds-Karp](notes/algorithm/Edmonds-Karp.md), which runs in $O(EV(E+V)) = O(VE^2)$
- Similar to [Edmonds-Karp](notes/algorithm/Edmonds-Karp.md), but use **blocking flow** instead of BFS to find the s-t path is **Dinic's Algorithm**, which runs in $O(V*BF) = O(V*VE) = O(V^2E)$, the time to compute blocking flow in Edmonds-Karp is $O(E^2)$, which make sense to its running time $O(V^2E)$.
- For practical usage: **Push Relable algorithm**

## Related

- [[notes/algorithm/Bipartite Matching]]


## Reference

- [A Second Course in Algorithms](https://www.youtube.com/watch?v=dorq_YA6plQ)