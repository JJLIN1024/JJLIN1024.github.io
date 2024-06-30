---
title: permutation
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

  if (n == 1)
    cout << 1;
  else if (n == 2 || n == 3)
    cout << "NO SOLUTION";
  else {
    /*
    n == 4: 2 4 1 3 
    n == 5: 2 4 1 3 5 
    */
    if (n % 2 == 0) {
      for(int i = 2; i <= n; i += 2)
        cout << i << " ";
      for(int i = 1; i < n; i += 2)
        cout << i << " ";
    } else {
      for(int i = 2; i < n; i += 2)
        cout << i << " ";
      for(int i = 1; i <= n; i += 2)
        cout << i << " ";
    }
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
- [Permutations](https://cses.fi/problemset/task/1070/)