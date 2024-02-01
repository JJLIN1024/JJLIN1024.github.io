---
title: Split Array Largest Sum
date: 2022-12-24
lastmod: 2022-12-24
author: Jimmy Lin
tags: ["Binary Search"]
draft: false
---

解題概念和 [[Capacity To Ship Packages Within D Days]] 一樣，連 code 都ㄧ樣。

心得：
在解題時，用類似 [[notes/algorithm/NP Completeness Definition]] 中提到的 NP 的概念，先將一些變數固定下來，這組變數會使得問題可以得到一個解，以此題來說就是將 splitted array's sum 固定下來，然後問自己，給定這個 sum，我是否可以驗證 nums 被分割成 k 個 subarray 後，每個 subarray 的合都不會超過 sum？若可以，再來想辦法 minimize 這個 sum，而 minimize 的方法就是 binary search。

## Code

```cpp
class Solution {
public:
    int splitArray(vector<int>& nums, int k) {
        int l, r = 0;
        for(int n: nums) {
            l = max(l, n);
            r += n;
        }

        while(l < r) {
            int mid = l + (r - l) / 2;
            if( canSplit(mid, nums, k) ) {
                r = mid;
            } else {
                l = mid + 1;
            }
        }

        return l;
    }

    bool canSplit(int arraySum, vector<int>& nums, int k) {
        int sum = 0;
        int splitCount = 1;
        for(int n: nums) {
            sum += n;
            if(sum > arraySum) {
                sum = n;
                splitCount += 1;
                if (splitCount > k) return false;
            }
        }
        return true;
    }
};
```

## Link
- [Split Array Largest Sum](https://leetcode.com/problems/split-array-largest-sum/description/)
