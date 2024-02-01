---
title: Reward Top K Students
date: 2023-07-22
lastmod: 2023-07-22
author: Jimmy Lin
tags: ["heap", "min heap"]
draft: false
---

## Description

You are given two string arrays `positive_feedback` and `negative_feedback`, containing the words denoting positive and negative feedback, respectively. Note that **no** word is both positive and negative.

Initially every student has `0` points. Each positive word in a feedback report **increases** the points of a student by `3`, whereas each negative word **decreases** the points by `1`.

You are given `n` feedback reports, represented by a **0-indexed** string array `report` and a **0-indexed** integer array `student_id`, where `student_id[i]` represents the ID of the student who has received the feedback report `report[i]`. The ID of each student is **unique**.

Given an integer `k`, return _the top_ `k` _students after ranking them in **non-increasing** order by their points_. In case more than one student has the same points, the one with the lower ID ranks higher.

**Example 1:**

**Input:** positive\_feedback = \["smart","brilliant","studious"\], negative\_feedback = \["not"\], report = \["this student is studious","the student is smart"\], student\_id = \[1,2\], k = 2
**Output:** \[1,2\]
**Explanation:** 
Both the students have 1 positive feedback and 3 points but since student 1 has a lower ID he ranks higher.

**Example 2:**

**Input:** positive\_feedback = \["smart","brilliant","studious"\], negative\_feedback = \["not"\], report = \["this student is not studious","the student is smart"\], student\_id = \[1,2\], k = 2
**Output:** \[2,1\]
**Explanation:** 
- The student with ID 1 has 1 positive feedback and 1 negative feedback, so he has 3-1=2 points. 
- The student with ID 2 has 1 positive feedback, so he has 3 points. 
Since student 2 has more points, \[2,1\] is returned.

**Constraints:**

*   `1 <= positive_feedback.length, negative_feedback.length <= 104`
*   `1 <= positive_feedback[i].length, negative_feedback[j].length <= 100`
*   Both `positive_feedback[i]` and `negative_feedback[j]` consists of lowercase English letters.
*   No word is present in both `positive_feedback` and `negative_feedback`.
*   `n == report.length == student_id.length`
*   `1 <= n <= 104`
*   `report[i]` consists of lowercase English letters and spaces `' '`.
*   There is a single space between consecutive words of `report[i]`.
*   `1 <= report[i].length <= 100`
*   `1 <= student_id[i] <= 109`
*   All the values of `student_id[i]` are **unique**.
*   `1 <= k <= n`

## Code 

Time Complexity: $O(n \log k)$, Space Complexity: $O(k)$

```cpp
class Solution {
    struct cmp {
        bool operator() (const pair<int, int>& p1, const pair<int, int>& p2) {
            if(p1.first == p2.first)
                return p1.second < p2.second;
            return p1.first > p2.first;
        }
    };
public:
    vector<int> topStudents(vector<string>& positive_feedback, vector<string>& negative_feedback, vector<string>& report, vector<int>& student_id, int k) {
        unordered_set<string> pos, neg;
        for(auto p: positive_feedback) pos.insert(p);
        for(auto n: negative_feedback) neg.insert(n);

        priority_queue<pair<int, int>, vector<pair<int, int>>, cmp> min_heap;
        for(int i = 0; i < report.size(); i++) {
            int s = 0, e = 0, p = 0;
            while(e < report[i].size()) {
                if(report[i][e] == ' ') {
                    string word = report[i].substr(s, (e - s));
                    cout << word << " ";
                    s = e + 1;
                    if(pos.find(word) != pos.end()) p += 3;
                    if(neg.find(word) != neg.end()) p -= 1;
                }
                e++;
            }
            string word = report[i].substr(s, (e - s));
            if(pos.find(word) != pos.end()) p += 3;
            if(neg.find(word) != neg.end()) p -= 1;
            min_heap.push({p, student_id[i]});
            if(min_heap.size() > k) 
                min_heap.pop();
         }

         vector<int> res;
         while(!min_heap.empty()) {
             res.push_back(min_heap.top().second);
             min_heap.pop();
         }
         reverse(res.begin(), res.end());
         return res;
    }

};
```

## Source
- [Reward Top K Students - LeetCode](https://leetcode.com/problems/reward-top-k-students/description/)