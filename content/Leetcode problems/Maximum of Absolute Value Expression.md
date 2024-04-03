---
title: Maximum of Absolute Value Expression
date: 2024-04-01
lastmod: 2024-04-01
author:
  - Jimmy Lin
tags:
  - math
  - review
draft: false
---

## Description

Given two arrays of integers with equal lengths, return the maximum value of:

`|arr1[i] - arr1[j]| + |arr2[i] - arr2[j]| + |i - j|`

where the maximum is taken over all `0 <= i, j < arr1.length`.

**Example 1:**

**Input:** arr1 = \[1,2,3,4\], arr2 = \[-1,4,5,6\]
**Output:** 13

**Example 2:**

**Input:** arr1 = \[1,-2,-5,0,10\], arr2 = \[0,-2,-1,-7,-4\]
**Output:** 20

**Constraints:**

*   `2 <= arr1.length == arr2.length <= 40000`
*   `-10^6 <= arr1[i], arr2[i] <= 10^6`

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(n)$

same idea as [[Minimize Manhattan Distances]]。

```cpp
int fun(vector<int>& arr, int n) { 
        int max_sum = arr[0], min_sum = arr[0];  
        for (int i = 0; i < n; i++) { // Finding max and min sum value 
            max_sum=max(max_sum,arr[i]);
            min_sum=min(min_sum,arr[i]);
        } 
        return (max_sum-min_sum); 
    } 
    
    int maxAbsValExpr(vector<int>& arr1, vector<int>& arr2) {
        int n = arr1.size();
        vector<int> sum1(n,0),diff1(n,0),sum2(n,0),diff2(n,0);
        for(int i=0;i<n;i++) {
            sum1[i]=arr1[i]+arr2[i]+i;
            diff1[i]=arr1[i]-arr2[i]+i;
            sum2[i]=arr1[i]+arr2[i]-i;
            diff2[i]=arr1[i]-arr2[i]-i;
        }
        return max(max(fun(sum1,n),fun(diff1,n)),max(fun(sum2,n),fun(diff2,n)));        
    }
```

## Source
- [Maximum of Absolute Value Expression - LeetCode](https://leetcode.com/problems/maximum-of-absolute-value-expression/description/)