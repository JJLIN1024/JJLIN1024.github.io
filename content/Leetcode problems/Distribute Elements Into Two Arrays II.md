---
title: Distribute Elements Into Two Arrays II
date: 2024-03-04
lastmod: 2024-03-04
author:
  - Jimmy Lin
tags:
  - binary_search
  - review
draft: false
sr-due: 2024-04-14
sr-interval: 32
sr-ease: 270
---

## Description

You are given a **1-indexed** array of integers `nums` of length `n`.

We define a function `greaterCount` such that `greaterCount(arr, val)` returns the number of elements in `arr` that are **strictly greater** than `val`.

You need to distribute all the elements of `nums` between two arrays `arr1` and `arr2` using `n` operations. In the first operation, append `nums[1]` to `arr1`. In the second operation, append `nums[2]` to `arr2`. Afterwards, in the `ith` operation:

*   If `greaterCount(arr1, nums[i]) > greaterCount(arr2, nums[i])`, append `nums[i]` to `arr1`.
*   If `greaterCount(arr1, nums[i]) < greaterCount(arr2, nums[i])`, append `nums[i]` to `arr2`.
*   If `greaterCount(arr1, nums[i]) == greaterCount(arr2, nums[i])`, append `nums[i]` to the array with a **lesser** number of elements.
*   If there is still a tie, append `nums[i]` to `arr1`.

The array `result` is formed by concatenating the arrays `arr1` and `arr2`. For example, if `arr1 == [1,2,3]` and `arr2 == [4,5,6]`, then `result = [1,2,3,4,5,6]`.

Return _the integer array_ `result`.

**Example 1:**

**Input:** nums = \[2,1,3,3\]
**Output:** \[2,3,1,3\]
**Explanation:** After the first 2 operations, arr1 = \[2\] and arr2 = \[1\].
In the 3rd operation, the number of elements greater than 3 is zero in both arrays. Also, the lengths are equal, hence, append nums\[3\] to arr1.
In the 4th operation, the number of elements greater than 3 is zero in both arrays. As the length of arr2 is lesser, hence, append nums\[4\] to arr2.
After 4 operations, arr1 = \[2,3\] and arr2 = \[1,3\].
Hence, the array result formed by concatenation is \[2,3,1,3\].

**Example 2:**

**Input:** nums = \[5,14,3,1,2\]
**Output:** \[5,3,1,2,14\]
**Explanation:** After the first 2 operations, arr1 = \[5\] and arr2 = \[14\].
In the 3rd operation, the number of elements greater than 3 is one in both arrays. Also, the lengths are equal, hence, append nums\[3\] to arr1.
In the 4th operation, the number of elements greater than 1 is greater in arr1 than arr2 (2 > 1). Hence, append nums\[4\] to arr1.
In the 5th operation, the number of elements greater than 2 is greater in arr1 than arr2 (2 > 1). Hence, append nums\[5\] to arr1.
After 5 operations, arr1 = \[5,3,1,2\] and arr2 = \[14\].
Hence, the array result formed by concatenation is \[5,3,1,2,14\].

**Example 3:**

**Input:** nums = \[3,3,3,3\]
**Output:** \[3,3,3,3\]
**Explanation:** At the end of 4 operations, arr1 = \[3,3\] and arr2 = \[3,3\].
Hence, the array result formed by concatenation is \[3,3,3,3\].

**Constraints:**

*   `3 <= n <= 105`
*   `1 <= nums[i] <= 109`

## Code 

Time Complexity: $O(n^2)$, Space Complexity: $O(n)$

這題重點在於如何使用 `upper_bound` 以及  `insert`。

`upper_bound(arr.begin(), arr.end(), val);` 會回傳嚴格大於 val 的 位置，如果沒有找到符合的，會回傳 `arr.end()`。

`left.insert(left.end() - x , nums[i]);` 會在 `left.end() - x ` 這個位置上插入 `nums[i]`。

`ll.insert(ll.end(), rr.begin(), rr.end());` 會在 `ll` 的尾端插入整個 `rr` vector。

```cpp
class Solution {
public:
    int greaterCount(vector<int>& arr, int val) {
        return arr.end() - upper_bound(arr.begin(), arr.end(), val);
    }

    vector<int> resultArray(vector<int>& nums) {
        int n = nums.size();
        
        vector<int> left, right, ll, rr;
        left.push_back(nums[0]);
        right.push_back(nums[1]);
        ll.push_back(nums[0]);
        rr.push_back(nums[1]);
        
        int l = 0, r = 0;
        
        for (int i = 2; i < n; i++) {
            int x = greaterCount(left, nums[i]);
            int y = greaterCount(right, nums[i]);
            
            if (x > y) {
                
                left.insert(left.end() - x , nums[i]);
                ll.push_back(nums[i]);
                l++;
            } else if (x < y) {
                
                right.insert(right.end() - y, nums[i]);
                rr.push_back(nums[i]);
                r++;
            } else {
                if (l <= r) {
                    
                    left.insert(left.end() - x, nums[i]);
                    ll.push_back(nums[i]);
                    l++;
                } else {
                    
                    right.insert(right.end() - y, nums[i]);
                    rr.push_back(nums[i]);
                    r++;
                }
            }
        }
        
        
        ll.insert(ll.end(), rr.begin(), rr.end());
        return ll;
    }
};
```

## Source
- [Distribute Elements Into Two Arrays II - LeetCode](https://leetcode.com/problems/distribute-elements-into-two-arrays-ii/description/)