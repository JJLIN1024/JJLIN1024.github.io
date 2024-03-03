---
title: Detonate the Maximum Bombs
date: 2023-03-07
lastmod: 2023-03-07
author: Jimmy Lin
tags: ["dfs"]
draft: false
---

## Description

You are given a list of bombs. The **range** of a bomb is defined as the area where its effect can be felt. This area is in the shape of a **circle** with the center as the location of the bomb.

The bombs are represented by a **0-indexed** 2D integer array `bombs` where `bombs[i] = [xi, yi, ri]`. `xi` and `yi` denote the X-coordinate and Y-coordinate of the location of the `ith` bomb, whereas `ri` denotes the **radius** of its range.

You may choose to detonate a **single** bomb. When a bomb is detonated, it will detonate **all bombs** that lie in its range. These bombs will further detonate the bombs that lie in their ranges.

Given the list of `bombs`, return _the **maximum** number of bombs that can be detonated if you are allowed to detonate **only one** bomb_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/11/06/desmos-eg-3.png)

**Input:** bombs = \[\[2,1,3\],\[6,1,4\]\]
**Output:** 2
**Explanation:**
The above figure shows the positions and ranges of the 2 bombs.
If we detonate the left bomb, the right bomb will not be affected.
But if we detonate the right bomb, both bombs will be detonated.
So the maximum bombs that can be detonated is max(1, 2) = 2.

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/11/06/desmos-eg-2.png)

**Input:** bombs = \[\[1,1,5\],\[10,10,5\]\]
**Output:** 1
**Explanation:** Detonating either bomb will not detonate the other bomb, so the maximum number of bombs that can be detonated is 1.

**Example 3:**

![](https://assets.leetcode.com/uploads/2021/11/07/desmos-eg1.png)

**Input:** bombs = \[\[1,2,3\],\[2,3,1\],\[3,4,2\],\[4,5,3\],\[5,6,4\]\]
**Output:** 5
**Explanation:**
The best bomb to detonate is bomb 0 because:
- Bomb 0 detonates bombs 1 and 2. The red circle denotes the range of bomb 0.
- Bomb 2 detonates bomb 3. The blue circle denotes the range of bomb 2.
- Bomb 3 detonates bomb 4. The green circle denotes the range of bomb 3.
Thus all 5 bombs are detonated.

**Constraints:**

*   `1 <= bombs.length <= 100`
*   `bombs[i].length == 3`
*   `1 <= xi, yi, ri <= 105`

## Code 

這題不能使用 union and find，因為是 direct graph，若 A->B 且 C->B，在 union and find 中，ABC 會是同一群，但是我們沒辦法使 ABC 都被引爆。

所以使用 dfs。

```cpp
class Solution {
#define ll long long int
public:
    int maximumDetonation(vector<vector<int>>& bombs) {
        int n = bombs.size();
        vector<vector<int>> adj(n);
        for(int i = 0; i < n; i++) {
            ll x1 = bombs[i][0];
            ll y1 = bombs[i][1];
            ll r1 = bombs[i][2];
            for(int j = 0; j < n; j++) {
                if(i == j) continue;
                ll x2 = bombs[j][0];
                ll y2 = bombs[j][1];
                ll r2 = bombs[j][2];
                if(pow(x1 - x2, 2) + pow(y1 - y2, 2) <= pow(r1, 2)) {
                    adj[i].push_back(j);
                }
            }
        }
        
        int maxBomb = 0;
        for(int i = 0; i < n; i++) {
            int count = 0;
            vector<bool> visited(n, false);
            dfs(i, adj, visited, count);
            maxBomb = max(maxBomb, count);
        }

        return maxBomb;
    }

    void dfs(int index, vector<vector<int>>& adj, vector<bool>& visited, int& count) {
        visited[index] = true;
        count++;
        for(int i = 0; i < adj[index].size(); i++) {
            if(!visited[adj[index][i]])
                dfs(adj[index][i], adj, visited, count);
        }
    }
};
```

## Source
- [Detonate the Maximum Bombs - LeetCode](https://leetcode.com/problems/detonate-the-maximum-bombs/description/)