---
title: Algorithm to find SCC
date: 2022-06-17
author: Jimmy Lin
tags: 
---
---

## Steps

1.  在 $G$ 上 run DFS，同時紀錄找到（DFS function call）每個 vertex 的時間。
2.  反轉 $G$ 的每個 edge，得到新的 graph $G^{T}$
3.  在 $G^{T}$ 依照找到 vertex 的時間，由晚到早，去執行 DFS，這個 DFS 找到的每個 DFS tree 都是一個 strongly connected component。

## Code
```cpp
class Solution {
public:
  int findCircleNum(vector<vector<int>> &isConnected) {
    int n = isConnected.size();
    vector<vector<int>> G(n);
    vector<vector<int>> reverseG(n);
    vector<int> visited1(n, 0);
    vector<int> visited2(n, 0);

    // In Step 1, we need to keep track of the visiting order of the vertices, so whenever we call a DFS on a vertex, we push it into path, and finally reverse it, so that we can directly use it in Step 3.
    vector<int> path; 
    
    // Step 2: Build the reversed graph
    for(int i = 0; i < n ;i++) {
        for(int j = 0; j < n; j++) {
            if(isConnected[i][j]) {
                G[i].push_back(j);
                reverseG[j].push_back(i);
            }
        }
    }
    
    // Step 1: DFS on original graph
    for(int i = 0; i < n; i++) {
        if(!visited1[i]) DFS1(G, i, visited1, path);
    }
      
    reverse(path.begin(), path.end());

    // Step 3: DFS on reversed graph based in descending order of the discovery time of vertices.
    int count = 0;
    for(int j = 0; j < path.size(); j++) {
        if(!visited2[j]) {
            DFS2(reverseG, j, visited2);
            count++;
        }
    }
      
    return count;
  }
  
  void DFS1(vector<vector<int>> &G, int node, vector<int> &visited, vector<int> &path) {
      if(visited[node]) return;
      path.push_back(node);
      visited[node] = 1;
      for(auto nbr: G[node]) {
          if(!visited[nbr]) DFS1(G, nbr, visited, path);
      }
  }
    
  void DFS2(vector<vector<int>> &G, int node, vector<int> &visited) {
      if(visited[node]) return;
      visited[node] = 1;
      for(auto nbr: G[node]) {
          if(!visited[nbr]) DFS2(G, nbr, visited);
      }
  }
};

```

## Reference
- [leetcode 547](https://leetcode.com/problems/number-of-provinces/)
