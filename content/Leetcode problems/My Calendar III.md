---
title: My Calendar III
date: 2023-07-18
lastmod: 2023-07-18
author: Jimmy Lin
tags: ["difference array", "ordered map"]
draft: false
---

## Description

A `k`\-booking happens when `k` events have some non-empty intersection (i.e., there is some time that is common to all `k` events.)

You are given some events `[startTime, endTime)`, after each given event, return an integer `k` representing the maximum `k`\-booking between all the previous events.

Implement the `MyCalendarThree` class:

*   `MyCalendarThree()` Initializes the object.
*   `int book(int startTime, int endTime)` Returns an integer `k` representing the largest integer such that there exists a `k`\-booking in the calendar.

**Example 1:**

**Input**
\["MyCalendarThree", "book", "book", "book", "book", "book", "book"\]
\[\[\], \[10, 20\], \[50, 60\], \[10, 40\], \[5, 15\], \[5, 10\], \[25, 55\]\]
**Output**
\[null, 1, 1, 2, 3, 3, 3\]

**Explanation**
MyCalendarThree myCalendarThree = new MyCalendarThree();
myCalendarThree.book(10, 20); // return 1
myCalendarThree.book(50, 60); // return 1
myCalendarThree.book(10, 40); // return 2
myCalendarThree.book(5, 15); // return 3
myCalendarThree.book(5, 10); // return 3
myCalendarThree.book(25, 55); // return 3

**Constraints:**

*   `0 <= startTime < endTime <= 109`
*   At most `400` calls will be made to `book`.

## Code 

這題只是 [[My Calendar II|My Calendar II]] 的 generalization 而已。一樣使用 difference array 來解題。

Time Complexity: $O(n)$, Space Complexity: $O(n)$

```cpp
class MyCalendarThree {
    map<int, int> mp;
public:
    MyCalendarThree() {
        
    }
    
    int book(int startTime, int endTime) {
        mp[startTime]++;
        mp[endTime]--;

        int booked = 0;
        int bookMax = 0;
        for(auto it = mp.begin(); it != mp.end(); it++) {
            booked += it->second;
            bookMax = max(bookMax, booked);
        }
        return bookMax;
    }
};

/**
 * Your MyCalendarThree object will be instantiated and called as such:
 * MyCalendarThree* obj = new MyCalendarThree();
 * int param_1 = obj->book(startTime,endTime);
 */
```

## Source
- [My Calendar III - LeetCode](https://leetcode.com/problems/my-calendar-iii/description/)