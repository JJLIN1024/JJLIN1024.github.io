---
title: Find K Closest Elements
date: 2023-04-19
lastmod: 2023-04-19
author:
  - Jimmy Lin
tags:
  - binary_search
  - two_pointer
  - review
draft: false
sr-due: 2024-04-30
sr-interval: 35
sr-ease: 270
---

## Description

Given a **sorted** integer array `arr`, two integers `k` and `x`, return the `k` closest integers to `x` in the array. The result should also be sorted in ascending order.

An integer `a` is closer to `x` than an integer `b` if:

*   `|a - x| < |b - x|`, or
*   `|a - x| == |b - x|` and `a < b`

**Example 1:**

**Input:** arr = \[1,2,3,4,5\], k = 4, x = 3
**Output:** \[1,2,3,4\]

**Example 2:**

**Input:** arr = \[1,2,3,4,5\], k = 4, x = -1
**Output:** \[1,2,3,4\]

**Constraints:**

*   `1 <= k <= arr.length`
*   `1 <= arr.length <= 104`
*   `arr` is sorted in **ascending** order.
*   `-104 <= arr[i], x <= 104`

## Code 

### Binary Search + Two pointer 

$O(\log n) + O(k)$
```cpp
class Solution {
public:
    vector<int> findClosestElements(vector<int>& arr, int k, int x) {
        int l = 0, r = arr.size();
        while(l < r) {
            int mid = (l + r) / 2;
            if(arr[mid] < x) l = mid + 1;
            else r = mid;
        }

        // l is now where x should be inserted
        r = l;
        l = l - 1;
        vector<int> res;
        while(l >= 0 && r < arr.size() && k) {
            k--;
            if(abs(arr[l] - x) <= abs(arr[r] - x)) l--;
            else r++;
        }

        while(k) {
            k--;
            if(l >= 0) l--;
            else if(r < arr.size()) r++;
        }

        for(int i = l + 1; i < r; i++) {
            res.push_back(arr[i]);
        }

        return res;
    }
};
```

```cpp
class Solution {
public:
    vector<int> findClosestElements(vector<int>& arr, int k, int x) {
        vector<int> res;
        int idx = lower_bound(arr.begin(), arr.end(), x) - arr.begin();
        if(idx == 0) {
            res.assign(arr.begin(), arr.begin() + k);
            return res;
        }
        if(idx == arr.size()) {
            res.assign(arr.end() - k, arr.end());
            return res;
        }
            
        int l = idx - 1, r = idx;
        while(k && (l >= 0 || r < arr.size())) {
            k--;
            if((l >= 0 ? abs(arr[l] - x) : INT_MAX) <= (r < arr.size() ? abs(arr[r] - x) : INT_MAX)) 
                l--;
            else 
                r++;
        }

        for(int i = l + 1; i < r; i++) {
            res.push_back(arr[i]);
        }

        return res;
    }
};
```


### Binary Search  + sliding window

$O(\log(n - k) + k)$

```
Assume we are taking `A[i] ~ A[i + k - 1]`.  
We can binary research `i`  
We compare the distance between `x - A[mid]` and `A[mid + k] - x`

@vincent_gui listed the following cases:  
Assume `A[mid] ~ A[mid + k]` is sliding window

case 1: x - A[mid] < A[mid + k] - x, need to move window go left  
-------x----A[mid]-----------------A[mid + k]----------

case 2: x - A[mid] < A[mid + k] - x, need to move window go left again  
-------A[mid]----x-----------------A[mid + k]----------

case 3: x - A[mid] > A[mid + k] - x, need to move window go right  
-------A[mid]------------------x---A[mid + k]----------

case 4: x - A[mid] > A[mid + k] - x, need to move window go right  
-------A[mid]---------------------A[mid + k]----x------

If `x - A[mid] > A[mid + k] - x`,  
it means `A[mid + 1] ~ A[mid + k]` is better than `A[mid] ~ A[mid + k - 1]`,  
and we have `mid` smaller than the right `i`.  
So assign `left = mid + 1`.
```


```cpp
class Solution {
public:
    vector<int> findClosestElements(vector<int>& arr, int k, int x) {
        int l = 0, r = arr.size() - k;
        while(l < r) {
            int mid = (l + r) / 2;
            if(x - arr[mid] > arr[mid + k] - x) l = mid + 1;
            else r = mid;
        }

        return vector<int>(arr.begin() + l, arr.begin() + l + k);
    }
};
```


## Source
- [Find K Closest Elements - LeetCode](https://leetcode.com/problems/find-k-closest-elements/description/)