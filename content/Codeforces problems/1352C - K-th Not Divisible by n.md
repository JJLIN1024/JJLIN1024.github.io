---
title: 1352C - K-th Not Divisible by n
date: 2024-02-05
lastmod: 2024-02-05
author:
  - Jimmy Lin
tags:
  - math
draft: false
---

## Thinking Process

可以將數字從 1 開始分群：(1, 2, 3, ..., n - 1, n) (n + 1, n + 2, ..., 2n - 1, 2n) ... 

每一群都有 n - 1 個數字是 not divisible by n，所以要求第 k 個 not divisible by n 的數字，可用以下公式：

$$\frac{k}{n - 1} \cdot n + k \mod (n - 1)$$
不過有些要注意的：

1. 當 `k % (n - 1) == 0` 代表剛好有 `k / (n -1)` 群數字，例如 `n = 4, k = 12`，所以結果要減一
2. 當 `k <= n - 1`，代表連第一群當數不滿，所以答案就是 `k`
## Code

Time Complexity: $O(1)$, Space Complexity: $O(1)$

```cpp
#include<bits/stdc++.h>

using ll = long long;
using ld = long double;
using namespace std;

void run_case(){ 
    int n, k;
    cin >> n >> k;
    if(k > n - 1) {
        if(k % (n - 1) == 0)
            cout << (k /(n - 1)) * n - 1 << "\n";
        else 
            cout << (k /(n - 1)) * n + k % (n - 1) << "\n";
    }
    else
        cout << k << "\n";
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(NULL);
    int tests = 1;
    cin >> tests;
    while(tests--){
        run_case();
    }
    return 0;
}

```

## Source
-  [K-th Not Divisible by n](https://codeforces.com/problemset/problem/1352/C)