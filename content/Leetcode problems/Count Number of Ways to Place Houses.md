---
title: Count Number of Ways to Place Houses
date: 2022-12-24
lastmod: 2022-12-24
author: Jimmy Lin
tags: ["Dynamic Programming"]
draft: false
---

## Code

靈感來自於 [[House Robber III]] 用一個 size = 2 的 vector 去紀錄不同狀況的 return 值，這裡也是一樣，使用 `house` & `space` 去紀錄當前格子有放房子和沒有放的方法數。

```cpp
class Solution {
public:
    int countHousePlacements(int n) {
       long long mod = 1e9 + 7;
       long long space = 1;
       long long house = 1;
       long long total = space + house; 
       for(int i = 2; i <= n; i++) {
           house = space;
           space = total;
           total = (space + house) % mod;
       }
       return (total * total) % mod;
    }
};
```
## Link
- [Count Number of Ways to Place Houses](https://leetcode.com/problems/count-number-of-ways-to-place-houses/description/)
