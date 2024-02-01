---
title: Minimum Number of Operations to Make Arrays Similar
date: 2023-07-25
lastmod: 2023-07-25
author: Jimmy Lin
tags: ["greedy"]
draft: false
---

## Description

You are given two positive integer arrays `nums` and `target`, of the same length.

In one operation, you can choose any two **distinct** indices `i` and `j` where `0 <= i, j < nums.length` and:

*   set `nums[i] = nums[i] + 2` and
*   set `nums[j] = nums[j] - 2`.

Two arrays are considered to be **similar** if the frequency of each element is the same.

Return _the minimum number of operations required to make_ `nums` _similar to_ `target`. The test cases are generated such that `nums` can always be similar to `target`.

**Example 1:**

**Input:** nums = \[8,12,6\], target = \[2,14,10\]
**Output:** 2
**Explanation:** It is possible to make nums similar to target in two operations:
- Choose i = 0 and j = 2, nums = \[10,12,4\].
- Choose i = 1 and j = 2, nums = \[10,14,2\].
It can be shown that 2 is the minimum number of operations needed.

**Example 2:**

**Input:** nums = \[1,2,5\], target = \[4,1,3\]
**Output:** 1
**Explanation:** We can make nums similar to target in one operation:
- Choose i = 1 and j = 2, nums = \[1,4,3\].

**Example 3:**

**Input:** nums = \[1,1,1,1,1\], target = \[1,1,1,1,1\]
**Output:** 0
**Explanation:** The array nums is already similiar to target.

**Constraints:**

*   `n == nums.length == target.length`
*   `1 <= n <= 105`
*   `1 <= nums[i], target[i] <= 106`
*   It is possible to make `nums` similar to `target`.

## Code 

Time Complexity: $O(n \log n)$, Space Complexity: $O(n)$

KEY: 

```markdown
A[i] and B[i] won't change parity (odd or even)
all evens play the game together,
all odds play the game together.
```

greedy choice: for odds & evens, match it with the closest target

greedy choice 很直觀，簡單來說，如果不是和最近的去 match，就會使得 total cost 變大。

```cpp
class Solution {
public:
    long long makeSimilar(vector<int>& nums, vector<int>& target) {
        vector<int> nums_odd;
        vector<int> nums_even;
        vector<int> target_odd;
        vector<int> target_even;

        for(int i = 0; i < nums.size(); i++) {
            if(nums[i] % 2 == 0) 
                nums_even.push_back(nums[i]);
            else
                nums_odd.push_back(nums[i]);

            if(target[i] % 2 == 0) 
                target_even.push_back(target[i]);
            else
                target_odd.push_back(target[i]);
        }

        sort(nums_odd.begin(), nums_odd.end());
        sort(nums_even.begin(), nums_even.end());
        sort(target_odd.begin(), target_odd.end());
        sort(target_even.begin(), target_even.end());

        long long res = 0;
        for(int i = 0; i < nums_odd.size(); i++) {
            res += abs(nums_odd[i] - target_odd[i]) / 2;
        }
        for(int i = 0; i < nums_even.size(); i++) {
            res += abs(nums_even[i] - target_even[i]) / 2;
        }

        return res / 2;
    }
};
```

## Source
- [Minimum Number of Operations to Make Arrays Similar - LeetCode](https://leetcode.com/problems/minimum-number-of-operations-to-make-arrays-similar/description/)