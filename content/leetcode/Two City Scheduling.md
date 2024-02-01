---
title: Two City Scheduling
date: 2023-07-23
lastmod: 2023-07-23
author: Jimmy Lin
tags: ["greedy"]
draft: false
---

## Description

A company is planning to interview `2n` people. Given the array `costs` where `costs[i] = [aCosti, bCosti]`, the cost of flying the `ith` person to city `a` is `aCosti`, and the cost of flying the `ith` person to city `b` is `bCosti`.

Return _the minimum cost to fly every person to a city_ such that exactly `n` people arrive in each city.

**Example 1:**

**Input:** costs = \[\[10,20\],\[30,200\],\[400,50\],\[30,20\]\]
**Output:** 110
**Explanation:** 
The first person goes to city A for a cost of 10.
The second person goes to city A for a cost of 30.
The third person goes to city B for a cost of 50.
The fourth person goes to city B for a cost of 20.

The total minimum cost is 10 + 30 + 50 + 20 = 110 to have half the people interviewing in each city.

**Example 2:**

**Input:** costs = \[\[259,770\],\[448,54\],\[926,667\],\[184,139\],\[840,118\],\[577,469\]\]
**Output:** 1859

**Example 3:**

**Input:** costs = \[\[515,563\],\[451,713\],\[537,709\],\[343,819\],\[855,779\],\[457,60\],\[650,359\],\[631,42\]\]
**Output:** 3086

**Constraints:**

*   `2 * n == costs.length`
*   `2 <= costs.length <= 100`
*   `costs.length` is even.
*   `1 <= aCosti, bCosti <= 1000`

## Code 

Time Complexity: $O(n \log n)$, Space Complexity: $O(n)$

`diff` 是 assign 人到兩個城市的差。

```markdown
The problem is to send n persons to city A 
and n persons to city B with minimum cost.

The idea is to send each person to city A.
costs = [[10,20],[30,200],[400,50],[30,20]]

So, totalCost = 10 + 30 + 400 + 30 = 470

Now, we need to send n persons to city B.
Which persons do we need to send city B?

Here, we need to minimize the cost.
We have already paid money to go to city A.
So, Send the persons to city B who get more refund
so that our cost will be minimized.

So, maintain refunds of each person
refund[i] = cost[i][1] - cost[i][0]

So, refunds of each person
    refund = [10, 170, -350, -10]

Here, refund +ve means we need to pay
             -ve means we will get refund.

So, sort the refund array.

refund = [-350, -10, 10, 170]

Now, get refund for N persons,
totalCost += 470 + -350 + -10 = 110

So, minimum cost is 110
```

```cpp
class Solution {
public:
    int twoCitySchedCost(vector<vector<int>>& costs) {
        int n = costs.size();
        vector<pair<int, int>> diff;
        for(int i = 0; i < costs.size(); i++) {
            pair<int, int> p;
            p.first = costs[i][0] - costs[i][1];
            p.second = i;
            diff.push_back(p);
        }

        sort(diff.begin(), diff.end());

        int res = 0;
        for(int i = 0; i < n / 2; i++){
            res += costs[diff[i].second][0];
        }
        for(int i = n / 2; i < n; i++){
            res += costs[diff[i].second][1];
        }

        return res;
    }
};
```

## Source
- [Two City Scheduling - LeetCode](https://leetcode.com/problems/two-city-scheduling/description/)