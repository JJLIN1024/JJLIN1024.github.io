---
title: Minimized Maximum of Products Distributed to Any Store
date: 2022-12-24
lastmod: 2022-12-24
author: Jimmy Lin
tags: ["Binary Search"]
draft: false
---
解題邏輯和 [[Capacity To Ship Packages Within D Days]] ㄧ樣。`canDistribute` 的寫法和 [[Koko Eating Bananas]] 幾乎一樣。

## Code
```cpp
class Solution {
public:
    int minimizedMaximum(int n, vector<int>& quantities) {
        int l = 1, r;
        for(int q: quantities) {
            r = max(r, q);
        }
        while(l < r) {
            int mid = l + (r - l) / 2;
            if(canDistribute(mid, n, quantities)) {
                r = mid;
            } else {
                l = mid + 1;
            }
        }
        return l;
    }

    bool canDistribute(int num, int stores, vector<int>& quantities) {
        int count = 0;
        for(int q: quantities) {
            count += q / num;
            if(q % num > 0) count += 1;
        }
        return count <= stores;
    }
};
```
## Link
- [Minimized Maximum of Products Distributed to Any Store](https://leetcode.com/problems/minimized-maximum-of-products-distributed-to-any-store/description/)
