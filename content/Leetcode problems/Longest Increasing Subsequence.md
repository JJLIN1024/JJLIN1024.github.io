---
title: Longest Increasing Subsequence
date: 2023-04-10
lastmod: 2024-01-06
author:
  - Jimmy Lin
tags:
  - DP
  - greedy
  - binary_search
  - review
draft: false
sr-due: 2024-06-20
sr-interval: 113
sr-ease: 290
---

## Description

Given an integer array `nums`, return _the length of the longest **strictly increasing**_

_**subsequence**_

.

**Example 1:**

**Input:** nums = \[10,9,2,5,3,7,101,18\]
**Output:** 4
**Explanation:** The longest increasing subsequence is \[2,3,7,101\], therefore the length is 4.

**Example 2:**

**Input:** nums = \[0,1,0,3,2,3\]
**Output:** 4

**Example 3:**

**Input:** nums = \[7,7,7,7,7,7,7\]
**Output:** 1

**Constraints:**

*   `1 <= nums.length <= 2500`
*   `-104 <= nums[i] <= 104`

**Follow up:** Can you come up with an algorithm that runs in `O(n log(n))` time complexity?

## Code 

### DP $O(n^2)$

```cpp
class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        int n = nums.size();
        vector<int> dp(n, 1);
        for(int i = 1; i < n; i++) {
            for(int j = 0; j < i; j++) {
                if(nums[i] > nums[j])
                    dp[i] = max(dp[i], dp[j] + 1);
            }
        }

        return *max_element(dp.begin(), dp.end());
    }
};

```


### Greedy with binary search O(n \log n)

`res` 為 increasing sequence。

對於 `num[i]` 來說，有兩種情形，一種是它比 `res` 的尾端大，那就直接 insert。

第二種情形是它比 `res` 的尾端小，就必須找到 `res` 中比它大的最小元素，將之取代。

取代比之大的最小元素及為 greedy choice，因為 `num[i]` 比較小，因此取代了之後所會造成的可能的 increasing sequence 只會更長不會更短。

```cpp
class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        vector<int> t;
        for(auto n: nums) {
            if(t.empty() || n > t.back()) 
                t.push_back(n);
            else {
                int l = 0, r = t.size() - 1;
                while(l < r) {
                    int mid = (l + r) / 2;
                    if(t[mid] < n) l = mid + 1;
                    else r = mid;
                }
                t[l] = n;
            }
        }
        return t.size();
    }
};
```

其中 binary search 可以使用 `std::lower_bound`。

```cpp
class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        vector<int> res;
        for(auto num: nums) {
            if(res.empty() || res.back() < num) {
                res.emplace_back(num);
            } else {
                auto it = lower_bound(res.begin(), res.end(), num);
                *it = num;
            }
        }
        return res.size();
    }
};


```

## Source
- [Longest Increasing Subsequence - LeetCode](https://leetcode.com/problems/longest-increasing-subsequence/description/)