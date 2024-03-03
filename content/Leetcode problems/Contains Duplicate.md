---
title: Contains Duplicate
date: 2023-03-15
lastmod: 2023-03-15
author: Jimmy Lin
tags: ["hashmap"]
draft: false
---

## Description

Given an integer array `nums`, return `true` if any value appears **at least twice** in the array, and return `false` if every element is distinct.

**Example 1:**

**Input:** nums = \[1,2,3,1\]
**Output:** true

**Example 2:**

**Input:** nums = \[1,2,3,4\]
**Output:** false

**Example 3:**

**Input:** nums = \[1,1,1,3,3,4,3,2,4,2\]
**Output:** true

**Constraints:**

*   `1 <= nums.length <= 105`
*   `-109 <= nums[i] <= 109`

## Code 

```
std::set is typically implemented as a binary search tree(RB tree in GCC 4.8). It costs O(nlogn) to construct. While std::unordered_set uses hash table, O(n) is expected. That's why @oynasun observes unordered_set is faster.
```

```cpp
class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        set<int> s;
        for(auto n: nums) {
            if(s.count(n) > 0) 
                return true;
            s.insert(n);
        }
        return false;
    }
};
```

## Source
- [Contains Duplicate - LeetCode](https://leetcode.com/problems/contains-duplicate/)