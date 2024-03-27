---
title: LRU Cache
date: 2023-12-04
lastmod: 2023-12-04
author:
  - Jimmy Lin
tags:
  - linked_list
  - doubly_linked_list
  - review
draft: false
---

## Description

Design a data structure that follows the constraints of a **[Least Recently Used (LRU) cache](https://en.wikipedia.org/wiki/Cache_replacement_policies#LRU)**.

Implement the `LRUCache` class:

*   `LRUCache(int capacity)` Initialize the LRU cache with **positive** size `capacity`.
*   `int get(int key)` Return the value of the `key` if the key exists, otherwise return `-1`.
*   `void put(int key, int value)` Update the value of the `key` if the `key` exists. Otherwise, add the `key-value` pair to the cache. If the number of keys exceeds the `capacity` from this operation, **evict** the least recently used key.

The functions `get` and `put` must each run in `O(1)` average time complexity.

**Example 1:**

**Input**
\["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"\]
\[\[2\], \[1, 1\], \[2, 2\], \[1\], \[3, 3\], \[2\], \[4, 4\], \[1\], \[3\], \[4\]\]
**Output**
\[null, null, null, 1, null, -1, null, -1, 3, 4\]

**Explanation**
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4

**Constraints:**

*   `1 <= capacity <= 3000`
*   `0 <= key <= 104`
*   `0 <= value <= 105`
*   At most `2 * 105` calls will be made to `get` and `put`.

## Code 

Time Complexity: $O()$, Space Complexity: $O()$

```cpp
class LRUCache {   
    size_t _capacity;
    unordered_map<int, list<pair<int, int>>::iterator> _map;
    list<pair<int, int>> _list;
public:
    LRUCache(int capacity) {
        _capacity = capacity;
    }
    
    int get(int key) {
        if(_map.find(key) == _map.end()) return -1;
        _list.splice(_list.begin(), _list, _map[key]);
        return _map[key]->second;
    }
    
    void put(int key, int value) {
        if(_map.find(key) != _map.end()) {
            _list.splice(_list.begin(), _list, _map[key]);
            _map[key]->second = value;
            return;
        }

        if(_list.size() == _capacity) {
            int key_to_del = _list.back().first;
            _list.pop_back();
            _map.erase(key_to_del);
        }

        _list.push_front({key, value});
        _map[key] = _list.begin();
    }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * LRUCache* obj = new LRUCache(capacity);
 * int param_1 = obj->get(key);
 * obj->put(key,value);
 */
```

## Source
- [LRU Cache - LeetCode](https://leetcode.com/problems/lru-cache/description/)