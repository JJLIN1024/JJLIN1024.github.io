---
title: Jump Game
date: 2022-12-27
lastmod: 2023-03-10
author: Jimmy Lin
tags: ["Greedy"]
draft: false
---

## Description

You are given an integer array `nums`. You are initially positioned at the array's **first index**, and each element in the array represents your maximum jump length at that position.

Return `true` _if you can reach the last index, or_ `false` _otherwise_.

**Example 1:**

**Input:** nums = \[2,3,1,1,4\]
**Output:** true
**Explanation:** Jump 1 step from index 0 to 1, then 3 steps to the last index.

**Example 2:**

**Input:** nums = \[3,2,1,0,4\]
**Output:** false
**Explanation:** You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.

**Constraints:**

*   `1 <= nums.length <= 104`
*   `0 <= nums[i] <= 105`

## Code

```cpp
class Solution {
public:
    bool canJump(vector<int>& nums) {
        int farest = 0;
        for(int i = 0; i < nums.size(); i++) {
            if (i > farest) return false;
            farest = max(nums[i] + i, farest);
        }
        return true;
    }
};
```

倒著回來：

```cpp
class Solution {
public:
    bool canJump(vector<int>& nums) {
       int size = nums.size();
       int lastPosition = size - 1;
       for(int i = size -2; i >= 0; i--) {
           if((nums[i] + i) >= lastPosition) {
               lastPosition = i;
           }
       }
        return lastPosition == 0;
    }
};
```

## Link
- [Jump Game](https://leetcode.com/problems/jump-game/description/)