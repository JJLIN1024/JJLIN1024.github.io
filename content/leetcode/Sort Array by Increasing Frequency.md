---
title: Sort Array by Increasing Frequency
date: 2023-04-06
lastmod: 2023-12-19
author:
  - Jimmy Lin
tags:
  - sorting
  - STL
draft: false
---

## Description

Given an array of integers `nums`, sort the array in **increasing** order based on the frequency of the values. If multiple values have the same frequency, sort them in **decreasing** order.

Return the _sorted array_.

**Example 1:**

**Input:** nums = \[1,1,2,2,2,3\]
**Output:** \[3,1,1,2,2,2\]
**Explanation:** '3' has a frequency of 1, '1' has a frequency of 2, and '2' has a frequency of 3.

**Example 2:**

**Input:** nums = \[2,3,1,3,2\]
**Output:** \[1,3,3,2,2\]
**Explanation:** '2' and '3' both have a frequency of 2, so they are sorted in decreasing order.

**Example 3:**

**Input:** nums = \[-1,1,-6,4,5,-6,1,4,1\]
**Output:** \[5,-1,4,4,-6,-6,1,1,1\]

**Constraints:**

*   `1 <= nums.length <= 100`
*   `-100 <= nums[i] <= 100`

## Code 

- [C++ lambda function](https://learn.microsoft.com/zh-tw/cpp/cpp/lambda-expressions-in-cpp?view=msvc-170)
- custom comparator

> Lambda 可以在其主體中引進新的變數（在 C++14 中），也可以從周圍範圍存取或 擷取 變數。 Lambda 會從擷取子句開始。 它會指定擷取哪些變數，以及擷取是依值還是以傳址方式擷取。 具有 ampersand （ & ） 前置詞的變數會依傳址方式存取，而沒有該前置詞的變數則依值存取。
> 
> 空白的擷取子句 [ ] 表示 Lambda 運算式主體不存取封閉範圍中的任何變數。
> 
> 您可以使用擷取預設模式來指出如何擷取 Lambda 主體中所參考的任何外部變數： [&] 表示您參考的所有變數都會依傳址方式擷取，並 [=] 表示這些變數是以傳值方式擷取。

Time Complexity: $O(n \log n)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    vector<int> frequencySort(vector<int>& nums) {
        unordered_map<int, int> count;
        for(auto n: nums) {
            count[n]++;
        }

        sort(nums.begin(), nums.end(), [&](int a, int b) {
            return count[a] == count[b] ? a > b : count[a] < count[b];
        });

        return nums;
    }
};
```

## Source
- [Sort Array by Increasing Frequency - LeetCode](https://leetcode.com/problems/sort-array-by-increasing-frequency/description/)