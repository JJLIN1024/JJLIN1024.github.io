---
title: Time Needed to Inform All Employees
date: 2023-03-15
lastmod: 2023-03-15
author: Jimmy Lin
tags: ["DFS","BFS"]
draft: false
---

## Description

A company has `n` employees with a unique ID for each employee from `0` to `n - 1`. The head of the company is the one with `headID`.

Each employee has one direct manager given in the `manager` array where `manager[i]` is the direct manager of the `i-th` employee, `manager[headID] = -1`. Also, it is guaranteed that the subordination relationships have a tree structure.

The head of the company wants to inform all the company employees of an urgent piece of news. He will inform his direct subordinates, and they will inform their subordinates, and so on until all employees know about the urgent news.

The `i-th` employee needs `informTime[i]` minutes to inform all of his direct subordinates (i.e., After informTime\[i\] minutes, all his direct subordinates can start spreading the news).

Return _the number of minutes_ needed to inform all the employees about the urgent news.

**Example 1:**

**Input:** n = 1, headID = 0, manager = \[-1\], informTime = \[0\]
**Output:** 0
**Explanation:** The head of the company is the only employee in the company.

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/02/27/graph.png)

**Input:** n = 6, headID = 2, manager = \[2,2,-1,2,2,2\], informTime = \[0,0,1,0,0,0\]
**Output:** 1
**Explanation:** The head of the company with id = 2 is the direct manager of all the employees in the company and needs 1 minute to inform them all.
The tree structure of the employees in the company is shown.

**Constraints:**

*   `1 <= n <= 105`
*   `0 <= headID < n`
*   `manager.length == n`
*   `0 <= manager[i] < n`
*   `manager[headID] == -1`
*   `informTime.length == n`
*   `0 <= informTime[i] <= 1000`
*   `informTime[i] == 0` if employee `i` has no subordinates.
*   It is **guaranteed** that all the employees can be informed.

## Code 

### BFS 

用 BFS 會碰到一個問題，因為使用 BFS 的想法立基於對每一層的 informTime 取 max。

反例：

```
                            ---> 1(213) -> 7(0)
                           /
4(686)->10(337)->3(253)->9(309)->6(975) -> 2(0)
                           \
                            ---> 8(261) -> 5(170) -> 0(0)
```

```
wrong: 686+337+253+309+975+170 = 2730
correct: 686+337+253+309+975 = 2560
```

```
975 > (261 + 170), 8(261) -> 5(170), so no need to add 170.
```

```cpp
class Solution {
public:
    int numOfMinutes(int n, int headID, vector<int>& manager, vector<int>& informTime) {
        vector<vector<int>> adj(n);
        for(int i = 0; i < manager.size(); i++) {
            if(i != headID)
                adj[manager[i]].push_back(i);
        }
        int totalTime = 0;
        queue<int> q;
        q.push(headID);
        while(!q.empty()) {
            int size = q.size();
            int levelMax = 0;
            for(int i = 0; i < size; i++) {
                int node = q.front();
                q.pop();
                levelMax = max(levelMax, informTime[node]);
                for(int j = 0; j < adj[node].size(); j++) {
                    q.push(adj[node][j]);
                }
            }
            totalTime += levelMax;
        }
        return totalTime;
    }

};
```

若要使用 BFS，就必須一層一層的追蹤，因此 queue 中要紀錄到目前的 layer 為止的累積 informTime。

```cpp
class Solution {
public:
    int numOfMinutes(int n, int headID, vector<int>& manager, vector<int>& informTime) {
        // support variables declared here
		int res = 0, len, currCumulatedTime, currNode;
        pair<int, int> currNodeInfo;
        // getting the graph in a more navigable format
        vector<vector<int>> paths(n);
        for (int id = 0; id < n; id++) if (id != headID) paths[manager[id]].push_back(id);
        // preparing layers for a BFS approach to be in the <cumulated time, id> format
        queue<pair<int, int>> layer;
        layer.push({0, headID});
        while (layer.size()) {
            len = layer.size();
            for (int i = 0; i < len; i++) {
                // extracting the stored node information
                currNodeInfo = layer.front();
                currCumulatedTime = currNodeInfo.first;
                currNode = currNodeInfo.second;
                // adding more nodes to be connected if this is not a terminal one
                if (paths[currNode].size()) {
                    for (auto node: paths[currNode]) layer.push({currCumulatedTime + informTime[currNode], node});
                }
                // else updating res
                else res = max(currCumulatedTime, res);
                // removing the parsed node from the queue
                layer.pop();
            }
        }
        return res;
    }
};
```

### DFS

使用 DFS 比較直觀，直接找一條 path informTime 最大的即可。這裡會用到 backtracking 的技巧。

```cpp
class Solution {
public:
    int numOfMinutes(int n, int headID, vector<int>& manager, vector<int>& informTime) {
        vector<vector<int>> adj(n);
        for(int i = 0; i < manager.size(); i++) {
            if(i != headID)
                adj[manager[i]].push_back(i);
        }
        int totalTime = 0, currTime = 0;
        dfs(headID, adj, informTime, currTime, totalTime);
        return totalTime;
    }

    void dfs(int node, vector<vector<int>>& adj, vector<int>& informTime, int& currTime, int& totalTime) {

        if(adj[node].size() == 0) {
            totalTime = max(totalTime, currTime);
            return;
        }

        currTime += informTime[node];
        for(int i = 0; i < adj[node].size(); i++) {
            dfs(adj[node][i], adj, informTime, currTime, totalTime);
        }
        // backtracking
        currTime -= informTime[node];
    }

};
```


### Buttom up DFS

大神的解答。

```cpp
class Solution {
public:
    int numOfMinutes(int n, int headID, vector<int>& manager, vector<int>& informTime) {
        int res = 0;
        for(int i = 0; i < n; i++) {
            res = max(res, dfs(i, manager, informTime));
        }
        return res;
    }

    int dfs(int node, vector<int>& manager, vector<int>& informTime) {
        if(manager[node] != -1) {
            informTime[node] += dfs(manager[node], manager, informTime);
            manager[node] = -1;
        }

        return informTime[node];
        
    }

};
```


## Source
- [Time Needed to Inform All Employees - LeetCode](https://leetcode.com/problems/time-needed-to-inform-all-employees/description/)