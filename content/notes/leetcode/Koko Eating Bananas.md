---
title: Koko Eating Bananas
date: 2022-12-24
lastmod: 2022-12-24
author: Jimmy Lin
tags:
  - binary_search
  - review
draft: false
sr-due: 2024-02-06
sr-interval: 20
sr-ease: 290
---

解題邏輯和 [[Capacity To Ship Packages Within D Days]] ㄧ樣。

## Code

```cpp
count += p / eat;
if (p % eat > 0) count += 1;
```

可以寫成

```cpp
count += (p + eat - 1) / eat;
```

邏輯是，若 `p` 為 `eat` 的整數倍，則 `p` 加上 `eat - 1` 再除以 `eat` 也不會使結果多一，但是只要 `p` 除以 `eat` 後的餘數不為零，至少是 `1`，那麼 `p` 再加上 `eat - 1` 之後再除以 `eat` 就一定會使得結果多一。

```cpp
class Solution {
public:
    int minEatingSpeed(vector<int>& piles, int h) {
        int l = 1, r = 1;
        for(int p: piles) {
            r = max(r, p);
        }

        while(l < r) {
            int mid = l + (r - l)/2;
            if(canEat(mid, piles, h)) {
                r = mid;
            } else {
                l = mid + 1;
            }
        }
        return l;
    }

    bool canEat(int eat, vector<int>& piles, int h) {
        int count = 0;
        for(int p: piles) {
            count += p / eat;
            if (p % eat > 0) count += 1;
        }
        return count <= h;
    }
};
```
## Link
- [Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/description/)
