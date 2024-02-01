---
title: Ugly Number III
date: 2022-12-26
lastmod: 2022-12-26
author: Jimmy Lin
tags: ["Binary Search", "Heap", "Number Theory"]
draft: false
---

這題看起來像是用 Heap，類似 [[Ugly Number II]] ，考慮用 pointer，且因為這題只需要可以被 `a,b,c` 整除，不需要因數完全只能是 `a,b,c`的倍數，因此 pointer 不用當成 array index 來用。

但是用 Heap 會 TLE。

## Code

Heap 版本：
```cpp
class Solution {
public:
    int nthUglyNumber(int n, int a, int b, int c) {
        priority_queue <long, vector<long>, greater<long> > min_heap;
        long pa = 1;
        long pb = 1;
        long pc = 1;
        long m;
        for(int i = 0; i < n; i++) {
            min_heap.push(pa * a);
            min_heap.push(pb * b);
            min_heap.push(pc * c);
            pa++;
            pb++;
            pc++;
            m = min_heap.top();
            min_heap.pop();
            while(!min_heap.empty() && m == min_heap.top()) {
                min_heap.pop();
            }
            
        }   
        return m;
    }
};
```


Binary search 版本：

定義 `F(N)` 為包含 `N` 以下可被 `a,b,c` 整除的數字個數：

`F(N) = a + b + c - a ∩ c - a ∩ b - b ∩ c + a ∩ b ∩ c`  
`F(N) = N/a + N/b + N/c - N/lcm(a, c) - N/lcm(a, b) - N/lcm(b, c) + N/lcm(a, b, c)` (lcm = least common multiple)

而我們知道：`ab = lcm(a,b) * gcd(a, b)`。

```cpp
class Solution {
public:
    int nthUglyNumber(int n, int A, int B, int C) {
        long a = (long) A;
        long b = (long) B;
        long c = (long) C;
        // gcd will do, __gcd is private
        long ab = a * b / __gcd(a, b);
        long bc = b * c / __gcd(b, c);
        long ac = a * c / __gcd(a, c);
        long abc = a * bc / __gcd(a, bc);

        long l = 1, r = pow(10, 10);
        while(l < r) {
            long mid = l + (r - l) / 2;
            long uglyNum = mid / a + mid / b + mid / c - mid / ab - mid / bc - mid / ac + mid / abc;
            if(uglyNum >= n) r = mid;
            else l = mid + 1;
        }
        return l;
    }
};
```


## Link
- [Ugly Number III](https://leetcode.com/problems/ugly-number-iii/)
