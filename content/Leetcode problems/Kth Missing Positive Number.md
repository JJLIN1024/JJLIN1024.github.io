---
title: Kth Missing Positive Number
date: 2023-07-01
lastmod: 2023-07-01
author:
  - Jimmy Lin
tags:
  - binary_search
  - review
draft: false
sr-due: 2024-03-18
sr-interval: 4
sr-ease: 270
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

## Code 
### Linear Search
Time Complexity: $O(n)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    int findKthPositive(vector<int>& arr, int k) {
        int i, j = 0;
        for(i = 1; i <= arr.back(); i++) {
            if(i == arr[j])
                j++;
            else
                k--;
            if(k == 0)
                break;
        }

        return k == 0 ? i : i - 1 + k;
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
            int n_missing_number = (arr[m] - (m + 1));
            if(n_missing_number < k) 
                l = m + 1;
            else 
                r = m;
        }
        // since we're considering A[l - 1], so r has to be set as arr.size(), not arr.size() - 1;
        // A[l - 1]: the largest number in A that is less than result)
        // A[l - 1] - ((l - 1) + 1): how many number are missing up until A[l - 1]
        // k - (A[l - 1] - ((l - 1) + 1)) = k - A[l - 1] + l: how many number we still have to find after A[l - 1]
        // A[l - 1] + (k - A[l - 1] + l) -> answer = l + k;
        return l + k; 

    }
};

```

## Source
- [Kth Missing Positive Number - LeetCode](https://leetcode.com/problems/kth-missing-positive-number/)