---
title: Max Points on a Line
date: 2024-02-22
lastmod: 2024-02-22
author:
  - Jimmy Lin
tags:
  - math
  - hashmap
  - review
draft: false
sr-due: 2024-03-31
sr-interval: 30
sr-ease: 290
---

## Description

Given an array of `points` where `points[i] = [xi, yi]` represents a point on the **X-Y** plane, return _the maximum number of points that lie on the same straight line_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/02/25/plane1.jpg)

**Input:** points = \[\[1,1\],\[2,2\],\[3,3\]\]
**Output:** 3

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/02/25/plane2.jpg)

**Input:** points = \[\[1,1\],\[3,2\],\[5,3\],\[4,1\],\[2,3\],\[1,4\]\]
**Output:** 4

**Constraints:**

*   `1 <= points.length <= 300`
*   `points[i].length == 2`
*   `-104 <= xi, yi <= 104`
*   All the `points` are **unique**.

## Code 

Time Complexity: $O(n^2)$, Space Complexity: $O(n^2)$

兩點連接會產生一個 slope，只要計算 slope 的 counter 再加一就會是 point 總數，因為在同一條線上的 n 個點中間會有 n - 1 個線段。

要注意 `slope = INT_MAX` 的 edge case。

```cpp
class Solution {
public:
    int maxPoints(vector<vector<int>>& points) {
        if(points.size() <= 2) return points.size();
        int res = 0;
        for(int i = 0; i < points.size(); i++) {
            unordered_map<double, int> mp;
            for(int j = i + 1; j < points.size(); j++) {
                double x1 = points[i][0], y1 = points[i][1], x2 = points[j][0], y2 = points[j][1];
                double slope;
                if((x1 - x2) == 0) slope = INT_MAX;
                else slope = (y1 - y2) / (x1 - x2);
                mp[slope]++;
                res = max(res, mp[slope]);
            }
        }
        return res + 1;
    }
};
```

## Source
- [Max Points on a Line - LeetCode](https://leetcode.com/problems/max-points-on-a-line/description/?envType=study-plan-v2&envId=top-interview-150)