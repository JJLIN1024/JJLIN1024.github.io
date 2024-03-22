---
title: My Calendar II
date: 2023-07-17
lastmod: 2023-07-17
author:
  - Jimmy Lin
tags:
  - difference_array
  - balanced_binary_tree
  - review
draft: false
sr-due: 2024-05-28
sr-interval: 68
sr-ease: 310
---

## Description

You are implementing a program to use as your calendar. We can add a new event if adding the event will not cause a **triple booking**.

A **triple booking** happens when three events have some non-empty intersection (i.e., some moment is common to all the three events.).

The event can be represented as a pair of integers `start` and `end` that represents a booking on the half-open interval `[start, end)`, the range of real numbers `x` such that `start <= x < end`.

Implement the `MyCalendarTwo` class:

*   `MyCalendarTwo()` Initializes the calendar object.
*   `boolean book(int start, int end)` Returns `true` if the event can be added to the calendar successfully without causing a **triple booking**. Otherwise, return `false` and do not add the event to the calendar.

**Example 1:**

**Input**
\["MyCalendarTwo", "book", "book", "book", "book", "book", "book"\]
\[\[\], \[10, 20\], \[50, 60\], \[10, 40\], \[5, 15\], \[5, 10\], \[25, 55\]\]
**Output**
\[null, true, true, true, false, true, true\]

**Explanation**
MyCalendarTwo myCalendarTwo = new MyCalendarTwo();
myCalendarTwo.book(10, 20); // return True, The event can be booked. 
myCalendarTwo.book(50, 60); // return True, The event can be booked. 
myCalendarTwo.book(10, 40); // return True, The event can be double booked. 
myCalendarTwo.book(5, 15);  // return False, The event cannot be booked, because it would result in a triple booking.
myCalendarTwo.book(5, 10); // return True, The event can be booked, as it does not use time 10 which is already double booked.
myCalendarTwo.book(25, 55); // return True, The event can be booked, as the time in \[25, 40) will be double booked with the third event, the time \[40, 50) will be single booked, and the time \[50, 55) will be double booked with the second event.

**Constraints:**

*   `0 <= start < end <= 109`
*   At most `1000` calls will be made to `book`.

## Code 

考慮：`[5 [[10 15] 20] 40]`，若有連續三個 `[` 代表有 triple booking。

Time Complexity: $O(n)$, Space Complexity: $O(n)$

```cpp
class MyCalendarTwo {
    map<int, int> mp;
public:
    MyCalendarTwo() {
        
    }
    
    bool book(int start, int end) {
        mp[start]++;
        mp[end]--;
        int booked = 0;
        for(auto it = mp.begin(); it != mp.end(); it++) {
            booked += it->second;
            if(booked == 3) {
                mp[start]--;
                mp[end]++;
                return false;
            }
        }
        return true;
    }
};

/**
 * Your MyCalendarTwo object will be instantiated and called as such:
 * MyCalendarTwo* obj = new MyCalendarTwo();
 * bool param_1 = obj->book(start,end);
 */
```

## Source
- [My Calendar II - LeetCode](https://leetcode.com/problems/my-calendar-ii/)