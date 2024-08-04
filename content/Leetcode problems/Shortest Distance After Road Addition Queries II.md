---
title: Shortest Distance After Road Addition Queries II
date: 2024-08-04
lastmod: 2024-08-04
author:
  - Jimmy Lin
tags:
  - disjoint_set
  - shortest_path
  - bellman_ford
  - Dijkstra
draft: false
---

## Description

You are given an integer `n` and a 2D integer array `queries`.

There are `n` cities numbered from `0` to `n - 1`. Initially, there is a **unidirectional** road from city `i` to city `i + 1` for all `0 <= i < n - 1`.

`queries[i] = [ui, vi]` represents the addition of a new **unidirectional** road from city `ui` to city `vi`. After each query, you need to find the **length** of the **shortest path** from city `0` to city `n - 1`.

There are no two queries such that `queries[i][0] < queries[j][0] < queries[i][1] < queries[j][1]`.

Return an array `answer` where for each `i` in the range `[0, queries.length - 1]`, `answer[i]` is the _length of the shortest path_ from city `0` to city `n - 1` after processing the **first** `i + 1` queries.

**Example 1:**

**Input:** n = 5, queries = \[\[2,4\],\[0,2\],\[0,4\]\]

**Output:** \[3,2,1\]

**Explanation:**

![](https://assets.leetcode.com/uploads/2024/06/28/image8.jpg)

After the addition of the road from 2 to 4, the length of the shortest path from 0 to 4 is 3.

![](https://assets.leetcode.com/uploads/2024/06/28/image9.jpg)

After the addition of the road from 0 to 2, the length of the shortest path from 0 to 4 is 2.

![](https://assets.leetcode.com/uploads/2024/06/28/image10.jpg)

After the addition of the road from 0 to 4, the length of the shortest path from 0 to 4 is 1.

**Example 2:**

**Input:** n = 4, queries = \[\[0,3\],\[0,2\]\]

**Output:** \[1,1\]

**Explanation:**

![](https://assets.leetcode.com/uploads/2024/06/28/image11.jpg)

After the addition of the road from 0 to 3, the length of the shortest path from 0 to 3 is 1.

![](https://assets.leetcode.com/uploads/2024/06/28/image12.jpg)

After the addition of the road from 0 to 2, the length of the shortest path remains 1.

**Constraints:**

*   `3 <= n <= 105`
*   `1 <= queries.length <= 105`
*   `queries[i].length == 2`
*   `0 <= queries[i][0] < queries[i][1] < n`
*   `1 < queries[i][1] - queries[i][0]`
*   There are no repeated roads among the queries.
*   There are no two queries such that `i != j` and `queries[i][0] < queries[j][0] < queries[i][1] < queries[j][1]`.

## Code 

Time Complexity: $O(q \log n + n \log n)$, Space Complexity: $O(n)$

因為 There are no two queries such that `i != j` and `queries[i][0] < queries[j][0] < queries[i][1] < queries[j][1]` 所以可以用 set。

相反的，在 [[Shortest Distance After Road Addition Queries I]] 中因為不具備這個 constraint 因此必須使用 shortest path。

each element will only get insert and delete in the set at most twice.

```cpp
class Solution {
public:
    vector<int> shortestDistanceAfterQueries(int n, vector<vector<int>>& queries) {
        set<int> st;
        for(int i = 0; i < n; i++) {
            st.insert(i);
        }

        vector<int> res;
        for(auto& q: queries) {
            int u = q[0];
            int v = q[1];
            remove_node_in_the_middle(st, u + 1, v - 1);
            res.push_back(st.size() - 1);
        }

        return res;
    }

    void remove_node_in_the_middle(set<int>& st, int u, int v) {
        auto l = st.lower_bound(u);
        auto r = st.upper_bound(v);
        st.erase(l, r);
    }
};
```

## Source
- [Shortest Distance After Road Addition Queries II - LeetCode](https://leetcode.com/problems/shortest-distance-after-road-addition-queries-ii/description/)