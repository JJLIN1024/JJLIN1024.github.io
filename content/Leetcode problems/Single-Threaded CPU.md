---
title: Single-Threaded CPU
date: 2022-12-29
lastmod: 2022-12-29
author: Jimmy Lin
tags: ["Min Heap"]
draft: false
---


## Description

You are given `n`​​​​​​ tasks labeled from `0` to `n - 1` represented by a 2D integer array `tasks`, where `tasks[i] = [enqueueTimei, processingTimei]` means that the `i​​​​​​th`​​​​ task will be available to process at `enqueueTimei` and will take `processingTimei` to finish processing.

You have a single-threaded CPU that can process **at most one** task at a time and will act in the following way:

*   If the CPU is idle and there are no available tasks to process, the CPU remains idle.
*   If the CPU is idle and there are available tasks, the CPU will choose the one with the **shortest processing time**. If multiple tasks have the same shortest processing time, it will choose the task with the smallest index.
*   Once a task is started, the CPU will **process the entire task** without stopping.
*   The CPU can finish a task then start a new one instantly.

Return _the order in which the CPU will process the tasks._

**Example 1:**

**Input:** tasks = \[\[1,2\],\[2,4\],\[3,2\],\[4,1\]\]
**Output:** \[0,2,3,1\]
**Explanation:** The events go as follows: 
- At time = 1, task 0 is available to process. Available tasks = {0}.
- Also at time = 1, the idle CPU starts processing task 0. Available tasks = {}.
- At time = 2, task 1 is available to process. Available tasks = {1}.
- At time = 3, task 2 is available to process. Available tasks = {1, 2}.
- Also at time = 3, the CPU finishes task 0 and starts processing task 2 as it is the shortest. Available tasks = {1}.
- At time = 4, task 3 is available to process. Available tasks = {1, 3}.
- At time = 5, the CPU finishes task 2 and starts processing task 3 as it is the shortest. Available tasks = {1}.
- At time = 6, the CPU finishes task 3 and starts processing task 1. Available tasks = {}.
- At time = 10, the CPU finishes task 1 and becomes idle.

**Example 2:**

**Input:** tasks = \[\[7,10\],\[7,12\],\[7,5\],\[7,4\],\[7,2\]\]
**Output:** \[4,3,2,0,1\]
**Explanation****:** The events go as follows:
- At time = 7, all the tasks become available. Available tasks = {0,1,2,3,4}.
- Also at time = 7, the idle CPU starts processing task 4. Available tasks = {0,1,2,3}.
- At time = 9, the CPU finishes task 4 and starts processing task 3. Available tasks = {0,1,2}.
- At time = 13, the CPU finishes task 3 and starts processing task 2. Available tasks = {0,1}.
- At time = 18, the CPU finishes task 2 and starts processing task 0. Available tasks = {1}.
- At time = 28, the CPU finishes task 0 and starts processing task 1. Available tasks = {}.
- At time = 40, the CPU finishes task 1 and becomes idle.

**Constraints:**

*   `tasks.length == n`
*   `1 <= n <= 105`
*   `1 <= enqueueTimei, processingTimei <= 109`

## Code 

Time Complexity: $O(n \log n)$, Space Complexity: $O(n)$

關鍵在於如何 update system time：`time = tasks[pt][0];` 這一步，當 ready_queue 中沒東西時，就將 time update 成 tasks queue 中的下一個 task 的 arrival time（tasks is sorted）。這可以 handle 當執行到一半，CPU 進入 idle 時 system time 的 update，因為剛做完的這個 task 其執行時間太短，沒有涵蓋到下一個 task，因此 time 會沒有下一個 task 來幫忙更新。

```cpp
class Solution {
public:
    vector<int> getOrder(vector<vector<int>>& tasks) {
        for(int i = 0; i < tasks.size(); i++) {
            tasks[i].push_back(i);
        }
        sort(begin(tasks), end(tasks));
        
        // min heap : {execution time, index}
        priority_queue<pair<long, int>, vector<pair<long, int>>, greater<pair<long, int>>> ready_queue;
        int n = tasks.size();
        vector<int> res;

        int time = 0;
        int ptr = 0;
        int i = 0;
        while(i < n) {
            if(!ready_queue.empty()) {
                auto job = ready_queue.top();
                ready_queue.pop();
                time += job.first;
                res.push_back(job.second);
                i++;
            } else {
                time = tasks[ptr][0];
            }

            while(ptr < n && tasks[ptr][0] <= time) {
                ready_queue.push({tasks[ptr][1], tasks[ptr][2]});
                ptr++;
            }
        }
        return res;
    }
};
```

## Source
- [Single-Threaded CPU - LeetCode](https://leetcode.com/problems/single-threaded-cpu/description/)