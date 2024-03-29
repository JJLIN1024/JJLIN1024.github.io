---
title: Minimum Number of Arrows to Burst Balloons - LeetCode
date: 2023-01-05
lastmod: 2023-01-05
author: Jimmy Lin
tags: ["Greedy", "sorting", "array"]
draft: false
---

## Description

There are some spherical balloons taped onto a flat wall that represents the XY-plane. The balloons are represented as a 2D integer array `points` where `points[i] = [xstart, xend]` denotes a balloon whose **horizontal diameter** stretches between `xstart` and `xend`. You do not know the exact y-coordinates of the balloons.

Arrows can be shot up **directly vertically** (in the positive y-direction) from different points along the x-axis. A balloon with `xstart` and `xend` is **burst** by an arrow shot at `x` if `xstart <= x <= xend`. There is **no limit** to the number of arrows that can be shot. A shot arrow keeps traveling up infinitely, bursting any balloons in its path.

Given the array `points`, return _the **minimum** number of arrows that must be shot to burst all balloons_.

**Example 1:**

**Input:** points = \[\[10,16\],\[2,8\],\[1,6\],\[7,12\]\]
**Output:** 2
**Explanation:** The balloons can be burst by 2 arrows:
- Shoot an arrow at x = 6, bursting the balloons \[2,8\] and \[1,6\].
- Shoot an arrow at x = 11, bursting the balloons \[10,16\] and \[7,12\].

**Example 2:**

**Input:** points = \[\[1,2\],\[3,4\],\[5,6\],\[7,8\]\]
**Output:** 4
**Explanation:** One arrow needs to be shot for each balloon for a total of 4 arrows.

**Example 3:**

**Input:** points = \[\[1,2\],\[2,3\],\[3,4\],\[4,5\]\]
**Output:** 2
**Explanation:** The balloons can be burst by 2 arrows:
- Shoot an arrow at x = 2, bursting the balloons \[1,2\] and \[2,3\].
- Shoot an arrow at x = 4, bursting the balloons \[3,4\] and \[4,5\].

**Constraints:**

*   `1 <= points.length <= 105`
*   `points[i].length == 2`
*   `-231 <= xstart < xend <= 231 - 1`

## Code 

類似 [[Insert Interval]]，不同之處在於如何處理重疊的部分。在這裏，重疊的部分是越來越小的，在前者，merge 後的 interval 會是越來越大的。

和 [[Maximum Length of Pair Chain]] 是同一種題目。

maintain points 的重疊部分（`left, right`），對於下一個 point 而言，考慮其左邊屆是否在重疊部分中，藉此判斷是否需要一支新的 arrow。

```cpp
class Solution {
public:
    int findMinArrowShots(vector<vector<int>>& points) {
        sort(points.begin(), points.end());
        int s_max = points[0][0], e_min = points[0][1];
        int shot = 1;
        for(int i = 1; i < points.size(); i++) {
            if(points[i][0] > e_min) {
                s_max = points[i][0];
                e_min = points[i][1];
                shot++;
            } else {
                s_max = max(s_max, points[i][0]);
                e_min = min(e_min, points[i][1]);
            }
        }
        return shot;
    }
};
```

```cpp
class Solution {
public:
    int findMinArrowShots(vector<vector<int>>& points) {
        sort(points.begin(), points.end());
        int n = points.size();
        int left = points[0][0], right = points[0][1];
        int arrow = 1;
        for(int i = 1; i < n; i++) {
            if(points[i][0] > right) {
                left = points[i][0];
                right = points[i][1];
                arrow++;
            } else if (points[i][0] < right) {
                left = points[i][0];
                right = min(points[i][1], right);
            } else {
                left = points[i][0];
                right = points[i][0];
            }
        }
        return arrow;
    }
};
```

## Source
- [Minimum Number of Arrows to Burst Balloons - LeetCode](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/description/)