---
title: N-Queens
date: 2023-02-17
lastmod: 2023-02-17
author: Jimmy Lin
tags:
  - backtracking
  - review
draft: false
sr-due: 2024-10-19
sr-interval: 210
sr-ease: 310
---

## Description

The **n-queens** puzzle is the problem of placing `n` queens on an `n x n` chessboard such that no two queens attack each other.

Given an integer `n`, return _all distinct solutions to the **n-queens puzzle**_. You may return the answer in **any order**.

Each solution contains a distinct board configuration of the n-queens' placement, where `'Q'` and `'.'` both indicate a queen and an empty space, respectively.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/11/13/queens.jpg)

**Input:** n = 4
**Output:** \[\[".Q..","...Q","Q...","..Q."\],\["..Q.","Q...","...Q",".Q.."\]\]
**Explanation:** There exist two distinct solutions to the 4-queens puzzle as shown above

**Example 2:**

**Input:** n = 1
**Output:** \[\["Q"\]\]

**Constraints:**

*   `1 <= n <= 9`

## Code 

先放第一個 row，再放第二個 row，直到第 n 個 row，發現不行就退回上一個 row，換一個 col 重新試試看。

```cpp
class Solution {
public:
    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> answer;
        vector<string> curr(n, string(n, '.'));
        solve(0, n, answer, curr);
        return answer;
    }


    void solve(int row, int n, vector<vector<string>>& answer, vector<string>& curr) {
        if(row == n) {
            answer.push_back(curr);
            return;
        }
        for(int col = 0; col < n; col++) {
            if(check(row, col, n, curr)) {
                curr[row][col] = 'Q';
                solve(row+1, n, answer, curr);
                curr[row][col] = '.';
            }
        }
    }

    bool check(int row, int col, int n, vector<string> curr) {

        for(int i = 0; i < row; i++) {
            if(curr[i][col] == 'Q') return false;
        }

        for(int i = row - 1, j = col - 1; i >= 0 && j >= 0; --i, --j) {
            if(curr[i][j] == 'Q') return false;
        }

        for(int i = row - 1, j = col + 1; i >= 0 && j < n; --i, ++j) {
            if(curr[i][j] == 'Q') return false;
        }

        return true;
    }
};
```

## Source
- [N-Queens - LeetCode](https://leetcode.com/problems/n-queens/description/)