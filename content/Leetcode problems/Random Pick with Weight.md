---
title: Random Pick with Weight
date: 2023-04-23
lastmod: 2023-04-23
author: Jimmy Lin
tags: ["prefix sum", "math"]
draft: false
---

## Description

You are given a **0-indexed** array of positive integers `w` where `w[i]` describes the **weight** of the `ith` index.

You need to implement the function `pickIndex()`, which **randomly** picks an index in the range `[0, w.length - 1]` (**inclusive**) and returns it. The **probability** of picking an index `i` is `w[i] / sum(w)`.

*   For example, if `w = [1, 3]`, the probability of picking index `0` is `1 / (1 + 3) = 0.25` (i.e., `25%`), and the probability of picking index `1` is `3 / (1 + 3) = 0.75` (i.e., `75%`).

**Example 1:**

**Input**
\["Solution","pickIndex"\]
\[\[\[1\]\],\[\]\]
**Output**
\[null,0\]

**Explanation**
Solution solution = new Solution(\[1\]);
solution.pickIndex(); // return 0. The only option is to return 0 since there is only one element in w.

**Example 2:**

**Input**
\["Solution","pickIndex","pickIndex","pickIndex","pickIndex","pickIndex"\]
\[\[\[1,3\]\],\[\],\[\],\[\],\[\],\[\]\]
**Output**
\[null,1,1,1,1,0\]

**Explanation**
Solution solution = new Solution(\[1, 3\]);
solution.pickIndex(); // return 1. It is returning the second element (index = 1) that has a probability of 3/4.
solution.pickIndex(); // return 1
solution.pickIndex(); // return 1
solution.pickIndex(); // return 1
solution.pickIndex(); // return 0. It is returning the first element (index = 0) that has a probability of 1/4.

Since this is a randomization problem, multiple answers are allowed.
All of the following outputs can be considered correct:
\[null,1,1,1,1,0\]
\[null,1,1,1,1,1\]
\[null,1,1,1,0,0\]
\[null,1,1,1,0,1\]
\[null,1,0,1,0,0\]
......
and so on.

**Constraints:**

*   `1 <= w.length <= 104`
*   `1 <= w[i] <= 105`
*   `pickIndex` will be called at most `104` times.

## Code 

- [rand](https://cplusplus.com/reference/cstdlib/rand/)
- [upper_bound](https://cplusplus.com/reference/algorithm/upper_bound/)

`rand() % n` 代表在 `0 ~ n - 1` 當中隨機選一個數。

以 `w = [1, 3, 4]` 為例，prefix sum 為 `[1, 4, 8]`，random 出來的數字落在`0` 回傳的結果是 `0`，落在 `1,2,3` 回傳的結果都是 `3`，落在 `4,5,6,7` 的結果都是 `4`。因此我們要使用 `rand() % v.back()` 搭配 `upper_bound`。

```cpp
class Solution {
    vector<int> v;
public:
    Solution(vector<int>& w) {
        for(int i = 1; i < w.size(); i++) {
            w[i] += w[i-1];
        }
        v = w;
    }
    
    int pickIndex() {
        return upper_bound(v.begin(), v.end(), rand() % v.back()) - v.begin();
    }
};

/**
 * Your Solution object will be instantiated and called as such:
 * Solution* obj = new Solution(w);
 * int param_1 = obj->pickIndex();
 */
```

## Source
- [Random Pick with Weight - LeetCode](https://leetcode.com/problems/random-pick-with-weight/)