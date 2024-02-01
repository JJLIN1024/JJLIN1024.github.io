---
title: Group Anagrams
date: 2023-04-10
lastmod: 2024-01-08
author:
  - Jimmy Lin
tags:
  - hashmap
draft: false
---

## Description

Given an array of strings `strs`, group **the anagrams** together. You can return the answer in **any order**.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

**Example 1:**

**Input:** strs = \["eat","tea","tan","ate","nat","bat"\]
**Output:** \[\["bat"\],\["nat","tan"\],\["ate","eat","tea"\]\]

**Example 2:**

**Input:** strs = \[""\]
**Output:** \[\[""\]\]

**Example 3:**

**Input:** strs = \["a"\]
**Output:** \[\["a"\]\]

**Constraints:**

*   `1 <= strs.length <= 104`
*   `0 <= strs[i].length <= 100`
*   `strs[i]` consists of lowercase English letters.

## Code 

hash function 用英文字母加上出現頻率當作 key ，做成 string，以 `abbac` 為例，hash 值就是 `a2b2c1`。

如果不加上英文字母本身，只單純將 26 個字母的頻率組成 string 的話，下面這個 case 就會導致不同的 string 對應到相同的 hash string key。

Example case: `strs = ["bdddddddddd","bbbbbbbbbbc"]`

```console
bdddddddddd: 
count: 0 1 0 10 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0  
hash string 010100000000000000000000000 

bbbbbbbbbbc:
count: 0 10 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 
hash string: 010100000000000000000000000
```

Time Complexity: $O(n)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        
        unordered_map<string, vector<string>> mp;
        for(auto str: strs) {
            vector<int> count(26, 0);
            for(auto c: str) {
                count[c - 'a']++;
            }

            string hash = "";
            for(int i = 0; i < 26; i++) {
                hash += string(1, 'a' + i);
                hash += to_string(count[i]);
            }

            if(mp.find(hash) != mp.end()) {
                mp[hash].push_back(str);
            } else {
                mp[hash] = {str};
            }
        }

        vector<vector<string>> res;
        for(auto it: mp) {
            res.push_back(it.second);
        }
        return res;
    }
};
```



Time Complexity: $O(n \log n)$, Space Complexity: $O(n)$

也可以對每個 string 都要先 sort，然後用 string 當作 key，就不會有重複的問題。

```cpp
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> mp;
        for(auto str: strs) {
            string temp = str;
            sort(temp.begin(), temp.end());
            mp[temp].push_back(str);
        }

        vector<vector<string>> answer;
        for(auto m: mp) {
            answer.push_back(m.second);
        }
        return answer;
    }
};
```

## Source
- [Group Anagrams - LeetCode](https://leetcode.com/problems/group-anagrams/description/)