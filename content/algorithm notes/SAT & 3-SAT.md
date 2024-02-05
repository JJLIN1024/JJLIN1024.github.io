---
title: SAT & 3-SAT
date: 2022-06-17
author: Jimmy Lin
tags: 
---
## SAT $\le_p$ 3-SAT

Key Idea: use boolean logic to convert SAT in to the form of 3-SAT, since they are logically equivalent, hence the iff relationship.

Example: consider this SAT $\phi = (x_{1} \implies x_{2}) \lor \neg((\neg x_{1}\iff x_{3}) \lor x_{4})\land \neg x_2$, convert it into a parse tree.

![](https://i.imgur.com/NWC4cKo.png)

similar to the gate in [Circuit SAT](notes/algorithm/Circuit-SAT%20&%20SAT.md), we treat each node as a gate and convert the tree into the following formula:

$$\begin{aligned}\phi = y_{1} &\land (y_{1} \iff (y_{2} \land \neg x_{2})) \\  &\land (y_{2} \iff (y_{3} \lor  y_{4})) \\ &\land (y_{3} \iff (x_{1} \implies x_{2})) \\ &\land (y_{4} \iff (\neg y_{5})) \\ &\land (y_{5} \iff (y_{6} \lor x_{4})) \\ &\land (y_{6} \iff (\neg x_{1} \iff x_3)) \end{aligned}$$

Note that variable $y_{i}$ is created by us, they do not exists in the original SAT formula, unlike the circuit-SAT, in here, the clause are not always true, because $y_i$ is not the real outcome, it is just like some dummy variable, so we have to construct a truth table, to determine which value makes the clause to evaluate to true.

![](https://i.imgur.com/g7HQxm2.png)

use those value equals $0$ in the truth table to construct DNF, and then use DeMorgan's Law to convert it to CNF, add dummy variable if needed, then the formula is in the form of 3-SAT.

Take $y_{1} \iff (y_{2} \land \neg x_{2})$ for example, according truth table, the DNF form is 

$$(y_{1} \land y_{2} \land x_{2}) \lor (y_{1} \land \neg y_{2} \land x_{2}) \lor (y_{1} \land \neg y_{2} \land \neg x_{2}) \lor (\neg y_{1} \land y_{2} \land \neg x_{2})$$

which always evaluated to $0$.

convert it into CNF using DeMorgan's Law, which always evaluate to $1$. The CNF form is 

$$(\neg y_{1} \lor \neg y_{2} \lor \neg x_{2}) \land (\neg y_{1} \lor y_{2} \lor \neg x_{2}) \land (\neg y_{1} \lor y_{2} \lor  x_{2}) \land (y_{1} \lor \neg y_{2} \lor x_{2})$$

in this case, the 3-SAT form is satisfied.

If the clause after converting to CNF has less than 3 variable, then we can use the following technique to convert it into 3-SAT form. For those that only have $2$: $(l_1 \lor l_{2})= (l_1 \lor l_{2} \lor p) \land (l_1 \lor l_{2}\lor \neg p)$. For those that only have 1: $l_{1} = (l \lor p \lor q) \land (l \lor \neg p \lor q) \land (l \lor p \lor \neg q) \land (l \lor \neg p \lor \neg q)$

Since $y_i$ are all dummies, SAT is satisfiable $\iff$ 3-SAT is satisfiable.

## Links
- [NP Completeness Definition](notes/algorithm/NP%20Completeness%20Definition.md)
- [Circuit-SAT & SAT](notes/algorithm/Circuit-SAT%20&%20SAT.md)

## Reference
- Introduction to Algorithm