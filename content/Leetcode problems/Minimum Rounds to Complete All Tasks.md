---
title: Minimum Rounds to Complete All Tasks
date: 2022-12-22
lastmod: 2022-12-22
author:
  - Jimmy Lin
tags:
  - hashmap
draft: false
---
You are given a **0-indexed** integer array `tasks`, where `tasks[i]` represents the difficulty level of a task. In each round, you can complete either 2 or 3 tasks of the **same difficulty level**.

Return _the **minimum** rounds required to complete all the tasks, or_ `-1` _if it is not possible to complete all the tasks._

**Example 1:**

**Input:** tasks = [2,2,3,3,2,4,4,4,4,4]
**Output:** 4
**Explanation:** To complete all the tasks, a possible plan is:
- In the first round, you complete 3 tasks of difficulty level 2. 
- In the second round, you complete 2 tasks of difficulty level 3. 
- In the third round, you complete 3 tasks of difficulty level 4. 
- In the fourth round, you complete 2 tasks of difficulty level 4.  
It can be shown that all the tasks cannot be completed in fewer than 4 rounds, so the answer is 4.

**Example 2:**

**Input:** tasks = [2,3,3]
**Output:** -1
**Explanation:** There is only 1 task of difficulty level 2, but in each round, you can only complete either 2 or 3 tasks of the same difficulty level. Hence, you cannot complete all the tasks, and the answer is -1.

**Constraints:**

- `1 <= tasks.length <= 105`
- `1 <= tasks[i] <= 109`
## Code

第一次看到這題的想法是直接用 hash table 記錄下次數，然後再計算一次做 3 個 job 最多需要幾次。

特別注意在做除法時要將 variable cast 成 float type 才會得到浮點數的計算結果。（`float div = (float)count / (float)3;`）

```cpp
class Solution {
public:
    int minimumRounds(vector<int>& tasks) {
        unordered_map<int, int> myMap;
        for(int i = 0; i < tasks.size(); i++) {
            if(myMap.find(tasks[i]) == myMap.end()) {
                myMap[tasks[i]] = 1;
            } else {
                myMap[tasks[i]] += 1;
            }
        }

        int rounds = 0;
        for(auto i: myMap) {
            int count = i.second;
            if(count < 2) return -1;
            else {
                float div = (float)count / (float)3;
                rounds += ceil(div);
            }
        }

        return rounds;
    }
};
```

### Key Insight

`(freq + 2) / 3` 就足以判斷需要多少 round，而不需要像上面那樣計算浮點數再取 ceiling。
> source: [Java/C++/Python Sum up (freq + 2) / 3](https://leetcode.com/problems/minimum-rounds-to-complete-all-tasks/solutions/1955622/java-c-python-sum-up-freq-2-3)


```cpp
class Solution {
public:
    int minimumRounds(vector<int>& tasks) {
        unordered_map<int, int> count;
        for(int t: tasks) {
            ++count[t];
        }
        int rounds = 0;
        for(auto &i: count) {
            int freq = i.second;
            if(freq < 2) return -1;
            rounds += (freq + 2) / 3;
        }
        return rounds;
    }
};
```


## Link
- [Minimum Rounds to Complete All Tasks](https://leetcode.com/problems/minimum-rounds-to-complete-all-tasks)
