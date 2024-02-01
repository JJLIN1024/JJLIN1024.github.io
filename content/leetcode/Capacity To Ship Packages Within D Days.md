---
title: Capacity To Ship Packages Within D Days
date: 2022-12-24
lastmod: 2022-12-24
author: Jimmy Lin
tags:
  - binary_search
  - review
draft: false
sr-due: 2024-03-19
sr-interval: 49
sr-ease: 290
---

## Code

基本概念：[[Binary Search 101|Binary Search 101]]。

注意是 return `l`(left index)，因為取 `mid = l + (r - l)/2`，所以 `mid` 會落在偏左邊，而 `l = mid + 1`，也就是説 `l` 會是符合 `canLoad` 的最小值。

另外，對 vector 取 max 可以用 STL 中的 [max_element](https://en.cppreference.com/w/cpp/algorithm/max_element) ，不過因為 return 回來的是一個 iterator，所以要在前面加上 `*`，將其轉成 `int`。而對 vector 取 sum 可以用 [reduce](https://en.cppreference.com/w/cpp/algorithm/reduce)。

Time Complexity: $O((r - l) \log n)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    int shipWithinDays(vector<int>& weights, int days) {
        auto l = *max_element(weights.begin(), weights.end());
        auto r = reduce(weights.begin(), weights.end());
        while(l < r) {
            int mid = l + (r - l)/2;
            if(canLoad(mid, weights, days)) {
                r = mid;
            } else {
                l = mid + 1;
            }
        }
        return l;
    }

    bool canLoad(int mid, vector<int>& weights, int days) {
        int count = 1;
        int load = 0;
        for(int i = 0; i < weights.size(); i++) {
             if (load + weights[i] > mid) {
                 count += 1;
                 load = weights[i]; // weight for the next day!
             } else {
                 load += weights[i];
             }
        }
        return count <= days;
    }
};
```


## Link
- [Capacity To Ship Packages Within D Days](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/)
