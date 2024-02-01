---
title: Sum of Subarray Minimums
date: 2024-01-24
lastmod: 2024-01-24
author: Jimmy Lin
tags:
  - review
  - monotonic_stack
draft: false
sr-due: 2024-02-07
sr-interval: 14
sr-ease: 290
---

## Description

Given an array of integers arr, find the sum of `min(b)`, where `b` ranges over every (contiguous) subarray of `arr`. Since the answer may be large, return the answer **modulo** `109 + 7`.

**Example 1:**

**Input:** arr = \[3,1,2,4\]
**Output:** 17
**Explanation:** 
Subarrays are \[3\], \[1\], \[2\], \[4\], \[3,1\], \[1,2\], \[2,4\], \[3,1,2\], \[1,2,4\], \[3,1,2,4\]. 
Minimums are 3, 1, 2, 4, 1, 1, 2, 1, 1, 1.
Sum is 17.

**Example 2:**

**Input:** arr = \[11,81,94,43,3\]
**Output:** 444

**Constraints:**

*   `1 <= arr.length <= 3 * 104`
*   `1 <= arr[i] <= 3 * 104`

## Code 

以 `[11,81,94,43,3]` 為例，對於 `34` 來說，左邊比它小的是 `11`，右邊是 `3`，因此 `43` 這個數字對於 `sumSubarrayMins` 的貢獻為 $4 \cdot 2 \cdot 43$，把 `4, 2` 想成 subarray 在其左右的起點（包括自己）的選擇數量，因此總共會有 `8` 個 subarray 其 min 會是 `43`。

至於對於一個 element 要怎麼找到其左右邊比它小的元素，就是使用 monotonic increasing stack。

在選擇左右端點時，要避免 duplicate，例如：`[71, 55, 82, 55]`

當我們使用 `while(!l_st.empty() && arr[l_st.top()] > arr[i])` 和 `while(!r_st.empty() && arr[r_st.top()] >= arr[i])` 時：

- `left = [1, 2, 1, 2]`
- `right = [1, 3, 1, 1]`

當我們使用 `while(!l_st.empty() && arr[l_st.top()] >= arr[i])` 和 `while(!r_st.empty() && arr[r_st.top()] > arr[i])` 時：

- `left = [1, 2, 1, 4]`
- `right = [1, 2, 1, 1]`

但不管哪一種，都是要避免 duplicate，當兩邊都是 `>=` 時：

- `left = [1, 2, 1, 4]`
- `right = [1, 3, 1, 1]

對於最右邊的 `55` 來說，左端點有四種選擇（包括最左邊的 `55`），右端點有一種選擇（自己），所以會具有一種左右端點的 pair 為`[55, 55]`，但同時，對於最左邊的 `55` 來說，他的右端點也有三個選擇，其中就包括最右邊的 `55`，因此也會具有一種左右端點的 pair為 `[55, 55]`，就和前例重複了。


```cpp
class Solution {
public:
    int sumSubarrayMins(vector<int>& arr) {
        int n = arr.size();
        vector<int> left(n), right(n);
        stack<int> l_st, r_st;
        for(int i = 0; i < n; i++) {
            while(!l_st.empty() && arr[l_st.top()] > arr[i]) {
                l_st.pop();
            }
            left[i] = l_st.empty() ? i + 1 : i - l_st.top();
            l_st.push(i);
        }

        for(int i = n - 1; i >= 0; i--) {
            while(!r_st.empty() && arr[r_st.top()] >= arr[i]) {
                r_st.pop();
            }
            right[i] = r_st.empty() ? n - i : r_st.top() - i;
            r_st.push(i);
        }
        int ans = 0, modulo = 1e9 + 7;
        for(int i = 0; i < n; i++) {
            long long prod = (left[i] * right[i]) % modulo;
            prod = (prod * arr[i]) % modulo;
            ans = (ans + prod) % modulo;
        }
        return ans;
    }
};
```

## Source
- [Sum of Subarray Minimums - LeetCode](https://leetcode.com/problems/sum-of-subarray-minimums/description/)