---
title: 466A - Cheap Travel
date: 2024-02-04
lastmod: 2024-02-04
author:
  - Jimmy Lin
tags:
  - math
draft: false
---

## Thinking Process

找 CP 值最高的。

## Code

Time Complexity: $O(1)$, Space Complexity: $O(1)$

```cpp
#include<bits/stdc++.h>

using ll = long long;
using ld = long double;
using namespace std;

void run_case(){
    int n, m, a, b;
    cin >> n >> m >> a >> b;
    double s = (double)b / m;
    int res = 0;
    if(s <= a) {
        res += (n / m) * b;
        res += min((n % m) * a, b); 
    } else {
        res += n * a;
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
- [466A - Cheap Travel](https://codeforces.com/contest/466/problem/A "Codeforces Round 266 (Div. 2)")