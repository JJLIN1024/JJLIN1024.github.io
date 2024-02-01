---
title: Find the Smallest Divisor Given a Threshold
date: 2022-12-24
lastmod: 2022-12-24
author: Jimmy Lin
tags: ["Binary Search"]
draft: false
---

## Code

基本概念同：[[Binary Search 101|Binary Search 101]]，解題邏輯和 [[Capacity To Ship Packages Within D Days|Capacity To Ship Packages Within D Days]] ㄧ樣。

Time Complexity: $O(n \cdot \log (r - l))$, Space Complexity: $O(1)$

注意 `sum += (num + divisor - 1) / divisor;` 就是 `sum += (num - 1) / divisor + 1;`

```cpp
class Solution {
public:
    int smallestDivisor(vector<int>& nums, int threshold) {
        int r = *max_element(nums.begin(), nums.end());
        int l = 1;

        while(l < r) {
            int mid = (l + r) / 2;
            if (count(mid, nums) > threshold)
                l = mid + 1;
            else
                r = mid;
        }

        return l;
    }


    int count(int divisor, vector<int>& nums) {
        int sum = 0;
        for(auto num: nums) {
            sum += (num + divisor - 1) / divisor;
        }
        return sum;
    }
};
```
## Link
- [Find the Smallest Divisor Given a Threshold](https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/description/)
