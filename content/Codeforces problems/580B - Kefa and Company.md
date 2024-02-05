---
title: 580B - Kefa and Company
date: 2024-02-05
lastmod: 2024-02-05
author:
  - Jimmy Lin
tags:
  - sliding_window
draft: false
---

## Thinking Process

經典 sliding window 的題目。
## Code

Time Complexity: $O(n \log n)$, Space Complexity: $O(n)$

```cpp
#include<bits/stdc++.h>

using ll = long long;
using ld = long double;
using namespace std;

void run_case(){ 
    int n, d, m, f;
    cin >> n >> d;
    vector<pair<int, int>> A(n);
    for(int i = 0; i < n; i++) {
        cin >> m >> f;
        A[i] = {m, f}; 
    }

    auto cmp = [](const pair<int, int>& p1, const pair<int, int>& p2){
        return p1.first < p2.first;
    };

    sort(A.begin(), A.end(), cmp);

    int i = 0;
    ll res = 0, cur = 0;
    for(int j = 0; j < n; j++) {
        cur += A[j].second;
        while(i < j && (A[j].first - A[i].first) >= d) {
            cur -= A[i].second;
            i++;
        }
        res = max(res, cur);
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