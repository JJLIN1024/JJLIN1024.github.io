---
title: Longest Path With Different Adjacent Characters
date: 2024-08-26
lastmod: 2024-08-26
author:
  - Jimmy Lin
tags:
  - DP
draft: false
---

## Description

You are given a **tree** (i.e. a connected, undirected graph that has no cycles) **rooted** at node `0` consisting of `n` nodes numbered from `0` to `n - 1`. The tree is represented by a **0-indexed** array `parent` of size `n`, where `parent[i]` is the parent of node `i`. Since node `0` is the root, `parent[0] == -1`.

You are also given a string `s` of length `n`, where `s[i]` is the character assigned to node `i`.

Return _the length of the **longest path** in the tree such that no pair of **adjacent** nodes on the path have the same character assigned to them._

**Example 1:**

![](https://assets.leetcode.com/uploads/2022/03/25/testingdrawio.png)

**Input:** parent = \[-1,0,0,1,1,2\], s = "abacbe"
**Output:** 3
**Explanation:** The longest path where each two adjacent nodes have different characters in the tree is the path: 0 -> 1 -> 3. The length of this path is 3, so 3 is returned.
It can be proven that there is no longer path that satisfies the conditions. 

**Example 2:**

![](https://assets.leetcode.com/uploads/2022/03/25/graph2drawio.png)

**Input:** parent = \[-1,0,0,0\], s = "aabc"
**Output:** 3
**Explanation:** The longest path where each two adjacent nodes have different characters is the path: 2 -> 0 -> 3. The length of this path is 3, so 3 is returned.

**Constraints:**

*   `n == parent.length == s.length`
*   `1 <= n <= 105`
*   `0 <= parent[i] <= n - 1` for all `i >= 1`
*   `parent[0] == -1`
*   `parent` represents a valid tree.
*   `s` consists of only lowercase English letters.

## Code 

Time Complexity: $O(V + E)$, Space Complexity: $(V + E)$

遞迴的 return 和 global max 取的值不一樣，一個只考慮單邊，一個兩邊都可以。

小結：不要想只用遞迴就解決，global variable 有時候是必要的。

```cpp
class Solution {
public:
    int g_res = 1;
    int longestPath(vector<int>& parent, string s) {

       unordered_map<int, vector<int>> child;
       for(int i = 0; i < parent.size(); i++) {
            child[parent[i]].push_back(i);
       }

        dfs(s, child, 0);
        return g_res;
    }


    int dfs(string& s, unordered_map<int,vector<int>>& child, int idx) {
        
        char curr_char = s[idx];
        int child_max = 0;
        int child_second = 0;
        int logest_path = 0;
        for(auto c: child[idx]) {
            int child_len = dfs(s, child, c);
            if(s[c] != curr_char) {
                if(child_len > child_max) {
                    child_second = child_max;
                    child_max = child_len;
                } else if (child_len > child_second) {
                    child_second = child_len;
                }
            }
            logest_path = max(logest_path, child_len);
        }

        g_res = max(g_res, child_max + child_second + 1);
        return max(child_max, child_second) + 1;
    }
};
```

## Source
- [Longest Path With Different Adjacent Characters - LeetCode](https://leetcode.com/problems/longest-path-with-different-adjacent-characters/description/)