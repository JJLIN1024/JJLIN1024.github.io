---
title: Boats to Save People
date: 2023-07-24
lastmod: 2023-07-24
author: Jimmy Lin
tags: ["greedy", "two pointer"]
draft: false
---

## Description

You are given an array `people` where `people[i]` is the weight of the `ith` person, and an **infinite number of boats** where each boat can carry a maximum weight of `limit`. Each boat carries at most two people at the same time, provided the sum of the weight of those people is at most `limit`.

Return _the minimum number of boats to carry every given person_.

**Example 1:**

**Input:** people = \[1,2\], limit = 3
**Output:** 1
**Explanation:** 1 boat (1, 2)

**Example 2:**

**Input:** people = \[3,2,2,1\], limit = 3
**Output:** 3
**Explanation:** 3 boats (1, 2), (2) and (3)

**Example 3:**

**Input:** people = \[3,5,3,4\], limit = 5
**Output:** 4
**Explanation:** 4 boats (3), (3), (4), (5)

**Constraints:**

*   `1 <= people.length <= 5 * 104`
*   `1 <= people[i] <= limit <= 3 * 104`

## Code 

Time Complexity: $O(n \log n)$, Space Complexity: $O(1)$

考慮將最重和最輕的人配在一起，如果可以就一起上，不行就重的人自己上。

```cpp
class Solution {
public:
    int numRescueBoats(vector<int>& people, int limit) {
        sort(begin(people), end(people));
        int res = 0;
        int l = 0, r = people.size() - 1;
        while(l <= r) {
            if(people[l] + people[r] <= limit) {
                r--;
                l++;
            } else {
                r--;
            }
            res++;
        }
        return res;
    }
};
```

## Source
- [Boats to Save People - LeetCode](https://leetcode.com/problems/boats-to-save-people/description/)