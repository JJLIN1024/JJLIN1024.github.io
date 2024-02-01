---
title: use Bellman-Ford to Detect Negative Cycle
updated: 2022-06-17 07:34:27Z
created: 2022-05-13 06:26:28Z
---

## Proof

目標是要證明當有 negative cycle，在執行[Bellman-Ford Algorithm](:/4919a6767fd246499f9275bc93b78c41)  $v$ 回合(relaxation)後，必定有 node 的 shortest path value 下降。
	
假設有一個 negative cycle，由 $k$ 個 node 組成，可以表示成 $\sum_{i=1}^{k} w(v_i, v_{i +1}) \lt 0$，用反證法假設經過第 $v$ 個回合的 relaxation，shortest path value 沒有下降，沒有下降這件事可以寫成：
$$\sum_{i=1}^{k} (d(v_{i+1}) \le d(v_{i})+ w(v_{i}, v_{i+1}))$$
展開後消去相同的項可得 
$$\sum_{i=1}^{k} w(v_i, v_{i +1}) \ge 0$$ 

這與一開始的假設衝突，因此若有 negative cycle，經過第 $v$ 回合的 relaxation 後，必定有 node 的 shortest path value 下降。
> 對於一個 node 而言，shortest path cost 有下降的話應該會是 $d(v_{i+1}) \gt d(v_{i})+ w(v_{i}, v_{i+1})$。

## Reference

台大電機演算法課程