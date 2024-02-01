---
title: Implement Trie (Prefix Tree)
date: 2023-03-18
lastmod: 2023-03-18
author: Jimmy Lin
tags:
  - trie
  - review
draft: false
sr-due: 2024-02-22
sr-interval: 22
sr-ease: 290
---

## Description

A [**trie**](https://en.wikipedia.org/wiki/Trie) (pronounced as "try") or **prefix tree** is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement the Trie class:

*   `Trie()` Initializes the trie object.
*   `void insert(String word)` Inserts the string `word` into the trie.
*   `boolean search(String word)` Returns `true` if the string `word` is in the trie (i.e., was inserted before), and `false` otherwise.
*   `boolean startsWith(String prefix)` Returns `true` if there is a previously inserted string `word` that has the prefix `prefix`, and `false` otherwise.

**Example 1:**

**Input**
\["Trie", "insert", "search", "search", "startsWith", "insert", "search"\]
\[\[\], \["apple"\], \["apple"\], \["app"\], \["app"\], \["app"\], \["app"\]\]
**Output**
\[null, null, true, false, true, null, true\]

**Explanation**
Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");   // return True
trie.search("app");     // return False
trie.startsWith("app"); // return True
trie.insert("app");
trie.search("app");     // return True

**Constraints:**

*   `1 <= word.length, prefix.length <= 2000`
*   `word` and `prefix` consist only of lowercase English letters.
*   At most `3 * 104` calls **in total** will be made to `insert`, `search`, and `startsWith`.
## Code 

```cpp
class Trie {
    Trie* children[26];
    bool isWord;
public:
    Trie() {
        isWord = false;
        for(int i = 0; i < 26; i++) {
            this->children[i] = nullptr;
        }
    }   

    void insert(string word) {
        Trie* cur = this;
        for(char c: word) {
            c -= 'a';
            if(cur->children[c] == nullptr) {
                cur->children[c] = new Trie();
            }
            cur = cur->children[c];
        }
        cur->isWord = true;
    }

    bool search(string word) {
        Trie* cur = this;
        for(char c: word) {
            c -= 'a';
            if(cur->children[c] == nullptr) return false;
            cur = cur->children[c];
        }
        return cur->isWord;
    }
    
    bool startsWith(string prefix) {
        Trie* cur = this;
        for(char c: prefix) {
            c -= 'a';
            if(cur->children[c] == nullptr) return false;
            cur = cur->children[c];
        }
        return true;
    }
};

/**
 * Your Trie object will be instantiated and called as such:
 * Trie* obj = new Trie();
 * obj->insert(word);
 * bool param_2 = obj->search(word);
 * bool param_3 = obj->startsWith(prefix);
 */
```

## Source
- [Implement Trie (Prefix Tree) - LeetCode](https://leetcode.com/problems/implement-trie-prefix-tree/)
- [Trie 字典樹 – 陪你刷題](https://haogroot.com/2021/01/07/trie-leetcode/)