---
title: 1920B - Summation Game
date: 2024-02-04
lastmod: 2024-02-04
author:
  - Jimmy Lin
tags:
  - prefix_sum
draft: false
---

## Thinking Process

在 Alice 移除一定數量的 elements 之後，Bob 的最佳選擇會是對剩下的 elements 由大而小選 x 個，negate its value。

因為 Bob 的動作是固定的，所以對於 Alice 來說，就是要選擇移除多少個 elements 會使得 Bob 動作完後，剩下的 array sum 最大。

對於一個 array 來說，若 Alice 選擇（由大而小）移除 i 個 element，然後 Bob negate 剩下來最大的 x 個，則 array sum 可藉由 prefix sum 快速求出， 會是 `A[max(n - i - x, 0)] - A[0])`，而 Bob negate 的部分之和為 `A[n - i] - A[max(n - i - x, 0)]`。

因此，array sum 會是：

```cpp
A[max(n - i - x, 0)] - A[0]) - (A[n - i] - A[max(n - i - x, 0)]);
```
## Code

Time Complexity: $O(n \log n)$, Space Complexity: $O(n)$

```cpp
#include<bits/stdc++.h>

using ll = long long;
using ld = long double;
using namespace std;
void run_case(){
    int n, k, x;
    cin >> n >> k >> x;
    vector<int> A(n + 1);
    A[0] = 0;
    for(int i = 1; i <= n; i++) cin >> A[i];
    sort(A.begin(), A.end());
    for(int i = 1; i < n + 1; i++) {
        A[i] += A[i - 1];
    }

    int res = INT_MIN;
    for(int i = 0; i <= k; i++) {
        res = max(res, (A[max(n - i - x, 0)] - A[0]) - (A[n - i] - A[max(n - i - x, 0)]));
    }
    cout << res << "\n";
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
- [1920B - Summation Game](https://codeforces.com/contest/1920/problem/B "Codeforces Round 919 (Div. 2)")