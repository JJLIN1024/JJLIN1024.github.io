---
title: 1922C - Closest Cities
date: 2024-02-04
lastmod: 2024-02-04
author:
  - Jimmy Lin
tags:
  - prefix_sum
draft: false
---

## Thinking Process

有 m 個 query，可以先建立好 prefix sum，從任意 x to y city 的 cost，查詢就是 $O(1)$。

例子：
	0 8 12 15 20
L:     0 1  2 3  8
R:     14 6  2 1  0

## Code

Time Complexity: $O(n + m)$, Space Complexity: $O(n)$

```cpp
#include<bits/stdc++.h>

using ll = long long;
using ld = long double;
using namespace std;

void run_case(){ 
    int n, m, x, y;
    cin >> n;
    vector<int> A(n);
    for(int i = 0; i < n; i++) cin >> A[i];

    vector<int> L(n, 0), R(n, 0);
    /*
       0 8 12 15 20
    L: 0 1  2 3  8
    R:14 6  2 1  0
    */
    for(int i = 1; i < n; i++) {
        int distR = (A[i] - A[i - 1]);
        int distL = i - 2 < 0 ? INT_MAX : A[i - 1] - A[i - 2];
        if(distL > distR)
            L[i] = L[i - 1] + 1;
        else
            L[i] = L[i - 1] + (A[i] - A[i - 1]);
    }

    for(int i = n - 2; i >= 0; i--) {
        int distL = A[i + 1] - A[i];
        int distR = i + 2 >= n ? INT_MAX : A[i + 2] - A[i + 1];
        if(distL < distR) 
            R[i] = R[i + 1] + 1;
        else
            R[i] = R[i + 1] + (A[i + 1] - A[i]);
    }

    cin >> m;
    for(int i = 0; i < m; i++) {
        cin >> x >> y;
        x--;
        y--;
        if(x < y) {
            cout << L[y] - L[x] << "\n";
        } else {
            cout << R[y] - R[x] << "\n";
        }   
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(NULL);
    int tests = 1;
    cin >> tests;
    while(tests--){
        run_case();
    }
    return 0;
}

```

## Source
- [1922C - Closest Cities](https://codeforces.com/problemset/problem/1922/C)