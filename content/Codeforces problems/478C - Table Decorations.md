---
title: 478C - Table Decorations
date: 2024-02-05
lastmod: 2024-02-05
author:
  - Jimmy Lin
tags:
  - math
draft: false
---

## Thinking Process

題目資料給的很大，顯然不是模擬的意思。所以應是利用貪心思想。

思路是先對所給三個數值按降序排序，得到a、b、c。然後判斷a與(b + c) * 2的關係：

若a >= (b + c) * 2，則拿兩個a分別給b或c，則限制因素為b+c。所以最後解為b+c（a剩餘多了）。如果是三種顏色都挑，則提高了題目的要求，也就是只需三個顏色不都相同就可以。

若a < (b+c) * 2，則限制因素為a。這時解為(a + b + c) / 3。解釋是：首先可以發現在滿足這個條件時，a是不夠的，也就是說在a兩個兩個取完之前，b和c一定至少有一個還有剩。那麼假設一個資料 3 3 2。模擬：1 2 2；0 0 2。也就是後面一定會剩下。那麼是否會出現最後是0 1 6這種情況呢？也就是b的個數又成為限制因素。

我反推了試試：0 1 6；2 2 6；4 3 6；6 4 6；8 5 6；10 6 6（5個桌子）。

而實際上對於這個資料正確解法應是10 6 6；8 5 6；6 5 5；4 4 5；2 4 4；0 3 4；0 3 2；0 1 1（7個桌子）。

所以，0 1 6這種情況的出現是因為在中間的選擇過程中就已經不滿足貪心。

也就是說最後剩下的兩個一定會是用到0 1、1 0、1 1三者之一，即剩下1個或2個。

所以整數除法(a + b + c) / 3 為正解。

## Code

Time Complexity: $O(1)$, Space Complexity: $O(1)$

```cpp
#include<bits/stdc++.h>

using ll = long long;
using ld = long double;
using namespace std;


void run_case(){ 
    vector<ll> A(3);
    cin >> A[0] >> A[1] >> A[2];
    sort(A.begin(), A.end());

    if(2 * (A[0] + A[1]) <= A[2])
        cout << A[0] + A[1] << "\n";
    else 
        cout << (A[0] + A[1] + A[2]) / 3 << "\n";
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