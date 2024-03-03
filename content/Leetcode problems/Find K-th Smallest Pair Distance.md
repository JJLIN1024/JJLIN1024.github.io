---
title: Find K-th Smallest Pair Distance
date: 2022-12-26
lastmod: 2022-12-26
author: Jimmy Lin
tags: ["Binary Search", "Two Pointer"]
draft: false
---

## Code

錯誤版本，錯誤的原因在於假設 `l, r` 為 index，用 `mid` 計算 `[0:mid]`之間有多少 pair，但是 pair 之間並不具有 **monotonicity**，例如 `[4, 62, 100]`，`100 - 62 < 62 - 4`。
```cpp
class Solution {
public:
    int smallestDistancePair(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end());
        int l = 0, r = nums.size() - 1;
        while(l < r) {
            int mid = l + (r - l) / 2;
            int pairCount = mid * (mid + 1)  / 2;
            if(pairCount < k) l = mid + 1;
            else r = mid;
        }

        return nums[l] - nums[0];
    }
};
```

題目要求 pair distance，那就應該將 `l, r` 設為 pair distance 的上下 limit，然後對其做 binary search。

```cpp
class Solution {
public:
    int smallestDistancePair(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        int l = 0, r = nums[n - 1] - nums[0];
        while(l < r) {
            int mid = l + (r - l) / 2;
            int i = 0, j = 0;
            int pairCount = 0;
            while(i < n || j < n) {
                while( j < n && (nums[j] - nums[i]) <= mid) j++;
                pairCount += j - i - 1;
                i++;
            }

            if(pairCount < k) l = mid + 1;
            else r = mid;
        }

        return l;
    }
};
```

## Link
- [Find K-th Smallest Pair Distance](https://leetcode.com/problems/find-k-th-smallest-pair-distance/)
