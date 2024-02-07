---
title: 339D - Xenia and Bit Operations
date: 2024-02-06
lastmod: 2024-02-06
author:
  - Jimmy Lin
tags:
  - segment_tree
draft: false
---
- [線段樹](https://cp.wiwiho.me/segment-tree/)
## Code

Time Complexity: $O(n + m \log n)$, Space Complexity: $O(n)$

用 level 紀錄該使用 XOR 還是 OR，其他的就和 [[Range Sum Query - Mutable]] 類似，就是典型的 segment tree 的題目。

```cpp
#include<bits/stdc++.h>

using ll = long long;
using ld = long double;
using namespace std;

#define lc 2 * index + 1
#define rc 2 * index + 2
vector<ll> S;
vector<ll> A;
vector<ll> level;

void build(ll left, ll right, ll index) {
    if(left == right) {
        S[index] = A[left];
        level[index] = 1;
        return;
    }
    ll mid = (left + right) / 2;
    build(left, mid, lc);
    build(mid + 1, right, rc);

    level[index] = max(level[lc], level[rc]) + 1;
    if(level[index] & 1) S[index] = (S[lc] ^ S[rc]);
    else S[index] = S[lc] | S[rc];
}

void update(ll left, ll right, ll index, ll t, ll val) {
    if(t < left || t > right) return;
    if(t == left && t == right) {
        S[index] = val;
        level[index] = 1;
        return;
    }

    ll mid = (left + right) / 2;
    update(left, mid, lc, t, val);
    update(mid + 1, right, rc, t, val);

    if(level[index] & 1) S[index] = (S[lc] ^ S[rc]);
    else S[index] = S[lc] | S[rc];
        
}

void run_case(){ 
    int n, m;
    cin >> n >> m;
    ll size = 1 << n;
    A.resize(size);
    S.resize(4 * size);
    level.resize(4 * size);

    for(int i = 0; i < size; i++) cin >> A[i];
    build(0, size - 1, 0);

    ll p, b;
    for(int i = 0; i < m; i++) {
        cin >> p >> b;
        update(0, size - 1, 0, p - 1, b);
        cout << S[0] << "\n";
    }

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
- [Xenia and Bit Operations](https://codeforces.com/problemset/problem/339/D)