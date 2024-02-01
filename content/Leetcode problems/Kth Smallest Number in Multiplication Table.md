---
title: Kth Smallest Number in Multiplication Table
date: 2022-12-26
lastmod: 2022-12-26
author: Jimmy Lin
tags: ["Binary Search"]
draft: false
---

Follow the template in [Powerful Ultimate Binary Search Template. Solved many problems](https://leetcode.com/discuss/general-discussion/786126/Python-Powerful-Ultimate-Binary-Search-Template.-Solved-many-problems)。

重點在於看出題目有 **monotonicity**，並寫出測試的 function（測試計算出的 mid 是否符合所需）。

## Code

TLE 版本，中間的兩層 for loop 雖然有做 early stop，但是還是太久了。

```cpp
class Solution {
public:
    int findKthNumber(int m, int n, int k) {
        int l = 1, r = m * n;
        while(l < r) {
            int mid = l + (r - l) / 2;
            int count = 0;
            for(int i = 1; i <= m; i++) {
                for(int j = 1; j <= n; j++) {
                    if(i * j <= mid) count++;
                    else break;
                }
            }
            if(count >= k) r = mid;
            else l = mid + 1;
        }
        return l;
    }
};
```

觀察矩陣，發現每一直行都是開頭的 element 的二的幾倍，因此可以用 `mid` 除上開頭元素，就知道在直行中有多少個元素比 `mid` 還要小。Time Complexity 及從 $O(mn)$ 降低到 $O(m)$。

```cpp
class Solution {
public:
    int findKthNumber(int m, int n, int k) {
        int l = 1, r = m * n;
        while(l < r) {
            int mid = l + (r - l) / 2;
            int count = 0;
            for(int i = 1; i <= m; i++) {
                int smallerInEachRow = min(mid / i, n);
                if(smallerInEachRow == 0) break;
                count += smallerInEachRow;
            }
            if(count >= k) r = mid;
            else l = mid + 1;
        }
        return l;
    }
};
```

## Link
- [Kth Smallest Number in Multiplication Table](https://leetcode.com/problems/kth-smallest-number-in-multiplication-table/description/)
