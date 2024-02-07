---
title: 1509C - The Sports Festival
date: 2024-02-07
lastmod: 2024-02-07
author:
  - Jimmy Lin
tags:
  - DP
draft: false
---

## Thinking Process

以 `[3, 1, 2]` 為例，觀察可發現，`max(3, 1, 2) - min(3, 1, 2)` 一定會是 2，不過我們可以把 3 放到最後面，這樣 `max(a1, a2) - min(a1, a2)` 就會是 `max(1, 2) - min(1, 2) = 1`，會比把 2 放到最後面還要好。同理，把最小值放到最後面也是一個可行的方式。

透過這樣的觀察，可以推論出，給定一個區間，我們可以將最大值或是最小值放到尾巴，然後繼續處理剩下的數字。

因此，將 array sort 後（`A[j] - A[i])` 就會是最大減最小），可推出 DP 轉移的式子：

`dp[i][j] = min(dp[i + 1][j], dp[i][j - 1]) + A[j] - A[i]`

## Code

Time Complexity: $O(n^2)$, Space Complexity: $O(n^2)$

```cpp
#include<bits/stdc++.h>

using ll = long long;
using ld = long double;
using namespace std;


void run_case(){ 
    int n;
    cin >> n;
    vector<int> A(n);
    for(int i = 0; i < n; i++) cin >> A[i];
    sort(A.begin(), A.end());
    vector<vector<ll>> dp(n, vector<ll>(n, 0));
    for(int i = 1; i < n; i++) {
        for(int j = 0, k = i; k < n; k++, j++) {
            dp[j][k] = min(dp[j + 1][k], dp[j][k - 1]) + A[k] - A[j];
        }
    }
    cout << dp[0][n - 1] << "\n";

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
- [The Sports Festival](https://codeforces.com/problemset/problem/1509/C)