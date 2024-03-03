---
title: 158B - Taxi
date: 2024-02-04
lastmod: 2024-02-04
author:
  - Jimmy Lin
tags:
  - greedy
draft: false
---

## Thinking Process

4 單獨一組，然後將 3 和 1 配，有多少個 3 就用多少個 3，1 是能配就配，可以想像成每個 3 都先自己一組，然後嘗試將 1 加進去，若 1 沒有配到，3 也只能自己一組。2 的話一定是兩兩一組。（`res += B[4] + B[3] + (B[2] / 2);`）

做到這裡之後，4、3 都已經用完，2 也一定只會剩下 1 個或是沒有剩下。若 2 有剩下，就將他和 1 配一組（如果還有 1 的話）（`B[1] -= min(2, B[1]);`），最後只會剩下 1，1 一定是 4 個 4 個一組（`res += (B[1] + 3) / 4;`）。
## Code

Time Complexity: $O(n)$, Space Complexity: $O(1)$

```cpp
#include<bits/stdc++.h>

using ll = long long;
using ld = long double;
using namespace std;
void run_case(){
    int n;
    cin >> n;
    vector<int> A(n);
    int B[5] = {0};
    for(int i = 0; i < n; i++) {
        cin >> A[i];
        B[A[i]]++;
    }
    int res = 0;
	res += B[4] + B[3] + (B[2] / 2);
	B[1] -= min(B[3], B[1]);
	if (B[2] & 1)
	{
		B[1] -= min(2, B[1]);
		res++;
	}
	res += (B[1] + 3) / 4;
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
- [158B - Taxi](https://codeforces.com/problemset/problem/158/B)