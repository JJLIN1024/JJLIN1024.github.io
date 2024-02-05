---
title: Circuit-SAT & SAT
date: 2022-06-17
author: Jimmy Lin
tags: 
---

## Circuit-SAT
![](https://i.imgur.com/dfPM7q0.png)

Circuit-SAT 是 所有 NPC 的基石，由它開始做 reduction，證明其他問題也是 NPC。

[Circuit-SAT is NP-Complete, proof by Cook](https://en.wikipedia.org/wiki/Circuit_satisfiability_problem) many years ago, we can use this as a cornerstone, to perform reduction to other problem, prove they are NP-Complete as well, like SAT. First we [prove a problem is in NP](How%20to%20prove%20a%20problem%20is%20in%20NP.md), then we use reduction to prove it is in NP-hard, then conclude that it is in NP-Complete.

## Circuit-SAT $\le_{p}$ SAT
![](https://i.imgur.com/bITIXTb.png)

For this circuit, the SAT formula $\phi$ can be written as follow:

$$\begin{aligned}\phi = x_{10} &\land (x_{4} \iff \neg x_{3}) \\  &\land (x_{5} \iff x_{1} \lor  x_{2}) \\ &\land (x_{6} \iff \neg x_{4}) \\ &\land (x_{7} \iff x_{1} \land x_{2} \land x_{4}) \\ &\land (x_{8} \iff x_{5} \lor x_{6}) \\ &\land (x_{9} \iff x_{6} \lor x_{7}) \\ &\land (x_{10} \iff x_{7} \land x_{8} \land x_{9}) \end{aligned}$$

Each $()$ is a **clause**, its value is always true according to boolean logic. We can transform the circuit into $\phi$ in polynomial time.

Circuit-SAT is satisfiable $\iff$ SAT is satisfiable

$(\Rightarrow)$:
if circuit is satisfiable, means that the final output, in this case $x_{10}$ is true, and because all clause are always true, the SAT is satisfiable.

$(\Leftarrow)$: 
if SAT is satisfiable, which means that all clause and $x_{10}$ must all be true, and thus the circuit is satisfiable.


## Links
- [NP Completeness Definition](notes/algorithm/NP%20Completeness%20Definition.md)


## Reference

- Introduction to Algorithm
- [Reduction of Circuit SAT to SAT](https://opendsa-server.cs.vt.edu/ODSA/Books/Everything/html/circuitSAT_to_SAT.html)
