---
title: 3-SAT & Clique
updated: 2022-06-17 08:41:00Z
created: 2022-05-18 01:19:14Z
---


## 3-SAT $\le_p$ Clique 

![](https://i.imgur.com/dMujXgj.png)

For a 3-SAT of $k$ clause, in this case, $k= 3$, construct graph $G$, edge only exists when node are in different clause, and are not the negation of itself.

3-SAT is satisfiable $\iff$ There is a clique of size $k$

$(\Rightarrow)$: 
3-SAT is satisfiable means there is at least one $1$ in each clause, so pick those nodes that have value $1$, they form a $k$ size clique(due to the way edges are constructed).

$(\Leftarrow)$: 
There is a clique of size $k$ means in each clause there is a boolean variable whose value is $1$, this makes 3-SAT satisfiable. 

## Links
- [NP Completeness Definition](notes/algorithm/NP%20Completeness%20Definition.md)
- [SAT & 3-SAT](notes/algorithm/SAT%20&%203-SAT.md)

## Reference
- Introduction to Algorithm