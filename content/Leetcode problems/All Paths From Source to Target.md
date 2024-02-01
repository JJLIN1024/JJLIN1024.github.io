---
title: All Paths From Source to Target
date: 2023-04-24
lastmod: 2023-04-24
author: Jimmy Lin
tags: ["backtracking", "dfs"]
draft: false
---

## Description

Given a directed acyclic graph (**DAG**) of `n` nodes labeled from `0` to `n - 1`, find all possible paths from node `0` to node `n - 1` and return them in **any order**.

The graph is given as follows: `graph[i]` is a list of all nodes you can visit from node `i` (i.e., there is a directed edge from node `i` to node `graph[i][j]`).

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/09/28/all_1.jpg)

**Input:** graph = \[\[1,2\],\[3\],\[3\],\[\]\]
**Output:** \[\[0,1,3\],\[0,2,3\]\]
**Explanation:** There are two paths: 0 -> 1 -> 3 and 0 -> 2 -> 3.

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/09/28/all_2.jpg)

**Input:** graph = \[\[4,3,1\],\[3,2,4\],\[3\],\[4\],\[\]\]
**Output:** \[\[0,4\],\[0,3,4\],\[0,1,3,4\],\[0,1,2,3,4\],\[0,1,4\]\]

**Constraints:**

*   `n == graph.length`
*   `2 <= n <= 15`
*   `0 <= graph[i][j] < n`
*   `graph[i][j] != i` (i.e., there will be no self-loops).
*   All the elements of `graph[i]` are **unique**.
*   The input graph is **guaranteed** to be a **DAG**.

## Code 

```cpp
class Solution {
public:
    vector<vector<int>> allPathsSourceTarget(vector<vector<int>>& graph) {
        vector<vector<int>> res;
        int n = graph.size();
        vector<int> path = {};
        dfs(graph, res, path, 0, n);
        return res;
    }

    void dfs(vector<vector<int>>& graph, vector<vector<int>>& res, vector<int>& path, int node, int n) {

        path.push_back(node);

        if(node == n - 1) {
            res.push_back(path);
        } else {
            for(auto neighbor: graph[node]) {
                dfs(graph, res, path, neighbor, n);
            }
        }

        path.pop_back();
    }
};
```


```cpp
class Solution {
    vector<vector<int>> res;
    vector<int> cur;
    int target;
public:
    vector<vector<int>> allPathsSourceTarget(vector<vector<int>>& graph) {
        target = graph.size() - 1;
        dfs(0, graph);
        return res;
    }

    void dfs(int index, vector<vector<int>>& adj) {
        cur.push_back(index);
        if(index == target) {
            res.push_back(cur);
            cur.pop_back();
            return;
        } 
        for(auto neighbor: adj[index]) {
            dfs(neighbor, adj);
        }
        cur.pop_back();
    }
};
```
## Source
- [All Paths From Source to Target - LeetCode](https://leetcode.com/problems/all-paths-from-source-to-target/description/)