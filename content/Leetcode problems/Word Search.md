---
title: Word Search
date: 2023-04-15
lastmod: 2023-04-15
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

Given an `m x n` grid of characters `board` and a string `word`, return `true` _if_ `word` _exists in the grid_.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/11/04/word2.jpg)

**Input:** board = \[\["A","B","C","E"\],\["S","F","C","S"\],\["A","D","E","E"\]\], word = "ABCCED"
**Output:** true

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/11/04/word-1.jpg)

**Input:** board = \[\["A","B","C","E"\],\["S","F","C","S"\],\["A","D","E","E"\]\], word = "SEE"
**Output:** true

**Example 3:**

![](https://assets.leetcode.com/uploads/2020/10/15/word3.jpg)

**Input:** board = \[\["A","B","C","E"\],\["S","F","C","S"\],\["A","D","E","E"\]\], word = "ABCB"
**Output:** false

**Constraints:**

*   `m == board.length`
*   `n = board[i].length`
*   `1 <= m, n <= 6`
*   `1 <= word.length <= 15`
*   `board` and `word` consists of only lowercase and uppercase English letters.

**Follow up:** Could you use search pruning to make your solution faster with a larger `board`?

## Code 

### DFS Failed! 

問題出在 `visited`，因此改用 backtracking，減少 time complexity。

```cpp
class Solution {
public:
    bool exist(vector<vector<char>>& board, string word) {
        int m = board.size();
        int n = board[0].size();
        for(int i = 0; i < m; i++) {
            for(int j = 0; j < n; j++) {
                if(board[i][j] == word[0]) {
                    vector<vector<bool>> visited(m, vector<bool>(n, false));
                    bool found = dfs(board, visited, word, 0, i, j, m, n);
                    if(found)
                        return true;
                }
            }
        }
        return false;
    }

    bool dfs(vector<vector<char>>& board, vector<vector<bool>> visited, string& word, int index, int i, int j, int& m, int& n) {
        
        if(visited[i][j] ) return false;
        if(index == word.length() - 1 && board[i][j] == word[index]) return true;
        if(word[index] != board[i][j]) return false;
        visited[i][j] = true;
        if(board[i][j] == word[index]) {
            bool down = i + 1 < m ? dfs(board, visited, word, index+1, i + 1, j, m, n) : false;
            bool up = i - 1 >= 0 ? dfs(board, visited, word, index+1, i - 1, j, m, n) : false;
            bool right = j + 1 < n ? dfs(board, visited, word, index+1, i, j + 1, m, n) : false;
            bool left = j - 1 >= 0 ? dfs(board, visited, word, index+1, i, j - 1, m, n) : false;
            return down || up || right || left;
        } else {
            return false;
        }
    }
};
```

### Backtracking DFS

```cpp
class Solution {
public:
    bool exist(vector<vector<char>>& board, string word) {
        int m = board.size();
        int n = board[0].size();
        for(int i = 0; i < m; i++) {
            for(int j = 0; j < n; j++) {
                if(dfs(board, word, 0, i, j, m, n)) 
                    return true;
            }
        }
        return false;
    }

    bool dfs(vector<vector<char>>& board, string& word, int index, int i, int j, int& m, int& n) {
        
        if(index == word.length() - 1 && board[i][j] == word[index]) return true;
        if(word[index] != board[i][j] || board[i][j] == '*') return false;
        if(board[i][j] == word[index]) {
            char temp = board[i][j];
            // backtracking
            board[i][j] = '*';
            bool down = i + 1 < m ? dfs(board, word, index+1, i + 1, j, m, n) : false;
            bool up = i - 1 >= 0 ? dfs(board, word, index+1, i - 1, j, m, n) : false;
            bool right = j + 1 < n ? dfs(board, word, index+1, i, j + 1, m, n) : false;
            bool left = j - 1 >= 0 ? dfs(board, word, index+1, i, j - 1, m, n) : false;
            // backtracking
            board[i][j] = temp;
            return down || up || right || left;
        } else {
            return false;
        }
    }
};
```
## Source
- [Word Search - LeetCode](https://leetcode.com/problems/word-search/description/)