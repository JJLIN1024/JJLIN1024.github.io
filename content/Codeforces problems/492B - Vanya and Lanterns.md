---
title: 492B - Vanya and Lanterns
date: 2024-02-04
lastmod: 2024-02-04
author:
  - Jimmy Lin
tags:
  - sorting
draft: false
---

## Thinking Process

一開始想到用 binary search 去搜尋，並用 [[Merge Intervals]] 的概念判斷路燈照明範圍是否可以覆蓋整條街。但這題答案可能會是浮點數，而且這樣做太慢了。

所以再對題目仔細觀察，可以發現兩盞路燈之間的距離之最大值除以二就會是答案，因為相距最遠的路燈會是 bottle neck。

## Code

Time Complexity: $O(n \log n)$, Space Complexity: $O(n)$

```cpp
#include<bits/stdc++.h>

using ll = long long;
using ld = long double;
using namespace std;


void run_case(){
    int n, l;
    cin >> n >> l;
    vector<int> A(n, 0);
    for(int i = 0; i < n; i++) cin >> A[i];
    sort(A.begin(), A.end());

    int res = 2 * max(A[0], l - A[n - 1]);
    for(int i = 0; i < n - 1; i++) {
        res = max(res, A[i + 1] - A[i]);
    }
    cout << fixed << setprecision(10) << (double)res / 2;
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
- [492B - Vanya and Lanterns](https://codeforces.com/problemset/problem/492/B)