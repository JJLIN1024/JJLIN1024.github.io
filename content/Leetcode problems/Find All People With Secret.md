---
title: Find All People With Secret
date: 2024-02-24
lastmod: 2024-02-24
author:
  - Jimmy Lin
tags:
  - union_and_find
  - graph
  - review
draft: false
sr-due: 2024-02-25
sr-interval: 1
sr-ease: 230
---

## Description

You are given an integer `n` indicating there are `n` people numbered from `0` to `n - 1`. You are also given a **0-indexed** 2D integer array `meetings` where `meetings[i] = [xi, yi, timei]` indicates that person `xi` and person `yi` have a meeting at `timei`. A person may attend **multiple meetings** at the same time. Finally, you are given an integer `firstPerson`.

Person `0` has a **secret** and initially shares the secret with a person `firstPerson` at time `0`. This secret is then shared every time a meeting takes place with a person that has the secret. More formally, for every meeting, if a person `xi` has the secret at `timei`, then they will share the secret with person `yi`, and vice versa.

The secrets are shared **instantaneously**. That is, a person may receive the secret and share it with people in other meetings within the same time frame.

Return _a list of all the people that have the secret after all the meetings have taken place._ You may return the answer in **any order**.

**Example 1:**

**Input:** n = 6, meetings = \[\[1,2,5\],\[2,3,8\],\[1,5,10\]\], firstPerson = 1
**Output:** \[0,1,2,3,5\]
**Explanation:** At time 0, person 0 shares the secret with person 1.
At time 5, person 1 shares the secret with person 2.
At time 8, person 2 shares the secret with person 3.
At time 10, person 1 shares the secret with person 5.​​​​
Thus, people 0, 1, 2, 3, and 5 know the secret after all the meetings.

**Example 2:**

**Input:** n = 4, meetings = \[\[3,1,3\],\[1,2,2\],\[0,3,3\]\], firstPerson = 3
**Output:** \[0,1,3\]
**Explanation:**
At time 0, person 0 shares the secret with person 3.
At time 2, neither person 1 nor person 2 know the secret.
At time 3, person 3 shares the secret with person 0 and person 1.
Thus, people 0, 1, and 3 know the secret after all the meetings.

**Example 3:**

**Input:** n = 5, meetings = \[\[3,4,2\],\[1,2,1\],\[2,3,1\]\], firstPerson = 1
**Output:** \[0,1,2,3,4\]
**Explanation:**
At time 0, person 0 shares the secret with person 1.
At time 1, person 1 shares the secret with person 2, and person 2 shares the secret with person 3.
Note that person 2 can share the secret at the same time as receiving it.
At time 2, person 3 shares the secret with person 4.
Thus, people 0, 1, 2, 3, and 4 know the secret after all the meetings.

**Constraints:**

*   `2 <= n <= 105`
*   `1 <= meetings.length <= 105`
*   `meetings[i].length == 3`
*   `0 <= xi, yi <= n - 1`
*   `xi != yi`
*   `1 <= timei <= 105`
*   `1 <= firstPerson <= n - 1`

## Code 

用 dfs 會有個問題：當一個 person 已經被 visited 過了，但是稍晚有其他會議使得他知道了 secret。

用 disjoint set 也需要注意，要使用 reset function，避免時間較晚的會議把兩組人連在一起後讓其中稍早開過會的人也知道了不應該知道的秘密。

Time Complexity: $O(m \log m)$, Space Complexity: $O(m)$

```cpp
class Solution {
public:
    vector<int> parent;
    void uni(int x, int y) {
        x = find(x), y = find(y);
        if(x != y) {
            parent[y] = x;
        }
    }

    int find(int x) {
        return parent[x] == x ? x : (parent[x] = find(parent[x]));
    }

    vector<int> findAllPeople(int n, vector<vector<int>>& meetings, int firstPerson) {
        parent.resize(n);
        for(int i = 0; i < n; i++) {
            parent[i] = i;
        }
        auto cmp = [](const vector<int>& m1, const vector<int>& m2){
            return m1[2] < m2[2];
        };
        meetings.push_back({0, firstPerson, 0});
        sort(meetings.begin(), meetings.end(), cmp);

        vector<int> tmp;
        int i = 0;
        while(i < meetings.size()) {
            tmp.clear();
            int curr_t = meetings[i][2];
            while(i < meetings.size() && meetings[i][2] == curr_t) {
                int p1 = meetings[i][0];
                int p2 = meetings[i][1];
                uni(p1, p2);
                tmp.push_back(p1);
                tmp.push_back(p2);
                i++;
            }
            // reset person's parent to itselt,
            // if he is not connected to 0
            for(auto p: tmp) {
                if(find(p) != find(0)) {
                    parent[p] = p;
                }
            }
        }

        vector<int> res;
        for(int i = 0; i < n; i++) {
            if(find(i) == find(0)) 
                res.push_back(i);
        }
        return res;
    }

};
```

## Source
- [Find All People With Secret - LeetCode](https://leetcode.com/problems/find-all-people-with-secret/description/?envType=daily-question&envId=2024-02-24)