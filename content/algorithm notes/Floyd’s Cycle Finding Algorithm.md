---
title: Floyd’s Cycle Finding Algorithm
date: 2023-02-03
author:
  - Jimmy Lin
tags:
  - linked_list
  - cycle_detection
draft: false
---

![](https://i.imgur.com/urOCiz3.png)

令 A 點為快慢指標開始走的起點，B 點為 Cycle 起點，C 點為快慢指標相遇的點，L 為 cycle 長度（B -> C -> D）。

因為快指標走的速度為慢指標的兩倍，因此當兩者相遇時，可列出以下等式：

$$
X + Y + fL = 2(X + Y + sL)
$$
where $f > 0, s > 0$.
整理式子後得：
$$X + Y = (f - 2s) L = K L$$
進而得到：
$$X = KL - Y$$
由上式可知，若將慢指標放回原點，快指標則留在 C 點，且兩者移動速度皆為一次一步的往前走，則兩者會在 B 點相遇，因為慢指標會從 A 點開始走 X 步會抵達 B 點，快指標則也是走了 X = KL - Y 步，剛好就是從 D 點到 B 點的距離。

快慢指標必定會相遇，假設快慢指標都在迴圈當中，且彼此的距離為 $n_1$。因為快指標每次都比慢指標多移動一步，因此在 $n_1$ 次一棟之後，快指標就會和慢指標相遇。