---
title: 545C - Woodcutters
date: 2024-02-05
lastmod: 2024-02-05
author:
  - Jimmy Lin
tags:
  - DP
  - greedy
draft: false
---

## Thinking Process

對於一顆樹來說，他有三種選擇，向左倒，向右倒，或是不倒，所以很自然的就可以想到使用 DP 去解這題。

小技巧是在頭和尾加了兩個 dummy tree，這樣就不用特別處理頭和尾。
## Code

Time Complexity: $O(n)$, Space Complexity: $O(n)$

```cpp
#include<bits/stdc++.h>

using ll = long long;
using ld = long double;
using namespace std;

void run_case(){ 
    int n;
    cin >> n;
    
    vector<pair<int, int>> A;
    // dummy
    A.push_back({INT_MIN, 0});
    int x, h;
    for(int i = 0; i < n; i++) {
        cin >> x >> h;
        A.push_back({x, h});
    }
    // dummy
    A.push_back({INT_MAX, 0});

    int m = A.size();
    // 0, 1, 2 = fell left, stay, fell right
    vector<vector<int>> DP(m, vector<int>(3, 0));
    
    for(int i = 1; i < m - 1; i++) {
        int curX = A[i].first;
        int curH = A[i].second;
        int prevX = A[i - 1].first;
        int prevH = A[i - 1].second;
        int nextX = A[i + 1].first;
        int nextH = A[i + 1].second;

        // current tree fall left
        if((curX - curH) > prevX) {
            // prev tree can fall right
            if((curX - curH) > (prevX + prevH)) {
                DP[i][0] = max(DP[i - 1][0], max(DP[i - 1][1], DP[i - 1][2])) + 1;
            } else {
                DP[i][0] = max(DP[i - 1][0], DP[i - 1][1]) + 1;
            }
        }

        // stay
        DP[i][1] = max(DP[i - 1][0], max(DP[i - 1][1], DP[i - 1][2]));

        // current tree fall right
        if(curX + curH < nextX) {
            DP[i][2] = max(DP[i - 1][0], max(DP[i - 1][1], DP[i - 1][2])) + 1;
        } 
    }

    int res = max(DP[m - 2][0], max(DP[m - 2][1], DP[m - 2][2]));
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
- 