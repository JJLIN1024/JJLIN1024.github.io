---
title: Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit
date: 2023-10-29
lastmod: 2023-10-29
author:
  - Jimmy Lin
tags:
  - monotonic_queue
  - two_pointer
  - sliding_window
  - review
draft: false
sr-due: 2024-03-08
sr-interval: 3
sr-ease: 250
---

## Description

Given an array of integers `nums` and an integer `limit`, return the size of the longest **non-empty** subarray such that the absolute difference between any two elements of this subarray is less than or equal to `limit`_._

**Example 1:**

**Input:** nums = \[8,2,4,7\], limit = 4
**Output:** 2 
**Explanation:** All subarrays are: 
\[8\] with maximum absolute diff |8-8| = 0 <= 4.
\[8,2\] with maximum absolute diff |8-2| = 6 > 4. 
\[8,2,4\] with maximum absolute diff |8-2| = 6 > 4.
\[8,2,4,7\] with maximum absolute diff |8-2| = 6 > 4.
\[2\] with maximum absolute diff |2-2| = 0 <= 4.
\[2,4\] with maximum absolute diff |2-4| = 2 <= 4.
\[2,4,7\] with maximum absolute diff |2-7| = 5 > 4.
\[4\] with maximum absolute diff |4-4| = 0 <= 4.
\[4,7\] with maximum absolute diff |4-7| = 3 <= 4.
\[7\] with maximum absolute diff |7-7| = 0 <= 4. 
Therefore, the size of the longest subarray is 2.

**Example 2:**

**Input:** nums = \[10,1,2,4,7,2\], limit = 5
**Output:** 4 
**Explanation:** The subarray \[2,4,7,2\] is the longest since the maximum absolute diff is |2-7| = 5 <= 5.

**Example 3:**

**Input:** nums = \[4,2,2,2,4,4,2,2\], limit = 0
**Output:** 3

**Constraints:**

*   `1 <= nums.length <= 105`
*   `1 <= nums[i] <= 109`
*   `0 <= limit <= 109`

## Code 
### Sliding Window + Monotonic Queue

使用 sliding window 去解，但同時，我們需要知道 running max & min，因為 max, min 的差距就是最大的 absolute difference，而 difference 的限制為 limit。

要找出 running max & min 可以使用 heap，也可以使用 monotonic queue，monotonic queue 比較快，只需要 $O(n)$。

做出 running max & min 的方法在 [[Constrained Subsequence Sum|Constrained Subsequence Sum]] 中學到。

Time Complexity: $O(n)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    int longestSubarray(vector<int>& nums, int limit) {
        deque<int> Max, Min;
        int n = nums.size();

        int i = 0, j;
        for(j = 0; j < n; j++) {

            while(!Max.empty() && nums[Max.back()] <= nums[j]) Max.pop_back();
            while(!Min.empty() && nums[Min.back()] >= nums[j]) Min.pop_back();
            Max.push_back(j);
            Min.push_back(j);

            if(nums[Max.front()] - nums[Min.front()] > limit) {
                if(Max.front() == i) Max.pop_front();
                if(Min.front() == i) Min.pop_front();
                i++;
            }
        }

        return j - i;
    }
};
```

以下只是將 `if` 改成 `while`，因此 return 的值也不同。

```cpp
class Solution {
public:
    int longestSubarray(vector<int>& nums, int limit) {
        deque<int> Max, Min;
        int n = nums.size();

        int i = 0, res = 1, j;
        for(j = 0; j < n; j++) {

            while(!Max.empty() && nums[Max.back()] <= nums[j]) Max.pop_back();
            while(!Min.empty() && nums[Min.back()] >= nums[j]) Min.pop_back();
            Max.push_back(j);
            Min.push_back(j);

            while(!Max.empty() && !Min.empty() && nums[Max.front()] - nums[Min.front()] > limit) {
                if(Max.front() == i) Max.pop_front();
                if(Min.front() == i) Min.pop_front();
                i++;
            }

            res = max(res, j - i + 1);
        }

        return res;
    }
};
```
## Source
- [Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit - LeetCode](https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/)