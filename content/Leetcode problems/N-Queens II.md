---
title: N-Queens II
date: 2023-02-17
lastmod: 2023-02-17
author: Jimmy Lin
tags: ["backtracking"]
draft: false
---

## Description

The **n-queens** puzzle is the problem of placing `n` queens on an `n x n` chessboard such that no two queens attack each other.

Given an integer `n`, return _the number of distinct solutions to the **n-queens puzzle**_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/11/13/queens.jpg)

**Input:** n = 4
**Output:** 2
**Explanation:** There are two distinct solutions to the 4-queens puzzle as shown.

**Example 2:**

**Input:** n = 1
**Output:** 1

**Constraints:**

*   `1 <= n <= 9`

## Code 

就是 [[N-Queens]] 而已。

```cpp
class Solution {
public:
    int totalNQueens(int n) {
        vector<vector<string>> answer;
        vector<string> curr(n, string(n, '.'));
        solve(0, n, answer, curr);
        return answer.size();
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
- [N-Queens II - LeetCode](https://leetcode.com/problems/n-queens-ii/description/)