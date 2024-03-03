---
title: Surrounded Regions
date: 2023-02-24
lastmod: 2023-02-24
author: Jimmy Lin
tags: ["graph", "Boundary DFS"]
draft: false
---

## Description

Given an `m x n` matrix `board` containing `'X'` and `'O'`, _capture all regions that are 4-directionally surrounded by_ `'X'`.

A region is **captured** by flipping all `'O'`s into `'X'`s in that surrounded region.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/02/19/xogrid.jpg)

**Input:** board = \[\["X","X","X","X"\],\["X","O","O","X"\],\["X","X","O","X"\],\["X","O","X","X"\]\]
**Output:** \[\["X","X","X","X"\],\["X","X","X","X"\],\["X","X","X","X"\],\["X","O","X","X"\]\]
**Explanation:** Notice that an 'O' should not be flipped if:
- It is on the border, or
- It is adjacent to an 'O' that should not be flipped.
The bottom 'O' is on the border, so it is not flipped.
The other three 'O' form a surrounded region, so they are flipped.

**Example 2:**

**Input:** board = \[\["X"\]\]
**Output:** \[\["X"\]\]

**Constraints:**

*   `m == board.length`
*   `n == board[i].length`
*   `1 <= m, n <= 200`
*   `board[i][j]` is `'X'` or `'O'`.

## Code 

Boundary DFS，從邊界開始著手，由外而內。

```cpp
class Solution {
public:
    void solve(vector<vector<char>>& board) {
        int m = board.size();
        int n = board[0].size();
        vector<vector<int>> visited(m, vector<int>(n, 0));
        for(int i = 0; i < m; i++) {
            if(board[i][0] == 'O') {
                dfs(i, 0, m, n, board);
            }
            if(board[i][n-1] == 'O') {
                dfs(i, n-1, m, n, board);
            }
        }

        for(int i = 0; i < n; i++) {
            if(board[0][i] == 'O') {
                dfs(0, i, m, n, board);
            }
            if(board[m-1][i] == 'O') {
                dfs(m-1, i, m, n, board);
            }
        }

        for(int i = 0; i < m; i++) {
            for(int j = 0; j < n; j++) {
                if(board[i][j] == 'O') {
                    board[i][j] = 'X';
                }
                if(board[i][j] == 'Z') {
                    board[i][j] = 'O';
                }
            }
        }
    }

    void dfs(int x, int y, int m, int n, vector<vector<char>>& board) {
        
        if(x >= m || y >= n || x < 0 || y < 0 || board[x][y] != 'O') return;

        board[x][y] = 'Z';

        dfs(x+1, y, m, n, board);
        dfs(x-1, y, m, n, board);
        dfs(x, y+1, m, n, board);
        dfs(x, y-1, m, n, board);
    }

};
```

## Source
- [Surrounded Regions - LeetCode](https://leetcode.com/problems/surrounded-regions/description/)