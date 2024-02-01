---
title: Jump Game VI
date: 2023-03-12
lastmod: 2023-03-12
author: Jimmy Lin
tags: ["DP", "multiset", "deque"]
draft: false
---

## Description

You are given a **0-indexed** integer array `nums` and an integer `k`.

You are initially standing at index `0`. In one move, you can jump at most `k` steps forward without going outside the boundaries of the array. That is, you can jump from index `i` to any index in the range `[i + 1, min(n - 1, i + k)]` **inclusive**.

You want to reach the last index of the array (index `n - 1`). Your **score** is the **sum** of all `nums[j]` for each index `j` you visited in the array.

Return _the **maximum score** you can get_.

**Example 1:**

**Input:** nums = \[1,\-1,-2,4,-7,3\], k = 2
**Output:** 7
**Explanation:** You can choose your jumps forming the subsequence \[1,-1,4,3\] (underlined above). The sum is 7.

**Example 2:**

**Input:** nums = \[10,-5,-2,4,0,3\], k = 3
**Output:** 17
**Explanation:** You can choose your jumps forming the subsequence \[10,4,3\] (underlined above). The sum is 17.

**Example 3:**

**Input:** nums = \[1,-5,-20,4,-1,3,-6,-3\], k = 2
**Output:** 0

**Constraints:**

*   `1 <= nums.length, k <= 105`
*   `-104 <= nums[i] <= 104`

## Code 

### Simple DP

TLE(Time Limit Exceed)，Time complexity 為 $O(nk)$。

```cpp
class Solution {
public:
    int maxResult(vector<int>& nums, int k) {
        int n = nums.size();
        vector<int> DP(n, INT_MIN);
        DP[0] = nums[0];
        for(int i = 0; i < n; i++) {
            for(int j = i - k >= 0 ? i - k : 0; j >= 0 && j < i; j++) {
                DP[i] = max(DP[i], DP[j] + nums[i]);
            }
        }
        return DP[n - 1];
    }
};
```

### DP with multiset

Time Complexity 為 $O(n\log k)$。

```
For set, multiset, map, multimap the time complexity for insertion, deletion and retrieving information is O(logn) as they follow the balance binary tree to structure the data.
```

```cpp
class Solution {
public:
    int maxResult(vector<int>& nums, int k) {
        int n = nums.size();
        vector<int> DP(n, INT_MIN);
        multiset<int> m({DP[0] = nums[0]});
        for(int i = 1; i < n; i++) {
            if(i > k) m.erase(m.find(DP[i - k - 1]));
            m.insert(DP[i] = *rbegin(m) + nums[i]);
        }
        return DP[n - 1];
    }
};
```

### DP with deque

用到 [[Sliding Window Maximum]] 中的概念：如何在 sliding window size = k 中找最大值。

Time Complexity 為 $O(n)$

```cpp
class Solution {
public:
    int maxResult(vector<int>& nums, int k) {
        int n = nums.size();
        vector<int> DP(n, INT_MIN);
        DP[0] = nums[0];
        deque<int> q = {0};
        for(int i = 1; i < n; i++) {
            if(q.front() < i - k) q.pop_front();
            DP[i] = DP[q.front()] + nums[i];
            while(!q.empty() && DP[q.back()] <= DP[i]) 
                q.pop_back();
            q.push_back(i);
            
        }
        return DP.back();
    }
};
```

## Source
- [Jump Game VI - LeetCode](https://leetcode.com/problems/jump-game-vi/)