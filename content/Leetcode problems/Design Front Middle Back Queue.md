---
title: Design Front Middle Back Queue
date: 2023-12-06
lastmod: 2023-12-06
author:
  - Jimmy Lin
tags:
  - doubly_linked_list
draft: false
---

## Description

Design a queue that supports `push` and `pop` operations in the front, middle, and back.

Implement the `FrontMiddleBack` class:

*   `FrontMiddleBack()` Initializes the queue.
*   `void pushFront(int val)` Adds `val` to the **front** of the queue.
*   `void pushMiddle(int val)` Adds `val` to the **middle** of the queue.
*   `void pushBack(int val)` Adds `val` to the **back** of the queue.
*   `int popFront()` Removes the **front** element of the queue and returns it. If the queue is empty, return `-1`.
*   `int popMiddle()` Removes the **middle** element of the queue and returns it. If the queue is empty, return `-1`.
*   `int popBack()` Removes the **back** element of the queue and returns it. If the queue is empty, return `-1`.

**Notice** that when there are **two** middle position choices, the operation is performed on the **frontmost** middle position choice. For example:

*   Pushing `6` into the middle of `[1, 2, 3, 4, 5]` results in `[1, 2, 6, 3, 4, 5]`.
*   Popping the middle from `[1, 2, 3, 4, 5, 6]` returns `3` and results in `[1, 2, 4, 5, 6]`.

**Example 1:**

**Input:**
\["FrontMiddleBackQueue", "pushFront", "pushBack", "pushMiddle", "pushMiddle", "popFront", "popMiddle", "popMiddle", "popBack", "popFront"\]
\[\[\], \[1\], \[2\], \[3\], \[4\], \[\], \[\], \[\], \[\], \[\]\]
**Output:**
\[null, null, null, null, null, 1, 3, 4, 2, -1\]

**Explanation:**
FrontMiddleBackQueue q = new FrontMiddleBackQueue();
q.pushFront(1);   // \[1\]
q.pushBack(2);    // \[1, 2\]
q.pushMiddle(3);  // \[1, 3, 2\]
q.pushMiddle(4);  // \[1, 4, 3, 2\]
q.popFront();     // return 1 -> \[4, 3, 2\]
q.popMiddle();    // return 3 -> \[4, 2\]
q.popMiddle();    // return 4 -> \[2\]
q.popBack();      // return 2 -> \[\]
q.popFront();     // return -1 -> \[\] (The queue is empty)

**Constraints:**

*   `1 <= val <= 109`
*   At most `1000` calls will be made to `pushFront`, `pushMiddle`, `pushBack`, `popFront`, `popMiddle`, and `popBack`.

## Code 

Time Complexity: $O(1)$, Space Complexity: $O(N)$

- [C++ std::list](https://cplusplus.com/reference/list/list/)

```cpp
class FrontMiddleBackQueue {
    list<int> List;
    list<int>::iterator mid;
    int n = 0;
public:
    FrontMiddleBackQueue() {
        
    }
    
    void pushFront(int val) {
        List.push_front(val);
        if(n == 0) {
            mid = List.begin();
        } else if(n % 2 == 1) {
            mid = prev(mid);
        } 
        n++;
    }
    
    void pushMiddle(int val) {
        if(n == 0) {
            List.push_back(val);
            mid = List.begin();
        } else if(n % 2 == 0) {
            List.insert(next(mid), val);
            mid = next(mid);
        } else {
            List.insert(mid, val);
            mid = prev(mid);
        }
        n++;
    }
    
    void pushBack(int val) {
        List.push_back(val);
        if(n == 0) {
            mid = List.begin();
        } else if(n % 2 == 0) {
            mid = next(mid);
        } 
        n++;
    }
    
    int popFront() {
        if (n==0) return -1;
        int ret = List.front();

        if(n % 2 == 0) {
            mid = next(mid);
        }

        List.pop_front();
        n--;
        return ret;
    }
    
    int popMiddle() {
        if (n==0) return -1;
        int ret = *mid;
        list<int>::iterator new_mid;
        if(n % 2 == 0) {
            new_mid = next(mid);
        } else {
            new_mid = prev(mid);
        }
        List.erase(mid);
        n--;
        mid = new_mid;
        return ret;
        
    }
    
    int popBack() {
        if (n==0) return -1;
        int ret = List.back();

        if(n % 2 == 1) {
            mid = prev(mid);
        }

        List.pop_back();
        n--;
        return ret;
        
    }
};

/**
 * Your FrontMiddleBackQueue object will be instantiated and called as such:
 * FrontMiddleBackQueue* obj = new FrontMiddleBackQueue();
 * obj->pushFront(val);
 * obj->pushMiddle(val);
 * obj->pushBack(val);
 * int param_4 = obj->popFront();
 * int param_5 = obj->popMiddle();
 * int param_6 = obj->popBack();
 */
```

## Source
- [Design Front Middle Back Queue - LeetCode](https://leetcode.com/problems/design-front-middle-back-queue/description/)