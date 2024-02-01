---
title: Search Insert Position
date: 2022-12-24
lastmod: 2022-12-24
author: Jimmy Lin
tags: ["Binary Search"]
draft: false
---

## Code

Time Complexity: $O(n \log n)$, Space Complexity: $O(1)$

基本概念同 [[Binary Search 101|Binary Search 101]]。

```cpp
class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int l = 0, r = nums.size();
        while( l < r ) {
            int mid = l + (r - l) / 2;
            if (nums[mid] < target) {
                l = mid + 1;
            } else {
                r = mid;
            }
        }
        return l;
    }
};
```


## Link
- [Search Insert Position](https://leetcode.com/problems/search-insert-position/description/)
