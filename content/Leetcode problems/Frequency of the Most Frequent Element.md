---
title: Frequency of the Most Frequent Element
date: 2023-10-14
lastmod: 2024-01-08
author:
  - Jimmy Lin
tags:
  - sliding_window
draft: false
---

## Description

The **frequency** of an element is the number of times it occurs in an array.

You are given an integer array `nums` and an integer `k`. In one operation, you can choose an index of `nums` and increment the element at that index by `1`.

Return _the **maximum possible frequency** of an element after performing **at most**_ `k` _operations_.

**Example 1:**

**Input:** nums = \[1,2,4\], k = 5
**Output:** 3 **Explanation:** Increment the first element three times and the second element two times to make nums = \[4,4,4\].
4 has a frequency of 3.

**Example 2:**

**Input:** nums = \[1,4,8,13\], k = 5
**Output:** 2
**Explanation:** There are multiple optimal solutions:
- Increment the first element three times to make nums = \[4,4,8,13\]. 4 has a frequency of 2.
- Increment the second element four times to make nums = \[1,8,8,13\]. 8 has a frequency of 2.
- Increment the third element five times to make nums = \[1,4,13,13\]. 13 has a frequency of 2.

**Example 3:**

**Input:** nums = \[3,9,6\], k = 2
**Output:** 1

**Constraints:**

*   `1 <= nums.length <= 105`
*   `1 <= nums[i] <= 105`
*   `1 <= k <= 105`

## Code 

Time Complexity: $O(n \log n)$, Space Complexity: $O(1)$

要將鄰近的 element 都變成和自己具有相同的值，其實就是 sliding window 的概念（鄰近的 elements 組成一個 window）。

```cpp
class Solution {
public:
    int maxFrequency(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        
        int j = 0;
        long count = 0;
        int res = 1;
        for(int i = 1; i < n; i++) {
	            count += (long) (i - j) * (nums[i] - nums[i - 1]);
            while(count > k) {
                count -=(nums[i] - nums[j]);
                j++;
            }
            res = max(res, i - j + 1);
        }

        return res;
    }
};
```
## Source
- [Frequency of the Most Frequent Element - LeetCode](https://leetcode.com/problems/frequency-of-the-most-frequent-element/description/)