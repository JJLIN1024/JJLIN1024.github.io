---
title: Guess Number Higher or Lower
date: 2024-03-14
lastmod: 2024-03-14
author:
  - Jimmy Lin
tags:
  - binary_search
draft: false
---

## Description

We are playing the Guess Game. The game is as follows:

I pick a number from `1` to `n`. You have to guess which number I picked.

Every time you guess wrong, I will tell you whether the number I picked is higher or lower than your guess.

You call a pre-defined API `int guess(int num)`, which returns three possible results:

*   `-1`: Your guess is higher than the number I picked (i.e. `num > pick`).
*   `1`: Your guess is lower than the number I picked (i.e. `num < pick`).
*   `0`: your guess is equal to the number I picked (i.e. `num == pick`).

Return _the number that I picked_.

**Example 1:**

**Input:** n = 10, pick = 6
**Output:** 6

**Example 2:**

**Input:** n = 1, pick = 1
**Output:** 1

**Example 3:**

**Input:** n = 2, pick = 1
**Output:** 1

**Constraints:**

*   `1 <= n <= 231 - 1`
*   `1 <= pick <= n`

## Code 

Time Complexity: $O(\log n)$, Space Complexity: $O(1)$

就是 [[Binary Search 101|Binary Search 101]]。

```cpp
/** 
 * Forward declaration of guess API.
 * @param  num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * int guess(int num);
 */

class Solution {
public:
    int guessNumber(int n) {
        int l = 1, r = n;
        while(l <= r) {
            int m = l + (r - l) / 2;
            if(guess(m) == -1) {
                r = m - 1;
            } else if(guess(m) == 1) {
                l = m + 1;
            } else if(guess(m) == 0) {
                return m;
            }
        }
        return -1;
    }
};
```

## Source
- [Guess Number Higher or Lower - LeetCode](https://leetcode.com/problems/guess-number-higher-or-lower/description/?envType=study-plan-v2&envId=binary-search)