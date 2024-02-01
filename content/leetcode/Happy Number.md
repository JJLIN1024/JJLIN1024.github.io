---
title: Happy Number
date: 2023-12-29
lastmod: 2023-12-29
author:
  - Jimmy Lin
tags:
  - hashmap
  - cycle_detection
draft: false
---

## Description

Write an algorithm to determine if a number `n` is happy.

A **happy number** is a number defined by the following process:

*   Starting with any positive integer, replace the number by the sum of the squares of its digits.
*   Repeat the process until the number equals 1 (where it will stay), or it **loops endlessly in a cycle** which does not include 1.
*   Those numbers for which this process **ends in 1** are happy.

Return `true` _if_ `n` _is a happy number, and_ `false` _if not_.

**Example 1:**

**Input:** n = 19
**Output:** true
**Explanation:**
12 + 92 = 82
82 + 22 = 68
62 + 82 = 100
12 + 02 + 02 = 1

**Example 2:**

**Input:** n = 2
**Output:** false

**Constraints:**

*   `1 <= n <= 231 - 1`

## Code 

Time Complexity: $O(N)$, Space Complexity: $O(1)$

可以使用 [[Floyd’s Cycle Finding Algorithm]]。即 [[Linked List Cycle]] 中用到的演算法。

```c
int digitSquareSum(int n) {
    int sum = 0, tmp;
    while (n) {
        tmp = n % 10;
        sum += tmp * tmp;
        n /= 10;
    }
    return sum;
}

bool isHappy(int n) {
    int slow, fast;
    slow = fast = n;
    do {
        slow = digitSquareSum(slow);
        fast = digitSquareSum(fast);
        fast = digitSquareSum(fast);
    } while(slow != fast);
    if (slow == 1) return 1;
    else return 0;
}
```

用 hashmap 的解法，概念是一樣的。

```cpp
class Solution {
public:
    bool isHappy(int n) {
        unordered_set<int> s;
        bool loop = false;
        s.insert(n);
        while(n != 1 && !loop) {
            int new_n = 0;
            int temp = n;
            while(temp >= 1) {
                int d = temp % 10;
                temp = temp / 10;
                new_n += pow(d, 2);
            }
            if(s.count(new_n)) loop = true;
            s.insert(new_n);
            n = new_n;
        }
        return loop ? false : true;
    }
};
```

## Source
- [Happy Number - LeetCode](https://leetcode.com/problems/happy-number/description/)