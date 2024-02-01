---
title: Daily Temperatures
date: 2023-03-25
lastmod: 2023-03-25
author:
  - Jimmy Lin
tags:
  - stack
  - monotonic_stack
draft: false
---

## Description

Given an array of integers `temperatures` represents the daily temperatures, return _an array_ `answer` _such that_ `answer[i]` _is the number of days you have to wait after the_ `ith` _day to get a warmer temperature_. If there is no future day for which this is possible, keep `answer[i] == 0` instead.

**Example 1:**

**Input:** temperatures = \[73,74,75,71,69,72,76,73\]
**Output:** \[1,1,4,2,1,1,0,0\]

**Example 2:**

**Input:** temperatures = \[30,40,50,60\]
**Output:** \[1,1,1,0\]

**Example 3:**

**Input:** temperatures = \[30,60,90\]
**Output:** \[1,1,0\]

**Constraints:**

*   `1 <= temperatures.length <= 105`
*   `30 <= temperatures[i] <= 100`

## Code 

### Monotonic Stack

解題邏輯和 [[Next Greater Element I|Next Greater Element I]] 一樣。

Time Complexity: $O(N)$, Space Complexity: $O(N)$

```cpp
class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        stack<int> st;
        int n = temperatures.size();
        vector<int> res(n, 0);
        for(int i = n - 1; i >= 0; i--) {
            // maitain decreasing order of stack
            while(!st.empty() && temperatures[st.top()] <= temperatures[i]) {
                st.pop();
            }

            if(!st.empty()) {
                res[i] = st.top() - i;
            }
            st.push(i);
        }
        return res;
    }
};
```

## Source
- [Daily Temperatures - LeetCode](https://leetcode.com/problems/daily-temperatures/description/)