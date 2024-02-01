---
title: Seat Reservation Manager
date: 2023-07-20
lastmod: 2023-07-20
author: Jimmy Lin
tags: ["heap"]
draft: false
---

## Description

Design a system that manages the reservation state of `n` seats that are numbered from `1` to `n`.

Implement the `SeatManager` class:

*   `SeatManager(int n)` Initializes a `SeatManager` object that will manage `n` seats numbered from `1` to `n`. All seats are initially available.
*   `int reserve()` Fetches the **smallest-numbered** unreserved seat, reserves it, and returns its number.
*   `void unreserve(int seatNumber)` Unreserves the seat with the given `seatNumber`.

**Example 1:**

**Input**
\["SeatManager", "reserve", "reserve", "unreserve", "reserve", "reserve", "reserve", "reserve", "unreserve"\]
\[\[5\], \[\], \[\], \[2\], \[\], \[\], \[\], \[\], \[5\]\]
**Output**
\[null, 1, 2, null, 2, 3, 4, 5, null\]

**Explanation**
SeatManager seatManager = new SeatManager(5); // Initializes a SeatManager with 5 seats.
seatManager.reserve();    // All seats are available, so return the lowest numbered seat, which is 1.
seatManager.reserve();    // The available seats are \[2,3,4,5\], so return the lowest of them, which is 2.
seatManager.unreserve(2); // Unreserve seat 2, so now the available seats are \[2,3,4,5\].
seatManager.reserve();    // The available seats are \[2,3,4,5\], so return the lowest of them, which is 2.
seatManager.reserve();    // The available seats are \[3,4,5\], so return the lowest of them, which is 3.
seatManager.reserve();    // The available seats are \[4,5\], so return the lowest of them, which is 4.
seatManager.reserve();    // The only available seat is seat 5, so return 5.
seatManager.unreserve(5); // Unreserve seat 5, so now the available seats are \[5\].

**Constraints:**

*   `1 <= n <= 105`
*   `1 <= seatNumber <= n`
*   For each call to `reserve`, it is guaranteed that there will be at least one unreserved seat.
*   For each call to `unreserve`, it is guaranteed that `seatNumber` will be reserved.
*   At most `105` calls **in total** will be made to `reserve` and `unreserve`.

## Code 

### Min Heap
Time Complexity: $O(\log n)$, Space Complexity: $O(n)$

```cpp
class SeatManager {
    priority_queue<int, vector<int>, greater<int>> seats; // min heap
public:
    SeatManager(int n) {
        for(int i = 1; i <= n; i++) {
            seats.push(i);
        }
    }
    
    int reserve() {
        auto seat = seats.top();
        seats.pop();
        return seat;
    }
    
    void unreserve(int seatNumber) {
        seats.push(seatNumber);
    }
};

/**
 * Your SeatManager object will be instantiated and called as such:
 * SeatManager* obj = new SeatManager(n);
 * int param_1 = obj->reserve();
 * obj->unreserve(seatNumber);
 */
```

### Optimized Min Heap

和 [[Smallest Number in Infinite Set]] 中的解法一樣，不需要在一開始就將 $n$ 個數字都 push 到 heap 中。

```cpp
class SeatManager {
    priority_queue<int, vector<int>, greater<int>> seats; // min heap
    int min_s = 0;
public:
    SeatManager(int n) {
    }
    
    int reserve() {
        auto seat = seats.empty() ? ++min_s : seats.top();
        if(!seats.empty()) seats.pop();
        return seat;
    }
    
    void unreserve(int seatNumber) {
        seats.push(seatNumber);
    }
};

/**
 * Your SeatManager object will be instantiated and called as such:
 * SeatManager* obj = new SeatManager(n);
 * int param_1 = obj->reserve();
 * obj->unreserve(seatNumber);
 */
```



## Source
- [Seat Reservation Manager - LeetCode](https://leetcode.com/problems/seat-reservation-manager/)