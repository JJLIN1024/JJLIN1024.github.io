---
title: Two Knights
date: 2024-04-19
lastmod: 2024-04-19
author:
  - Jimmy Lin
tags: 
draft: false
---

```cpp
#include <algorithm>
#include <iostream>

using namespace std;

#define ll long long
#define ld long double

const int MAx_N = 1e5 + 5;
const ll MOD = 1e9 + 7;
const ll INF = 1e9;
const ld EPS = 1e-9;

void solve() {
  int n;
  cin >> n;
  for (int k = 1; k <= n; k++) {
    ll a = k * k, a2 = a * (a - 1) / 2;
    if (k > 2) {
      a2 -= 4 * (k - 1) * (k - 2);
    }
    cout << a2 << "\n";
  }
  
}

int main() {
  ios_base::sync_with_stdio(0);
  cin.tie(0); cout.tie(0);
  int tc = 1;
  // cin >> tc;
  for (int t = 1; t <= tc; t++) {
    // cout << "Case #" << t << ": ";
    solve();
  }
}
```

## Source
- [Two Knights](https://cses.fi/problemset/task/1072/)
- [geeksforgeeks solution](https://www.geeksforgeeks.org/cses-solutions-two-knights/)