---
title: Missing Number - CSES
date: 2024-04-18
lastmod: 2024-04-18
author:
  - Jimmy Lin
tags:
  - bit_manipulation
draft: false
---
same as [[Missing Number]].

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
  int n;
  cin >> n;
  int t = 0, cur;
  for (int i = 1; i < n; i++) {
    cin >> cur;
    t ^= i;
    t ^= cur;
  }
  t ^= n;
  cout << t;
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
- [Missing Number](https://cses.fi/problemset/task/1083/)