---
title: Weird Algorithm
date: 2024-04-18
lastmod: 2024-04-18
author:
  - Jimmy Lin
tags:
  - simulation
draft: false
---

```cpp
#include <algorithm>
#include <iostream>

using namespace std;

#define ll long long
#define ld long double

const int MAX_N = 1e5 + 5;
const ll MOD = 1e9 + 7;
const ll INF = 1e9;
const ld EPS = 1e-9;

void solve() {
  ll n;
  cin >> n;
  while (n != 1) {
    cout << n << " ";
    if (n % 2 == 0) {
      n /= 2;
    } else {
      n = n * 3 + 1;
    }
  }
  cout << 1 << " ";
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
- [Weird Algorithm](https://cses.fi/problemset/task/1068)