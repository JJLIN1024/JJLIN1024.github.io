---
title: Product of Array Except Self
date: 2023-03-22
lastmod: 2024-01-07
author:
  - Jimmy Lin
tags:
  - prefix_sum
  - review
draft: false
sr-due: 2025-01-02
sr-interval: 308
sr-ease: 330
---

## Description

Given an integer array `nums`, return _an array_ `answer` _such that_ `answer[i]` _is equal to the product of all the elements of_ `nums` _except_ `nums[i]`.

The product of any prefix or suffix of `nums` is **guaranteed** to fit in a **32-bit** integer.

You must write an algorithm that runs in `O(n)` time and without using the division operation.

**Example 1:**

**Input:** nums = \[1,2,3,4\]
**Output:** \[24,12,8,6\]

**Example 2:**

**Input:** nums = \[-1,1,0,-3,3\]
**Output:** \[0,0,9,0,0\]

**Constraints:**

*   `2 <= nums.length <= 105`
*   `-30 <= nums[i] <= 30`
*   The product of any prefix or suffix of `nums` is **guaranteed** to fit in a **32-bit** integer.

**Follow up:** Can you solve the problem in `O(1)` extra space complexity? (The output array **does not** count as extra space for space complexity analysis.)

## Code 

$O(n)$ Time, $O(n)$ Space

```cpp
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        vector<int> prefixSum(nums);
        vector<int> postfixSum(nums);
        for(int i = 1; i < prefixSum.size(); i++) {
            prefixSum[i] *= prefixSum[i - 1];
        }
        for(int j = postfixSum.size() - 2; j >= 0; j--) {
            postfixSum[j] *= postfixSum[j + 1];
        }
        int n = nums.size();
        vector<int> answer(n);
        for(int i = 0; i < n; i++) {
            int pre = i - 1 >= 0 ? prefixSum[i - 1] : 1;
            int post = i + 1 < n ? postfixSum[i + 1] : 1;
            answer[i] = pre * post;
        }   
        return answer;
    }
};
```

$O(n)$ Time, $O(1)$ Space

思路和 $O(n)$ Space 的解法相同，都是要計算由右至左，以及由左至右的 prefix product，只是 do it inplace。

```cpp
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n, 0); 
        res[0] = 1;
        for(int i = 1; i < n; i++) {
            res[i] = res[i - 1] * nums[i - 1];
        }

        int r = 1;
        for(int i = n - 1; i >= 0; i--) {
            res[i] *= r;
            r *= nums[i];
        }
        return res;
        
    }
};
```


## Source
- [Product of Array Except Self - LeetCode](https://leetcode.com/problems/product-of-array-except-self/description/)