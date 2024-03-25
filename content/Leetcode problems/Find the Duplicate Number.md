---
title: Find the Duplicate Number
date: 2023-02-03
lastmod: 2023-02-03
author:
  - Jimmy Lin
tags:
  - slow_and_fast_pointer
  - binary_search
  - review
draft: false
sr-due: 2024-03-28
sr-interval: 3
sr-ease: 250
---

## Description

Given an array of integers `nums` containing `n + 1` integers where each integer is in the range `[1, n]` inclusive.

There is only **one repeated number** in `nums`, return _this repeated number_.

You must solve the problem **without** modifying the array `nums` and uses only constant extra space.

**Example 1:**

**Input:** nums = \[1,3,4,2,2\]
**Output:** 2

**Example 2:**

**Input:** nums = \[3,1,3,4,2\]
**Output:** 3

**Constraints:**

*   `1 <= n <= 105`
*   `nums.length == n + 1`
*   `1 <= nums[i] <= n`
*   All the integers in `nums` appear only **once** except for **precisely one integer** which appears **two or more** times.

## Code 

### Binary Search

基本概念同：[[Binary Search 101|Binary Search 101]]

$O(n \log n)$ time, $O(1)$ space，根據 [鴿籠原理](https://zh.wikipedia.org/wiki/%E9%B4%BF%E5%B7%A2%E5%8E%9F%E7%90%86)：若小於等於 `mid` 的個數比 `mid` 還要大，代表 duplicate 的值小於等於 `mid`，反之亦然。

```cpp
class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        int left = 1, right = nums.size() - 1;
        while(left < right) {
            int mid = left + (right - left) / 2;
            int count = 0;
            for(int i = 0; i < nums.size(); i++) {
                if(nums[i] <= mid) count++;
            }
            if(count > mid) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        return left;
    }
};
```


### Hashmap

$O(n)$ space, $O(n)$ time

```cpp
class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        set<int> s;
        for(int i = 0; i < nums.size(); i++) {
            if(s.count(nums[i]) > 0) return nums[i];
            s.insert(nums[i]);
        }
        return 0;
    }
};
```

### Two pointer

$O(n)$ time, $O(1)$ space

使用快慢指標，使用在 [[Linked List Cycle II|Linked List Cycle II]] 提過的方法找 cycle 起點。

重點是如何確定會有 cycle？觀念一樣是 [鴿籠原理](https://zh.wikipedia.org/wiki/%E9%B4%BF%E5%B7%A2%E5%8E%9F%E7%90%86)，因為 duplicate 至少會重複一次，因此若將 array 依據 index 串成 linked list，必定會有 element 被訪問到兩次，因此必定有 cycle，且被訪問到多次的這個 element 就是我們要找的 duplicate。

```cpp
class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        int slow = 0;
        int fast = 0;
        do {
            slow = nums[slow];
            fast = nums[nums[fast]];
        } while(slow != fast);

        slow = 0;
        while(slow != fast) {
            slow = nums[slow];
            fast = nums[fast];
        }
        return slow;
    }
};
```

## Source
- [Find the Duplicate Number - LeetCode](https://leetcode.com/problems/find-the-duplicate-number/description/)