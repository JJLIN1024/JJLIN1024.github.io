---
title: Maximum Gap
date: 2023-12-11
lastmod: 2023-12-11
author:
  - Jimmy Lin
tags:
  - bucket_sort
  - sort
draft: false
---

## Description

Given an integer array `nums`, return _the maximum difference between two successive elements in its sorted form_. If the array contains less than two elements, return `0`.

You must write an algorithm that runs in linear time and uses linear extra space.

**Example 1:**

**Input:** nums = \[3,6,9,1\]
**Output:** 3
**Explanation:** The sorted form of the array is \[1,3,6,9\], either (3,6) or (6,9) has the maximum difference 3.

**Example 2:**

**Input:** nums = \[10\]
**Output:** 0
**Explanation:** The array contains less than 2 elements, therefore return 0.

**Constraints:**

*   `1 <= nums.length <= 105`
*   `0 <= nums[i] <= 109`

## Code 

### Bucket Sort
Time Complexity: $O(N)$, Space Complexity: $O(N)$

關鍵：

根據鴿籠原理，Suppose there are N elements in the array, the min value is min and the max value is max. Then the maximum gap will be no smaller than `ceiling[(max - min ) / (N - 1)]`.

若 `nums` 的元素平均分佈，則 gap 就會是 `ceiling[(max - min ) / (N - 1)]`；若不平均分佈，則 gap 就會更大。

因此我們只需要找 bucket 和 bucket 之間的 gap 即可。

要注意 edge case: `if(MAX == MIN) return 0;`，因為 `int index = (n - MIN) / len;`，當 `MIN == MAX`，`nums` 所有元素都相等時，`len` 會是 `0`，而 divided by zero 是 undefined behavior。

```cpp
class Solution {
public:
    int maximumGap(vector<int>& nums) {
        if(nums.size() <= 1) return 0;

        int MAX = *max_element(nums.begin(), nums.end());
        int MIN = *min_element(nums.begin(), nums.end());

        if(MAX == MIN) return 0;
        
        int n = nums.size();
        vector<int> bucket_max(n, INT_MIN);
        vector<int> bucket_min(n, INT_MAX);
        double len = (double) (MAX - MIN) / (double) (n - 1);

        for(auto n: nums) {
            int index = (n - MIN) / len;
            bucket_max[index] = max(bucket_max[index], n);
            bucket_min[index] = min(bucket_min[index], n);
        }

        int prev = bucket_max[0];
        int gap = 0;
        for(int i = 1; i < n; i++) {
            if(bucket_min[i] == INT_MAX) continue;
            gap = max(gap, bucket_min[i] - prev);
            prev = bucket_max[i];
        }

        return gap;


    }
};
```

## Source
- [Maximum Gap - LeetCode](https://leetcode.com/problems/maximum-gap/description/)