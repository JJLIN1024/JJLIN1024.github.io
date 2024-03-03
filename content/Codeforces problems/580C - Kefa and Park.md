---
title: 580C - Kefa and Park
date: 2024-02-05
lastmod: 2024-02-05
author:
  - Jimmy Lin
tags:
  - tree
  - dfs
draft: false
---

## Thinking Process

用 dfs 就可以解決

## Code

Time Complexity: $O(n)$, Space Complexity: $O(n)$

```cpp
#include<bits/stdc++.h>

using ll = long long;
using ld = long double;
using namespace std;

int dfs(int idx, vector<vector<int>>& adj, vector<bool>& visited, vector<int>& cat, int catCount, int m) {
    if(visited[idx]) return 0;
    visited[idx] = true;
    
    catCount = cat[idx - 1] == 1 ? catCount - 1 : m; 
    // meet m consecutive cats   
    if(catCount == -1) return 0;

    int res = 0;
    bool tag = false;
    for(int i = 0; i < adj[idx].size(); i++) {
        if(!visited[adj[idx][i]]) tag = true;
        res += dfs(adj[idx][i], adj, visited, cat, catCount, m);
    }
    // it's a leave node
    if(!tag) return 1;
    return res;
}

void run_case(){ 
    int n, m;
    cin >> n >> m;
    
    vector<int> cat(n, 0);
    for(int i = 0; i < n; i++) {
        cin >> cat[i];
    }
    vector<vector<int>> adj(n + 1);
    int x, y;
    for(int i = 0; i < n - 1; i++) {
        cin >> x >> y;
        adj[x].push_back(y);
        adj[y].push_back(x);
    }
    vector<bool> visited(n + 1, false);
    int count;
    count = dfs(1, adj, visited, cat, m, m);
    cout << count << "\n";
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
-  [Kefa and Park](https://codeforces.com/problemset/problem/580/C)