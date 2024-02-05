---
title: Asymptotic Analysis(Time complexity)
date: 2022-12-14
author: Jimmy Lin
tags: ["Algorithm"]
draft: false
---

## Stirling's approximation

$$n! = \sqrt{2 \pi n} (\frac{n}{e})^n (1 + O(\frac{1}{n}))$$


## Big-O

$O(g(n)) \equiv \{ h(n) |\ \exists c \gt 0, n_0 \gt 0, s.t.\ h(n) \le cg(n), \forall n \ge n_0 \}$

$f(n) \in O(g(n)) \iff \exists c, n_0, s.t.\ f(n) \le cg(n), \forall n \ge n_0$ 

$f(n) \in O(g(n)) \iff \exists lim_{n \to \infty}\frac{f(n)}{g(n)} \in [0, \infty)$

反證：$\forall c, n_0 \gt 0, (f(n) \le cg(n), \forall n \ge n_0)$ is false

That is: find $n_1 \ge n_0$, but $f(n_1) \le cg(n_1)$ is false.


## Big-Omega

$\Omega(g(n)) \equiv \{ h(n) |\ \exists c \gt 0, n_0 \gt 0, s.t.\ cg(n) \le h(n), \forall n \ge n_0 \}$

$f(n) \in \Omega(g(n)) \iff \exists c, n_0, s.t.\ cg(n) \le f(n), \forall n \ge n_0$ 

$f(n) \in \Omega(g(n)) \iff \exists lim_{n \to \infty}\frac{f(n)}{g(n)} \in (0, \infty]$

反證：$\forall c, n_0 \gt 0, (cg(n) \le f(n) , \forall n \ge n_0)$ is false

That is: find $n_1 \ge n_0$, but $cg(n_1) \le f(n_1)$ is false.

## Theta

$\Theta(g(n)) \equiv \{ h(n) |\ \exists c_1, c_2 \gt 0, n_0 \gt 0, s.t.\ c_1g(n) \le h(n) \le c_2 g(n), \forall n \ge n_0 \}$

$f(n) \in \Theta(g(n)) \iff \exists c_1, c_2 \gt 0, n_0 \gt 0, s.t.\ c_1g(n) \le f(n) \le c_2 g(n), \forall n \ge n_0$ 

$f(n) \in \Theta(g(n)) \iff \exists lim_{n \to \infty}\frac{f(n)}{g(n)} \in (0, \infty) \iff \exists lim_{n \to \infty}\frac{f(n)}{g(n)} = c(constant)$

## Little-O

the key difference between Big-O and Little-O is $\exists c$ and $\forall c$.


$o(g(n)) \equiv \{ h(n) |\ \forall c \gt 0, \exists n_0 \gt 0, s.t.\ h(n) \lt cg(n), \forall n \ge n_0 \}$

$f(n) \in o(g(n)) \iff \forall c \gt 0, \exists n_0 \gt 0, s.t.\ f(n) \lt cg(n), \forall n \ge n_0$ 

$f(n) \in o(g(n)) \iff \exists lim_{n \to \infty}\frac{f(n)}{g(n)} = 0$

## Little-Omega

$\omega(g(n)) \equiv \{ h(n) |\ \forall c \gt 0, \exists n_0 \gt 0, s.t.\ cg(n) \lt h(n), \forall n \ge n_0 \}$

$f(n) \in \omega(g(n)) \iff \forall c \gt 0, \exists n_0 \gt 0, s.t.\ cg(n) \lt f(n), \forall n \ge n_0$ 

$f(n) \in \omega(g(n)) \iff \exists lim_{n \to \infty}\frac{f(n)}{g(n)} = \infty$

## Master Theorem

