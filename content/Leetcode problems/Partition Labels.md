---
title: Partition Labels
date: 2024-03-01
lastmod: 2024-03-01
author:
  - Jimmy Lin
tags:
  - greedy
  - review
draft: false
sr-due: 2024-03-05
sr-interval: 4
sr-ease: 276
---

## Description

You are given a string `s`. We want to partition the string into as many parts as possible so that each letter appears in at most one part.

Note that the partition is done so that after concatenating all the parts in order, the resultant string should be `s`.

Return _a list of integers representing the size of these parts_.

**Example 1:**

**Input:** s = "ababcbacadefegdehijhklij"
**Output:** \[9,7,8\]
**Explanation:**
The partition is "ababcbaca", "defegde", "hijhklij".
This is a partition so that each letter appears in at most one part.
A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits s into less parts.

**Example 2:**

**Input:** s = "eccbbbbdec"
**Output:** \[10\]

**Constraints:**

*   `1 <= s.length <= 500`
*   `s` consists of lowercase English letters.

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(n)$

`if(maxi == i)` 代表 `i` index 位置的 char 是一段的 ending。

```cpp
class Solution {
public:
    vector<int> partitionLabels(string s) {
        unordered_map<char,int>mp;
        // filling impact of character's
        for(int i = 0; i < s.size(); i++){
            char ch = s[i];
            mp[ch] = i;
        }
        // making of result
        vector<int> res;
        int prev = -1;
        int maxi = 0;
        
        for(int i = 0; i < s.size(); i++){
            maxi = max(maxi, mp[s[i]]);
            if(maxi == i){
                // partition time
                res.push_back(maxi - prev);
                prev = maxi;
            }
        }
        return res;
    }
};
```


轉化一下 input 這題就會變成 [[Merge Intervals]]。

Time Complexity: $O(n \log n)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    vector<int> partitionLabels(string s) {
        vector<vector<int>> intervals;
        unordered_map<char, vector<int>> mp;
        for(int i = 0; i < s.length(); i++) {
            if(mp.find(s[i]) != mp.end()) {
                mp[s[i]][0] = min(mp[s[i]][0], i);
                mp[s[i]][1] = max(mp[s[i]][1], i);
            } else {
                mp[s[i]] = {i, i};
            }
        }

        for(auto it: mp) {
            intervals.push_back({it.second[0], it.second[1]});
        }

        sort(intervals.begin(), intervals.end());

        // merge intervals
        vector<vector<int>> res;
        if(!intervals.empty())
            res.push_back(intervals[0]);
        for(int i = 1; i < intervals.size(); i++) {
            if(intervals[i][0] <= res.back()[1]) {
                res.back()[0] = min(res.back()[0], intervals[i][0]);
                res.back()[1] = max(res.back()[1], intervals[i][1]);
            } else {
                res.push_back(intervals[i]);
            }
        }

        vector<int> ans;
        for(auto r: res) {
            ans.push_back(r[1] - r[0] + 1);
        }
        return ans;
    }
};
```



## Source
- [Partition Labels - LeetCode](https://leetcode.com/problems/partition-labels/description/)