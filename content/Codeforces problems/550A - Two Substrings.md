---
title: 550A - Two Substrings
date: 2024-02-05
lastmod: 2024-02-05
author:
  - Jimmy Lin
tags:
  - sliding_window
draft: false
---

## Code

### Sliding Window

Time Complexity: $O(n)$, Space Complexity: $O(n)$

找到所有 substring 的位置後，用類似 [[Find Beautiful Indices in the Given Array II]] 的方法（sliding window）找出是否有合適的解。

```cpp
#include<bits/stdc++.h>

using ll = long long;
using ld = long double;
using namespace std;

void run_case(){ 
    string s;
    getline(cin, s);

    vector<int> A, B;
    
    for(int i = 0; i < s.length() - 1; i++) {
        string sub = s.substr(i, 2);
        if(sub == "AB") A.push_back(i);
        if(sub == "BA") B.push_back(i);
    }

    int j = B.size() - 1;
    for(int i = 0; i < A.size(); i++) {
        while(j > 0 && B[j] >= A[i] && (B[j] - A[i]) < 2) j--;
        if(j >= 0 && abs(A[i] - B[j]) >= 2) {
            cout << "YES" << "\n";
            return;
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

### Just Check

先檢查是否有 AB，找到之後在剩下的 string 裡找有沒有 BA，反過來也是一樣（先找 BA）。Memory Usage 比上一個解法還要少。

Time Complexity: $O(n)$, Space Complexity: $O(1)$

```cpp
#include<bits/stdc++.h>

using ll = long long;
using ld = long double;
using namespace std;

bool check(string& s, string& A, string& B) {
    int a = -1;
    for(int i = 0; i < s.length() - 1; i++) {
        string sub = s.substr(i, 2);
        if(sub == A) {
            a = i + 2;
            break;
        }
    }

    if(a < s.length() - 1) {
        for(int i = a; i < s.length() - 1; i++) {
            string sub = s.substr(i, 2);
            if(sub == B) {
                return true;
                break;
            }
        }
    }
    return false;
}

void run_case(){ 
    string s;
    getline(cin, s);
    string a = "AB";
    string b = "BA";
    if(check(s, a, b)) {
        cout << "YES" << "\n";
        return;
    }
    if(check(s, b, a)) {
        cout << "YES" << "\n";
        return;
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