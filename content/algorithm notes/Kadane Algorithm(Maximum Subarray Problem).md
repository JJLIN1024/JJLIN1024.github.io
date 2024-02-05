---
title: Kadane Algorithm(Maximum Subarray Problem)
date: 2022-12-25
author: Jimmy Lin
tags:
  - DP
draft: false
---

要計算 Maximum Subarray，暴力解是將 $O(n^2)$ 個 subarray 的 sum 都計算出來然後比較出 max。若要降低 time complexity，可以嘗試推導看看 optimal substructure，定義出 `DP[i]` 代表什麼意思，再找出 `DP[i]` 和 `DP[i-1]` 的關係。

若定義 `DP[i]` 為 `array[0:i]` 的 sum，則 `DP[i] = DP[i-1] + array[i]`，但是這和 maximum subarray 沒有關係。

定義 `DP[i]` 為到 `array[i]` 為止的 maximum subarray sum，則 `DP[i]` 和 `DP[i-1]` 的關係就有四種（考慮到值有正負）。

1. 若 `DP[i-1] > 0`，且 `array[i] > 0`，則很自然的 `DP[i] = DP[i-1] + array[i]` 。
2. 若 `DP[i-1] > 0`，且 `array[i] < 0`，因為定義是到 `array[i]` 為止，因此要包含 `array[i]` 唯一的方式就是加上它（因為它自身的負的，若捨棄前面全部都不要，subarray sum 一定比較小），因此可推導出 `DP[i] = DP[i-1] + array[i]` 。
3. 若 `DP[i-1] < 0`，且 `array[i] > 0`， `DP[i] = array[i]` 。
4. 若 `DP[i-1] < 0`，且 `array[i] < 0`， `DP[i] = array[i]` 。

簡單來說，關鍵就在於 `DP[i-1]` 的正負號。若其值小於零，在計算 `DP[i]` 時就不會加上它。

綜合上述四個 case，可以寫出 `DP[i] = max(DP[i-1] + array[i], array[i])`

進一步只用兩個指標表示的話，就用來記錄 `DP[i]` ，另一個用來記錄到目前為止的最大值。

- `curSum = max(curSum + array[i], array[i])`
- `maxSum = max(maxSum, curSum)`


## Source
- [滴滴面試手撕演算法題-kadane演算法](https://zhuanlan.zhihu.com/p/85188269)

