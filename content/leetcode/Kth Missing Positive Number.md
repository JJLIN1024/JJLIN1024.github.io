---
title: Kth Missing Positive Number
date: 2023-07-01
lastmod: 2023-07-01
author: Jimmy Lin
tags: ["binary search"]
draft: false
---

## Description

Given an array `arr` of positive integers sorted in a **strictly increasing order**, and an integer `k`.

Return _the_ `kth` _**positive** integer that is **missing** from this array._

**Example 1:**

**Input:** arr = \[2,3,4,7,11\], k = 5
**Output:** 9
**Explanation:** The missing positive integers are \[1,5,6,8,9,10,12,13,...\]. The 5th missing positive integer is 9.

**Example 2:**

**Input:** arr = \[1,2,3,4\], k = 2
**Output:** 6
**Explanation:** The missing positive integers are \[5,6,7,...\]. The 2nd missing positive integer is 6.

**Constraints:**

*   `1 <= arr.length <= 1000`
*   `1 <= arr[i] <= 1000`
*   `1 <= k <= 1000`
*   `arr[i] < arr[j]` for `1 <= i < j <= arr.length`

**Follow up:**

Could you solve this problem in less than O(n) complexity?

基本概念同 [[Binary Search 101|Binary Search 101]]。

## Code 
### Linear Search
Time Complexity: $O(n)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    int findKthPositive(vector<int>& arr, int k) {
        unordered_set<int> S(arr.begin(), arr.end());
        int count = 0;
        for(int i = 1; i <= 1000 + k; i++) {
            if(S.find(i) == S.end())
                count++;
            if(count == k) return i;
            S.insert(i);
        }

        return -1; 

    }
};
```

### Binary Search
Time Complexity: $O(\log n)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    int findKthPositive(vector<int>& arr, int k) {
        int l = 0, r = arr.size();
        while(l < r) {
            int m = (l + r) / 2;
            if((arr[m] - m - 1) < k) 
                l = m + 1;
            else 
                r = m;
        }
        // (A[l - 1]) + (k - (A[l - 1] - l)) = l + k
        // A[l -1](the largest number in A that is less than result) + K - B[l - 1](offset, how far from result)
        return l + k; 

    }
};

// 0 1 2 3 4 5
// 1 1 1 3 6
// 2,3,4,7,11
```

## Source
- [Kth Missing Positive Number - LeetCode](https://leetcode.com/problems/kth-missing-positive-number/)