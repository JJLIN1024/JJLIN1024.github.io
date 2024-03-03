---
title: Insert Delete GetRandom O(1) - Duplicates allowed
date: 2024-02-22
lastmod: 2024-02-22
author:
  - Jimmy Lin
tags:
  - array
  - hashmap
  - review
draft: false
sr-due: 2024-03-13
sr-interval: 13
sr-ease: 250
---

## Description

`RandomizedCollection` is a data structure that contains a collection of numbers, possibly duplicates (i.e., a multiset). It should support inserting and removing specific elements and also reporting a random element.

Implement the `RandomizedCollection` class:

*   `RandomizedCollection()` Initializes the empty `RandomizedCollection` object.
*   `bool insert(int val)` Inserts an item `val` into the multiset, even if the item is already present. Returns `true` if the item is not present, `false` otherwise.
*   `bool remove(int val)` Removes an item `val` from the multiset if present. Returns `true` if the item is present, `false` otherwise. Note that if `val` has multiple occurrences in the multiset, we only remove one of them.
*   `int getRandom()` Returns a random element from the current multiset of elements. The probability of each element being returned is **linearly related** to the number of the same values the multiset contains.

You must implement the functions of the class such that each function works on **average** `O(1)` time complexity.

**Note:** The test cases are generated such that `getRandom` will only be called if there is **at least one** item in the `RandomizedCollection`.

**Example 1:**

**Input**
\["RandomizedCollection", "insert", "insert", "insert", "getRandom", "remove", "getRandom"\]
\[\[\], \[1\], \[1\], \[2\], \[\], \[1\], \[\]\]
**Output**
\[null, true, false, true, 2, true, 1\]

**Explanation**
RandomizedCollection randomizedCollection = new RandomizedCollection();
randomizedCollection.insert(1);   // return true since the collection does not contain 1.
                                  // Inserts 1 into the collection.
randomizedCollection.insert(1);   // return false since the collection contains 1.
                                  // Inserts another 1 into the collection. Collection now contains \[1,1\].
randomizedCollection.insert(2);   // return true since the collection does not contain 2.
                                  // Inserts 2 into the collection. Collection now contains \[1,1,2\].
randomizedCollection.getRandom(); // getRandom should:
                                  // - return 1 with probability 2/3, or
                                  // - return 2 with probability 1/3.
randomizedCollection.remove(1);   // return true since the collection contains 1.
                                  // Removes 1 from the collection. Collection now contains \[1,2\].
randomizedCollection.getRandom(); // getRandom should return 1 or 2, both equally likely.

**Constraints:**

*   `-231 <= val <= 231 - 1`
*   At most `2 * 105` calls **in total** will be made to `insert`, `remove`, and `getRandom`.
*   There will be **at least one** element in the data structure when `getRandom` is called.

## Code 

Time Complexity: $O(1)$, Space Complexity: $O(n)$

[[Insert Delete GetRandom O(1)]] 的 follow up，使用 `unordered_set` 讓 delete 依舊維持 $O(1)$。

```cpp
class RandomizedCollection {
public:
    unordered_map<int, unordered_set<int>> mp;
    vector<int> v;
    RandomizedCollection() {
        
    }
    
    bool insert(int val) {
        auto result = mp.find(val) == mp.end();
        v.push_back(val);
        mp[val].insert(v.size() - 1); 
        return result;
    }
    
    bool remove(int val) {
        auto result = mp.find(val) != mp.end();
        if(result) {
            int index = *mp[val].begin();
            if (mp[val].size() == 1) {
                mp.erase(val);
            } else {
                mp[val].erase(mp[val].begin());
            }

            if (index < v.size() - 1) {
                v[index] = v.back();
                mp[v[index]].erase(v.size() - 1);
                mp[v[index]].insert(index);
            }
            v.pop_back();
        }
        return result;
    }
    
    int getRandom() {
        return v[rand() % v.size()];
    }
};

/**
 * Your RandomizedCollection object will be instantiated and called as such:
 * RandomizedCollection* obj = new RandomizedCollection();
 * bool param_1 = obj->insert(val);
 * bool param_2 = obj->remove(val);
 * int param_3 = obj->getRandom();
 */
```

## Source
- [Insert Delete GetRandom O(1) - Duplicates allowed - LeetCode](https://leetcode.com/problems/insert-delete-getrandom-o1-duplicates-allowed/description/)