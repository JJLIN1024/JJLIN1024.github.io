---
title: 1326D1 - Prefix-Suffix Palindrome (Easy version)
date: 2024-02-07
lastmod: 2024-02-07
author:
  - Jimmy Lin
tags:
  - string
  - palindrome
draft: false
---

## Thinking Process

- [題目 | Prefix-Suffix Palindrome (Hard version)](https://io.zouht.com/144.html)
## Code

Time Complexity: $O(n^2)$, Space Complexity: $O()$

```cpp
#include<bits/stdc++.h>

using ll = long long;
using ld = long double;
using namespace std;

bool find_palindrome(int l, int r, string& s) {
    while(l <= r && s[l] == s[r]) {
        l++;
        r--;
    }
    return l > r;
}
void run_case(){ 
    string s;
    cin >> s;
    int l = 0, r = s.length() - 1;
    while(l < r && s[l] == s[r]) {
        l++;
        r--;
    }

    int l2, r2;
    for(l2 = l; l2 <= r; l2++) if(find_palindrome(l2, r, s)) break;
    for(r2 = r; r2 >= l; r2--) if(find_palindrome(l, r2, s)) break;
    cout << s.substr(0, l) << (r2 - l + 1 > r - l2 + 1 ? s.substr(l, r2 - l + 1) : s.substr(l2, r - l2 + 1)) << s.substr(r + 1) << "\n";
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
- [1326D1 - Prefix-Suffix Palindrome (Easy version)](https://codeforces.com/problemset/problem/1326/D1)