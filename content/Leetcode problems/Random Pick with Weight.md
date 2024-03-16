---
title: Random Pick with Weight
date: 2023-04-23
lastmod: 2023-04-23
author:
  - Jimmy Lin
tags:
  - math
  - prefix_sum
  - review
draft: false
sr-due: 2024-05-06
sr-interval: 53
sr-ease: 290
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

因為 `rand() % n` 代表在 `0 ~ n - 1` 當中隨機選一個數，且題目的限制 `1 <= w[i] <= 105`，所以 `int random_number = rand() % w_.back() + 1;`（要加一，產生 `1 ~ n`）。

以 `w = [1, 3, 4]` 為例，prefix sum 為 `[1, 4, 8]`，random 出來的數字落在`1` 回傳的結果是 `1`，落在 `2,3,4` 回傳的結果都是 `2`，落在 `5,6,7,8` 的結果都是 `3`，所以我們使用 `lower_bound` 而非 `upper_bound`。

```cpp
class Solution {
public:
    vector<int> w_;
    Solution(vector<int>& w) {
        w_ = move(w);
        for(int i = 1; i < w_.size(); i++) {
            w_[i] += w_[i - 1];
        }
    }
    
    int pickIndex() {
        int random_number = rand() % w_.back() + 1;
        return lower_bound(w_.begin(), w_.end(), random_number) - w_.begin();
    }
};
```

```cpp
class Solution {
public:
    vector<int> w_;
    Solution(vector<int>& w) {
        w_ = move(w);
        for(int i = 1; i < w_.size(); i++) {
            w_[i] += w_[i - 1];
        }
    }
    
    int pickIndex() {
        int random_number = rand() % w_.back() + 1;
        int l = 0, r = w_.size() - 1;
        while(l < r) {
            int m = l + (r - l) / 2;
            if(w_[m] < random_number) {
                l = m + 1;
            } else {
                r = m;
            }
        }
        return l;
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