---
title: Stable Matching - Gale–Shapley algorithm
date: 2022-06-17
author: Jimmy Lin
tags: 
---
![](https://i.imgur.com/vg0wT6A.png)

## Stability proof
Proof by contradiction, suppose that $M1$ and $F1$, $M2$ and $F2$ are both married(black line), but $F1$ and $M2$ like each other more than $M1$, and $F2$(orange line), which is unstable.

Since this algorithm assume that male proposed to female, so if $M2$ did not proposed to $F1$, which means in $M2$'s heart, he likes $F2$ more, which contradict to the assumption.

If $M2$ did proposed to $F1$, and $F1$ turns $M1$ down(that's why they did not end up together), which means $F1$ likes $M1$ more, which contradicts to the assumption.Thus, the algorithm is stable. Q.E.D.

## Reference

- [演算法筆記](https://web.ntnu.edu.tw/~algo/Matching2.html#3)
- [NYCU-演算法筆記 #1 stable matching](https://papan01.com/archives/2021-03-08-nycu-algorithm-1)