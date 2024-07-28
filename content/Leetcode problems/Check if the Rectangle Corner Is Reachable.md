---
title: Check if the Rectangle Corner Is Reachable
date: 2024-07-28
lastmod: 2024-07-28
author:
  - Jimmy Lin
tags:
  - union_and_find
  - graph
draft: false
---

## Description

You are given two positive integers `X` and `Y`, and a 2D array `circles`, where `circles[i] = [xi, yi, ri]` denotes a circle with center at `(xi, yi)` and radius `ri`.

There is a rectangle in the coordinate plane with its bottom left corner at the origin and top right corner at the coordinate `(X, Y)`. You need to check whether there is a path from the bottom left corner to the top right corner such that the **entire path** lies inside the rectangle, **does not** touch or lie inside **any** circle, and touches the rectangle **only** at the two corners.

Return `true` if such a path exists, and `false` otherwise.

**Example 1:**

**Input:** X = 3, Y = 4, circles = \[\[2,1,1\]\]

**Output:** true

**Explanation:**

![](https://assets.leetcode.com/uploads/2024/05/18/example2circle1.png)

The black curve shows a possible path between `(0, 0)` and `(3, 4)`.

**Example 2:**

**Input:** X = 3, Y = 3, circles = \[\[1,1,2\]\]

**Output:** false

**Explanation:**

![](https://assets.leetcode.com/uploads/2024/05/18/example1circle.png)

No path exists from `(0, 0)` to `(3, 3)`.

**Example 3:**

**Input:** X = 3, Y = 3, circles = \[\[2,1,1\],\[1,2,1\]\]

**Output:** false

**Explanation:**

![](https://assets.leetcode.com/uploads/2024/05/18/example0circle.png)

No path exists from `(0, 0)` to `(3, 3)`.

**Constraints:**

*   `3 <= X, Y <= 109`
*   `1 <= circles.length <= 1000`
*   `circles[i].length == 3`
*   `1 <= xi, yi, ri <= 109`

## Code 

Time Complexity: $O(n^2)$, Space Complexity: $O(n)$

想像圈圈從左上和右下包圍中間，如果連在一起，左下和右上就不可能連線到了。

```cpp
class Solution {
public:
    bool canReachCorner(int X, int Y, vector<vector<int>>& circles) {
        int n = circles.size();
        vector<int> f(n + 2);
        for(int i = 0; i < n + 2; i++) { // n is buttom left, n + 1 is top right
            f[i] = i;
        }

        for(int i = 0; i < circles.size(); i++) {
            int x = circles[i][0];
            int y = circles[i][1];
            int r = circles[i][2];
            if(x - r <= 0 || y + r >= Y) {
                Union(f, n, i);
            }
            if(x + r >= X || y - r <= 0) {
                Union(f, n + 1, i);
            }

            for(int j = 0; j < i; j++) {
                int x2 = circles[j][0];
                int y2 = circles[j][1];
                int r2 = circles[j][2];
                if(pow((x - x2), 2) + pow((y - y2), 2) <= pow((r + r2), 2)) {
                    Union(f, i, j);
                }
            }
        }  
        return find(f, n) != find(f, n + 1);
    }

    void Union(vector<int>& f, int i, int j) {
        i = find(f, i), j = find(f, j);
        if(i != j) {
            f[i] = j;
        }
    }

    int find(vector<int>& f, int i) {
        return f[i] == i ? i : (f[i] = find(f, f[i]));
    }
};
```

## Source
- [Check if the Rectangle Corner Is Reachable - LeetCode](https://leetcode.com/problems/check-if-the-rectangle-corner-is-reachable/description/)