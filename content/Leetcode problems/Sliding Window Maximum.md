---
title: Sliding Window Maximum
date: 2023-03-13
lastmod: 2023-03-13
author:
  - Jimmy Lin
tags:
  - heap
  - deque
  - monotonic_queue
  - review
draft: false
sr-due: 2026-06-28
sr-interval: 845
sr-ease: 330
---
=
## Description

You are given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Each time the sliding window moves right by one position.

Return _the max sliding window_.

**Example 1:**

**Input:** nums = \[1,3,-1,-3,5,3,6,7\], k = 3
**Output:** \[3,3,5,5,6,7\]
**Explanation:** 
Window position                Max
---------------               -----
\[1  3  -1\] -3  5  3  6  7       **3**
 1 \[3  -1  -3\] 5  3  6  7       **3**
 1  3 \[-1  -3  5\] 3  6  7      ** 5**
 1  3  -1 \[-3  5  3\] 6  7       **5**
 1  3  -1  -3 \[5  3  6\] 7       **6**
 1  3  -1  -3  5 \[3  6  7\]      **7**

**Example 2:**

**Input:** nums = \[1\], k = 1
**Output:** \[1\]

**Constraints:**

*   `1 <= nums.length <= 105`
*   `-104 <= nums[i] <= 104`
*   `1 <= k <= nums.length`

## Code 

### map(binary search tree)
Time Complexity: $O(n \log k)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        map<int,int> m;
        vector<int> res;
        for(int i = 0; i < k; i++) {
            m[nums[i]]++;
        }

        res.push_back(m.rbegin()->first);
        for(int i = k; i < nums.size(); i++) {
            m[nums[i - k]]--;
            if(m[nums[i-k]] == 0) m.erase(nums[i-k]);

            m[nums[i]]++;
            res.push_back((*rbegin(m)).first);
        }

        return res;
    }
};
```

### Priority Queue(Max Heap)
Time Complexity: $O(n \log k)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        priority_queue<pair<int,int>> p;
        vector<int> res;
        for(int i = 0; i < k; i++) {
            p.push({nums[i], i});
        }

        res.push_back(p.top().first);
        for(int i = k; i < nums.size(); i++) {

            p.push({nums[i], i});

            while(p.top().second <= i - k) {
                p.pop();
            }

            res.push_back(p.top().first);
        }

        return res;
    }
};
```

### Deque (Monotonic Queue)
Time Complexity: $O(n)$, Space Complexity: $O(n)$

Amortized $O(n)$, 因為每一個 element 都只會被 push & pop 一次。

在此我們維持嚴格遞減的 queue（由左到右）。

```cpp
class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        deque<int> d;
        vector<int> res;
        
        for(int i = 0; i < nums.size(); i++) {
            if(!d.empty() && d.front() <= i - k) d.pop_front();
            while(!d.empty() && nums[d.back()] <= nums[i]) {
                d.pop_back();
            }
            d.push_back(i);
            if(i - k + 1 >= 0) res.push_back(nums[d.front()]);
        }

        return res;
    }
};
```

## Source
- [Sliding Window Maximum - LeetCode](https://leetcode.com/problems/sliding-window-maximum/description/)