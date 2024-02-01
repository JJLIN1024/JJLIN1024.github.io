---
title: Two Sum
date: 2023-01-04
lastmod: 2023-01-04
author:
  - Jimmy Lin
tags:
  - hashmap
draft: false
---

## Description

Given an array of integers `nums` and an integer `target`, return _indices of the two numbers such that they add up to `target`_.

You may assume that each input would have **_exactly_ one solution**, and you may not use the _same_ element twice.

You can return the answer in any order.

**Example 1:**

**Input:** nums = \[2,7,11,15\], target = 9
**Output:** \[0,1\]
**Explanation:** Because nums\[0\] + nums\[1\] == 9, we return \[0, 1\].

**Example 2:**

**Input:** nums = \[3,2,4\], target = 6
**Output:** \[1,2\]

**Example 3:**

**Input:** nums = \[3,3\], target = 6
**Output:** \[0,1\]

**Constraints:**

*   `2 <= nums.length <= 104`
*   `-109 <= nums[i] <= 109`
*   `-109 <= target <= 109`
*   **Only one valid answer exists.**

**Follow-up:** Can you come up with an algorithm that is less than `O(n2)` time complexity?


## Code

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        vector<int> answer;
        unordered_map<int, int> myMap;
        for(int i = 0; i < nums.size(); i++) {
            int res = target - nums[i];
            if(myMap.find(res) != myMap.end()) {
                return answer = {i, myMap[res]};
            }
            myMap[nums[i]] = i;
        }
        return answer;
    }
};
```

## Link
- [Two Sum](https://leetcode.com/problems/two-sum/)
