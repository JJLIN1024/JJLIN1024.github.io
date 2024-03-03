---
title: Minimum Number of Days to Make m Bouquets
date: 2022-12-25
lastmod: 2022-12-25
author: Jimmy Lin
tags: ["binary search"]
draft: false
---

## Code

使用 `buequet += (flower + 1) / k;` 以及 `flower = (flower + 1) % k` 來計算連續的花束的數量。

要注意 edge case：  `m * k` 有可能會 overflow，int 會裝不下。

```cpp
class Solution {
public:
    int minDays(vector<int>& bloomDay, int m, int k) {
        long long total = (long long) m * (long long) k;
        if((long long)bloomDay.size() < total) return -1;

        int l = 1, r = 1;
        for(int d: bloomDay) {
            r = max(r, d);
        }

        while(l < r) {
            int mid = l + (r - l) / 2;
            int flower = 0;
            int buequet = 0;
            for(int bloom: bloomDay) {
                if(bloom > mid) flower = 0;
                else {
                    buequet += (flower + 1) / k;
                    flower = (flower + 1) % k;
                }
            }
            if (buequet >= m) r = mid;
            else l = mid + 1;
        }

        return l;
    }
};
```
## Link
- [Minimum Number of Days to Make m Bouquets](https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/description/)
