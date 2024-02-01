---
title: Ugly Number II
date: 2022-12-26
lastmod: 2022-12-26
author: Jimmy Lin
tags: ["Heap"]
draft: false
---

## Code

### Heap

可發現此法得到的數字會遠大於用 DP 去解的，要用 `long` 才不會 overflow。

```cpp
class Solution {
public:
    int nthUglyNumber(int n) {
        priority_queue <long, vector<long>, greater<long> > min_heap;
        unordered_set<long> ugly;
        min_heap.push(1);
        for(int i = 0; i < n; i++) {
            long m = min_heap.top();
            if(ugly.count(m * 2) == 0) {
                min_heap.push(m * 2);
                ugly.insert(m * 2);
            }
            if(ugly.count(m * 3) == 0) {
                min_heap.push(m * 3);
                ugly.insert(m * 3);
            }
            if(ugly.count(m * 5) == 0) {
                min_heap.push(m * 5);
                ugly.insert(m * 5);
            }
            if (i != n - 1) min_heap.pop();
        }   
        return min_heap.top();
    }
};
```

不用 set 而消除 duplicate 的寫法：
```cpp
class Solution {
public:
    int nthUglyNumber(int n) {
        priority_queue <long, vector<long>, greater<long> > min_heap;
        min_heap.push(1);
        long m = 1;
        for(int i = 0; i < n; i++) {
            m = min_heap.top();
            min_heap.pop();
            while(!min_heap.empty() && m == min_heap.top()) {
                min_heap.pop();
            }
            min_heap.push(m * 2);
            min_heap.push(m * 3);
            min_heap.push(m * 5);

        }   
        return m;
    }
};
```

### DP-like

TLE 版本，直接使用 [[notes/leetcode/Ugly Number]] 中的解法去暴力搜索。

要想辦法加速。可觀察到：若一個數字是 ugly number，則它二的、三的、五的倍數都會是 ugly number。

```cpp
class Solution {
public:
    int nthUglyNumber(int n) {
        int iter = 1;
        int count = 0;
        while(count < n) {
            if (isUgly(iter)) count++;
            iter++;
        }
        return iter - 1;
    }

    bool isUgly(int n) {
        if(n == 0) return false;
        if(n == 1) return true;
        while(n % 2 == 0) n /= 2;
        while(n % 3 == 0) n /= 3;
        while(n % 5 == 0) n /= 5;
        return n == 1? true : false;
    }

};
```

錯誤加速版本：

```cpp
class Solution {
public:
    int nthUglyNumber(int n) {
        vector<int> ugly(n);
        ugly[0] = 1;
        int p1 = 0;
        int p2 = 0;
        int p3 = 0;
        for(int i = 1; i < n; i++) {
            ugly[i] = min({2 * p1, 3 * p2, 5 * p3});
            if (ugly[i] == 2 * p1) p1++;
            if (ugly[i] == 3 * p2) p2++;
            if (ugly[i] == 5 * p3) p3++;
        }   
        return ugly[n-1];
    }
};
```

正確加速版本：

要將 `p1, p2, p3` 包在 ugly 中使用（`ex: ugly[p1]`）是因為 ugly number 只能是 ugly number 的 2、3、5 倍，如果單純用 `p1, p2, p3`，就會乘到像是 7 這類不是 ugly number 的數字，造成結果不正確。

```cpp
class Solution {
public:
    int nthUglyNumber(int n) {
        vector<int> ugly(n);
        ugly[0] = 1;
        int p1 = 0;
        int p2 = 0;
        int p3 = 0;
        for(int i = 1; i < n; i++) {
            ugly[i] = min({2 * ugly[p1], 3 * ugly[p2], 5 * ugly[p3]});
            if (ugly[i] == 2 * ugly[p1]) p1++;
            if (ugly[i] == 3 * ugly[p2]) p2++;
            if (ugly[i] == 5 * ugly[p3]) p3++;
        }   
        return ugly[n-1];
    }
};
```
## Link
- [Ugly Number II](https://leetcode.com/problems/ugly-number-ii/description/)