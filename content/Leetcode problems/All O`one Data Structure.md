---
title: All O`one Data Structure
date: 2024-03-26
lastmod: 2024-03-26
author:
  - Jimmy Lin
tags:
  - hashmap
  - heap
  - review
  - linked_list
  - doubly_linked_list
draft: false
---

## Description

Design a data structure to store the strings' count with the ability to return the strings with minimum and maximum counts.

Implement the `AllOne` class:

*   `AllOne()` Initializes the object of the data structure.
*   `inc(String key)` Increments the count of the string `key` by `1`. If `key` does not exist in the data structure, insert it with count `1`.
*   `dec(String key)` Decrements the count of the string `key` by `1`. If the count of `key` is `0` after the decrement, remove it from the data structure. It is guaranteed that `key` exists in the data structure before the decrement.
*   `getMaxKey()` Returns one of the keys with the maximal count. If no element exists, return an empty string `""`.
*   `getMinKey()` Returns one of the keys with the minimum count. If no element exists, return an empty string `""`.

**Note** that each function must run in `O(1)` average time complexity.

**Example 1:**

**Input**
\["AllOne", "inc", "inc", "getMaxKey", "getMinKey", "inc", "getMaxKey", "getMinKey"\]
\[\[\], \["hello"\], \["hello"\], \[\], \[\], \["leet"\], \[\], \[\]\]
**Output**
\[null, null, null, "hello", "hello", null, "hello", "leet"\]

**Explanation**
AllOne allOne = new AllOne();
allOne.inc("hello");
allOne.inc("hello");
allOne.getMaxKey(); // return "hello"
allOne.getMinKey(); // return "hello"
allOne.inc("leet");
allOne.getMaxKey(); // return "hello"
allOne.getMinKey(); // return "leet"

**Constraints:**

*   `1 <= key.length <= 10`
*   `key` consists of lowercase English letters.
*   It is guaranteed that for each call to `dec`, `key` is existing in the data structure.
*   At most `5 * 104` calls will be made to `inc`, `dec`, `getMaxKey`, and `getMinKey`.

## Code 

### Heap + Hashmap

和 [[Most Frequent IDs]] ㄧ樣，採用 lazy pop heap 的技巧。

Time Complexity: $O(\log n)$, Space Complexity: $O(n)$

```cpp
class AllOne {
public:
    unordered_map<string, int> keyToFre;
    priority_queue<pair<int, string>> freToKeyMax;
    priority_queue<pair<int, string>, vector<pair<int, string>>, greater<pair<int, string>>> freToKeyMin;

    AllOne() {
        
    }
    
    void inc(string key) {
        keyToFre[key]++;
        freToKeyMax.push({keyToFre[key], key});
        freToKeyMin.push({keyToFre[key], key});
    }
    
    void dec(string key) {
        keyToFre[key]--;
        if(keyToFre[key] == 0)
            keyToFre.erase(key);
    }
    
    string getMaxKey() {
        while(!freToKeyMax.empty()) {
            auto node = freToKeyMax.top();
            int fre = node.first;
            string key = node.second;
            if(fre != keyToFre[key])
                freToKeyMax.pop();
            else
                return key;
        }
        return "";
    }
    
    string getMinKey() {
        while(!freToKeyMin.empty()) {
            auto node = freToKeyMin.top();
            int fre = node.first;
            string key = node.second;
            if(fre != keyToFre[key])
                freToKeyMin.pop();
            else
                return key;
        }
        return "";
    }
};

/**
 * Your AllOne object will be instantiated and called as such:
 * AllOne* obj = new AllOne();
 * obj->inc(key);
 * obj->dec(key);
 * string param_3 = obj->getMaxKey();
 * string param_4 = obj->getMinKey();
 */
```

## Source
- [All O`one Data Structure - LeetCode](https://leetcode.com/problems/all-oone-data-structure/description/)