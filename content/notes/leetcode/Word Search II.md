---
title: Word Search II
date: 2024-01-25
lastmod: 2024-01-25
author: Jimmy Lin
tags:
  - backtracking
  - trie
  - review
draft: false
sr-due: 2024-02-04
sr-interval: 8
sr-ease: 250
---

## Description

Given an `m x n` `board` of characters and a list of strings `words`, return _all words on the board_.

Each word must be constructed from letters of sequentially adjacent cells, where **adjacent cells** are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/11/07/search1.jpg)

**Input:** board = \[\["o","a","a","n"\],\["e","t","a","e"\],\["i","h","k","r"\],\["i","f","l","v"\]\], words = \["oath","pea","eat","rain"\]
**Output:** \["eat","oath"\]

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/11/07/search2.jpg)

**Input:** board = \[\["a","b"\],\["c","d"\]\], words = \["abcb"\]
**Output:** \[\]

**Constraints:**

*   `m == board.length`
*   `n == board[i].length`
*   `1 <= m, n <= 12`
*   `board[i][j]` is a lowercase English letter.
*   `1 <= words.length <= 3 * 104`
*   `1 <= words[i].length <= 10`
*   `words[i]` consists of lowercase English letters.
*   All the strings of `words` are unique.

## Code 

### Backtracking (TLE)

使用 [[Word Search]] 當骨幹，套一層，會 TLE。

```cpp
class Solution {
public:
    vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
        vector<string> res;
        for(auto w: words) {
            if(exist(board, w)) res.push_back(w);
        }
        return res;
    }

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


To check if the current path exists any word, we can build Trie structure, which can prune early when the current path is not a prefix of any words in our Trie.

### Backtracking with Trie (Early Pruning)

Early Pruning: `if(board[i][j] == '#' || t->children[board[i][j] - 'a'] == nullptr) return;`

```cpp
class Trie {
public:
    Trie* children[26];
    string* word;

    Trie() {
        this->word = nullptr;
        for(int i = 0; i < 26; i++) {
            this->children[i] = nullptr;
        }
    }   

    void addWord(string& word) {
        Trie* cur = this;
        for(char c: word) {
            c -= 'a';
            if(cur->children[c] == nullptr) {
                cur->children[c] = new Trie();
            }
            cur = cur->children[c];
        }
        cur->word = &word;
    }
};

class Solution {
public:
    vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
        Trie t;
        for(string& w: words) 
            t.addWord(w);
        vector<string> res;
        int m = board.size();
        int n = board[0].size();
        for(int i = 0; i < m; i++) {
            for(int j = 0; j < n; j++) {
                dfs(board, i, j, m, n, &t, res);
            }
        }
        return res;
    }


    void dfs(vector<vector<char>>& board, int i, int j, int m, int n, Trie* t, vector<string>& res) {
        
        if(board[i][j] == '#' || t->children[board[i][j] - 'a'] == nullptr) return;

        t = t->children[board[i][j] - 'a'];

        if(t->word != nullptr) {
            cout << "in" << endl;
            cout << *(t->word) << endl;
            res.push_back(*(t->word));
            t->word = nullptr;
        }

        char temp = board[i][j];
        board[i][j] = '#'; 
        if(i + 1 < m) dfs(board, i + 1, j, m, n, t, res);
        if(i - 1 >= 0) dfs(board, i - 1, j, m, n, t, res);
        if(j + 1 < n) dfs(board, i, j + 1, m, n, t, res);
        if(j - 1 >= 0) dfs(board, i, j - 1, m, n, t, res);
        board[i][j] = temp; 
    }

};
```


## Source
- [Word Search II - LeetCode](https://leetcode.com/problems/word-search-ii/description/)