---
title: Minimum Limit of Balls in a Bag
date: 2023-07-17
lastmod: 2023-07-17
author: Jimmy Lin
tags: ["binary search"]
draft: false
---

## Description

You are given an integer array `nums` where the `ith` bag contains `nums[i]` balls. You are also given an integer `maxOperations`.

You can perform the following operation at most `maxOperations` times:

*   Take any bag of balls and divide it into two new bags with a **positive** number of balls.
    *   For example, a bag of `5` balls can become two new bags of `1` and `4` balls, or two new bags of `2` and `3` balls.

Your penalty is the **maximum** number of balls in a bag. You want to **minimize** your penalty after the operations.

Return _the minimum possible penalty after performing the operations_.

**Example 1:**

**Input:** nums = \[9\], maxOperations = 2
**Output:** 3
**Explanation:** 
- Divide the bag with 9 balls into two bags of sizes 6 and 3. \[**9**\] -> \[6,3\].
- Divide the bag with 6 balls into two bags of sizes 3 and 3. \[**6**,3\] -> \[3,3,3\].
The bag with the most number of balls has 3 balls, so your penalty is 3 and you should return 3.

**Example 2:**

**Input:** nums = \[2,4,8,2\], maxOperations = 4
**Output:** 2
**Explanation:**
- Divide the bag with 8 balls into two bags of sizes 4 and 4. \[2,4,**8**,2\] -> \[2,4,4,4,2\].
- Divide the bag with 4 balls into two bags of sizes 2 and 2. \[2,**4**,4,4,2\] -> \[2,2,2,4,4,2\].
- Divide the bag with 4 balls into two bags of sizes 2 and 2. \[2,2,2,**4**,4,2\] -> \[2,2,2,2,2,4,2\].
- Divide the bag with 4 balls into two bags of sizes 2 and 2. \[2,2,2,2,2,**4**,2\] -> \[2,2,2,2,2,2,2,2\].
The bag with the most number of balls has 2 balls, so your penalty is 2, and you should return 2.

**Constraints:**

*   `1 <= nums.length <= 105`
*   `1 <= maxOperations, nums[i] <= 109`

## Code 

基本概念同：[[Binary Search 101|Binary Search 101]]

Time Complexity: $O(n \cdot \log 1e9)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    int minimumSize(vector<int>& nums, int maxOperations) {
        int l = 1, r = 1e9;

        while(l <= r) {
            int m = l + (r - l) / 2;
            if(canDivide(m, nums, maxOperations)) {
                r = m - 1;
            } else {
                l = m + 1;
            }
        }

        return l;
    }

    bool canDivide(int maxPenalty, vector<int>& nums, int maxOperations) {
        int penalty;
        int operation = 0;
        for(auto&n : nums) {
            if(n > maxPenalty) {
                operation += (n / maxPenalty) - 1;
                if ((n % maxPenalty) > 0) operation++;
            }
            if(operation > maxOperations) return false;
        }

        return true;
    }
};
```

注意在計算要切分多少次時，可以直接計算  `operation += ((n - 1) / maxPenalty);`。

## Source
- [Minimum Limit of Balls in a Bag - LeetCode](https://leetcode.com/problems/minimum-limit-of-balls-in-a-bag/description/)