![](https://i.imgur.com/vPbPWIZ.png)
![](https://i.imgur.com/SEUFL3Q.png)
![](https://i.imgur.com/tm7YjJq.png)

### 證明

$$\begin{aligned} T(n)
&= a T(\frac{n}{b}) + f(n) \\
&= a(a T(\frac{n}{b^2}) + f(\frac{n}{b})) +f(n) \\
&= a^2 T(\frac{n}{b^2}) + a  T(\frac{n}{b}) + f(n) \\
&= \cdots \\
&= a^k T(\frac{n}{b^k}) + a^{k-1} T(\frac{n}{b^{k-1}}) + \cdots + af(\frac{n}{b}) + f(n) \\
&= n^{log_b a} T(1) + (a^{k-1} T(\frac{n}{b^{k-1}}) + \cdots + af(\frac{n}{b}) + f(n)) \\
\end{aligned}$$

We can show that in case 3: $f(n) \le a^{k-1} T(\frac{n}{b^{k-1}}) + \cdots + af(\frac{n}{b}) + f(n) \le \frac{f(n)}{1-c}$, so $T(n) = \theta(f(n))$, since in case 3 $f(n) = \Omega(n^{\log_b a})$

> In case 3:
> 
> $af(\frac{n}{b}) \le cf(n) \Rightarrow af(\frac{n}{b^2}) \le cf(\frac{n}{b}) \Rightarrow a^2f(\frac{n}{b^2}) \le acf(\frac{n}{b}) \le c^2 f(n)$, so $f(n) \le f(n), af(\frac{n}{b}) \le cf(n), a^2f(\frac{n}{b^2}) \le c^2f(n), \cdots$, so the series' upper bound is $\frac{f(n)}{1-c}$, where $c < 1$. And the last element of the series is $f(n)$, which is the lower bound, hence the upper inequality equation.


## Akra-Bazzi

![](https://i.imgur.com/QcCzlpu.png)

## Using Recurrsion Tree 
>Pay attention to base case reduction
>Namely, $T(n^{\frac{1}{2^k}})$ => let $n^{\frac{1}{2^k}}$ = ==$2$== instead of $1$ 
![](https://i.imgur.com/yYfWsBm.png)

## Some Examples

1. $T(n) = T(\frac{n}{2} + \sqrt n) + \sqrt{6046}$

    Master Theorem Case 1: $T(n) = \theta(\lg n)$
    Why can we ignore $\sqrt n$, becaurse it is smaller?
    
2. $T(n) = \sqrt nT(\sqrt n) + 100n$

    First use Recursion Tree Method, draw the tree, cost at each level is $100n$, **set the base case to 2 instead of 1**, we have total of $\lg\lg n + 1$ levels, so the total cost is roughly $\theta(n\lg\lg n)$.
    
    Then use substitution method to verify the guess derived from recursion tree:
    $T(n) \le c \cdot n \lg\lg n$
    
3. 取 $\log$ 可以，反之不行
    
    True: $f(n) = O(g(n)) \Rightarrow \log f(n) = O(\log g(n))$
    False: $f(n) = o(g(n)) \Rightarrow \log f(n) = o(\log g(n))$
    > 反例：$f(n) = n^2, g(n) = n^3$
    
    False: $\log f(n) = O(\log g(n)) \Rightarrow f(n) = O(g(n))$
    > 反例：$f(n) = n^2, g(n) = n$
    
    True: $f(n) = o(g(n)) \Rightarrow 2^{f(n)} = o(2^{g(n)})$
    False: $f(n) = O(g(n)) \Rightarrow 2^{f(n)} = O(2^{g(n)})$
    > 反例：$f(n) = n, g(n) = 2n$
    
    False: $f(n) = \theta(g(n)) \Rightarrow 2^{f(n)} = \theta(2^{g(n)})$
   > 反例：$f(n) = n, g(n) = 2n$

4. For all positive $f(n), f(n) + o(f(n)) = \theta(f(n))$
    Ans: True

5. Stirling's approximation

  $\begin{split}f(n) &= {n \choose \frac{n}{2}} \\
  &= \frac{n!}{((\frac{n}{2})!)^2} \\
  &\approx \frac{\sqrt{2 \pi n} (\frac{n}{e})^n}{(\sqrt{2 \pi \frac{n}{2}} (\frac{\frac{n}{2}}{e})^{\frac{n}{2}})^2} \\
  &= \frac{2^n}{\sqrt{\frac{1}{2} \pi n}} \\
  &= O(\frac{2^n}{\sqrt{n}})
  \end{split}$
  
6. $n^{\log n} = 2^{(\log n)^2}$

7. ${n \choose \frac{n}{4}} = \frac{n \cdot (n-1) \cdot (n-2) \cdots (n - \frac{n}{4} + 1)}{\frac{n}{4} \cdot (\frac{n}{4} - 1) \cdots 1} \gt 4^{\frac{n}{4}}$

  ![](https://i.imgur.com/qWRvpR8.png)

![](https://i.imgur.com/jKX8Z86.png)
![](https://i.imgur.com/xAHKftk.png)


![](https://i.imgur.com/V8WOZCt.png)

![](https://i.imgur.com/k0MRt1j.png)


## Reference

[Time Complexity](https://hackmd.io/XCreV7pNSLKGccqqo4sAOw)
