---
title: Video Stitching
date: 2023-09-24
lastmod: 2023-09-24
author: Jimmy Lin
tags: ["dynamic programming", "greedy"]
draft: false
---

## Description

You are given a series of video clips from a sporting event that lasted `time` seconds. These video clips can be overlapping with each other and have varying lengths.

Each video clip is described by an array `clips` where `clips[i] = [starti, endi]` indicates that the ith clip started at `starti` and ended at `endi`.

We can cut these clips into segments freely.

*   For example, a clip `[0, 7]` can be cut into segments `[0, 1] + [1, 3] + [3, 7]`.

Return _the minimum number of clips needed so that we can cut the clips into segments that cover the entire sporting event_ `[0, time]`. If the task is impossible, return `-1`.

**Example 1:**

**Input:** clips = \[\[0,2\],\[4,6\],\[8,10\],\[1,9\],\[1,5\],\[5,9\]\], time = 10
**Output:** 3
**Explanation:** We take the clips \[0,2\], \[8,10\], \[1,9\]; a total of 3 clips.
Then, we can reconstruct the sporting event as follows:
We cut \[1,9\] into segments \[1,2\] + \[2,8\] + \[8,9\].
Now we have segments \[0,2\] + \[2,8\] + \[8,10\] which cover the sporting event \[0, 10\].

**Example 2:**

**Input:** clips = \[\[0,1\],\[1,2\]\], time = 5
**Output:** -1
**Explanation:** We cannot cover \[0,5\] with only \[0,1\] and \[1,2\].

**Example 3:**

**Input:** clips = \[\[0,1\],\[6,8\],\[0,2\],\[5,6\],\[0,4\],\[0,3\],\[6,7\],\[1,3\],\[4,7\],\[1,4\],\[2,5\],\[2,6\],\[3,4\],\[4,5\],\[5,7\],\[6,9\]\], time = 9
**Output:** 3
**Explanation:** We can take clips \[0,4\], \[4,7\], and \[6,9\].

**Constraints:**

*   `1 <= clips.length <= 100`
*   `0 <= starti <= endi <= 100`
*   `1 <= time <= 100`

## Code 

similar to [[Minimum Number of Taps to Open to Water a Garden|Minimum Number of Taps to Open to Water a Garden]] 、 [[Jump Game II|Jump Game II]]。

### Sorting + DP
Time Complexity: $O(N \log N + NT)$, Space Complexity: $O(T)$

要先 sort 才可以照著 clip 的順序去更新 DP，若沒有 sort，就必須像下面一個解法一樣，對每個 index 都跑過整個 clips。因為當 clip 的順序非 sorted 時，有些 clip 在後，有些在前，他們之間的交互影響必須要反應到 DP 當中。

```cpp
class Solution {
public:
    int videoStitching(vector<vector<int>>& clips, int time) {
        vector<int> dp(101, 101);

        sort(clips.begin(), clips.end());

        dp[0] = 0;

        for(auto clip: clips) {
            int start = clip[0];
            int end = clip[1];
            for(int i = start; i <= end; i++) {
                dp[i] = min(dp[i], dp[start] + 1);
            }
        }

        return dp[time] == 101 ? -1 : dp[time];
    }
};
```

### DP

Time Complexity: $O(NT)$, Space Complexity: $O(T)$

```cpp
class Solution {
public:
    int videoStitching(vector<vector<int>>& clips, int time) {
        int dp[time + 1];
        for(int i = 0; i < time + 1; i++) {
            dp[i] = time + 1;
        }

        dp[0] = 0;

        for(int i = 0; i < time + 1; i++) {
            for(auto clip: clips) {
                int start = clip[0];
                int end = clip[1];
                if(i >= start && i <= end) {
                    dp[i] = min(dp[i], dp[start] + 1);
                }
            }
        }

        return dp[time] == time + 1 ? -1 : dp[time];
    }
};
```


### Greedy

Time Complexity: $O(T)$, Space Complexity: $O(T)$

不斷更新 `end` 指標。注意初始值 `prev_end = -1, end = 0`。

當 `i > prev_end`，就要更新 `prev_end = end`，若 `i > end` 的話就不會進行此更新。

```cpp
class Solution {
public:
    int videoStitching(vector<vector<int>>& clips, int time) {
        unordered_map<int, int> maxEnd;
        for(auto clip: clips) {
            maxEnd[clip[0]] = max(maxEnd[clip[0]], clip[1]);
        }

        int prev_end = -1, end = 0, count = 0;
        for(int i = 0; i <= time; i++) {
            if(end >= time || i > end) break;
            if(maxEnd.count(i)) {
                if(i > prev_end) {
                    count++;
                    prev_end = end;
                }
                end = max(end, maxEnd[i]);
            }
        }
        return end >= time ? count : - 1;

    }
};
```
## Source
- [Video Stitching - LeetCode](https://leetcode.com/problems/video-stitching/description/)