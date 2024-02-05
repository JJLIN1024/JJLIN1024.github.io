---
title: 455A - Boredom
date: 2024-02-05
lastmod: 2024-02-05
author:
  - Jimmy Lin
tags:
  - DP
draft: false
---

## Thinking Process

一開始題目沒看清楚，以為是類似 [[Burst Balloons]] 的題目，後來看清楚之後才發現是類似 [[Longest Consecutive Sequence]] 或是 [[House Robber]] 的題目。

且因為每個數字最大都是 $10^5$，加起來就有可能超過 INT_MAX，所以要用 long long int。
## Code

Time Complexity: $O(1e5)$, Space Complexity: $O(1e5)$

```cpp
#include<bits/stdc++.h>

using ll = long long;
using ld = long double;
using namespace std;

void run_case(){ 
    int n;
    cin >> n;
    vector<ll> A(1e5 + 1, 0);
    vector<ll> DP(1e5 + 1, 0);
    int num;
    for(int i = 0; i < n; i++) {
        cin >> num;
        A[num]++;
    }
    ll res = 0;
    for(int i = 1; i <= 1e5; i++) {
        DP[i] = max(DP[i - 1], (i - 2 >= 0 ? DP[i - 2] : 0) + A[i] * i);
        res = max(res, DP[i]);
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
- 