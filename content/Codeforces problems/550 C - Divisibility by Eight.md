---
title: 550 C - Divisibility by Eight
date: 2024-02-05
lastmod: 2024-02-05
author:
  - Jimmy Lin
tags:
  - math
draft: false
---

## Thinking Process

對於一個數字來說，尾巴的三個數字和為 8 的倍數，那這個數就可以被 8 整除。又因為我們可以刪掉任意數量的 digit，所以用三層迴圈暴力選出任意三個 digit 的組合，看看是否可以被 8 整除。
## Code

Time Complexity: $O(n^3)$, Space Complexity: $O(1)$

```cpp
#include<bits/stdc++.h>

using ll = long long;
using ld = long double;
using namespace std;


void run_case(){ 
    string s;
    cin >> s;
    for(int i = 0; i < s.length(); i++) {
        int t1 = s[i] - '0';
        if(t1 % 8 == 0) {
            cout << "YES" << "\n";
            cout << t1 << "\n";
            return;
        }
        for(int j = i + 1; j < s.length(); j++) {
            int t2 = t1 * 10 + s[j] - '0';
            if(t2 % 8 == 0) {
                cout << "YES" << "\n";
                cout << t2 << "\n";
                return;
            }
            for(int k = j + 1; k < s.length(); k++) {
                int t3 = t2 * 10 + s[k] - '0';
                if(t3 % 8 == 0) {
                    cout << "YES" << "\n";
                    cout << t3 << "\n";
                    return;
                }
            }
        }
    }
    
    cout << "NO" << "\n";
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