---
title: Clique & Vertex Cover
updated: 2022-06-17 08:45:17Z
created: 2022-05-18 01:37:45Z
---


## Clique $\le_p$ Vertex Cover 

![](https://i.imgur.com/w1VBouw.png)

$G$ has a clique of size $k$ $\iff$ $\bar G$ has a vertex cover of size $|V| - k$

$(\Rightarrow)$:

For all edge in $\bar G$, at least one end point is not in the clique, so edges are covered by those vertexes that are not in the clique, which has size $|V| - k$.

$(\Leftarrow)$:

Consider those edges that are currently not present in $G$, then their endpoint must be in vertex cover in $\bar G$, since the vertexes in clique are all connected. Consider the contrapositive of this argument, that means, if both endpoints are not in vertex cover, then there must be a edge connecting them, which forms a clique of size of $|k|$.

## Links
- [NP Completeness Definition](notes/algorithm/NP%20Completeness%20Definition.md)
- [3-SAT & Clique](notes/algorithm/3-SAT%20&%20Clique.md)


## Reference
- Introduction to Algorithm