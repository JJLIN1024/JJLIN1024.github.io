---
title: 1398D - Colored Rectangles
date: 2024-02-07
lastmod: 2024-02-07
author:
  - Jimmy Lin
tags:
  - DP
draft: false
---

## Thinking Process

## Code

### Greedy (Wrong Answer)
Time Complexity: $O((R+G+B)\log (R+G+B))$, Space Complexity: $O(R + G + B)$

一開始寫的 Greedy 解法（Wrong Answer!），考慮以下的 case：

R = 3, 3, G = 4, B = 5，則 Greedy 會給出 20，但是答案應該是 27。所以說這題不行用 Greedy（只有兩個顏色的話當然可以），要用 DP。

```cpp
#include<bits/stdc++.h>

using ll = long long;
using ld = long double;
using namespace std;


void run_case(){ 
    int r, g ,b;
    cin >> r >> g >> b;
    vector<int> R(r);
    vector<int> G(g);
    vector<int> B(b);

    for(int i = 0; i < r; i++) cin >> R[i];
    for(int i = 0; i < g; i++) cin >> G[i];
    for(int i = 0; i < b; i++) cin >> B[i];

    sort(R.rbegin(), R.rend());
    sort(G.rbegin(), G.rend());
    sort(B.rbegin(), B.rend());

    int i = 0, j = 0, k = 0;
    ll res = 0;
    // max heap
    auto cmp = [](const pair<int, int>& p1, const pair<int, int>& p2) {return p1.first < p2.first;};
    priority_queue<pair<int, int>, vector<pair<int, int>>, decltype(cmp)> pq(cmp);
    pq.push({R[i++], 0});
    pq.push({G[j++], 1});
    pq.push({B[k++], 2});
    while(!pq.empty()) {
        pair<int, int> p1, p2;
        if(!pq.empty()) {
            p1 = pq.top(); pq.pop();
        } else {
            break;
        }
        if(!pq.empty()) {
            p2 = pq.top(); pq.pop();
        } else {
            break;
        }

        res += 1LL * p1.first * p2.first;
        if(p1.second == 0) {
            if(i < r) pq.push({R[i++], 0});
        } else if(p1.second == 1) {
            if(j < g) pq.push({G[j++], 1});
        } else if(p1.second == 2) {
            if(k < b) pq.push({B[k++], 2});
        }

        if(p2.second == 0) {
            if(i < r) pq.push({R[i++], 0});
        } else if(p2.second == 1) {
            if(j < g) pq.push({G[j++], 1});
        } else if(p2.second == 2) {
            if(k < b) pq.push({B[k++], 2});
        }
    }   
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

### DP
Time Complexity: $O(RGB + R \log R + G \log G + B \log B)$, Space Complexity: $O(RGB)$

```cpp
#include<bits/stdc++.h>

using ll = long long;
using ld = long double;
using namespace std;


void run_case(){ 
    int r, g ,b;
    cin >> r >> g >> b;
    vector<int> R(r);
    vector<int> G(g);
    vector<int> B(b);

    for(int i = 0; i < r; i++) cin >> R[i];
    for(int i = 0; i < g; i++) cin >> G[i];
    for(int i = 0; i < b; i++) cin >> B[i];

    sort(R.rbegin(), R.rend());
    sort(G.rbegin(), G.rend());
    sort(B.rbegin(), B.rend());

    ll res = 0;
    vector<vector<vector<ll>>> dp(r + 1, vector<vector<ll>>(g + 1, vector<ll>(b + 1, 0)));
    for(int i = 0; i <= r; i++) {
        for(int j = 0; j <= g; j++) {
            for(int k = 0; k <= b; k++) {
                ll t = 0;
                if(i != 0 && j != 0) t = max(t, dp[i - 1][j - 1][k] + R[i - 1] * G[j - 1]);
                if(j != 0 && k != 0) t = max(t, dp[i][j - 1][k - 1] + G[j - 1] * B[k - 1]);
                if(i != 0 && k != 0) t = max(t , dp[i - 1][j][k - 1] + R[i - 1] * B[k - 1]);
                dp[i][j][k] = max(dp[i][j][k], t);
                res = max(res, dp[i][j][k]);
            }
        }
    } 
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
- [1398D - Colored Rectangles](https://codeforces.com/problemset/problem/1398/D)