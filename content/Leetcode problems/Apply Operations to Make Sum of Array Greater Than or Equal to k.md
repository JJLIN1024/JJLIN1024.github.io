---
title: Apply Operations to Make Sum of Array Greater Than or Equal to k
date: 2024-03-25
lastmod: 2024-03-25
author:
  - Jimmy Lin
tags:
  - math
  - review
draft: false
sr-due: 2024-03-29
sr-interval: 4
sr-ease: 270
---

## Description

You are given a **positive** integer `k`. Initially, you have an array `nums = [1]`.

You can perform **any** of the following operations on the array **any** number of times (**possibly zero**):

*   Choose any element in the array and **increase** its value by `1`.
*   Duplicate any element in the array and add it to the end of the array.

Return _the **minimum** number of operations required to make the **sum** of elements of the final array greater than or equal to_ `k`.

**Example 1:**

**Input:** k = 11

**Output:** 5

**Explanation:**

We can do the following operations on the array `nums = [1]`:

*   Increase the element by `1` three times. The resulting array is `nums = [4]`.
*   Duplicate the element two times. The resulting array is `nums = [4,4,4]`.

The sum of the final array is `4 + 4 + 4 = 12` which is greater than or equal to `k = 11`.  
The total number of operations performed is `3 + 2 = 5`.

**Example 2:**

**Input:** k = 1

**Output:** 0

**Explanation:**

The sum of the original array is already greater than or equal to `1`, so no operations are needed.

**Constraints:**

*   `1 <= k <= 105`

## Code 

Time Complexity: $O(1)$, Space Complexity: $O(1)$

```
The best strategy is:

Increase first element from 1 to m.
Duplicate elements (k - 1) / m times.
It is counter-productive to increase any elements after we start duplicating.
We can find the best m using brute-force.

It is not hard to see, however, that m is the smallest value such as m * m >= k.

```


```cpp
class Solution {
public:
    int minOperations(int k) {
        int sq = ceil(sqrt(k));
        return (sq - 1) + ceil((double)k/sq) - 1;
    }
};
```


```cpp
class Solution {
public:
    int minOperations(int k) {
        int a = sqrt(k);
        return a + (k - 1) / a - 1;
    }
};

```

## Source
- [Apply Operations to Make Sum of Array Greater Than or Equal to k - LeetCode](https://leetcode.com/problems/apply-operations-to-make-sum-of-array-greater-than-or-equal-to-k/description/)