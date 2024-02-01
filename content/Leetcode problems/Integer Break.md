---
title: Integer Break
date: 2023-01-04
lastmod: 2023-01-04
author: Jimmy Lin
tags: ["Dynamic Programming"]
draft: false
---

## Code

Time Complexity: $O(n^2)$, Space Complexity: $O(n)$

邏輯類似 [[Perfect Squares|Perfect Squares]] && [[Coin Change|Coin Change]] ，解題重點就是動手寫一寫前幾個 case，找出規律。

```cpp
class Solution {
public:
    int integerBreak(int n) {
        vector<int> DP(n + 1, 0);
        DP[0] = 1;
        DP[1] = 1;
        for(int i = 2; i <= n; i++) {
            for(int j = 1; j < i; j++) {
                DP[i] = max(DP[i], max(DP[i - j], i -j) * j);
            }
        }
        return DP[n];
    }
};
```

### Math

經由觀察，可以發現除了 `2,3` 以外的數字都可以被 `2, 3` 分解且乘積變大，因此嘗試證明此觀察：

$$(n - 3) \cdot 3 > n \Rightarrow n > 4$$
$$(n - 2) \cdot 2 > n \Rightarrow n > 4$$
而又 `3 > 2`，因此應該盡量用 `3` 來拆。

```cpp
class Solution {
public:
    int integerBreak(int n) {
        int product = 1;
        while(n > 4) {
            n -= 3;
            product *= 3;
        }
        product *= n;
        return product;
    }
};
```

## Link
- Integer Break
