---
title: 1921D - Very Different Array
date: 2024-02-04
lastmod: 2024-02-04
author:
  - Jimmy Lin
tags:
  - greedy
draft: false
---

## Thinking Process

很容易就可以看出是 greedy 的題目。

小的數字要和大的配在一起才會使得差距和最大，而配在一起的方式有兩種，以 `A = [1, 2, 4, 6]` 和 `B = [1, 2, 3, 3, 5, 7]` 為例，有兩種方式可以配，第一種是 A 從左邊開始， B 從右邊過來，第二種是 B 從左邊開始，但是 A 從右邊過來。

所以我們兩種方式都跑跑看，在過程中取 max。
## Code

Time Complexity: $O(n \log n)$, Space Complexity: $O(1)$

```cpp
#include<bits/stdc++.h>

using ll = long long;
using ld = long double;
using namespace std;
void run_case(){
    int n, m;
	cin >> n >> m;
	vector<int> a(n);
	for (int i = 0; i < n; i++) cin >> a[i];
	vector<int> b(m);
	for (int i = 0; i < m; i++) cin >> b[i];
	sort(a.begin(), a.end());
	sort(b.begin(), b.end());

	int res = 0, tmp = 0;
	for(int i = 0; i < n; i++) {
		tmp += abs(a[i] - b[n - i - 1]);
		res = max(res, tmp);
	}

	for(int i = 0; i < n; i++) {
		tmp -= abs(a[i] - b[n - i - 1]);
		tmp += abs(a[i] - b[m - i - 1]);
		res = max(res, tmp);
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
- [Problem - 1921D - Codeforces](https://codeforces.com/problemset/problem/1921/D)