---
title: 706B - Interesting drink
date: 2024-02-04
lastmod: 2024-02-04
author:
  - Jimmy Lin
tags:
  - binary_search
draft: false
---

## Thinking Process

經典 binary search 的題目。
## Code

Time Complexity: $O(q \log n)$, Space Complexity: $O(n)$

```cpp
#include<bits/stdc++.h>

using ll = long long;
using ld = long double;
using namespace std;

void run_case(){ 
    int n;
    cin >> n;
    vector<int> A(n);
    for(int i = 0; i < n; i++) {
        cin >> A[i];
    }
    sort(A.begin(), A.end());
    int q;
    cin >> q;
    int coin;
    for(int i = 0; i < q; i++) {
        cin >> coin;
        int l = 0, r = A.size();
        while(l < r) {
            int m = l + (r - l) / 2;
            if(A[m] > coin) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        cout << l << "\n";
    }
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
- [Interesting drink](https://codeforces.com/problemset/problem/706/B)