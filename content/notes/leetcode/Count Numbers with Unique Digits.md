---
title: Count Numbers with Unique Digits
date: 2023-01-04
lastmod: 2023-01-04
author: Jimmy Lin
tags: ["Math"]
draft: false
---

## Code

Time Complexity: $O(n)$, Space Complexity: $O(1)$

排列組合問題，不重複的排法是階層。

```cpp
class Solution {
public:
    int countNumbersWithUniqueDigits(int n) {
        if(n == 0) return 1;
        if(n == 1) return 10;
        int res = 10;
        int choice = 9;
        int accumulate = 9;
        for(int i = 2; i <= n; i++) {
            accumulate *= choice;
            res += accumulate;
            choice--;
        }
        return res;
    }
};
```

## Link
- [Count Numbers with Unique Digits](https://leetcode.com/problems/count-numbers-with-unique-digits/)