---
title: Hand of Straights
date: 2024-03-01
lastmod: 2024-03-01
author:
  - Jimmy Lin
tags:
  - hashmap
  - greedy
draft: false
---

## Description

Alice has some number of cards and she wants to rearrange the cards into groups so that each group is of size `groupSize`, and consists of `groupSize` consecutive cards.

Given an integer array `hand` where `hand[i]` is the value written on the `ith` card and an integer `groupSize`, return `true` if she can rearrange the cards, or `false` otherwise.

**Example 1:**

**Input:** hand = \[1,2,3,6,2,3,4,7,8\], groupSize = 3
**Output:** true
**Explanation:** Alice's hand can be rearranged as \[1,2,3\],\[2,3,4\],\[6,7,8\]

**Example 2:**

**Input:** hand = \[1,2,3,4,5\], groupSize = 4
**Output:** false
**Explanation:** Alice's hand can not be rearranged into groups of 4.

**Constraints:**

*   `1 <= hand.length <= 104`
*   `0 <= hand[i] <= 109`
*   `1 <= groupSize <= hand.length`

**Note:** This question is the same as 1296: [https://leetcode.com/problems/divide-array-in-sets-of-k-consecutive-numbers/](https://leetcode.com/problems/divide-array-in-sets-of-k-consecutive-numbers/)

## Code 

Time Complexity: $O(n \log n)$, Space Complexity: $O(n)$

注意在 iterate through map 時，要確保 `if(value > 0)`。

這題的概念類似 [[Longest Consecutive Sequence]]


```cpp
class Solution {
public:
    bool isNStraightHand(vector<int>& hand, int groupSize) {
        if(hand.size() % groupSize != 0) return false;
        map<int, int> mp;
        for(auto h: hand) {
            mp[h]++;
        }

        for(auto [key, value]: mp) {
            auto tmp = key;
            if(value > 0) {
                for(int i = 0; i < groupSize; i++) {
                    if(mp.find(tmp) == mp.end())
                        return false;
                    mp[tmp] -= value;

                    if(mp[tmp] < 0)
                        return false;
                    tmp++;
                }
            }
        }

        return true;
    }
};
```

## Source
- [Hand of Straights - LeetCode](https://leetcode.com/problems/hand-of-straights/description/)