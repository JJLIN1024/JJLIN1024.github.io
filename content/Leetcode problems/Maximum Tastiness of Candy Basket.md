---
title: Maximum Tastiness of Candy Basket
date: 2023-07-15
lastmod: 2023-07-15
author:
  - Jimmy Lin
tags:
  - binary_search
  - review
draft: false
sr-due: 2024-04-06
sr-interval: 16
sr-ease: 270
---

## Description

You are given an array of positive integers `price` where `price[i]` denotes the price of the `ith` candy and a positive integer `k`.

The store sells baskets of `k` **distinct** candies. The **tastiness** of a candy basket is the smallest absolute difference of the **prices** of any two candies in the basket.

Return _the **maximum** tastiness of a candy basket._

**Example 1:**

**Input:** price = \[13,5,1,8,21,2\], k = 3
**Output:** 8
**Explanation:** Choose the candies with the prices \[13,5,21\].
The tastiness of the candy basket is: min(|13 - 5|, |13 - 21|, |5 - 21|) = min(8, 8, 16) = 8.
It can be proven that 8 is the maximum tastiness that can be achieved.

**Example 2:**

**Input:** price = \[1,3,1\], k = 2
**Output:** 2
**Explanation:** Choose the candies with the prices \[1,3\].
The tastiness of the candy basket is: min(|1 - 3|) = min(2) = 2.
It can be proven that 2 is the maximum tastiness that can be achieved.

**Example 3:**

**Input:** price = \[7,7,7,7\], k = 2
**Output:** 0
**Explanation:** Choosing any two distinct candies from the candies we have will result in a tastiness of 0.

**Constraints:**

*   `2 <= k <= price.length <= 105`
*   `1 <= price[i] <= 109`

## Code 

基本概念：[[Binary Search 101|Binary Search 101]]

Time Complexity: $O(n \log n  + n \log 10^9)$, Space Complexity: $O(1)$

`check` 使用 greedy，因為 price 為 sorted ，所以從第一個 element 開始找，如果說有更後面的元素也可以當作起點，那第一個元素一定更可以當作起點。

以 `1, 2, 5, 8, 13, 21, gap = 8` 為例，`5, 13, 21` 是一組解，但是 `1, 13, 21` 也是。

```cpp
class Solution {
public:
    int maximumTastiness(vector<int>& price, int k) {
        sort(price.begin(), price.end());

        int l = 0;
        int r = 1e9 - 1;

        while(l < r) {
            int m = l + (r - l) / 2;
            if(check(m, price, k)) {
                l = m + 1;
            } else {
                r = m;
            }
        }
        return check(l, price, k) ? l : l - 1;
    }

    bool check(int gap, vector<int>& price, int k) {
        int prev = price[0];
        k--;
        for(int i = 1; i < price.size(); i++) {
            if(price[i] - prev >= gap) {
                prev = price[i];
                k--;
            }
        }
        return k <= 0;
    }
};
```

## Source
- [Maximum Tastiness of Candy Basket - LeetCode](https://leetcode.com/problems/maximum-tastiness-of-candy-basket/description/)