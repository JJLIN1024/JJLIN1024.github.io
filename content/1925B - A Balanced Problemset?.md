---
title: 1925B - A Balanced Problemset?
date: 2024-02-04
lastmod: 2024-02-04
author:
  - Jimmy Lin
tags:
  - math
  - gcd
draft: false
---

## Thinking Process

$$gcd(a, b, c, \cdots, z) = gdc(a, a + b, a + b + c, \cdots) = gcd(a + b + c + \cdots + z)$$
所以要將 sum 為 x 的數字分成 n 組，假設分成 a, b, c，那麼即可知 a, b, c 的 gcd 會和 gcd(a + b + c) = gcd(x) 相等，因此我們可以從 x 本身的因數開始嘗試。

對於 x 的因數 i 而言，$x = \frac{x}{i} \cdot i$，這個式子有兩種解讀方式，一種是我們將 x 分成 $\frac{x}{i}$ 組 $i$，第二種是我們將 x 分成 i 組 $\frac{x}{i}$，但不管如何，只要組數大於等於 n，就是合法的答案，因此：

```cpp
if(n <= x/i)
	ans = max(ans, i);
if(n <= i)
	ans = max(ans, x / i);
```

## Code

Time Complexity: $O(\sqrt{x})$, Space Complexity: $O(1)$

```cpp
#include<bits/stdc++.h>

using ll = long long;
using ld = long double;
using namespace std;

void run_case(){ 
    int tc;
    cin >> tc;
    while(tc--)
    {
        int x, n;
        cin >> x >> n;
        int ans = 1;
        for(int i = 1; i * i <= x; i++)
        {
            if(x % i == 0)
            {
                if(n <= x/i)
                    ans = max(ans, i);
                if(n <= i)
                    ans = max(ans, x / i);
            }
        }
        cout << ans << '\n';
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
- [A Balanced Problemset?](https://codeforces.com/problemset/problem/1925/B)