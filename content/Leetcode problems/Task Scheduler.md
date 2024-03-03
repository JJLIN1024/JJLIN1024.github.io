---
title: Task Scheduler
date: 2023-04-09
lastmod: 2023-04-09
author:
  - Jimmy Lin
tags:
  - greedy
  - heap
  - review
draft: false
sr-due: 2024-03-07
sr-interval: 4
sr-ease: 270
---

## Description

Given a characters array `tasks`, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.

However, there is a non-negative integer `n` that represents the cooldown period between two **same tasks** (the same letter in the array), that is that there must be at least `n` units of time between any two same tasks.

Return _the least number of units of times that the CPU will take to finish all the given tasks_.

**Example 1:**

**Input:** tasks = \["A","A","A","B","B","B"\], n = 2
**Output:** 8
**Explanation:** 
A -> B -> idle -> A -> B -> idle -> A -> B
There is at least 2 units of time between any two same tasks.

**Example 2:**

**Input:** tasks = \["A","A","A","B","B","B"\], n = 0
**Output:** 6
**Explanation:** On this case any permutation of size 6 would work since n = 0.
\["A","A","A","B","B","B"\]
\["A","B","A","B","A","B"\]
\["B","B","B","A","A","A"\]
...
And so on.

**Example 3:**

**Input:** tasks = \["A","A","A","A","A","A","B","C","D","E","F","G"\], n = 2
**Output:** 16
**Explanation:** 
One possible solution is
A -> B -> C -> A -> D -> E -> A -> F -> G -> A -> idle -> idle -> A -> idle -> idle -> A

**Constraints:**

*   `1 <= task.length <= 104`
*   `tasks[i]` is upper-case English letter.
*   The integer `n` is in the range `[0, 100]`.

## Code 

### Greedy

Time Complexity: $O(n)$, Space Complexity: $O(1)$

觀察：因為要間隔，因此數量最多的 task 會決定總長度，其中間是要用其他 task 來填滿或是用 idle 都可以。若有相同數量的不同 task，則總長度會 +1，例如 AABB, n = 2 的情況：`ABXABXAB`，相較於只有 A 時的 `AXXAXXA`多了一。

```cpp
class Solution {
public:
    int leastInterval(vector<char>& tasks, int n) {
        unordered_map<char, int> mp;
        int maxN = 0;
        for(auto task: tasks) {
            mp[task]++;
            maxN = max(maxN, mp[task]);
        }
        // first n - 1 round
        int answer = (maxN - 1) * (n + 1);

        // final round
        for(auto it = mp.begin(); it != mp.end(); it++) {
            if(it->second == maxN) answer++;
        }

        // for case: n = 0, ex: ["A","A","A","B","B","B"] 
        return max((int)tasks.size(), answer);
    }
};
```

### Priority Queue

Time Complexity: $O(n \log n)$, Space Complexity: $O(n)$

Round Robin 的想法，因為要間隔，所以就讓 CPU 不斷地在數量最多的 task 之間切換即可。

```cpp
class Solution {
public:
    int leastInterval(vector<char>& tasks, int n) {
        unordered_map<char, int> mp;
        for(auto task: tasks) {
            mp[task]++;
        }

        priority_queue<int> pq;
        for(auto it = mp.begin(); it != mp.end(); it++) {
            pq.push(it->second);
        }

        int cycle = n + 1;
        int totalTime = 0;
        while(!pq.empty()) {
            int time = 0;
            vector<int> tmp;
            for(int i = 0; i < cycle; i++) {
                if(!pq.empty()) {
                    tmp.push_back(pq.top());
                    pq.pop();
                    time++;
                }
            }

            for(auto t: tmp) {
                if(--t) {
                    pq.push(t);
                }
            }

            totalTime += !pq.empty() ? cycle : time;
        }

        return totalTime;
    }
};
```

## Source
- [Task Scheduler - LeetCode](https://leetcode.com/problems/task-scheduler/description/)