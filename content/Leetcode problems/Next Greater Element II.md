---
title: Next Greater Element II
date: 2023-03-25
lastmod: 2023-12-02
author:
  - Jimmy Lin
tags:
  - monotonic_stack
  - review
draft: false
sr-due: 2025-01-14
sr-interval: 315
sr-ease: 332
---

## Description

Given a circular integer array `nums` (i.e., the next element of `nums[nums.length - 1]` is `nums[0]`), return _the **next greater number** for every element in_ `nums`.

The **next greater number** of a number `x` is the first greater number to its traversing-order next in the array, which means you could search circularly to find its next greater number. If it doesn't exist, return `-1` for this number.

**Example 1:**

**Input:** nums = \[1,2,1\]
**Output:** \[2,-1,2\]
Explanation: The first 1's next greater number is 2; 
The number 2 can't find next greater number. 
The second 1's next greater number needs to search circularly, which is also 2.

**Example 2:**

**Input:** nums = \[1,2,3,4,3\]
**Output:** \[2,3,4,-1,4\]

**Constraints:**

*   `1 <= nums.length <= 104`
*   `-109 <= nums[i] <= 109`

## Code 

### Monotonic Stack

Time Complexity: $O(N)$, Space Complexity: $O(N)$

Trick：繞兩圈，`real_i = i % n`

剩下的就都和 [[Next Greater Element I|Next Greater Element I]] 一樣了。

```cpp
class Solution {
public:
    vector<int> nextGreaterElements(vector<int>& nums) {
        unordered_map<int, int> mp;
        int n = nums.size();
        vector<int> res(n, -1);
        stack<int> st;
        for(int i = 0; i < 2 * n; i++) {
            int real_i = i % n;
            while(!st.empty() && nums[st.top()] < nums[real_i]) {
                res[st.top()] = nums[real_i];
                st.pop();
            }
            st.push(real_i);
        }

        return res;
    }
};
```
## Source
- [Next Greater Element II - LeetCode](https://leetcode.com/problems/next-greater-element-ii/description/)