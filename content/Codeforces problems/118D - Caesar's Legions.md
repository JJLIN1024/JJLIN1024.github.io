---
title: 118D - Caesar's Legions
date: 2024-02-07
lastmod: 2024-02-07
author:
  - Jimmy Lin
tags: 
draft: false
---

## Thinking Process

DP 狀態轉移，為何 4D 可以變成 3D，以及 4D 為何是那樣轉移？

## Code

Time Complexity: $O(n^4)$, Space Complexity: $O(n^4)$

```cpp
#include<bits/stdc++.h>

using ll = long long;
using ld = long double;
using namespace std;

ll dp[101][101][11][11];
const int mod{100000000};

void run_case(){ 

    memset(dp, 0, sizeof dp);
    int n1, n2, k1, k2;
    cin >> n1 >> n2 >> k1 >> k2;

    for(int i{0}; i <= n1; ++i){
        for(int j{0}; j <= n2; ++j){
            for(int k{0}; k <= k1; ++k){
                for(int l{0}; l <= k2; ++l){
                    long long int ans{0};
                    if(i + j == 0){
                        ans = 1;
                    } else {
                        if(i > 0 and k > 0){
                            ans += dp[i - 1][j][k - 1][k2];
                            ans %= mod;
                        }
                        if(j > 0 and l > 0){
                            ans += dp[i][j - 1][k1][l - 1];
                            ans %= mod;
                        }
                    }
                    dp[i][j][k][l] = ans;
                }
            }
        }
    }

    cout << dp[n1][n2][k1][k2] << endl;

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
-  [118D - Caesar's Legions](https://codeforces.com/problemset/problem/118/D)