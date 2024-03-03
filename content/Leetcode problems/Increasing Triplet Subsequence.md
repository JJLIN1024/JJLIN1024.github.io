---
title: Increasing Triplet Subsequence
date: 2023-04-12
lastmod: 2023-04-12
author:
  - Jimmy Lin
tags:
  - two_pointer
  - DP
draft: false
---

## Description

Given an integer array `nums`, return `true` _if there exists a triple of indices_ `(i, j, k)` _such that_ `i < j < k` _and_ `nums[i] < nums[j] < nums[k]`. If no such indices exists, return `false`.

**Example 1:**

**Input:** nums = \[1,2,3,4,5\]
**Output:** true
**Explanation:** Any triplet where i < j < k is valid.

**Example 2:**

**Input:** nums = \[5,4,3,2,1\]
**Output:** false
**Explanation:** No triplet exists.

**Example 3:**

**Input:** nums = \[2,1,5,0,4,6\]
**Output:** true
**Explanation:** The triplet (3, 4, 5) is valid because nums\[3\] == 0 < nums\[4\] == 4 < nums\[5\] == 6.

**Constraints:**

*   `1 <= nums.length <= 5 * 105`
*   `-231 <= nums[i] <= 231 - 1`

**Follow up:** Could you implement a solution that runs in `O(n)` time complexity and `O(1)` space complexity?

## Code 

利用 [[Longest Increasing Subsequence]] 去找到最長的 increasing subsequence，若長度超過三，代表符合題意的解答存在。

$O(n \log n)$ Time &  $O(n)$ Space

```cpp
class Solution {
public:
    bool increasingTriplet(vector<int>& nums) {
        vector<int> res;
        for(int i = 0; i < nums.size(); i++) {
            if(res.empty() || res.back() < nums[i]) {
                res.emplace_back(nums[i]);
            } else {
                auto it = lower_bound(res.begin(), res.end(), nums[i]);
                *it = nums[i];
            }
        }

        return res.size() >= 3;
    }
};
```

```cpp
class Solution {
public:
    bool increasingTriplet(vector<int>& nums) {
        vector<int> LIS;
        for(auto n: nums) {
            if(LIS.empty()) LIS.push_back(n);
            else {
                int l = 0, r = LIS.size();
                while(l < r) {
                    int m = (l + r) / 2;
                    if(LIS[m] >= n) {
                        r = m;
                    } else {
                        l = m + 1;
                    }
                }
                if(l == LIS.size()) LIS.push_back(n);
                else {
                    LIS[l] = n;
                }
            }
        }
        return LIS.size() >= 3;
    }
};
```

### two pointer

```cpp
class Solution {
public:
    bool increasingTriplet(vector<int>& nums) {
        int c1 = INT_MAX, c2 = INT_MAX;
        for (int x : nums) {
            if (x <= c1) {
                c1 = x;           // c1 is min seen so far (it's a candidate for 1st element)
            } else if (x <= c2) { // here when x > c1, i.e. x might be either c2 or c3
                c2 = x;           // x is better than the current c2, store it
            } else {              // here when we have/had c1 < c2 already and x > c2
                return true;      // the increasing subsequence of 3 elements exists
            }
        }
        return false;

    }
};
```

## Source
- [Increasing Triplet Subsequence - LeetCode](https://leetcode.com/problems/increasing-triplet-subsequence/description/)