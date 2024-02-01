---
title: Peak Index in a Mountain Array
date: 2023-07-15
lastmod: 2023-07-15
author: Jimmy Lin
tags: ["binary search"]
draft: false
---

## Description

An array `arr` a **mountain** if the following properties hold:

*   `arr.length >= 3`
*   There exists some `i` with `0 < i < arr.length - 1` such that:
    *   `arr[0] < arr[1] < ... < arr[i - 1] < arr[i]`
    *   `arr[i] > arr[i + 1] > ... > arr[arr.length - 1]`

Given a mountain array `arr`, return the index `i` such that `arr[0] < arr[1] < ... < arr[i - 1] < arr[i] > arr[i + 1] > ... > arr[arr.length - 1]`.

You must solve it in `O(log(arr.length))` time complexity.

**Example 1:**

**Input:** arr = \[0,1,0\]
**Output:** 1

**Example 2:**

**Input:** arr = \[0,2,1,0\]
**Output:** 1

**Example 3:**

**Input:** arr = \[0,10,5,2\]
**Output:** 1

**Constraints:**

*   `3 <= arr.length <= 105`
*   `0 <= arr[i] <= 106`
*   `arr` is **guaranteed** to be a mountain array.

## Code 

Time Complexity: $O(\log n)$, Space Complexity: $O(1)$

因為使用 `int m = l + (r - l) / 2;`，此種計算 middle 的方式是偏左邊，因此對於 `arr[m]` 而言，比較的對象會是 `if(arr[m] < arr[m + 1])`，就不用擔心 array index out of range 的問題。

Either way，我們要尋找的都是第一個不滿足 `arr[m] < arr[m + 1]` 的 `m`，也就代表開始下坡，也就是我們的山頂。

### Version 1
```cpp
class Solution {
public:
    int peakIndexInMountainArray(vector<int>& arr) {
        int l = 0, r = arr.size() - 1;
        while(l <= r) {
            int m = l + (r - l) / 2;
            if(arr[m] < arr[m + 1]) 
                l = m + 1;
            else
                r = m - 1;
        }
        return l;
    }
};
```

### Version 2
```cpp
class Solution {
public:
    int peakIndexInMountainArray(vector<int>& arr) {
        int l = 0, r = arr.size() - 1;
        while(l < r) {
            int m = l + (r - l) / 2;
            if(arr[m] < arr[m + 1]) 
                l = m + 1;
            else
                r = m;
        }
        return l;
    }
};
```

## Source
- [Peak Index in a Mountain Array - LeetCode](https://leetcode.com/problems/peak-index-in-a-mountain-array/description/)