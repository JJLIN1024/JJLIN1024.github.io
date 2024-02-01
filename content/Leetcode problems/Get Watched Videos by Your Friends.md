---
title: Get Watched Videos by Your Friends
date: 2023-11-01
lastmod: 2023-11-01
author:
  - Jimmy Lin
tags:
  - BFS
draft: false
---

## Description

There are `n` people, each person has a unique _id_ between `0` and `n-1`. Given the arrays `watchedVideos` and `friends`, where `watchedVideos[i]` and `friends[i]` contain the list of watched videos and the list of friends respectively for the person with `id = i`.

Level **1** of videos are all watched videos by your friends, level **2** of videos are all watched videos by the friends of your friends and so on. In general, the level `k` of videos are all watched videos by people with the shortest path **exactly** equal to `k` with you. Given your `id` and the `level` of videos, return the list of videos ordered by their frequencies (increasing). For videos with the same frequency order them alphabetically from least to greatest. 

**Example 1:**

**![](https://assets.leetcode.com/uploads/2020/01/02/leetcode_friends_1.png)**

**Input:** watchedVideos = \[\["A","B"\],\["C"\],\["B","C"\],\["D"\]\], friends = \[\[1,2\],\[0,3\],\[0,3\],\[1,2\]\], id = 0, level = 1
**Output:** \["B","C"\] 
**Explanation:** 
You have id = 0 (green color in the figure) and your friends are (yellow color in the figure):
Person with id = 1 -> watchedVideos = \["C"\] 
Person with id = 2 -> watchedVideos = \["B","C"\] 
The frequencies of watchedVideos by your friends are: 
B -> 1 
C -> 2

**Example 2:**

**![](https://assets.leetcode.com/uploads/2020/01/02/leetcode_friends_2.png)**

**Input:** watchedVideos = \[\["A","B"\],\["C"\],\["B","C"\],\["D"\]\], friends = \[\[1,2\],\[0,3\],\[0,3\],\[1,2\]\], id = 0, level = 2
**Output:** \["D"\]
**Explanation:** 
You have id = 0 (green color in the figure) and the only friend of your friends is the person with id = 3 (yellow color in the figure).

**Constraints:**

*   `n == watchedVideos.length == friends.length`
*   `2 <= n <= 100`
*   `1 <= watchedVideos[i].length <= 100`
*   `1 <= watchedVideos[i][j].length <= 8`
*   `0 <= friends[i].length < n`
*   `0 <= friends[i][j] < n`
*   `0 <= id < n`
*   `1 <= level < n`
*   if `friends[i]` contains `j`, then `friends[j]` contains `i`

## Code 

Time Complexity: $O(m + n)$, Space Complexity: $O(m + n)$

```cpp
class Solution {
public:
    vector<string> watchedVideosByFriends(vector<vector<string>>& watchedVideos, vector<vector<int>>& friends, int id, int level) {
        queue<int> q;
        vector<bool> visited(friends.size(), false);
        unordered_map<string, int> m;
        vector<pair<int, string>> p;
        vector<string> res;
        q.push(id);
        visited[id] = true;

        while(!q.empty() && level--) {

            int size = q.size();
            for(int i = 0; i < size; i++) {
                int n = q.front();
                q.pop();
                for(int j = 0; j < friends[n].size(); j++) {
                    if(!visited[friends[n][j]]) {
                        visited[friends[n][j]] = true;
                        q.push(friends[n][j]);
                    } 
                }
            }
        }

        while(!q.empty()) {
            int n = q.front();
            cout << n << endl;
            for(int i = 0; i < watchedVideos[n].size(); i++) {
                m[watchedVideos[n][i]]++;
            }
            q.pop();
        }
        
        for(auto& c: m) {
            p.push_back({c.second, c.first});
        }
        sort(p.begin(), p.end());

        
        for(int i = 0; i < p.size(); i++) {
            res.push_back(p[i].second);
        }

        return res;
        
    }

};
```

## Source
- [Get Watched Videos by Your Friends - LeetCode](https://leetcode.com/problems/get-watched-videos-by-your-friends/description/)