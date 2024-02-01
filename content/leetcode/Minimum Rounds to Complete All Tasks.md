---
title: Minimum Rounds to Complete All Tasks
date: 2022-12-22
lastmod: 2022-12-22
author: Jimmy Lin
tags: ["Hashing", "counting"]
draft: false
---

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
