---
title: 1396B - Stoned Game
date: 2024-02-07
lastmod: 2024-02-07
author:
  - Jimmy Lin
tags:
  - game
draft: false
---

## Thinking Process

因為不能夠馬上選擇同一個 pile，所以相當於當有一堆石頭數量超過總數的一半時（`maxPile * 2 > numStones`），第一個玩家就可以一直選擇這一堆石頭，迫使第二個玩家一直選擇其他堆石頭，因為其他堆石頭數量總和少於這一堆，所以第一個玩家一定會贏。

例子：`[1, 2, 5]`，玩家 A 可以一直選第三堆，當 `1, 2` 都被玩家 B 拿完之後，因為 B 不能選擇 A 剛剛拿的那堆，所以 B 無法選擇，輸了遊戲。

若每堆石頭個數都不超過全部的一半，則分成兩種 case，第一種是全部的總數是偶數，這樣的話，第二個玩家總是可以贏得遊戲。若將每顆石頭都編號，假設玩家 A 選擇的石頭的編號是 i ，全部有 S 顆石頭，則玩家 B 的策略就是選擇 `i + S / 2`，就可以贏得遊戲。例如：`[1, 2, 3]` ，編號會是 `[[0], [1, 2], [3, 4, 5]]`，則玩家 A & B 選擇的 pair 可能會是 `(0, 3), (1, 4), (2, 5)`，因為每堆都不超過 `S / 2`，所以玩家 B 永遠不會選到和 A 同一堆的石頭。

若石頭總數是奇數，則玩家 A 任意選了一顆石頭後，總數就變成偶數，根據剛剛的討論，這時候玩家 B 就一定會輸。
## Code

Time Complexity: $O(1)$, Space Complexity: $O(1)$

```cpp
#include<bits/stdc++.h>

using ll = long long;
using ld = long double;
using namespace std;


void run_case(){ 
    int t;
	cin >> t;
	while (t--) {
		int n;
		cin >> n;

		vector<int> a(n);
		for (int &x : a) cin >> x;

		int maxPile = *max_element(a.begin(), a.end());
		int numStones = accumulate(a.begin(), a.end(), 0);

		if (maxPile * 2 > numStones || (numStones & 1)) cout << "T" << endl;
		else cout << "HL" << endl;
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
- 