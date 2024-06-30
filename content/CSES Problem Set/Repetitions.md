---
title: Repetitions
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

using namespace std;

#define ll long long
#define ld long double

const int MAX_N = 1e5 + 5;
const ll MOD = 1e9 + 7;
const ll INF = 1e9;
const ld EPS = 1e-9;

void solve() {
  int res = 1;
  string s;
  getline(cin, s);

  int cur = 1;
  for (int i = 0; i < s.length(); i++) {
    if (i > 0 && s[i] == s[i - 1]) {
      cur++;
      res = max(res, cur);
    } else {
      cur = 1;
    }
  }
  cout << res;
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
- [Repetitions](https://cses.fi/problemset/task/1069)