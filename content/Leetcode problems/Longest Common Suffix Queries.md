---
title: Longest Common Suffix Queries
date: 2024-03-26
lastmod: 2024-03-26
author:
  - Jimmy Lin
tags:
  - trie
  - review
draft: false
sr-due: 2024-04-11
sr-interval: 16
sr-ease: 290
---

## Description

ou are given two arrays of strings `wordsContainer` and `wordsQuery`.

For each `wordsQuery[i]`, you need to find a string from `wordsContainer` that has the **longest common suffix** with `wordsQuery[i]`. If there are two or more strings in `wordsContainer` that share the longest common suffix, find the string that is the **smallest** in length. If there are two or more such strings that have the **same** smallest length, find the one that occurred **earlier** in `wordsContainer`.

Return _an array of integers_ `ans`_, where_ `ans[i]` _is the index of the string in_ `wordsContainer` _that has the **longest common suffix** with_ `wordsQuery[i]`_._

**Example 1:**

**Input:** wordsContainer = \["abcd","bcd","xbcd"\], wordsQuery = \["cd","bcd","xyz"\]

**Output:** \[1,1,1\]

**Explanation:**

Let's look at each `wordsQuery[i]` separately:

*   For `wordsQuery[0] = "cd"`, strings from `wordsContainer` that share the longest common suffix `"cd"` are at indices 0, 1, and 2. Among these, the answer is the string at index 1 because it has the shortest length of 3.
*   For `wordsQuery[1] = "bcd"`, strings from `wordsContainer` that share the longest common suffix `"bcd"` are at indices 0, 1, and 2. Among these, the answer is the string at index 1 because it has the shortest length of 3.
*   For `wordsQuery[2] = "xyz"`, there is no string from `wordsContainer` that shares a common suffix. Hence the longest common suffix is `""`, that is shared with strings at index 0, 1, and 2. Among these, the answer is the string at index 1 because it has the shortest length of 3.

**Example 2:**

**Input:** wordsContainer = \["abcdefgh","poiuygh","ghghgh"\], wordsQuery = \["gh","acbfgh","acbfegh"\]

**Output:** \[2,0,2\]

**Explanation:**

Let's look at each `wordsQuery[i]` separately:

*   For `wordsQuery[0] = "gh"`, strings from `wordsContainer` that share the longest common suffix `"gh"` are at indices 0, 1, and 2. Among these, the answer is the string at index 2 because it has the shortest length of 6.
*   For `wordsQuery[1] = "acbfgh"`, only the string at index 0 shares the longest common suffix `"fgh"`. Hence it is the answer, even though the string at index 2 is shorter.
*   For `wordsQuery[2] = "acbfegh"`, strings from `wordsContainer` that share the longest common suffix `"gh"` are at indices 0, 1, and 2. Among these, the answer is the string at index 2 because it has the shortest length of 6.

**Constraints:**

*   `1 <= wordsContainer.length, wordsQuery.length <= 104`
*   `1 <= wordsContainer[i].length <= 5 * 103`
*   `1 <= wordsQuery[i].length <= 5 * 103`
*   `wordsContainer[i]` consists only of lowercase English letters.
*   `wordsQuery[i]` consists only of lowercase English letters.
*   Sum of `wordsContainer[i].length` is at most `5 * 105`.
*   Sum of `wordsQuery[i].length` is at most `5 * 105`.

## Code 

和 [[Shortest Uncommon Substring in an Array]] 一樣，都是在 Node 中新增一些 field 幫助我們解題，但基本的 Trie 操作都是一樣的。


Time Complexity: $O(n^2)$, Space Complexity: $O(n)$

`Node* head = new Node(0);` 是整個 trie 的起點。

```cpp
if(wordsContainer[i].size() < wordsContainer[cur->minIdx].size()) {
	cur->minIdx = i;
}
```

是在每一顆 trie node 上，檢查每個可能的 suffix 結尾，其對應的 wordsContainer 中的 string 在 vector 中長度是否最小，然後更新 index。因為題目要求： If there are two or more strings in `wordsContainer` that share the longest common suffix, find the string that is the **smallest** in length.

```cpp
class Solution {
public:
    struct Node {
        int minIdx;
        Node* child[26];
        Node(int idx) {
            minIdx = idx;
            for(int i = 0; i < 26; i++) {
                child[i] = nullptr;
            }
        }
    };
    void add(Node* cur, vector<string>& wordsContainer, int i) {
        string s = wordsContainer[i];
        for(int j = s.length() - 1; j >= 0; j--) {
            int c = s[j] - 'a';
            if(cur->child[c] == nullptr) {
                cur->child[c] = new Node(i);
            }
            cur = cur->child[c];
            if(wordsContainer[i].size() < wordsContainer[cur->minIdx].size()) {
                cur->minIdx = i;
            }
        }
    }

    int search(Node* cur, string &s) {
        int ans = cur->minIdx;
        for(int i = s.length() - 1; i >= 0; i--) {
            cur = cur->child[s[i] - 'a'];
            if(!cur) 
                return ans;
            ans = cur->minIdx;
        }
        return ans;
    }

    vector<int> stringIndices(vector<string>& wordsContainer, vector<string>& wordsQuery) {
        Node* head = new Node(0);
        for(int i = 0; i < wordsContainer.size(); i++) {
            if(wordsContainer[i].size() < wordsContainer[head->minIdx].size()) {
                head->minIdx = i;
            }
            add(head, wordsContainer, i);
        } 
        vector<int> res;
        for(auto& q: wordsQuery) {
            res.push_back(search(head, q));
        }
        return res;
    }
};
```

## Source
- [Longest Common Suffix Queries - LeetCode](https://leetcode.com/problems/longest-common-suffix-queries/description/)