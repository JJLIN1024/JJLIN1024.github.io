---
title: Find Pivot Index
date: 2022-12-20
lastmod: 2022-12-20
author:
  - Jimmy Lin
tags:
  - prefix_sum
draft: false
---
Given an array of integers `nums`, calculate the **pivot index** of this array.

The **pivot index** is the index where the sum of all the numbers **strictly** to the left of the index is equal to the sum of all the numbers **strictly** to the index's right.

If the index is on the left edge of the array, then the left sum is `0` because there are no elements to the left. This also applies to the right edge of the array.

Return _the **leftmost pivot index**_. If no such index exists, return `-1`.

**Example 1:**

**Input:** nums = [1,7,3,6,5,6]
**Output:** 3
**Explanation:**
The pivot index is 3.
Left sum = nums[0] + nums[1] + nums[2] = 1 + 7 + 3 = 11
Right sum = nums[4] + nums[5] = 5 + 6 = 11

**Example 2:**

**Input:** nums = [1,2,3]
**Output:** -1
**Explanation:**
There is no index that satisfies the conditions in the problem statement.

**Example 3:**

**Input:** nums = [2,1,-1]
**Output:** 0
**Explanation:**
The pivot index is 0.
Left sum = 0 (no elements to the left of index 0)
Right sum = nums[1] + nums[2] = 1 + -1 = 0

**Constraints:**

- `1 <= nums.length <= 104`
- `-1000 <= nums[i] <= 1000`

**Note:** This question is the same as 1991: [https://leetcode.com/problems/find-the-middle-index-in-array/](https://leetcode.com/problems/find-the-middle-index-in-array/)
## Code 

```cpp
class Solution {
public:
    int pivotIndex(vector<int>& nums) {
        for(int i = 1; i < nums.size(); i++) nums[i] += nums[i - 1];

        for(int i = 0; i < nums.size(); i++) {
            int leftSum = i > 0 ? nums[i - 1] : 0;
            int rightSum = nums.back() - nums[i];
            if(leftSum == rightSum) return i;
        }

        return -1;
    }
};
```

## Link
- [724. Find Pivot Index](https://leetcode.com/problems/find-pivot-index/)
- [1991. Find the Middle Index in Array](https://leetcode.com/problems/find-the-middle-index-in-array/)