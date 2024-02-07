---
title: 271D - Good Substrings
date: 2024-02-07
lastmod: 2024-02-07
author:
  - Jimmy Lin
tags:
  - trie
  - rabin-karp
draft: false
---

## Thinking Process

- [Rabin-Karp Algorithm for Pattern Searching](https://www.geeksforgeeks.org/rabin-karp-algorithm-for-pattern-searching/)
- [9.2 Rabin-Karp String Matching Algorithm](https://youtu.be/qQ8vS2btsxI?si=YbU3HhEMwGYRp_cc)
- [What is the best hash function for Rabin-Karp algorithm?](https://stackoverflow.com/questions/11546791/what-is-the-best-hash-function-for-rabin-karp-algorithm)
## Code

### Rabin Karp: Rolling Hash
Time Complexity: $O(nm)$, Space Complexity: $O(n^2)$

good hash function 不好找，我也不知道底下那個（`hash = hash * 131 ^ s[j];`）是怎麼來的，用了就過了，改成其他的會 wrong answer。

```cpp
#include<bits/stdc++.h>

using ll = long long;
using ld = long double;
using namespace std;

void run_case(){ 
    string s, v;
    int k;
    cin >> s >> v >> k;
    vector<ll> A;
	for(int i = 0; i < s.length(); i++) {
        ll hash = 0;
        for(ll j = i, kk = k; j < s.length() && (v[s[j]-'a'] > '0' || kk--); j++) {
            hash = hash * 131 ^ s[j];
            A.push_back(hash);
        }
    }

	set<ll> res(A.begin(), A.end());
	cout << res.size() << "\n";
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
- [Good Substrings](https://codeforces.com/problemset/problem/271/D)