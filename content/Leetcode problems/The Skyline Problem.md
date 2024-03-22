---
title: The Skyline Problem
date: 2023-07-18
lastmod: 2023-07-18
author:
  - Jimmy Lin
tags:
  - balanced_binary_tree
  - line_sweep
  - review
draft: false
sr-due: 2024-05-07
sr-interval: 47
sr-ease: 290
---

## Description

A city's **skyline** is the outer contour of the silhouette formed by all the buildings in that city when viewed from a distance. Given the locations and heights of all the buildings, return _the **skyline** formed by these buildings collectively_.

The geometric information of each building is given in the array `buildings` where `buildings[i] = [lefti, righti, heighti]`:

*   `lefti` is the x coordinate of the left edge of the `ith` building.
*   `righti` is the x coordinate of the right edge of the `ith` building.
*   `heighti` is the height of the `ith` building.

You may assume all buildings are perfect rectangles grounded on an absolutely flat surface at height `0`.

The **skyline** should be represented as a list of "key points" **sorted by their x-coordinate** in the form `[[x1,y1],[x2,y2],...]`. Each key point is the left endpoint of some horizontal segment in the skyline except the last point in the list, which always has a y-coordinate `0` and is used to mark the skyline's termination where the rightmost building ends. Any ground between the leftmost and rightmost buildings should be part of the skyline's contour.

**Note:** There must be no consecutive horizontal lines of equal height in the output skyline. For instance, `[...,[2 3],[4 5],[7 5],[11 5],[12 7],...]` is not acceptable; the three lines of height 5 should be merged into one in the final output as such: `[...,[2 3],[4 5],[12 7],...]`

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/12/01/merged.jpg)

**Input:** buildings = \[\[2,9,10\],\[3,7,15\],\[5,12,12\],\[15,20,10\],\[19,24,8\]\]
**Output:** \[\[2,10\],\[3,15\],\[7,12\],\[12,0\],\[15,10\],\[20,8\],\[24,0\]\]
**Explanation:**
Figure A shows the buildings of the input.
Figure B shows the skyline formed by those buildings. The red points in figure B represent the key points in the output list.

**Example 2:**

**Input:** buildings = \[\[0,2,3\],\[2,5,3\]\]
**Output:** \[\[0,3\],\[5,0\]\]

**Constraints:**

*   `1 <= buildings.length <= 104`
*   `0 <= lefti < righti <= 231 - 1`
*   `1 <= heighti <= 231 - 1`
*   `buildings` is sorted by `lefti` in non-decreasing order.

## Code 

Time Complexity: $O(n \log n)$, Space Complexity: $O(n)$

// negative -> start event
// positive -> end event

之所以這樣設定，是因為 sorting 小的在前面，如果 end event 先的話，會造成不必要的斷點，以 `buildings = [[0,2,3],[2,5,3]]` 為例，若 end event 排在前，就會造成  `[[0,3],[2,0],[2,3],[5,0]]` 的 output，但其實應該是  `[[0,3],[5,0]]` 才對。

```cpp
class Solution {
public:
    vector<vector<int>> getSkyline(vector<vector<int>>& buildings) {
        vector<vector<int>> events;
        for(auto& b: buildings) {
            int start = b[0];
            int end = b[1];
            int h = b[2];
            events.push_back({start, -h});
            events.push_back({end, h});
        }
        sort(events.begin(), events.end());

        multiset<int, greater<int>> max_heap;
        vector<vector<int>> res;
        int skyline = 0;
        for(auto& event: events) {
            int t = event[0];
            int h = event[1];
            if(h < 0) {
                max_heap.insert(-h);
            } else {
                max_heap.erase(max_heap.find(h));
            }
            int curMax = *max_heap.begin();
            if(curMax != skyline) {
                skyline = curMax;
                res.push_back({t, skyline});
            }
        }
        return res;

    }
};
```

## Source
- [The Skyline Problem - LeetCode](https://leetcode.com/problems/the-skyline-problem/description/)