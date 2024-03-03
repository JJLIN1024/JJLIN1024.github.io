---
title: Course Schedule
date: 2023-03-10
lastmod: 2023-03-10
author: Jimmy Lin
tags: ["dfs", "cycle detection", "topological sort"]
draft: false
---

## Description

There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you **must** take course `bi` first if you want to take course `ai`.

*   For example, the pair `[0, 1]`, indicates that to take course `0` you have to first take course `1`.

Return `true` if you can finish all courses. Otherwise, return `false`.

**Example 1:**

**Input:** numCourses = 2, prerequisites = \[\[1,0\]\]
**Output:** true
**Explanation:** There are a total of 2 courses to take. 
To take course 1 you should have finished course 0. So it is possible.

**Example 2:**

**Input:** numCourses = 2, prerequisites = \[\[1,0\],\[0,1\]\]
**Output:** false
**Explanation:** There are a total of 2 courses to take. 
To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.

**Constraints:**

*   `1 <= numCourses <= 2000`
*   `0 <= prerequisites.length <= 5000`
*   `prerequisites[i].length == 2`
*   `0 <= ai, bi < numCourses`
*   All the pairs prerequisites\[i\] are **unique**.

## Code 

### DFS

經典使用 DFS 進行 cycle detection，使用三種顏色 `0, 1, 2`，`0` 代表尚未開始 DFS，`1` 代表該 node 正在進行 DFS，處在 DFS 的 recursive stack 當中， 因此若在 DFS 的遞迴過程中發現 visit 的 node 顏色為 `1` 代表有 cycle。`2` 代表 recursion call 已經全部結束。

```cpp
class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        for(auto req: prerequisites) {
            adj[req[0]].push_back(req[1]);
        }

        vector<int> visited(numCourses, 0);
        for(int i = 0; i < numCourses; i++) {
            if(visited[i] == 0) {
                if (!dfs(i, adj, visited)) return false;
            }
        }

        return true;
    }

    bool dfs(int node, vector<vector<int>>& adj, vector<int>& visited) {
        if(visited[node] == 1) return false;
        if(visited[node] == 2) return true;
        visited[node] = 1;
        for(int i = 0; i < adj[node].size(); i++) {
            if(!dfs(adj[node][i], adj, visited)) return false;
        }

        visited[node] = 2;
        return true;
    }
};
```


### Topological Sort

要 detect cycle，及偵測 graph 是否為 DAG(direct acyclic graph)，若為 DAG，代表沒有 cycle，而一個 graph 若具有 topological ordering，就是一個 DAG。

```cpp
class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        vector<int> degree(numCourses, 0);
        for(auto req: prerequisites) {
            adj[req[1]].push_back(req[0]);
            degree[req[0]]++;
        }

        queue<int> q;
        for(int i = 0; i < degree.size(); i++) {
            if(degree[i] == 0) q.push(i);
        }   
        int n = numCourses;
        while(!q.empty()) {
            auto node = q.front();
            q.pop();
            n--;
            for(int i = 0; i < adj[node].size(); i++) {
                if(--degree[adj[node][i]] == 0) q.push(adj[node][i]);
            }
        }

        return n == 0;
    }
};
```


## Source
- [Course Schedule - LeetCode](https://leetcode.com/problems/course-schedule/)