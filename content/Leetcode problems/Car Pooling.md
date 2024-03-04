---
title: Car Pooling
date: 2023-07-18
lastmod: 2023-07-18
author:
  - Jimmy Lin
tags:
  - difference_array
draft: false
---

## Description

There is a car with `capacity` empty seats. The vehicle only drives east (i.e., it cannot turn around and drive west).

You are given the integer `capacity` and an array `trips` where `trips[i] = [numPassengersi, fromi, toi]` indicates that the `ith` trip has `numPassengersi` passengers and the locations to pick them up and drop them off are `fromi` and `toi` respectively. The locations are given as the number of kilometers due east from the car's initial location.

Return `true` _if it is possible to pick up and drop off all passengers for all the given trips, or_ `false` _otherwise_.

**Example 1:**

**Input:** trips = \[\[2,1,5\],\[3,3,7\]\], capacity = 4
**Output:** false

**Example 2:**

**Input:** trips = \[\[2,1,5\],\[3,3,7\]\], capacity = 5
**Output:** true

**Constraints:**

*   `1 <= trips.length <= 1000`
*   `trips[i].length == 3`
*   `1 <= numPassengersi <= 100`
*   `0 <= fromi < toi <= 1000`
*   `1 <= capacity <= 105`

## Code 

同 [[My Calendar III|My Calendar III]]。

Time Complexity: $O(n \log n)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    map<int, int> mp;
    bool carPooling(vector<vector<int>>& trips, int capacity) {
        
        for(auto& trip: trips) {
            mp[trip[1]] += trip[0];
            mp[trip[2]] -= trip[0];
        }

        int passenger = 0;
        int maxPassenger = 0;
        for(auto it = mp.begin(); it != mp.end(); it++) {
            passenger += it->second;
            if(passenger > capacity) return false;
        }

        return true;

    }
};
```

其實不需要用到 `map`，因為不需要考慮要不要插入，只需要檢查，因此可以只用 array。

Time Complexity: $O(n)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    bool carPooling(vector<vector<int>>& trips, int capacity) {
        
        int passengers[1001] = {};

        for(auto& trip: trips) {
            passengers[trip[1]] += trip[0];
            passengers[trip[2]] -= trip[0];
        }

        int curPassengers = 0;
        for(int i = 0; i < 1001; i++) {
            curPassengers += passengers[i];
            if(curPassengers > capacity) return false;
        }

        return true;

    }
};
```


## Source
- [Car Pooling - LeetCode](https://leetcode.com/problems/car-pooling/description/)