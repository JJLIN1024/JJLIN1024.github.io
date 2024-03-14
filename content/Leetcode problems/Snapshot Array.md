---
title: Snapshot Array
date: 2024-03-14
lastmod: 2024-03-14
author:
  - Jimmy Lin
tags:
  - binary_search
  - review
draft: false
sr-due: 2024-03-18
sr-interval: 4
sr-ease: 270
---

## Description

Implement a SnapshotArray that supports the following interface:

*   `SnapshotArray(int length)` initializes an array-like data structure with the given length. **Initially, each element equals 0**.
*   `void set(index, val)` sets the element at the given `index` to be equal to `val`.
*   `int snap()` takes a snapshot of the array and returns the `snap_id`: the total number of times we called `snap()` minus `1`.
*   `int get(index, snap_id)` returns the value at the given `index`, at the time we took the snapshot with the given `snap_id`

**Example 1:**

**Input:** \["SnapshotArray","set","snap","set","get"\]
\[\[3\],\[0,5\],\[\],\[0,6\],\[0,0\]\]
**Output:** \[null,null,0,null,5\]
**Explanation:** 
SnapshotArray snapshotArr = new SnapshotArray(3); // set the length to be 3
snapshotArr.set(0,5);  // Set array\[0\] = 5
snapshotArr.snap();  // Take a snapshot, return snap\_id = 0
snapshotArr.set(0,6);
snapshotArr.get(0,0);  // Get the value of array\[0\] with snap\_id = 0, return 5

**Constraints:**

*   `1 <= length <= 5 * 104`
*   `0 <= index < length`
*   `0 <= val <= 109`
*   `0 <= snap_id <` (the total number of times we call `snap()`)
*   At most `5 * 104` calls will be made to `set`, `snap`, and `get`.

## Code 

Time Complexity: $O(n \log n)$, Space Complexity: $O(n)$

建立 base case：
```cpp
for(int i = 0; i < length; i++) {
	map<int, int> mp;
	mp[0] = 0;
	A[i] = mp;
}
```

如此一來在 call

```cpp
return prev(A[index].upper_bound(snap_id))->second;
```

時就不用擔心 `prev` 之後會沒有值可以取（map 有可能是空的）。

```cpp
class SnapshotArray {
public:
    vector<map<int, int>> A;
    int snap_id;
    SnapshotArray(int length) {
        A.resize(length);
        for(int i = 0; i < length; i++) {
            map<int, int> mp;
            mp[0] = 0;
            A[i] = mp;
        }
        
        snap_id = 0;
    }
    
    void set(int index, int val) {
        A[index][snap_id] = val;
    }
    
    int snap() {
        return snap_id++;
    }
    
    int get(int index, int snap_id) {
        return prev(A[index].upper_bound(snap_id))->second;
    }
};

/**
 * Your SnapshotArray object will be instantiated and called as such:
 * SnapshotArray* obj = new SnapshotArray(length);
 * obj->set(index,val);
 * int param_2 = obj->snap();
 * int param_3 = obj->get(index,snap_id);
 */
```

## Source
- [Snapshot Array - LeetCode](https://leetcode.com/problems/snapshot-array/description/?envType=study-plan-v2&envId=binary-search)