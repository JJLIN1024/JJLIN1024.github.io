---
title: Max Chunks To Make Sorted
date: 2023-04-07
lastmod: 2023-04-07
author: Jimmy Lin
tags:
  - monotonic_stack
  - stack
draft: false
---

## Description

You are given an integer array `arr` of length `n` that represents a permutation of the integers in the range `[0, n - 1]`.

We split `arr` into some number of **chunks** (i.e., partitions), and individually sort each chunk. After concatenating them, the result should equal the sorted array.

Return _the largest number of chunks we can make to sort the array_.

**Example 1:**

**Input:** arr = \[4,3,2,1,0\]
**Output:** 1
**Explanation:**
Splitting into two or more chunks will not return the required result.
For example, splitting into \[4, 3\], \[2, 1, 0\] will result in \[3, 4, 0, 1, 2\], which isn't sorted.

**Example 2:**

**Input:** arr = \[1,0,2,3,4\]
**Output:** 4
**Explanation:**
We can split into two chunks, such as \[1, 0\], \[2, 3, 4\].
However, splitting into \[1, 0\], \[2\], \[3\], \[4\] is the highest number of chunks possible.

**Constraints:**

*   `n == arr.length`
*   `1 <= n <= 10`
*   `0 <= arr[i] < n`
*   All the elements of `arr` are **unique**.

## Code 

看到題目的時候第一直覺是 merge sort 中的 inverted index。

以這個例子來說，因為 max 是由左到右一路 max 過來的，因此當 max 的值和其所在的 index 相同時，代表在這個 index 的左邊有人比它大， sorting 時會需要被 invert。

不過這個解法可以使用是因為題目給定的 number 介於 `[0, n-1]`，如果改成像 [[Max Chunks To Make Sorted II]] 一樣沒有特別限制的話，就只能用 monotonic stack 來解了。

```
original: 0, 2, 1, 4, 3, 5, 7, 6
max:      0, 2, 2, 4, 4, 5, 7, 7
sorted:   0, 1, 2, 3, 4, 5, 6, 7
index:    0, 1, 2, 3, 4, 5, 6, 7
```

```cpp
class Solution {
public:
    int maxChunksToSorted(vector<int>& arr) {
        int n = arr.size();
        vector<int> maxIndex(n);
        
        maxIndex[0] = arr[0];
        for(int i = 1; i < arr.size(); i++) {
            maxIndex[i] = max(maxIndex[i-1], arr[i]);
        }

        int count = 0;
        for(int i = 0; i < maxIndex.size(); i++) {
            if(maxIndex[i] == i) count++;
        }

        return count;
    }
};
```

也可以用 monotonic stack 來解題，背後概念是：當一個長度為 n 的 array 為 strictly increasing 時，即有最大的 chunks 數量 = n，因此我們要找的就是不 strictly increasing 的那些元素，並找出其 sorting 之後應該在哪個位置。

以 `0, 1, 3, 4, 2` 來當例子：

`0, 1` 都在正確的位置，各自都是一個 chunk。`2` 則應該在 `3, 4` 之前，因此算是一個 chunk。將 `largest` push 上去就是要記錄每個 chunk 當中最大的元素，這點和第一個解法是相同的。

為何要記錄 largest ？

考慮：`0, 1, 2, 3, 4` -> `0, 3, 2, 1, 4` -> `0, 3, 1, 2, 4`

`3, 2, 1` 經過 permutation 變成 `3, 1, 2`，但是答案依然還是 3 chunks。

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
- [Max Chunks To Make Sorted - LeetCode](https://leetcode.com/problems/max-chunks-to-make-sorted/description/)