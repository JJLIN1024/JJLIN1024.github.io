---
title: APSP -  Floyd-Warshall
updated: 2022-06-17 09:01:10Z
created: 2022-05-15 00:14:44Z
---


## Key Idea

induction on **intermediate vertex**, this is a little bit different than **Bellman-Ford algorithm**, Bellman-Ford is induction on **edge**, runs for $n-1$ iterations, while Floyd-Warshall is induction on **vertex**, runs for $n$ iterations.

## Definition

- $d_{ij}^k$: the shortest path length from vertex $i$ to vertex $j$, considering only vertex$1, 2, \cdots, k$ as intermediate vertexes.
- $D^k$ : matrix form for $d_{ij}^k$

## Code

```cpp
for(int k = 0; k < n; k++) {
	for(int i = 0; i < n; i++) {
        for(int j = 0; j < n ;j++) {
            D[i][j] = min(D[i][j], D[i][k] + D[k][j]);
        }
    }
}           
```

## Practice

- [leetcode](Technical%20Stuff/Algorithm/leetcode.md) [1334. Find the City With the Smallest Number of Neighbors at a Threshold Distance](https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/)

```cpp
class Solution {
public:
    int findTheCity(int n, vector<vector<int>>& edges, int distanceThreshold) {
        vector<vector<int>> D(n, vector<int>(n, 100000));
        
        for(auto edge: edges) {
            D[edge[0]][edge[1]] = edge[2];
            D[edge[1]][edge[0]] = edge[2];
        }
        
        for(int i = 0; i < n; i++) {
            D[i][i] = 0;
        }
        
		# Floyd-Warshall main logic
        for(int k = 0; k < n; k++) {
            for(int i = 0; i < n; i++) {
                for(int j = 0; j < n ;j++) {
                    D[i][j] = min(D[i][j], D[i][k] + D[k][j]);
                }
            }
        }
        
        int answer = INT_MIN;
        int min_neighbors = INT_MAX;
        for(int i = 0; i < n; i++) {
            int neighbors = 0;
            for(int j = 0; j < n; j++) {
                if(D[i][j] <= distanceThreshold) neighbors++;
            } 
            if(neighbors <= min_neighbors) {
                min_neighbors = neighbors;
                answer = i;
            }
        }
        
        return answer;
        
    }
};
```

## Reference
