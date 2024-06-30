---
title: Increasing Array
date: 2024-04-18
lastmod: 2024-04-18
author:
  - Jimmy Lin
tags: 
draft: false
---

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

using namespace std;

#define ll long long
#define ld long double

const int MAX_N = 1e5 + 5;
const ll MOD = 1e9 + 7;
const ll INF = 1e9;
const ld EPS = 1e-9;

void solve() {
  int n;
  cin >> n;
  vector<int> A(n);
  for (int i = 0; i < n; i++) {
    cin >> A[i];
  }

  ll cost = 0;
  for (int i = 1; i < n; i++) {
    if (A[i - 1] > A[i]) {
      cost += (A[i - 1] - A[i]);
      A[i] = A[i - 1];
    }
  }
  cout << cost;
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
- [Increasing Array](https://cses.fi/problemset/task/1094)