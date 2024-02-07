---
title: 161D - Distance in Tree
date: 2024-02-06
lastmod: 2024-02-06
author:
  - Jimmy Lin
tags: 
draft: false
---

## Thinking Process

![[161D - Distance in Tree - DP Graph|1200x800]]

## Code

Time Complexity: $O(nk)$, Space Complexity: $O(nk)$

```cpp
#include<bits/stdc++.h>

using ll = long long;
using ld = long double;
using namespace std;

int n, k, a, b, res = 0;
vector<vector<int>> adj;
vector<vector<int>> dp;

void dfs(int u, int parent) {
    dp[u][0] = 1;
    for(auto v: adj[u]) {
        if(v == parent) continue;
        dfs(v, u);
        for(int j = 0; j < k; j++) res += dp[u][j] * dp[v][k - 1 - j];
        for(int j = 1; j <= k; j++) dp[u][j] += dp[v][j - 1];
    }
}

void run_case(){ 

    cin >> n >> k;
    adj.resize(n);
    dp.resize(n);
    for(int i = 0; i < n; i++) {
        dp[i].resize(k + 1);
    }

    for(int i = 1; i < n; i++) {
        cin >> a >> b;
        adj[a - 1].push_back(b - 1);
        adj[b - 1].push_back(a - 1);
    }
    dfs(0, -1);
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
- [Distance in Tree](https://codeforces.com/problemset/problem/161/D)