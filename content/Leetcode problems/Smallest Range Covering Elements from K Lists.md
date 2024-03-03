---
title: Smallest Range Covering Elements from K Lists
date: 2023-07-20
lastmod: 2023-07-20
author: Jimmy Lin
tags: ["heap", "sliding window"]
draft: false
---

## Description

You have `k` lists of sorted integers in **non-decreasing order**. Find the **smallest** range that includes at least one number from each of the `k` lists.

We define the range `[a, b]` is smaller than range `[c, d]` if `b - a < d - c` **or** `a < c` if `b - a == d - c`.

**Example 1:**

**Input:** nums = \[\[4,10,15,24,26\],\[0,9,12,20\],\[5,18,22,30\]\]
**Output:** \[20,24\]
**Explanation:** 
List 1: \[4, 10, 15, 24,26\], 24 is in range \[20,24\].
List 2: \[0, 9, 12, 20\], 20 is in range \[20,24\].
List 3: \[5, 18, 22, 30\], 22 is in range \[20,24\].

**Example 2:**

**Input:** nums = \[\[1,2,3\],\[1,2,3\],\[1,2,3\]\]
**Output:** \[1,1\]

**Constraints:**

*   `nums.length == k`
*   `1 <= k <= 3500`
*   `1 <= nums[i].length <= 50`
*   `-105 <= nums[i][j] <= 105`
*   `nums[i]` is sorted in **non-decreasing** order.

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    bool isPossible(vector<int>& nums) {
        unordered_map<int, int> tail, count;
        for(auto& i: nums) count[i]++;
        for(auto& i: nums) {
            if(count[i] == 0) continue;
            count[i]--;

            // append to existing subsequence
            if(tail[i - 1] > 0) {
                tail[i - 1]--;
                tail[i]++;
            } else if (count[i + 1] && count[i + 2]) {
                // create a new len 3 subsequence
                // borrowing from the future
                count[i + 1]--;
                count[i + 2]--;
                tail[i + 2]++;
            } else return false;
        }

        return true;

    }
};
```

## Source
- [Smallest Range Covering Elements from K Lists - LeetCode](https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/description/)