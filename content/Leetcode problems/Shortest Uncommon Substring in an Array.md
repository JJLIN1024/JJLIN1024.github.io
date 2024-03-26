---
title: Shortest Uncommon Substring in an Array
date: 2024-03-26
lastmod: 2024-03-26
author:
  - Jimmy Lin
tags:
  - trie
  - review
draft: false
sr-due: 2024-03-30
sr-interval: 4
sr-ease: 270
---

## Description

You are given an array `arr` of size `n` consisting of **non-empty** strings.

Find a string array `answer` of size `n` such that:

*   `answer[i]` is the **shortest**
    
    substring
    
    of `arr[i]` that does **not** occur as a substring in any other string in `arr`. If multiple such substrings exist, `answer[i]` should be the
    
    lexicographically smallest
    
    . And if no such substring exists, `answer[i]` should be an empty string.

Return _the array_ `answer`.

**Example 1:**

**Input:** arr = \["cab","ad","bad","c"\]
**Output:** \["ab","","ba",""\]
**Explanation:** We have the following:
- For the string "cab", the shortest substring that does not occur in any other string is either "ca" or "ab", we choose the lexicographically smaller substring, which is "ab".
- For the string "ad", there is no substring that does not occur in any other string.
- For the string "bad", the shortest substring that does not occur in any other string is "ba".
- For the string "c", there is no substring that does not occur in any other string.

**Example 2:**

**Input:** arr = \["abc","bcd","abcd"\]
**Output:** \["","","abcd"\]
**Explanation:** We have the following:
- For the string "abc", there is no substring that does not occur in any other string.
- For the string "bcd", there is no substring that does not occur in any other string.
- For the string "abcd", the shortest substring that does not occur in any other string is "abcd".

**Constraints:**

*   `n == arr.length`
*   `2 <= n <= 100`
*   `1 <= arr[i].length <= 20`
*   `arr[i]` consists only of lowercase English letters.

## Code 

Time Complexity: $O(n^3)$, Space Complexity: $O(n^3)$

因為需要刪除，所以使用 `count` 來紀錄，而不是移除 pointer。

```cpp
class Solution {
public:
    struct Node {
        Node* child[26];
        int count;
        Node(): count(0) {
            for(int i = 0; i < 26; i++) {
                child[i] = nullptr;
            }
        }
    }; 

    void add(Node* node, string& s) {
        Node* ptr = node;
        for(int i = 0; i < s.length(); i++) {
            int c = s[i] - 'a';
            if(ptr->child[c] == nullptr) {
                ptr->child[c] = new Node();
            }
            ptr = ptr->child[c];
            ptr->count++;
        }
    }

    void remove(Node* node, string& s) {
        Node* ptr = node;
        for(int i = 0; i < s.length(); i++) {
            int c = s[i] - 'a';
            ptr = ptr->child[c];
            ptr->count--;
        }
    }

    bool exist(Node* node, string& s) {
        Node* ptr = node;
        for(int i = 0; i < s.length(); i++) {
            int c = s[i] - 'a';
            if(ptr->child[c] == nullptr) 
                return false;
            ptr = ptr->child[c];
            if(ptr->count == 0)
                return false;
        }
        return true;
    }

    vector<string> shortestSubstrings(vector<string>& arr) {
        Node* head = new Node();
        for(auto& s: arr) {
            for(int i = 0; i < s.length(); i++) {
                for(int j = i; j < s.length(); j++) {
                    string sub = s.substr(i, j - i + 1);
                    add(head, sub);
                }
            }
        }

        vector<string> res;
        for(auto& s: arr) {
            // remove all s's substr
            for(int i = 0; i < s.length(); i++) {
                for(int j = i; j < s.length(); j++) {
                    string sub = s.substr(i, j - i + 1);
                    remove(head, sub);
                }
            }
            // check all s's substr
            string answer = s + s;
            for(int i = 0; i < s.length(); i++) {
                for(int j = i; j < s.length(); j++) {
                    string sub = s.substr(i, j - i + 1);
                    if(!exist(head, sub)) {
                        if(sub.length() < answer.length() || (sub.length() == answer.length() && sub < answer)) 
                            answer = sub;
                    }
                }
            }
            res.push_back(answer.length() <= s.length() ? answer : "");
            // add all s's substr back
            for(int i = 0; i < s.length(); i++) {
                for(int j = i; j < s.length(); j++) {
                    string sub = s.substr(i, j - i + 1);
                    add(head, sub);
                }
            }
        }
        return res;
    }
};
```

## Source
- [Shortest Uncommon Substring in an Array - LeetCode](https://leetcode.com/problems/shortest-uncommon-substring-in-an-array/description/)