---
title: 466C - Number of Ways
date: 2024-02-05
lastmod: 2024-02-05
author:
  - Jimmy Lin
tags:
  - prefix_sum
draft: false
---

## Thinking Process

三段和相等，代表 array sum 除以三就是每一段的 sum。因此 array sum 不是三的倍數可以先淘汰。

```cpp
if(A[i] == t * 2) res += x;
if(A[i] == t) x++;
```

代表用 x 紀錄第一段 sum 可能的選擇有幾個，而 `if(A[i] == t * 2) res += x;` 順序在前面代表目前選擇的第二段就是當前的 `A[i]` 所代表的 prefix sum 區間，因此前面第一段 sum 有 x 種選擇。

固定了第一第二段，第三段 sum 就是第二段後面的全部，也因此 iterate 到 `n - 2` 就要停止，要不然沒有第三段可以選。
## Code

Time Complexity: $O(n)$, Space Complexity: $O(n)$

```cpp
#include<bits/stdc++.h>

using ll = long long;
using ld = long double;
using namespace std;


void run_case(){ 
    int n;
    cin >> n;
    vector<ll> A(n, 0);
    for(int i = 0; i < n; i++) {
        cin >> A[i];
        if(i > 0) A[i] += A[i - 1];
    }

    if(A[n - 1] % 3 != 0) {
        cout << 0 << "\n";
        return;
    }

    ll t = A[n - 1] / 3;
    ll x = 0, res = 0;
    for(int i = 0; i < n - 1; i++) {
        if(A[i] == t * 2) res += x;
        if(A[i] == t) x++;
    }

    cout << res << "\n";
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
- [Number of Ways](https://codeforces.com/problemset/problem/466/C/)