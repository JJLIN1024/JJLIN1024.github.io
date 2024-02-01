---
title: Hall's Theorem
updated: 2022-06-17 08:43:41Z
created: 2022-05-17 00:42:03Z
---

## Theorem

A bipartite graph $(V \cup W, E)$, with $|V| \le |W|$, has a perfect matching  $\iff$ for every subset $S \subseteq V$, $|N(S)| \ge |S|$.

![](https://i.imgur.com/4AUf9Z9.png)

## Proof
$(\Rightarrow)$: 

proofed via contrapositive. Say there is a subset $S \subseteq V$, $|N(S)| \lt |S|$, then there cannot be a perfect matching for this subset. Q.E.D.

$(\Leftarrow)$: 

consider the figure above. The key idea is: If we can prove that the minimum cut is at least $|V|$, then the maximum flow is at least $|V|$, too, according to **min-cut max-flow** theorem, and hence this flow corresponding to a perfect-matching.

Consider a $(s, t)$ cut $(A,B)$, every edge connecting $V, W$ has capacity of $\infty$, and other edges have capacity of $1$. Subset $S$ is in $A$, $N(S)$ is its neighbors, we don't consider those neighbors that are not in $A$, since its edge capacity is $\infty$, the proof is complete. The cut capacity is at least $(|V| - |S|) + |N(S)|$, and by the assumption of Hall's Theorem, we know $|N(S)| \ge |S|$, thus the $(A,B)$ cut capacity $\ge (|V| - |S|) + |S| = |V|$, Q.E.D.

## Links
- [Max-flow Min-cut](notes/algorithm/Max-flow%20Min-cut.md)

## Reference
- [A Second Course in Algorithms](https://www.youtube.com/watch?v=dorq_YA6plQ)