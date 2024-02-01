---
title: Majority Element
date: 2023-02-04
lastmod: 2023-02-04
author:
  - Jimmy Lin
tags:
  - Moore_Voting_Algorithm
  - bit_manipulation
draft: false
---

## Description

Given an array `nums` of size `n`, return _the majority element_.

The majority element is the element that appears more than `⌊n / 2⌋` times. You may assume that the majority element always exists in the array.

**Example 1:**

**Input:** nums = \[3,2,3\]
**Output:** 3

**Example 2:**

**Input:** nums = \[2,2,1,1,1,2,2\]
**Output:** 2

**Constraints:**

*   `n == nums.length`
*   `1 <= n <= 5 * 104`
*   `-109 <= nums[i] <= 109`

**Follow-up:** Could you solve the problem in linear time and in `O(1)` space?

## Code 

### hashmap
Time Complexity: $O(N)$, Space Complexity: $O(N)$
```cpp
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        map<int, int> m;
        for(int i = 0; i < nums.size(); i++) {
            m[nums[i]]++;
            if( m[nums[i]] > floor(nums.size() / 2)) return nums[i];
        }

        return 0;
    }
};
```

### Sorting

Time Complexity: $O(N \log N)$, Space Complexity: $O(N)$
因為 majority element 佔至少 1/2，因此排在 sort 過後的 nums 的 1/2 位置的 element 一定就是 majority element。

```cpp
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        nth_element(nums.begin(), nums.begin() + nums.size() / 2, nums.end());
        return nums[nums.size() / 2];
    }
};
```

### Moore Voting Algorithm

Time Complexity: $O(N)$, Space Complexity: $O(1)$
[Moore Voting Algorithm](https://ithelp.ithome.com.tw/articles/10213285) 的精髓在於：刪去一個數列中的兩個不同的數字，不會影響該數列的majority element。

```c
int majorityElement(int* nums, int numsSize) {
    int majority;
    int count = 0;
    for(int i = 0; i < numsSize; i++) {
        if(!count) majority = nums[i];
        count += nums[i] == majority ? 1 : -1;
    }
    return majority;
}
```

```cpp
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int count = 0, majority;
        for(int num: nums) {
            if(!count) majority = num;
            count += num == majority? 1 : -1;
        }
        return majority;
    }
};
```

### bit manipulation

iterate 過 32 個 bit，使用 mask 查看該位置的 bit 被設為 1 的次數是否超過一半。

注意 left shift 時，注意 `mask` 要設成 `unsigned int`。

```c
int majorityElement(int* nums, int numsSize) {
    int res = 0;
    for(unsigned int j = 0, mask = 1; j < 32; j++, mask << 1) {
        int count = 0;
        for(int i = 0; i < numsSize; i++) {
            if(nums[i] & mask) {
                count++;
            }
        }
        if(count > (numsSize / 2)) 
            res |= mask;
    }
    return res;
}
```

```cpp
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int majority = 0;
        for(unsigned int i = 0, mask = 1; i < 32; mask <<= 1, i++) {
            int bits = 0;
            for(int num: nums) {
                if(num & mask) {
                    bits++;
                }
            }
            if(bits > nums.size() / 2) majority |= mask;
        }
        return majority;
    }
};
```

## Source
- [Majority Element - LeetCode](https://leetcode.com/problems/majority-element/description/)
- [Majority Voting Algorithm](https://gregable.com/2013/10/majority-vote-algorithm-find-majority.html)
- 