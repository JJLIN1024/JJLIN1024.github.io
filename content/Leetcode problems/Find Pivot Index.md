---
title: Find Pivot Index
date: 2022-12-20
lastmod: 2022-12-20
author: Jimmy Lin
tags: ["Prefix Sum"]
draft: false
---

## Code 

### $O(n)$ Space
```cpp
class Solution {
public:
    int pivotIndex(vector<int>& nums) {
        int pivot = -1;
        vector<int> left(nums.size(), 0);
        vector<int> right(nums.size(), 0);
        int i;
        for(i = 1; i < left.size(); i++) {
            left[i] = nums[i-1] + left[i-1];
        }

        for(i = right.size() - 2; i >= 0; i--) {
            right[i] = nums[i+1] + right[i+1];
        }

        for(i = nums.size() - 1; i >= 0; i--) {
            if(left[i] == right[i]) pivot = i;
        }

        return pivot;
    }
};
```

### $O(1)$ Space
```cpp
class Solution {
public:
    int pivotIndex(vector<int>& nums) {
        int leftsum = 0;
        int sum = 0;
        for(int i = 0; i < nums.size(); i++) {
            sum += nums[i];
        }
        for(int i = 0; i < nums.size(); i++) {
            if(leftsum == sum - nums[i] - leftsum) return i;
            leftsum += nums[i];
        }

        return -1;
    }
};
```

## Link
- [[Running Sum of 1d Array]]
- [724. Find Pivot Index](https://leetcode.com/problems/find-pivot-index/)
- [1991. Find the Middle Index in Array](https://leetcode.com/problems/find-the-middle-index-in-array/)