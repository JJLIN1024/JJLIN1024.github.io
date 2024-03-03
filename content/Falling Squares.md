---
title: Falling Squares
date: 2024-02-06
tags: 
author:
  - Jimmy Lin
draft: false
---

## Description

There are several squares being dropped onto the X-axis of a 2D plane.

You are given a 2D integer array `positions` where `positions[i] = [left<sub>i</sub>, sideLength<sub>i</sub>]` represents the `i<sup>th</sup>` square with a side length of `sideLength<sub>i</sub>` that is dropped with its left edge aligned with X-coordinate `left<sub>i</sub>`.

Each square is dropped one at a time from a height above any landed squares. It then falls downward (negative Y direction) until it either lands **on the top side of another square** or **on the X-axis**. A square brushing the left/right side of another square does not count as landing on it. Once it lands, it freezes in place and cannot be moved.

After each square is dropped, you must record the **height of the current tallest stack of squares**.

Return _an integer array_ `ans` _where_ `ans[i]` _represents the height described above after dropping the_ `i<sup>th</sup>` _square_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/04/28/fallingsq1-plane.jpg)

```
<strong>Input:</strong> positions = [[1,2],[2,3],[6,1]]
<strong>Output:</strong> [2,5,5]
<strong>Explanation:</strong>
After the first drop, the tallest stack is square 1 with a height of 2.
After the second drop, the tallest stack is squares 1 and 2 with a height of 5.
After the third drop, the tallest stack is still squares 1 and 2 with a height of 5.
Thus, we return an answer of [2, 5, 5].
```

**Example 2:**

```
<strong>Input:</strong> positions = [[100,100],[200,100]]
<strong>Output:</strong> [100,100]
<strong>Explanation:</strong>
After the first drop, the tallest stack is square 1 with a height of 100.
After the second drop, the tallest stack is either square 1 or square 2, both with heights of 100.
Thus, we return an answer of [100, 100].
Note that square 2 only brushes the right side of square 1, which does not count as landing on it.
```

**Constraints:**

-   `1 <= positions.length <= 1000`
-   `1 <= left<sub>i</sub> <= 10<sup>8</sup>`
-   `1 <= sideLength<sub>i</sub> <= 10<sup>6</sup>`
## Code

Time Complexity: $O()$, Space Complexity: $O()$

```cpp
```

## Source
- [Falling Squares - LeetCode](https://leetcode.com/problems/falling-squares/description/)