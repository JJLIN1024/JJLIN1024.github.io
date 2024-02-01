---
title: Max Chunks To Make Sorted II
date: 2023-04-09
lastmod: 2023-04-09
author: Jimmy Lin
tags:
  - monotonic
  - stack
  - review
draft: false
sr-due: 2024-01-31
sr-interval: 3
sr-ease: 250
---

## Description

You are given an integer array `arr`.

We split `arr` into some number of **chunks** (i.e., partitions), and individually sort each chunk. After concatenating them, the result should equal the sorted array.

Return _the largest number of chunks we can make to sort the array_.

**Example 1:**

**Input:** arr = \[5,4,3,2,1\]
**Output:** 1
**Explanation:**
Splitting into two or more chunks will not return the required result.
For example, splitting into \[5, 4\], \[3, 2, 1\] will result in \[4, 5, 1, 2, 3\], which isn't sorted.

**Example 2:**

**Input:** arr = \[2,1,3,4,4\]
**Output:** 4
**Explanation:**
We can split into two chunks, such as \[2, 1\], \[3, 4, 4\].
However, splitting into \[2, 1\], \[3\], \[4\], \[4\] is the highest number of chunks possible.

**Constraints:**

*   `1 <= arr.length <= 2000`
*   `0 <= arr[i] <= 108`

## Code 

同 [[Max Chunks To Make Sorted]]。

```cpp
class Solution {
public:
    int maxChunksToSorted(vector<int>& arr) {
        stack<int> st;
        int largest;
        for(int i = 0; i < arr.size(); i++) {
            largest = arr[i];
            while(!st.empty() && st.top() > arr[i]) {
                largest = max(largest, st.top());
                st.pop();
            }
            st.push(largest);
        }
        return st.size();
    }
};
```

## Source
- [Max Chunks To Make Sorted II - LeetCode](https://leetcode.com/problems/max-chunks-to-make-sorted-ii/description/)