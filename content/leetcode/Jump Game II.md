---
title: Jump Game II
date: 2023-03-10
lastmod: 2023-03-10
author: Jimmy Lin
tags: ["DP", "BFS", "dynamic programming"]
draft: false
---

## Description

You are given a **0-indexed** array of integers `nums` of length `n`. You are initially positioned at `nums[0]`.

Each element `nums[i]` represents the maximum length of a forward jump from index `i`. In other words, if you are at `nums[i]`, you can jump to any `nums[i + j]` where:

*   `0 <= j <= nums[i]` and
*   `i + j < n`

Return _the minimum number of jumps to reach_ `nums[n - 1]`. The test cases are generated such that you can reach `nums[n - 1]`.

**Example 1:**

**Input:** nums = \[2,3,1,1,4\]
**Output:** 2
**Explanation:** The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.

**Example 2:**

**Input:** nums = \[2,3,0,1,4\]
**Output:** 2

**Constraints:**

*   `1 <= nums.length <= 104`
*   `0 <= nums[i] <= 1000`
*   It's guaranteed that you can reach `nums[n - 1]`.

## Code 

和 [[Video Stitching|Video Stitching]] 、[[Minimum Number of Taps to Open to Water a Garden|Minimum Number of Taps to Open to Water a Garden]] 一樣的解法。
### DP

一路往前的 DP。

```cpp
class Solution {
public:
    int jump(vector<int>& nums) {
        int n = nums.size();
        vector<int> jumps(n, 1e9);
        jumps[0] = 0;
        for(int i = 0; i < n; i++) {
            for(int j = i + 1; j <= i + nums[i] && j < n; j++) {
                jumps[j] = min(jumps[i] + 1, jumps[j]);
            }
        }
        return jumps[n-1];
    }
};
```

往回看的 DP。

```cpp
class Solution {
public:
    int jump(vector<int>& nums) {
        int n = nums.size();
        vector<int> DP(n, INT_MAX);
        DP[0] = 0;
        for(int i = 1; i < n; i++) {
            for(int j = 0; j < i; j++) {
                if(nums[j] + j >= i) {
                    DP[i] = min(DP[i], DP[j] + 1);
                }
            }
        }
        return DP[n-1];
    }
};
```


### BFS

`end` 代表 BFS 的層數。

注意 `if(i >= nums.size() - 1) break;`，用來避免 `end` 已在 `n-1` 所在的層數內時，多計算一次 `jump`。

```cpp
class Solution {
public:
    int jump(vector<int>& nums) {
        int end = 0, furthest = 0, jump = 0;
        for(int i = 0; i < nums.size(); i++) {
            furthest = max(furthest, i + nums[i]);
            if(i >= nums.size() - 1) break;
            if(i == end) {
                end = furthest;
                jump++;
            }
        }
        return jump;
    }
};
```


### Greedy
Time Complexity: $O(n)$, Space Complexity: $O(n)$

和 [[Minimum Number of Taps to Open to Water a Garden|Minimum Number of Taps to Open to Water a Garden]] 的 Greedy code 一模一樣。

```cpp
class Solution {
public:
    int jump(vector<int>& nums) {
        
        unordered_map<int, int> range_map;
        for(int i = 0; i < nums.size(); i++) {
            int end = min((int) nums.size() - 1, i + nums[i]);
            range_map[i] = max(range_map[i], end);
        }   

        int prev_covered = -1, covered = 0, count = 0;

        for(int i = 0; i < nums.size(); i++) {

            if(covered >= (int) nums.size() - 1 || i > covered) break;

            if(range_map.count(i)) {
                if(i > prev_covered) {
                    count++;
                    prev_covered = covered;
                }

                covered = max(covered, range_map[i]);
            }
        }

        return covered >= nums.size() - 1 ? count : -1;
    }
};
```

## Source
- [Jump Game II - LeetCode](https://leetcode.com/problems/jump-game-ii/description/)