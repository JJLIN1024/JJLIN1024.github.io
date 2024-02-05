---
title: APSP - Johnsons Algorithm
date: 2022-06-17
author: Jimmy Lin
tags: 
---


## Reweighting

Intuition: if we convert the edge weight to be **positive**, then we can use **Dijkstra's Algorithm** on all vertexes to compute all pair shortest path.

Reweighting cannot change the shortest path $p$ for any vertex $i, j$. That is, the shortest path between any $i, j$ must remain unchange after reweighting. Second, reweighting must preserve negative cycle.

$G = (V, E)$, for all edge $(u, v) \in E$, define $\bar w(u, v) = w(u, v) + h(u) - h(v)$, where $h(u)$ is the shortest path from a super external source $s$ which connects to evert vertexes $v \in V$ (or any vertex that reaches every other vertexes), as the graph shows. 

![](https://i.imgur.com/okXN5GB.png)
> source : [wiki](https://en.wikipedia.org/wiki/Johnson%27s_algorithm)

## Correctness

Consider vertex $v$, $h(v)$ is the shortest path length from $s$, then by the definition of shortest path, we know $h(u) + w(u, v) \le h(v) \Rightarrow w(u, v) + h(u) - h(v) \ge 0$ 

![](https://i.imgur.com/6EBFOmG.png) 

For a shortest path $p = (v_{0}, v_{1}, \cdots, v_{k})$, 
$$\begin{aligned} \bar w(p) &= \bar w(v_{0},v_{1}) + \bar w(v_{1}, v_{2}) + \cdots + \bar w(v_{k-1}, v_{k})\\ &= (w(v_{0},v_{1}) + h(v_{0}) - h(v_{1})) + (w(v_{1},v_{2}) + h(v_{1}) - h(v_{2})) + \cdots + (w(v_{k-1},v_{k}) + h(v_{k-1}) - h(v_{k}))\\ &= w(v_{0},v_{1}) + w(v_{1}, v_{2}) + \cdots + w(v_{k-1}, v_{k}) + h(0) + h(k) \\ &= w(p) + h(0) + h(k) \end{aligned}$$ 

### proof the shortest path property unchanged by contradiction
Assume that there is another shortest path $p'$, with $\bar w(p') \lt \bar w(p)$. Then $\bar w(p') = w(p') + h(0) + h(k) \lt \bar w(p) = w(p) + h(0) + h(k) \Rightarrow w(p') \lt w(p)$, which is a contradiction, because $w(p)$ is the original shortest path, there is no way other path length would be shorter than that.

### Proof of negative cycle preservation after reweighting
For this cycle $c = (v_{0}, v_{1}, \cdots, v_{k}, v_{0})$, $\bar w(c) = w(c) + h(0) - h(0) = w(c) \lt 0$