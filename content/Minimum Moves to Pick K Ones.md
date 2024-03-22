---
title: Minimum Moves to Pick K Ones
date: 2024-03-18
lastmod: 2024-03-18
author:
  - Jimmy Lin
tags:
  - sliding_window
draft: false
---

## Description

You are given a **0-indexed** binary array `nums` of length `n`, a **positive** integer `k` and a **non-negative** integer `maxChanges`.

Dylan Smith plays a game, where the goal is for Dylan to pick up `k` ones from `nums` using the **minimum** number of **moves**. When the game starts, Dylan picks up any index `dylanIndex` in the range `[0, n - 1]` and stands there. If `nums[dylanIndex] == 1` , Dylan picks up the one and `nums[dylanIndex]` becomes `0`(this **does not** count as a move). After this, Dylan can make **any** number of **moves** (**including** **zero**) where in each move Dylan must perform **exactly** one of the following actions:

*   Select any index `j != dylanIndex` such that `nums[j] == 0` and set `nums[j] = 1`. This action can be performed **at** **most** `maxChanges` times.
*   Select any two adjacent indices `x` and `y` (`|x - y| == 1`) such that `nums[x] == 1`, `nums[y] == 0`, then swap their values (set `nums[y] = 1` and `nums[x] = 0`). If `y == dylanIndex`, Dylan picks up the one after this move and `nums[y]` becomes `0`.

Return _the **minimum** number of moves required by Dylan to pick **exactly**_ `k` _ones_.

**Example 1:**

**Input:** nums = \[1,1,0,0,0,1,1,0,0,1\], k = 3, maxChanges = 1

**Output:** 3

**Explanation:** Dylan can pick up `3` ones in `3` moves, if Dylan performs the following actions in each move when standing at `dylanIndex == 1`:

*    At the start of the game Dylan picks up the one and `nums[1]` becomes `0`. `nums` becomes `[1,**0**,1,0,0,1,1,0,0,1]`.
*   Select `j == 2` and perform an action of the first type. `nums` becomes `[1,**0**,1,0,0,1,1,0,0,1]`
*   Select `x == 2` and `y == 1`, and perform an action of the second type. `nums` becomes `[1,**1**,0,0,0,1,1,0,0,1]`. As `y == dylanIndex`, Dylan picks up the one and `nums` becomes `[1,**0**,0,0,0,1,1,0,0,1]`.
*   Select `x == 0` and `y == 1`, and perform an action of the second type. `nums` becomes `[0,**1**,0,0,0,1,1,0,0,1]`. As `y == dylanIndex`, Dylan picks up the one and `nums` becomes `[0,**0**,0,0,0,1,1,0,0,1]`.

Note that it may be possible for Dylan to pick up `3` ones using some other sequence of `3` moves.

**Example 2:**

**Input:** nums = \[0,0,0,0\], k = 2, maxChanges = 3

**Output:** 4

**Explanation:** Dylan can pick up `2` ones in `4` moves, if Dylan performs the following actions in each move when standing at `dylanIndex == 0`:

*   Select `j == 1` and perform an action of the first type. `nums` becomes `[**0**,1,0,0]`.
*   Select `x == 1` and `y == 0`, and perform an action of the second type. `nums` becomes `[**1**,0,0,0]`. As `y == dylanIndex`, Dylan picks up the one and `nums` becomes `[**0**,0,0,0]`.
*   Select `j == 1` again and perform an action of the first type. `nums` becomes `[**0**,1,0,0]`.
*   Select `x == 1` and `y == 0` again, and perform an action of the second type. `nums` becomes `[**1**,0,0,0]`. As `y == dylanIndex`, Dylan picks up the one and `nums` becomes `[**0**,0,0,0]`.

**Constraints:**

*   `2 <= n <= 105`
*   `0 <= nums[i] <= 1`
*   `1 <= k <= 105`
*   `0 <= maxChanges <= 105`
*   `maxChanges + sum(nums) >= k`

## Code 

Time Complexity: $O()$, Space Complexity: $O()$

```cpp
```

## Source
- [Minimum Moves to Pick K Ones - LeetCode](https://leetcode.com/problems/minimum-moves-to-pick-k-ones/description/)