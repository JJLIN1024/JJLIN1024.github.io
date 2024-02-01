---
title: Design Add and Search Words Data Structure
date: 2023-03-18
lastmod: 2023-03-18
author: Jimmy Lin
tags:
  - trie
  - review
draft: false
sr-due: 2024-01-31
sr-interval: 4
sr-ease: 272
---

## Description

Design a data structure that supports adding new words and finding if a string matches any previously added string.

Implement the `WordDictionary` class:

*   `WordDictionary()` Initializes the object.
*   `void addWord(word)` Adds `word` to the data structure, it can be matched later.
*   `bool search(word)` Returns `true` if there is any string in the data structure that matches `word` or `false` otherwise. `word` may contain dots `'.'` where dots can be matched with any letter.

**Example:**

**Input**
\["WordDictionary","addWord","addWord","addWord","search","search","search","search"\]
\[\[\],\["bad"\],\["dad"\],\["mad"\],\["pad"\],\["bad"\],\[".ad"\],\["b.."\]\]
**Output**
\[null,null,null,null,false,true,true,true\]

**Explanation**
WordDictionary wordDictionary = new WordDictionary();
wordDictionary.addWord("bad");
wordDictionary.addWord("dad");
wordDictionary.addWord("mad");
wordDictionary.search("pad"); // return False
wordDictionary.search("bad"); // return True
wordDictionary.search(".ad"); // return True
wordDictionary.search("b.."); // return True

**Constraints:**

*   `1 <= word.length <= 25`
*   `word` in `addWord` consists of lowercase English letters.
*   `word` in `search` consist of `'.'` or lowercase English letters.
*   There will be at most `3` dots in `word` for `search` queries.
*   At most `104` calls will be made to `addWord` and `search`.

## Code 

使用在 [[Implement Trie (Prefix Tree)]] 中學到的 trie，唯一不一樣的是要如何處理遇到 `.` 的情形，這裡採用 recursion 。

```cpp
class WordDictionary {
    vector<WordDictionary*> children;
    bool isEndofWord;
public:
    WordDictionary(): isEndofWord(false) {
        children = vector<WordDictionary*>(26, nullptr);
    }
    
    void addWord(string word) {
        WordDictionary* cur = this;
        for(auto c: word) {
            c -= 'a';
            if(cur->children[c] == nullptr) 
                cur->children[c] = new WordDictionary();
            cur = cur->children[c];
        }
        cur->isEndofWord = true;
    }
    
    bool search(string word) {
        WordDictionary* cur = this;
        for(int i = 0; i < word.length(); i++) {
            char c = word[i];
            if(word[i] == '.') {
                string subStr = word.substr(i + 1);
                for(auto ch: cur->children) {
                    if(ch && ch->search(subStr)) 
                        return true;
                }
                return false;
            }
            c -= 'a';
            if(cur->children[c] == nullptr) return false;
            cur = cur->children[c];
        } 
        return cur->isEndofWord;
    }
};

/**
 * Your WordDictionary object will be instantiated and called as such:
 * WordDictionary* obj = new WordDictionary();
 * obj->addWord(word);
 * bool param_2 = obj->search(word);
 */
```

## Source
- [Design Add and Search Words Data Structure - LeetCode](https://leetcode.com/problems/design-add-and-search-words-data-structure/description/)