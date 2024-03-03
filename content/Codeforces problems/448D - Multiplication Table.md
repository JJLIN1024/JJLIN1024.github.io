---
title: 448D - Multiplication Table
date: 2024-02-06
lastmod: 2024-02-06
author:
  - Jimmy Lin
tags:
  - binary_search
draft: false
---

## Thinking Process

使用 binary search，重點在要怎麼找出有多少個數字小於 mid 呢？

對於一個 row i 和 number x 來說，會有 $\min (\frac{x - 1}{i}, m)$ 個數字是嚴格小於 x 的。

以 n x m = 2 x 3 為例：

```
1 2 3
2 4 6
```

第 2 個 row 為 `2, 4 ,6` ，假設 x = 6，則 $\min (\frac{6 - 1}{2}, 3) = 2$，代表有兩個數字嚴格小於 6（2, 4）。
## Code

Time Complexity: $O(n \log {mn})$, Space Complexity: $O(1)$

```cpp
#include<bits/stdc++.h>

using ll = long long;
using ld = long double;
using namespace std;

ll lessThanX(ll x, int n, int m) {
    ll res = 0;
    for(int i = 1; i <= n; i++) {
        res += min((x - 1) / i, (ll)m);
    }
    return res;
}


void run_case(){ 
    int n, m;
    ll k;
    cin >> n >> m >> k;
    ll l = 1, r = 1LL * n * m + 1;
    while(l < r) {
        ll x = (l + r) >> 1;
        if(lessThanX(x, n, m) < k) l = x + 1;
        else r = x;
    }
    cout << l - 1 << "\n";

}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(NULL);
    int tests = 1;
    // cin >> tests;
    while(tests--){
        run_case();
    }
    return 0;
}

```

## Source
- [Multiplication Table](https://codeforces.com/problemset/problem/448/D)