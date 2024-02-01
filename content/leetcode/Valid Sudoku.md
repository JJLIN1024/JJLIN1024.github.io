---
title: Valid Sudoku
date: 2023-04-01
lastmod: 2024-01-08
author:
  - Jimmy Lin
tags:
  - array
  - hashmap
draft: false
---

## Description

Determine if a `9 x 9` Sudoku board is valid. Only the filled cells need to be validated **according to the following rules**:

1.  Each row must contain the digits `1-9` without repetition.
2.  Each column must contain the digits `1-9` without repetition.
3.  Each of the nine `3 x 3` sub-boxes of the grid must contain the digits `1-9` without repetition.

**Note:**

*   A Sudoku board (partially filled) could be valid but is not necessarily solvable.
*   Only the filled cells need to be validated according to the mentioned rules.

**Example 1:**

![](https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Sudoku-by-L2G-20050714.svg/250px-Sudoku-by-L2G-20050714.svg.png)

**Input:** board = 
\[\["5","3",".",".","7",".",".",".","."\]
,\["6",".",".","1","9","5",".",".","."\]
,\[".","9","8",".",".",".",".","6","."\]
,\["8",".",".",".","6",".",".",".","3"\]
,\["4",".",".","8",".","3",".",".","1"\]
,\["7",".",".",".","2",".",".",".","6"\]
,\[".","6",".",".",".",".","2","8","."\]
,\[".",".",".","4","1","9",".",".","5"\]
,\[".",".",".",".","8",".",".","7","9"\]\]
**Output:** true

**Example 2:**

**Input:** board = 
\[\["8","3",".",".","7",".",".",".","."\]
,\["6",".",".","1","9","5",".",".","."\]
,\[".","9","8",".",".",".",".","6","."\]
,\["8",".",".",".","6",".",".",".","3"\]
,\["4",".",".","8",".","3",".",".","1"\]
,\["7",".",".",".","2",".",".",".","6"\]
,\[".","6",".",".",".",".","2","8","."\]
,\[".",".",".","4","1","9",".",".","5"\]
,\[".",".",".",".","8",".",".","7","9"\]\]
**Output:** false
**Explanation:** Same as Example 1, except with the **5** in the top left corner being modified to **8**. Since there are two 8's in the top left 3x3 sub-box, it is invalid.

**Constraints:**

*   `board.length == 9`
*   `board[i].length == 9`
*   `board[i][j]` is a digit `1-9` or `'.'`.

## Code 

Time Complexity: $O(n^2)$, Space Complexity: $O(1)$

注意 `box` 的 index 計算方式：`int index = 3 * ri + ci;`。

```cpp
class Solution {
public:
    bool isValidSudoku(vector<vector<char>>& board) {
        vector<set<char>> rows(9);
        vector<set<char>> cols(9);
        vector<set<char>> box(9);
 
        for(int i = 0; i < board.size(); i++) {
            for(int j = 0; j < board[i].size(); j++) {
                char c = board[i][j];
                if(c != '.') {
                    if(rows[i].find(c) != rows[i].end()) {
                        return false;
                    } else {
                        rows[i].insert(c);
                    }
                    
                    if(cols[j].find(c) != cols[j].end()) {
                        return false;
                    } else {
                        cols[j].insert(c);
                    }
                    
                    int ri = i / 3;
                    int ci = j / 3;
                    int index = 3 * ri + ci;
                    
                    if(box[index].find(c) != box[index].end()) {
                        return false;
                    } else {
                        box[index].insert(c);
                    }
                }
            }
        }
        
        return true;
    }
};
```

## Source
- [Valid Sudoku - LeetCode](https://leetcode.com/problems/valid-sudoku/description/)