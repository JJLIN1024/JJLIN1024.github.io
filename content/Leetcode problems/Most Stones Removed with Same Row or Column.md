---
title: Most Stones Removed with Same Row or Column
date: 2023-11-04
lastmod: 2023-11-04
author:
  - Jimmy Lin
tags:
  - union_and_find
  - connected_component
draft: false
---

## Description

On a 2D plane, we place `n` stones at some integer coordinate points. Each coordinate point may have at most one stone.

A stone can be removed if it shares either **the same row or the same column** as another stone that has not been removed.

Given an array `stones` of length `n` where `stones[i] = [xi, yi]` represents the location of the `ith` stone, return _the largest possible number of stones that can be removed_.

**Example 1:**

**Input:** stones = \[\[0,0\],\[0,1\],\[1,0\],\[1,2\],\[2,1\],\[2,2\]\]
**Output:** 5
**Explanation:** One way to remove 5 stones is as follows:
1. Remove stone \[2,2\] because it shares the same row as \[2,1\].
2. Remove stone \[2,1\] because it shares the same column as \[0,1\].
3. Remove stone \[1,2\] because it shares the same row as \[1,0\].
4. Remove stone \[1,0\] because it shares the same column as \[0,0\].
5. Remove stone \[0,1\] because it shares the same row as \[0,0\].
Stone \[0,0\] cannot be removed since it does not share a row/column with another stone still on the plane.

**Example 2:**

**Input:** stones = \[\[0,0\],\[0,2\],\[1,1\],\[2,0\],\[2,2\]\]
**Output:** 3
**Explanation:** One way to make 3 moves is as follows:
1. Remove stone \[2,2\] because it shares the same row as \[2,0\].
2. Remove stone \[2,0\] because it shares the same column as \[0,0\].
3. Remove stone \[0,2\] because it shares the same row as \[0,0\].
Stones \[0,0\] and \[1,1\] cannot be removed since they do not share a row/column with another stone still on the plane.

**Example 3:**

**Input:** stones = \[\[0,0\]\]
**Output:** 0
**Explanation:** \[0,0\] is the only stone on the plane, so you cannot remove it.

**Constraints:**

*   `1 <= stones.length <= 1000`
*   `0 <= xi, yi <= 104`
*   No two stones are at the same coordinate point.

## Code 

### Union and Find
Time Complexity: $O(n)$, Space Complexity: $O(n)$

對 example 進行實作就會發現，要求的就是總共的 stones 數量減去 [[Number of Islands|Number of Islands]] 。

另一個關鍵在於該如何對 `(x, y)` 座標進行 union and find，在這裡我們對 `y` 進行 encoding，`y -> ~y`，因為 `y + ~y = -1`，因此 `~y = -1 - y`。如此處理後可以避免 `x, y` 具有重複的 range 造成我們在 union and find 時會無法區分到底是 row index 還是 column index。

```cpp
class Solution {
    int island = 0;
    unordered_map<int, int> parent;
public:
    int removeStones(vector<vector<int>>& stones) {
        for(int i = 0; i < stones.size(); i++) {
            uni(stones[i][0], ~stones[i][1]);
        }
        return stones.size() - island;
    }

    void uni(int x, int y) {
        int px = find(x), py = find(y);
        if(px != py) {
            parent[px] = py;
            island--;
        }
    }

    int find(int x) {
        if(!parent.count(x)) {
            parent[x] = x;
            island++;
        } 
        
        if(parent[x] != x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];

    }


};
```

## Source
- [Most Stones Removed with Same Row or Column - LeetCode](https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/description/)