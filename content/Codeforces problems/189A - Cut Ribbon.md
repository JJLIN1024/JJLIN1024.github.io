---
title: 189A - Cut Ribbon
date: 2024-02-05
lastmod: 2024-02-05
author:
  - Jimmy Lin
tags:
  - DP
draft: false
---

## Thinking Process

經典 DP 題，只是要小心一些 implementation 上的細節，例如 vector out of bounds。

定義 `dp[n]` 為使用 a, b,c 去切割 n 的方法數，我們可以選擇用 a or b or c，切完後會剩下 n - a, n - b, n -c ，再對三種的結果取 max。

## Code

Time Complexity: $O(n)$, Space Complexity: $O(n)$

```cpp
#include<bits/stdc++.h>

using ll = long long;
using ld = long double;
using namespace std;

void run_case(){ 
    int n, a, b, c;
    cin >> n >> a >> b >> c;
    vector<int> dp(n + 1, 0);
    if(a < n + 1) dp[a] = 1;
    if(b < n + 1) dp[b] = 1;
    if(c < n + 1) dp[c] = 1;
    for(int i = 0; i < n + 1; i++) {
        if(i >= a && dp[i - a] != 0) dp[i] = max(dp[i], dp[i - a] + 1);
        if(i >= b && dp[i - b] != 0) dp[i] = max(dp[i], dp[i - b] + 1);
        if(i >= c && dp[i - c] != 0) dp[i] = max(dp[i], dp[i - c] + 1);
    }
    cout << dp[n] << "\n";
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