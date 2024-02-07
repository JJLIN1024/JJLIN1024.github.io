---
title: Create Sorted Array through Instructions
date: 2024-02-06
tags:
  - segment_tree
author:
  - Jimmy Lin
draft: false
---

## Description

Given an integer array `instructions`, you are asked to create a sorted array from the elements in `instructions`. You start with an empty container `nums`. For each element from **left to right** in `instructions`, insert it into `nums`. The **cost** of each insertion is the **minimum** of the following:

-   The number of elements currently in `nums` that are **strictly less than** `instructions[i]`.
-   The number of elements currently in `nums` that are **strictly greater than** `instructions[i]`.

For example, if inserting element `3` into `nums = [1,2,3,5]`, the **cost** of insertion is `min(2, 1)` (elements `1` and `2` are less than `3`, element `5` is greater than `3`) and `nums` will become `[1,2,3,3,5]`.

Return _the **total cost** to insert all elements from_ `instructions` _into_ `nums`. Since the answer may be large, return it **modulo** `10<sup>9</sup> + 7`

**Example 1:**

```
<strong>Input:</strong> instructions = [1,5,6,2]
<strong>Output:</strong> 1
<strong>Explanation:</strong> Begin with nums = [].
Insert 1 with cost min(0, 0) = 0, now nums = [1].
Insert 5 with cost min(1, 0) = 0, now nums = [1,5].
Insert 6 with cost min(2, 0) = 0, now nums = [1,5,6].
Insert 2 with cost min(1, 2) = 1, now nums = [1,2,5,6].
The total cost is 0 + 0 + 0 + 1 = 1.
```

**Example 2:**

```
<strong>Input:</strong> instructions = [1,2,3,6,5,4]
<strong>Output:</strong> 3
<strong>Explanation:</strong> Begin with nums = [].
Insert 1 with cost min(0, 0) = 0, now nums = [1].
Insert 2 with cost min(1, 0) = 0, now nums = [1,2].
Insert 3 with cost min(2, 0) = 0, now nums = [1,2,3].
Insert 6 with cost min(3, 0) = 0, now nums = [1,2,3,6].
Insert 5 with cost min(3, 1) = 1, now nums = [1,2,3,5,6].
Insert 4 with cost min(3, 2) = 2, now nums = [1,2,3,4,5,6].
The total cost is 0 + 0 + 0 + 0 + 1 + 2 = 3.
```

**Example 3:**

```
<strong>Input:</strong> instructions = [1,3,3,3,2,4,2,1,2]
<strong>Output:</strong> 4
<strong>Explanation:</strong> Begin with nums = [].
Insert 1 with cost min(0, 0) = 0, now nums = [1].
Insert 3 with cost min(1, 0) = 0, now nums = [1,3].
Insert 3 with cost min(1, 0) = 0, now nums = [1,3,3].
Insert 3 with cost min(1, 0) = 0, now nums = [1,3,3,3].
Insert 2 with cost min(1, 3) = 1, now nums = [1,2,3,3,3].
Insert 4 with cost min(5, 0) = 0, now nums = [1,2,3,3,3,4].
Insert 2 with cost min(1, 4) = 1, now nums = [1,2,2,3,3,3,4].
Insert 1 with cost min(0, 6) = 0, now nums = [1,1,2,2,3,3,3,4].
Insert 2 with cost min(2, 4) = 2, now nums = [1,1,2,2,2,3,3,3,4].
The total cost is 0 + 0 + 0 + 0 + 1 + 0 + 1 + 0 + 2 = 4.
```

**Constraints:**

-   `1 <= instructions.length <= 10<sup>5</sup>`
-   `1 <= instructions[i] <= 10<sup>5</sup>`
## Code

和 [[Range Sum Query - Mutable]] 不一樣的地方在於，segment tree 儲存的資料並不是 range sum，而是儲存 sum of frequency。

也就是說，對於每個 x 而言，我們做兩個 query，一次 query 0 ~ x - 1 ，一次 query x + 1 ~ MaxN。

初始值（每個元素的 frequency）全部都是 0，所以不需要 buildTree。

Time Complexity: $O(n \log n)$, Space Complexity: $O(n)$

```cpp
#define lc 2 * index + 1
#define rc 2 * index + 2
class Solution {
    int tree[400000];
public:

    void update(int index, int left, int right, int pos) {
        if(left == right) {
            tree[index]++;
            return;
        }
        int mid = left + (right - left) / 2;
        if(pos <= mid)
            update(lc, left, mid, pos);
        else
            update(rc, mid + 1, right, pos);
        tree[index] = tree[lc] + tree[rc];
    }

    int query(int index, int left, int right, int qleft, int qright) {
        if(qleft > right || qright < left) return 0;
        if(qleft <= left && right <= qright) return tree[index];
        int mid = left + (right - left) / 2;
        return query(lc, left, mid, qleft, qright) + query(rc, mid + 1, right, qleft, qright);
    }
    int createSortedArray(vector<int>& instructions) {

        int cost = 0;
        const int mod = 1e9 + 7;
        const int MAXN = 1e5 + 1;
        for(auto x: instructions) {
            int less_count = query(0, 0, MAXN, 0, x - 1);
            int greater_count = query(0, 0, MAXN, x + 1, MAXN);
            update(0, 0, MAXN, x);
            cost = (cost + min(less_count, greater_count)) % mod;
        }
        return cost;
    }
};
```

## Source
- [Create Sorted Array through Instructions - LeetCode](https://leetcode.com/problems/create-sorted-array-through-instructions/description/)