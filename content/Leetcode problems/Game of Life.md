---
title: Game of Life
date: 2024-02-26
lastmod: 2024-02-26
author:
  - Jimmy Lin
tags:
  - array
  - bit_manipulation
  - review
draft: false
sr-due: 2024-05-13
sr-interval: 57
sr-ease: 310
---

## Description

According to [Wikipedia's article](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life): "The **Game of Life**, also known simply as **Life**, is a cellular automaton devised by the British mathematician John Horton Conway in 1970."

The board is made up of an `m x n` grid of cells, where each cell has an initial state: **live** (represented by a `1`) or **dead** (represented by a `0`). Each cell interacts with its [eight neighbors](https://en.wikipedia.org/wiki/Moore_neighborhood) (horizontal, vertical, diagonal) using the following four rules (taken from the above Wikipedia article):

1.  Any live cell with fewer than two live neighbors dies as if caused by under-population.
2.  Any live cell with two or three live neighbors lives on to the next generation.
3.  Any live cell with more than three live neighbors dies, as if by over-population.
4.  Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

The next state is created by applying the above rules simultaneously to every cell in the current state, where births and deaths occur simultaneously. Given the current state of the `m x n` grid `board`, return _the next state_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/12/26/grid1.jpg)

**Input:** board = \[\[0,1,0\],\[0,0,1\],\[1,1,1\],\[0,0,0\]\]
**Output:** \[\[0,0,0\],\[1,0,1\],\[0,1,1\],\[0,1,0\]\]

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/12/26/grid2.jpg)

**Input:** board = \[\[1,1\],\[1,0\]\]
**Output:** \[\[1,1\],\[1,1\]\]

**Constraints:**

*   `m == board.length`
*   `n == board[i].length`
*   `1 <= m, n <= 25`
*   `board[i][j]` is `0` or `1`.

**Follow up:**

*   Could you solve it in-place? Remember that the board needs to be updated simultaneously: You cannot update some cells first and then use their updated values to update other cells.
*   In this question, we represent the board using a 2D array. In principle, the board is infinite, which would cause problems when the active area encroaches upon the border of the array (i.e., live cells reach the border). How would you address these problems?

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    void gameOfLife(vector<vector<int>>& board) {
        int m = board.size(), n = board[0].size();
        vector<vector<int>> res(m, vector<int>(n, 0));
        for(int i = 0; i < m; i++) {
            for(int j = 0; j < n; j++) {
                int count = 0;
                if(i - 1 >= 0) {
                    if(board[i - 1][j] == 1)
                        count++;
                }
                if(j - 1 >= 0) {
                    if(board[i][j - 1] == 1)
                        count++;
                }
                if(i + 1 < m) {
                    if(board[i + 1][j] == 1)
                        count++;
                }
                if(j + 1 < n) {
                    if(board[i][j + 1] == 1)
                        count++;
                }

                if(i + 1 < m && j + 1 < n) {
                    if(board[i + 1][j + 1] == 1)
                        count++;
                }

                if(i - 1 >= 0 && j + 1 < n) {
                    if(board[i - 1][j + 1] == 1)
                        count++;
                }

                if(i + 1 < m && j - 1 >= 0) {
                    if(board[i + 1][j - 1] == 1)
                        count++;
                }

                if(i - 1 >= 0 && j - 1 >= 0) {
                    if(board[i - 1][j - 1] == 1)
                        count++;
                }

                if(board[i][j] == 1) {
                    if(count < 2) {
                        res[i][j] = 0;
                    } else if(count >= 2 && count <= 3) {
                        res[i][j] = 1;
                    } else if(count > 3) {
                        res[i][j] = 0;
                    }
                } else {    
                    if(count == 3) {
                        res[i][j] = 1;
                    }
                }   
            }
        }
        board = res;
    }
};
```

## Do it in-place
Time Complexity: $O(n)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    void gameOfLife(vector<vector<int>>& board) {
        int m = board.size(), n = board[0].size();
        // 0xij, i -> next state, j -> current state
        for(int i = 0; i < m; i++) {
            for(int j = 0; j < n; j++) {
                int lives = get_lives(board, m, n, i, j);
                if(board[i][j] == 0 && lives == 3) 
                    board[i][j] = 2; // 0x10
                if(board[i][j] == 1 && lives >= 2 && lives <= 3) 
                    board[i][j] = 3; // 0x11
            }
        }

        for(int i = 0; i < m; i++) {
            for(int j = 0; j < n; j++) {
                board[i][j] >>= 1; // 0x10 -> 0x01, etc...
            }
        }
    }

    int get_lives(vector<vector<int>>& board, int m, int n, int i, int j) {
        int count = 0;
        if(i - 1 >= 0) {
            if(board[i - 1][j] & 1)
                count++;
        }
        if(j - 1 >= 0) {
            if(board[i][j - 1] & 1)
                count++;
        }
        if(i + 1 < m) {
            if(board[i + 1][j] & 1)
                count++;
        }
        if(j + 1 < n) {
            if(board[i][j + 1] & 1)
                count++;
        }

        if(i + 1 < m && j + 1 < n) {
            if(board[i + 1][j + 1] & 1)
                count++;
        }

        if(i - 1 >= 0 && j + 1 < n) {
            if(board[i - 1][j + 1] & 1)
                count++;
        }

        if(i + 1 < m && j - 1 >= 0) {
            if(board[i + 1][j - 1] & 1)
                count++;
        }

        if(i - 1 >= 0 && j - 1 >= 0) {
            if(board[i - 1][j - 1] & 1)
                count++;
        }
        return count;
    }
};
```
## Source
- [Game of Life - LeetCode](https://leetcode.com/problems/game-of-life/description/?envType=study-plan-v2&envId=top-interview-150)