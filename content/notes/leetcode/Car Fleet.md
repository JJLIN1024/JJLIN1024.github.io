---
title: Car Fleet
date: 2024-01-09
lastmod: 2024-01-09
author:
  - Jimmy Lin
tags:
  - stack
  - monotonic_stack
  - review
draft: false
sr-due: 2024-03-09
sr-interval: 45
sr-ease: 290
---

## Description

There are `n` cars going to the same destination along a one-lane road. The destination is `target` miles away.

You are given two integer array `position` and `speed`, both of length `n`, where `position[i]` is the position of the `ith` car and `speed[i]` is the speed of the `ith` car (in miles per hour).

A car can never pass another car ahead of it, but it can catch up to it and drive bumper to bumper **at the same speed**. The faster car will **slow down** to match the slower car's speed. The distance between these two cars is ignored (i.e., they are assumed to have the same position).

A **car fleet** is some non-empty set of cars driving at the same position and same speed. Note that a single car is also a car fleet.

If a car catches up to a car fleet right at the destination point, it will still be considered as one car fleet.

Return _the **number of car fleets** that will arrive at the destination_.

**Example 1:**

**Input:** target = 12, position = \[10,8,0,5,3\], speed = \[2,4,1,1,3\]
**Output:** 3
**Explanation:**
The cars starting at 10 (speed 2) and 8 (speed 4) become a fleet, meeting each other at 12.
The car starting at 0 does not catch up to any other car, so it is a fleet by itself.
The cars starting at 5 (speed 1) and 3 (speed 3) become a fleet, meeting each other at 6. The fleet moves at speed 1 until it reaches target.
Note that no other cars meet these fleets before the destination, so the answer is 3.

**Example 2:**

**Input:** target = 10, position = \[3\], speed = \[3\]
**Output:** 1
**Explanation:** There is only one car, hence there is only one fleet.

**Example 3:**

**Input:** target = 100, position = \[0,2,4\], speed = \[4,2,1\]
**Output:** 1
**Explanation:**
The cars starting at 0 (speed 4) and 2 (speed 2) become a fleet, meeting each other at 4. The fleet moves at speed 2.
Then, the fleet (speed 2) and the car starting at 4 (speed 1) become one fleet, meeting each other at 6. The fleet moves at speed 1 until it reaches target.

**Constraints:**

*   `n == position.length == speed.length`
*   `1 <= n <= 105`
*   `0 < target <= 106`
*   `0 <= position[i] < target`
*   All the values of `position` are **unique**.
*   `0 < speed[i] <= 106`

## Code 

Time Complexity: $O(n \log n)$, Space Complexity: $O(n)$

關鍵在於，在用初始位置 sort 之下，從後面看過來，只要到達終點的秒數比在你前面的人還要短，就會追上她。

這個解法精妙的地方在於，使用 `std::map`，做到在插入的同時做完 sorting。

以 Input:** target = 12, position = \[10,8,0,5,3\], speed = \[2,4,1,1,3\] 為例：

sort 完後從 -10 開始到 0 的 time 會是 `[1, 1, 7, 3, 12]`，`[1, 1]` 一組，`[7, 3]` 一組（3 和 1 會追上 7 和 1），`[12]` 一組。

```cpp
class Solution {
public:
    int carFleet(int target, vector<int>& position, vector<int>& speed) {
        map<int, double> mp;
        for(int i = 0; i < position.size(); i++) {
            mp[-position[i]] = (double)(target - position[i]) / speed[i];
        }

        int res = 0;
        double cur = 0;
        for(auto it: mp) {
            if(it.second > cur) {
                cur = it.second;
                res++;
            }
        }
        return res;
    }
};
```


### Monotonic Stack

同樣概念，可以用 monotonic stack 來解。monotonic decreasing stack 代表的就是那些會追上別人的 car，被追上的都被 pop 掉了。

```cpp
class Solution {
public:
    int carFleet(int target, vector<int>& position, vector<int>& speed) {
        vector<tuple<int, int, double>> car;
        int n = position.size();
        for(int i = 0; i < n; i++) {
            car.push_back({position[i], speed[i], (double)(target - position[i]) / (double)speed[i]});
        }   

        auto cmp = [](const tuple<int, int, double>& c1, const tuple<int, int, double>& c2){
            auto [pos1, speed1, t1] = c1;
            auto [pos2, speed2, t2] = c2;
            return pos1 < pos2;
        };

        sort(car.begin(), car.end(), cmp);

        stack<double> mono;
        for(int i = 0; i < n; i++) {
            auto [pos, speed, t] = car[i];
            while(!mono.empty() && mono.top() <= t) {
                mono.pop();
            }
            mono.push(t);
        }
        return mono.size();
    }

};
```
## Source
- [Car Fleet - LeetCode](https://leetcode.com/problems/car-fleet/description/)