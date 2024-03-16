---
title: Number of Subsequences That Satisfy the Given Sum Condition
date: 2024-03-14
lastmod: 2024-03-14
author:
  - Jimmy Lin
tags:
  - two_pointer
  - review
draft: false
sr-due: 2024-03-18
sr-interval: 4
sr-ease: 270
---

## Description

You are given an array of integers `nums` and an integer `target`.

Return _the number of **non-empty** subsequences of_ `nums` _such that the sum of the minimum and maximum element on it is less or equal to_ `target`. Since the answer may be too large, return it **modulo** `109 + 7`.

**Example 1:**

**Input:** nums = \[3,5,6,7\], target = 9
**Output:** 4
**Explanation:** There are 4 subsequences that satisfy the condition.
\[3\] -> Min value + max value <= target (3 + 3 <= 9)
\[3,5\] -> (3 + 5 <= 9)
\[3,5,6\] -> (3 + 6 <= 9)
\[3,6\] -> (3 + 6 <= 9)

**Example 2:**

**Input:** nums = \[3,3,6,8\], target = 10
**Output:** 6
**Explanation:** There are 6 subsequences that satisfy the condition. (nums can have repeated numbers).
\[3\] , \[3\] , \[3,3\], \[3,6\] , \[3,6\] , \[3,3,6\]

**Example 3:**

**Input:** nums = \[2,3,3,4,6,7\], target = 12
**Output:** 61
**Explanation:** There are 63 non-empty subsequences, two of them do not satisfy the condition (\[6,7\], \[7\]).
Number of valid subsequences (63 - 2 = 61).

**Constraints:**

*   `1 <= nums.length <= 105`
*   `1 <= nums[i] <= 106`
*   `1 <= target <= 106`

## Code 

類似 [[Two Sum]]，先找到最接近 target 的組合，中間就都是解，可選可不選。

Time Complexity: $O(n \log n)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    int numSubseq(vector<int>& nums, int target) {
        long M = 1e9 + 7;
        int n = nums.size();
        sort(nums.begin(), nums.end());
        vector<long> power(n + 1);
        power[0] = 1;
        for(int i = 1; i <= n; i++) {
            power[i] = power[i - 1] * 2 % M;
        }

        int j = n - 1;
        int res = 0;
        for(int i = 0; i < n; i++) {
            while(j >= 0 && nums[i] + nums[j] > target)
                j--;
            if(j < i) break;
            res = (res + power[j - i]) % M;
        }

        return res;

    }
};
```

## Source
- [Number of Subsequences That Satisfy the Given Sum Condition - LeetCode](https://leetcode.com/problems/number-of-subsequences-that-satisfy-the-given-sum-condition/description/?envType=study-plan-v2&envId=binary-search)