---
title: Construct String with Minimum Cost
date: 2024-07-11
lastmod: 2024-07-11
author:
  - Jimmy Lin
tags:
  - trie
  - DP
draft: false
---

## Description

You are given a string `target`, an array of strings `words`, and an integer array `costs`, both arrays of the same length.

Imagine an empty string `s`.

You can perform the following operation any number of times (including **zero**):

*   Choose an index `i` in the range `[0, words.length - 1]`.
*   Append `words[i]` to `s`.
*   The cost of operation is `costs[i]`.

Return the **minimum** cost to make `s` equal to `target`. If it's not possible, return `-1`.

**Example 1:**

**Input:** target = "abcdef", words = \["abdef","abc","d","def","ef"\], costs = \[100,1,1,10,5\]

**Output:** 7

**Explanation:**

The minimum cost can be achieved by performing the following operations:

*   Select index 1 and append `"abc"` to `s` at a cost of 1, resulting in `s = "abc"`.
*   Select index 2 and append `"d"` to `s` at a cost of 1, resulting in `s = "abcd"`.
*   Select index 4 and append `"ef"` to `s` at a cost of 5, resulting in `s = "abcdef"`.

**Example 2:**

**Input:** target = "aaaa", words = \["z","zz","zzz"\], costs = \[1,10,100\]

**Output:** \-1

**Explanation:**

It is impossible to make `s` equal to `target`, so we return -1.

**Constraints:**

*   `1 <= target.length <= 5 * 104`
*   `1 <= words.length == costs.length <= 5 * 104`
*   `1 <= words[i].length <= target.length`
*   The total sum of `words[i].length` is less than or equal to `5 * 104`.
*   `target` and `words[i]` consist only of lowercase English letters.
*   `1 <= costs[i] <= 104`

## Code 

和 [[Word Break]] 類似。經典 Trie DP，Trie 的 member function 寫在外面彈性會比較高。

Time Complexity: $O(n^2 + m)$, Space Complexity: $O(m)$

```cpp
struct TrieNode {
    bool isEndofWord;
    TrieNode* children[26];
    int cost;
    TrieNode(): cost(INT_MAX), isEndofWord(false) {
        for(int i = 0; i < 26; i++) {
            children[i] = nullptr;
        }
    }
};

class Solution {
public:
    void insertWord(TrieNode* root, string& s, int word_cost) {
        TrieNode* cur = root;
        for(int i = 0; i < s.length(); i++) {
            int index = s[i] - 'a';
            if(cur->children[index] == nullptr) {
                cur->children[index] = new TrieNode();
            }
            cur = cur->children[index];
        }
        cur->isEndofWord = true;
        cur->cost = min(cur->cost, word_cost);
    }

    int findMinimumCost(string& target, int start, TrieNode* root, vector<int>& memo) {

        if(start == target.length()) {
            return 0;
        }

        if(memo[start] != -1) {
            return memo[start];
        }

        TrieNode* cur = root;
        int curMin = 1e9;
        for(int i = start; i < target.length(); i++) {
            int index = target[i] - 'a';
            if(cur->children[index] == nullptr) {
                break;
            }
            cur = cur->children[index];
            if(cur->isEndofWord) {
                int futureCost = findMinimumCost(target, i + 1, root, memo);
                curMin = min(curMin, cur->cost + futureCost);
            }
        }

        return memo[start] = curMin;
    }

    int minimumCost(string target, vector<string>& words, vector<int>& costs) {
        TrieNode* root = new TrieNode();
        for(int i = 0; i < words.size(); i++) {
            insertWord(root, words[i], costs[i]);
        }
        int n = target.length();
        vector<int> memo(n, -1);
        int res = findMinimumCost(target, 0, root, memo);
        return res == 1e9 ? -1 : res;
    }
};
```

## Source
- [Construct String with Minimum Cost - LeetCode](https://leetcode.com/problems/construct-string-with-minimum-cost/description/)