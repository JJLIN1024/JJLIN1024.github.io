---
title: Repeated DNA Sequences
date: 2023-02-06
lastmod: 2023-12-07
author:
  - Jimmy Lin
tags:
  - hashmap
  - bit_manipulation
draft: false
---

## Description

The **DNA sequence** is composed of a series of nucleotides abbreviated as `'A'`, `'C'`, `'G'`, and `'T'`.

*   For example, `"ACGAATTCCG"` is a **DNA sequence**.

When studying **DNA**, it is useful to identify repeated sequences within the DNA.

Given a string `s` that represents a **DNA sequence**, return all the **`10`\-letter-long** sequences (substrings) that occur more than once in a DNA molecule. You may return the answer in **any order**.

**Example 1:**

**Input:** s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"
**Output:** \["AAAAACCCCC","CCCCCAAAAA"\]

**Example 2:**

**Input:** s = "AAAAAAAAAAAAA"
**Output:** \["AAAAAAAAAA"\]

**Constraints:**

*   `1 <= s.length <= 105`
*   `s[i]` is either `'A'`, `'C'`, `'G'`, or `'T'`.

## Code 

### hashmap

最直白的解法，不過在 space complexity 上有優化的空間。

```cpp
class Solution {
public:
    vector<string> findRepeatedDnaSequences(string s) {
        unordered_map<string, int> mp;
        vector<string> res;
        if(s.size() < 10) return res;
        for(int i = 0; i < s.size() - 9; i++) {
            mp[s.substr(i, 10)]++;
        }
        for(auto it = mp.begin(); it != mp.end(); it++) {
            if(it->second > 1) res.push_back(it->first);
        }

        return res;
    }
};
```

### hashmap + bit

hashmap 從 `unorder_map<string, int>` 變成了 `unordered_map<int, int>`，進一步節省空間。

參考 [ASCII](https://zh.wikipedia.org/zh-tw/ASCII)，A, T, C, G 的 binary 分別為：

A: 0100 0001
T: 0100 0011
C: 0101 0100
G: 0100 0111

可看出最多只需要用最後三個 bit 就可以完全區分四者，因此 `s[i] & 7`。

使用 rolling hash，因為 `s[i] & 7` 是取最後三 bit，所以 left shift 3。`& 0x3FFFFFFF` 是因為十個字母每個 3 bit 總共 30 bit。

要注意 `s.substr(i - 9, 10)`。

```cpp
class Solution {
public:
    vector<string> findRepeatedDnaSequences(string s) {
        unordered_map<int, int> mp;
        vector<string> res;
        if(s.size() < 11) return res;
        long rollingHash = 0;
        for(int i = 0; i < s.size(); i++) {
            rolling_hash = (rolling_hash << 3) & 0x3FFFFFFF | (s[i] & 7);
            if(mp[rolling_hash]++ == 1) res.push_back(s.substr(i - 9, 10));
        }
        return res;
    }
};
```

## Source
- [Repeated DNA Sequences - LeetCode](https://leetcode.com/problems/repeated-dna-sequences/description/)