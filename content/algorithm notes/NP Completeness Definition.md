---
title: NP Completeness Definition
date: 2022-06-17
author: Jimmy Lin
tags: 
---
## Content

- P & NP
	![](https://i.imgur.com/mqAH4Ug.png)
	> source: [wiki](https://zh.m.wikipedia.org/wiki/File:P_np_np-complete_np-hard.svg)

- Definition
	![](https://i.imgur.com/G2OoRad.png)
	- P: Polynomial-time solvable, correspond to Deterministic Turing Machine
	- NP: Polynomial-time verifiable, correspond to Non-Deterministic Turing Machine.
	- NPC: Hardest problem in NP, we say a problem $X \in NPC \iff X \in NP, \forall Y \in NP, Y \le_{p}X$, we can verify a NPC problem is in NP by using a certificate(solution) whose size are polynomial to the problem instance can be verified in polynomial time.
- Polynomial Time Reduction $X \le_{p} Y$
	- ![](https://i.imgur.com/vczsblj.png)
	- For any instance of $x$ in $X$, there is a polynomial time **function** that computes $f(x) = y$, and $x$ is true $iff$ $f(x) = y$ is true.
	- $Y$ is equal or harder than $X$, we can view $Y$ as a black box.
- Relation
	- If $X \in P \Rightarrow X \in NP$
	- if $X \le_{p}Y$
		- if $Y$ can be solved in polynomial time, then $X$ can be solved in polynomial time
		- if $X$ cannot be solved in polynomial time, then $Y$ cannot be solved in polynomial time
		- if $X \le_{p} Y$, and $Y \le_{p} X$ then $X \equiv_{p}Y$
	- if $X \le_{p}Y, Y \le_{p}Z \Rightarrow X \le_{p}Z$



## Reference

- 台大電機演算法課程
- [輕鬆談演算法的複雜度分界：什麼是P, NP, NP-Complete, NP-Hard問題](https://www.ycc.idv.tw/algorithm-complexity-theory.html)
- [How to prove that a problem is NP complete?](https://stackoverflow.com/questions/4294270/how-to-prove-that-a-problem-is-np-complete)
- [Proving that a problem is in NP](https://cs.stackexchange.com/questions/70722/proving-that-a-problem-is-in-np)
