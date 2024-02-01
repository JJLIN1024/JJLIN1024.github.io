---
title: Maximum Number of Weeks for Which You Can Work
date: 2023-04-09
lastmod: 2023-04-09
author: Jimmy Lin
tags: ["greedy"]
draft: false
---

## Description

There are `n` projects numbered from `0` to `n - 1`. You are given an integer array `milestones` where each `milestones[i]` denotes the number of milestones the `ith` project has.

You can work on the projects following these two rules:

*   Every week, you will finish **exactly one** milestone of **one** project. You **must** work every week.
*   You **cannot** work on two milestones from the same project for two **consecutive** weeks.

Once all the milestones of all the projects are finished, or if the only milestones that you can work on will cause you to violate the above rules, you will **stop working**. Note that you may not be able to finish every project's milestones due to these constraints.

Return _the **maximum** number of weeks you would be able to work on the projects without violating the rules mentioned above_.

**Example 1:**

**Input:** milestones = \[1,2,3\]
**Output:** 6
**Explanation:** One possible scenario is:
​​​​- During the 1st week, you will work on a milestone of project 0.
- During the 2nd week, you will work on a milestone of project 2.
- During the 3rd week, you will work on a milestone of project 1.
- During the 4th week, you will work on a milestone of project 2.
- During the 5th week, you will work on a milestone of project 1.
- During the 6th week, you will work on a milestone of project 2.
The total number of weeks is 6.

**Example 2:**

**Input:** milestones = \[5,2,1\]
**Output:** 7
**Explanation:** One possible scenario is:
- During the 1st week, you will work on a milestone of project 0.
- During the 2nd week, you will work on a milestone of project 1.
- During the 3rd week, you will work on a milestone of project 0.
- During the 4th week, you will work on a milestone of project 1.
- During the 5th week, you will work on a milestone of project 0.
- During the 6th week, you will work on a milestone of project 2.
- During the 7th week, you will work on a milestone of project 0.
The total number of weeks is 7.
Note that you cannot work on the last milestone of project 0 on 8th week because it would violate the rules.
Thus, one milestone in project 0 will remain unfinished.

**Constraints:**

*   `n == milestones.length`
*   `1 <= n <= 105`
*   `1 <= milestones[i] <= 109`

## Code 

和 [[Task Scheduler]] 有些類似。

`res * 2 + 1` 是因為 `res, maxN` 剛好一組，全部排完之後還有剩可以再單獨排一個 `maxN`。

取 min 是因為不一定排得完，理想狀況當然是 `sum`。

```cpp
class Solution {
public:
    long long numberOfWeeks(vector<int>& milestones) {
        int maxN = *max_element(begin(milestones), end(milestones));
        long long sum = accumulate(begin(milestones), end(milestones), (long long)0);
        long long res = sum - (long long) maxN;
        return min({res * 2 + 1, sum});
    }
};
```

## Source
- [Maximum Number of Weeks for Which You Can Work - LeetCode](https://leetcode.com/problems/maximum-number-of-weeks-for-which-you-can-work/description/)