---
title: My Calendar I
date: 2023-07-17
lastmod: 2023-07-17
author: Jimmy Lin
tags: ["binary search", "ordered map", "difference array"]
draft: false
---

## Description

You are implementing a program to use as your calendar. We can add a new event if adding the event will not cause a **double booking**.

A **double booking** happens when two events have some non-empty intersection (i.e., some moment is common to both events.).

The event can be represented as a pair of integers `start` and `end` that represents a booking on the half-open interval `[start, end)`, the range of real numbers `x` such that `start <= x < end`.

Implement the `MyCalendar` class:

*   `MyCalendar()` Initializes the calendar object.
*   `boolean book(int start, int end)` Returns `true` if the event can be added to the calendar successfully without causing a **double booking**. Otherwise, return `false` and do not add the event to the calendar.

**Example 1:**

**Input**
\["MyCalendar", "book", "book", "book"\]
\[\[\], \[10, 20\], \[15, 25\], \[20, 30\]\]
**Output**
\[null, true, false, true\]

**Explanation**
MyCalendar myCalendar = new MyCalendar();
myCalendar.book(10, 20); // return True
myCalendar.book(15, 25); // return False, It can not be booked because time 15 is already booked by another event.
myCalendar.book(20, 30); // return True, The event can be booked, as the first event takes every time less than 20, but not including 20.

**Constraints:**

*   `0 <= start < end <= 109`
*   At most `1000` calls will be made to `book`.

## Code 

### Linear
Time Complexity: $O(n)$, Space Complexity: $O(n)$

```cpp
class MyCalendar {
    vector<vector<int>> books;
public:
    MyCalendar() {
        
    }
    
    bool book(int start, int end) {

        for(auto& book: books) {
            if(!(start >= book[1] || end <= book[0]))
                return false;
        }
        books.push_back({start, end});
        return true;
    }
};

/**
 * Your MyCalendar object will be instantiated and called as such:
 * MyCalendar* obj = new MyCalendar();
 * bool param_1 = obj->book(start,end);
 */
```

### Binary Search
Time Complexity: $O(n \log n)$, Space Complexity: $O(n)$

Maintain `books` in sorted order。

當要插入一個 book (start, end)，考慮其前後。

| 前 |  | book |   | 後 |   時可以插入，但是
				| book |  
		 | 前      |    |  後   |   時不可以插入，因此有兩個 case 需要檢查：
第一個是當後面的 book 和當前的有 intersection，第二個 case 是當前面的 book 和當前的有 intersection。

考慮到要插入，因此資料結構不會使用 vector，而是使用 set or map。

- [std::set::lower_bound](https://cplusplus.com/reference/set/set/lower_bound/)
- [std::map::lower_bound](https://cplusplus.com/reference/map/map/lower_bound/)

#### Set
```cpp
class MyCalendar {
    set<pair<int, int>> books;
public:
    MyCalendar() {
        
    }
    
    bool book(int start, int end) {
        auto next = books.lower_bound({start, end});
        if(next != books.end() && next->first < end) return false;
        if(next != books.begin() && (--next)->second > start) return false;
        books.insert({start, end});
        return true;
    }
};

/**
 * Your MyCalendar object will be instantiated and called as such:
 * MyCalendar* obj = new MyCalendar();
 * bool param_1 = obj->book(start,end);
 */
```

#### Map
```cpp
class MyCalendar {
    map<int, int> books;
public:
    MyCalendar() {
        
    }
    
    bool book(int start, int end) {
        auto next = books.lower_bound(start);
        if(next != books.end() && next->first < end) return false;
        if(next != books.begin() && (--next)->second > start) return false;
        books[start] = end;
        return true;
    }
};

/**
 * Your MyCalendar object will be instantiated and called as such:
 * MyCalendar* obj = new MyCalendar();
 * bool param_1 = obj->book(start,end);
 */
```


### Difference Array

和 [[My Calendar II|My Calendar II]]、[[My Calendar III|My Calendar III]] 同樣概念。

Time Complexity: $O(n)$, Space Complexity: $O(n)$

```cpp
class MyCalendar {
    map<int, int> mp;
public:
    MyCalendar() {
        
    }
    
    bool book(int start, int end) {
        mp[start]++;
        mp[end]--;
        int booked = 0;
        for(auto it = mp.begin(); it != mp.end(); it++) {
            booked += it->second();
            if(booked == 2) {
                mp[start]--;
                mp[end]++;
                return false;
            }
        }

        return true;
    }
};

/**
 * Your MyCalendar object will be instantiated and called as such:
 * MyCalendar* obj = new MyCalendar();
 * bool param_1 = obj->book(start,end);
 */
```


## Source
- [My Calendar I - LeetCode](https://leetcode.com/problems/my-calendar-i/)