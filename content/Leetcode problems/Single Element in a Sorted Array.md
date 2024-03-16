---
title: Single Element in a Sorted Array
date: 2024-03-14
lastmod: 2024-03-14
author:
  - Jimmy Lin
tags:
  - binary_search
  - review
  - bit_manipulation
draft: false
sr-due: 2024-03-23
sr-interval: 7
sr-ease: 250
---

## Description

You are given a sorted array consisting of only integers where every element appears exactly twice, except for one element which appears exactly once.

Return _the single element that appears only once_.

Your solution must run in `O(log n)` time and `O(1)` space.

**Example 1:**

**Input:** nums = \[1,1,2,3,3,4,4,8,8\]
**Output:** 2

**Example 2:**

**Input:** nums = \[3,3,7,7,10,11,11\]
**Output:** 10

**Constraints:**

*   `1 <= nums.length <= 105`
*   `0 <= nums[i] <= 105`

## Code 

```
EXPLANATION:-
Suppose array is [1, 1, 2, 2, 3, 3, 4, 5, 5]
we can observe that for each pair, 
first element takes even position and second element takes odd position
for example, 1 is appeared as a pair,
so it takes 0 and 1 positions. similarly for all the pairs also.

this pattern will be missed when single element is appeared in the array.

From these points, we can implement algorithm.
1. Take left and right pointers . 
    left points to start of list. right points to end of the list.
2. find mid.
    if mid is even, then it's duplicate should be in next index.
	or if mid is odd, then it's duplicate  should be in previous index.
	check these two conditions, 
	if any of the conditions is satisfied,
	then pattern is not missed, 
	so check in next half of the array. i.e, left = mid + 1
	if condition is not satisfied, then the pattern is missed.
	so, single number must be before mid.
	so, update end to mid.
3. At last return the nums[left]

Time: -  O(logN)
space:-  O(1)

IF YOU  HAVE ANY DOUBTS, FEEL FREE TO ASK
IF YOU UNDERSTAND, DON'T FORGET TO UPVOTE.
```

### Binary Search

Time Complexity: $O(\log n)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    int singleNonDuplicate(vector<int>& nums) {
        int left = 0, right = nums.size() - 1;
        while(left < right){
            int mid = (left + right)/2;
            if((mid % 2 == 0 && nums[mid] == nums[mid + 1]) || (mid % 2 == 1 && nums[mid] == nums[mid - 1]))
                left = mid + 1;
            else
                right = mid;
        }
        
        return nums[left];
    }
};
```


### Binary Search + Bit Manipulation

```
odd xor 1 = odd-1  
even xor 1 = even+1
```

```cpp
class Solution {
public:
    int singleNonDuplicate(vector<int>& nums) {
        int lo = 0, hi = nums.size() - 1;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (nums[mid] == nums[mid ^ 1])
                lo = mid + 1;
            else
                hi = mid;
        }
        return nums[lo];
    }
};
```
## Source
- [Single Element in a Sorted Array - LeetCode](https://leetcode.com/problems/single-element-in-a-sorted-array/description/?envType=study-plan-v2&envId=binary-search)