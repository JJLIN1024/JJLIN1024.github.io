---
title: Gas Station
date: 2023-01-07
lastmod: 2023-01-07
author:
  - Jimmy Lin
tags:
  - greedy
  - review
draft: false
sr-due: 2024-02-28
sr-interval: 4
sr-ease: 270
---

## Description

There are `n` gas stations along a circular route, where the amount of gas at the `ith` station is `gas[i]`.

You have a car with an unlimited gas tank and it costs `cost[i]` of gas to travel from the `ith` station to its next `(i + 1)th` station. You begin the journey with an empty tank at one of the gas stations.

Given two integer arrays `gas` and `cost`, return _the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return_ `-1`. If there exists a solution, it is **guaranteed** to be **unique**

**Example 1:**

**Input:** gas = \[1,2,3,4,5\], cost = \[3,4,5,1,2\]
**Output:** 3
**Explanation:**
Start at station 3 (index 3) and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
Travel to station 4. Your tank = 4 - 1 + 5 = 8
Travel to station 0. Your tank = 8 - 2 + 1 = 7
Travel to station 1. Your tank = 7 - 3 + 2 = 6
Travel to station 2. Your tank = 6 - 4 + 3 = 5
Travel to station 3. The cost is 5. Your gas is just enough to travel back to station 3.
Therefore, return 3 as the starting index.

**Example 2:**

**Input:** gas = \[2,3,4\], cost = \[3,4,3\]
**Output:** -1
**Explanation:**
You can't start at station 0 or 1, as there is not enough gas to travel to the next station.
Let's start at station 2 and fill up with 4 unit of gas. Your tank = 0 + 4 = 4
Travel to station 0. Your tank = 4 - 3 + 2 = 3
Travel to station 1. Your tank = 3 - 3 + 3 = 3
You cannot travel back to station 2, as it requires 4 unit of gas but you only have 3.
Therefore, you can't travel around the circuit once no matter where you start.

**Constraints:**

*   `n == gas.length == cost.length`
*   `1 <= n <= 105`
*   `0 <= gas[i], cost[i] <= 104`

## Code 

Key insight:
``` 
it means that we know if we run out of fuel say at some ith gas station. All the gas station between ith and starting point are bad starting point as well.
```

-> So we take the greedy approach.

假設遇到兩個點我們都 run out of gas，那一定跑不完整圈。若可以跑得完整圈，必定只有一個斷點。

```cpp
class Solution {
public:
    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
        int n = gas.size();
        int total_surplus = 0; // it will give us a difference b/w gas & cost
        int surplus = 0; // our tank
        int start = 0; // and the index of gas station
        
        for(int i = 0; i < n; i++){
            total_surplus += gas[i] - cost[i];
            surplus += gas[i] - cost[i];
            if(surplus < 0){ // if the tank goes -ve
                surplus = 0; // reset our tank
                start = i + 1; // and update the stating gas station
            }
        }
        return (total_surplus < 0) ? -1 : start;
    }
};
```

## Source
- [Gas Station - LeetCode](https://leetcode.com/problems/gas-station/description/)