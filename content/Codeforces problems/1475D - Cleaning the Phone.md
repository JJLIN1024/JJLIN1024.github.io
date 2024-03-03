---
title: 1475D - Cleaning the Phone
date: 2024-02-07
lastmod: 2024-02-07
author:
  - Jimmy Lin
tags:
  - two_pointer
  - prefix_sum
draft: false
---

## Thinking Process

經典雙指針的題目。仔細觀察題目就會發現只有 1 & 2 兩種，而選 2 cost 會比較大，所以結合 prefix sum 用 two pointer 嘗試將 2 用 1 取代。
## Code

Time Complexity: $O(n \log n)$, Space Complexity: $O(n)$

```cpp
#include<bits/stdc++.h>

using ll = long long;
using ld = long double;
using namespace std;

void run_case(){ 
    int n, m;
    cin >> n >> m;
    vector<int> t(n), A, B;
    for(auto& i: t) cin >> i;
    int a;
    for(auto& i: t) {
        cin >> a;
        if(a == 1) A.push_back(i);
        else B.push_back(i);
    }

    sort(A.rbegin(), A.rend());
    sort(B.rbegin(), B.rend());

    int R = B.size();
    ll sumA = 0, sumB = accumulate(B.begin(), B.end(), 0LL);
    ll res = LLONG_MAX;
    for(int L = 0; L <= A.size(); L++) {
        while(R > 0 && sumA + sumB - B[R - 1] >= m) sumB -= B[--R];
        if(sumA + sumB >= m) res = min(res, 2LL * R + L);
        if(L != A.size()) sumA += A[L];
    }

    cout << (res == LLONG_MAX ? -1 : res) << "\n";
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
- [1475D - Cleaning the Phone](https://codeforces.com/problemset/problem/1475/D)