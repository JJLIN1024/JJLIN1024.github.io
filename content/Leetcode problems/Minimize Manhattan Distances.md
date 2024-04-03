---
title: Minimize Manhattan Distances
date: 2024-04-01
lastmod: 2024-04-01
author:
  - Jimmy Lin
tags:
  - heap
  - review
  - math
draft: false
sr-due: 2024-04-02
sr-interval: 1
sr-ease: 230
---

## Description

You are given a **0-indexed** array `points` representing integer coordinates of some points on a 2D plane, where `points[i] = [xi, yi]`.

The distance between two points is defined as their

Manhattan distance

.

Return _the **minimum** possible value for **maximum** distance between any two points by removing exactly one point_.

**Example 1:**

**Input:** points = \[\[3,10\],\[5,15\],\[10,2\],\[4,4\]\]
**Output:** 12
**Explanation:** The maximum distance after removing each point is the following:
- After removing the 0th point the maximum distance is between points (5, 15) and (10, 2), which is |5 - 10| + |15 - 2| = 18.
- After removing the 1st point the maximum distance is between points (3, 10) and (10, 2), which is |3 - 10| + |10 - 2| = 15.
- After removing the 2nd point the maximum distance is between points (5, 15) and (4, 4), which is |5 - 4| + |15 - 4| = 12.
- After removing the 3rd point the maximum distance is between points (5, 15) and (10, 2), which is |5 - 10| + |15 - 2| = 18.
It can be seen that 12 is the minimum possible maximum distance between any two points after removing exactly one point.

**Example 2:**

**Input:** points = \[\[1,1\],\[1,1\],\[1,1\]\]
**Output:** 0
**Explanation:** It can be seen that removing any of the points results in the maximum distance between any two points of 0.

**Constraints:**

*   `3 <= points.length <= 105`
*   `points[i].length == 2`
*   `1 <= points[i][0], points[i][1] <= 108`

## Code 

same as [[Maximum of Absolute Value Expression]]。

Time Complexity: $O(n \log n)$, Space Complexity: $O(n)$

First solve a smaller problem. Given an array of points, how can we find the maximum Manhattan distance between any pair of points, and their indices? Keep in mind that checking all possible pairs in $O(n^2)$ time is not feasible.

Let's write the formula for Manhattan distance:

$$Manhattan(Pi​,Pj​) =∣xi​−xj​∣+∣yi​−yj​∣$$ 
$$
= \begin{cases} x_i-x_j + y_i-y_j & \text{if } x_i \ge x_j \text{ and } y_i \ge y_j \\ x_i-x_j - y_i+y_j & \text{if } x_i \ge x_j \text{ and } y_i < y_j \\ -x_i+x_j + y_i-y_j & \text{if } x_i < x_j \text{ and } y_i \ge y_j \\ -x_i+x_j - y_i+y_j & \text{if } x_i < x_j \text{ and } y_i < y_j \end{cases}
$$


Rearranging the terms:

$$=\begin{cases} (x_i + y_i) - (x_j + y_j) & \text{if } x_i \ge x_j \text{ and } y_i \ge y_j \\ (x_i - y_i) - (x_j - y_j) & \text{if } x_i \ge x_j \text{ and } y_i < y_j \\ -(x_i - y_i) + (x_j - y_j) & \text{if } x_i < x_j \text{ and } y_i \ge y_j \\ -(x_i + y_i) + (x_j + y_j) & \text{if } x_i < x_j \text{ and } y_i < y_j \end{cases}$$

Looking at the formula above, let's define two variables:

$$\text{sum}_i = s_i = x_i + y_i$$ $$\text{diff}_i = d_i = x_i - y_i$$​

Rewriting the formula:

$$=\begin{cases} s_i - s_j & \text{if } x_i \ge x_j \text{ and } y_i \ge y_j \\ d_i - d_j & \text{if } x_i \ge x_j \text{ and } y_i < y_j \\ -d_i + d_j & \text{if } x_i < x_j \text{ and } y_i \ge y_j \\ -s_i + s_j & \text{if } x_i < x_j \text{ and } y_i < y_j \end{cases}$$
Hence, maximum Manhattan distance can be found if we try to maximize the following formula:

$$max​Manhattan(Pi​,Pj​)=max​(max(∣si​−sj​∣,∣di​−dj​∣))$$

So, if we make separate arrays of `sums` and `differences`, then maximum Manhattan distance will be the larger of the

1. Difference between maximum of `sums` and minimum of `sums`, and
2. Difference between maximum of `differences` and minimum of `differences`.

```cpp
class Solution {
public:
    int minimumDistance(vector<vector<int>>& points) {
        vector<multiset<int>> A(4);
        for(auto& point: points) {
            A[0].insert(point[0] + point[1]);
            A[1].insert(point[0] - point[1]);
            A[2].insert(-point[0] + point[1]);
            A[3].insert(-point[0] - point[1]);
        }

        int res = INT_MAX / 2;
        for(auto& point: points) {
            A[0].erase(A[0].find(point[0] + point[1]));
            A[1].erase(A[1].find(point[0] - point[1]));
            A[2].erase(A[2].find(-point[0] + point[1]));
            A[3].erase(A[3].find(-point[0] - point[1]));
            
            int maxD = 0; 
            maxD = max(maxD, *prev(A[0].end()) - *A[0].begin());
            maxD = max(maxD, *prev(A[1].end()) - *A[1].begin());
            maxD = max(maxD, *prev(A[2].end()) - *A[2].begin());
            maxD = max(maxD, *prev(A[3].end()) - *A[3].begin());
            res = min(res, maxD);

            A[0].insert(point[0] + point[1]);
            A[1].insert(point[0] - point[1]);
            A[2].insert(-point[0] + point[1]);
            A[3].insert(-point[0] - point[1]);
        }

        return res;
    }
};
```

## Source
- [Minimize Manhattan Distances - LeetCode](https://leetcode.com/problems/minimize-manhattan-distances/description/)