---
title: Top K Frequent Elements
date: 2023-04-05
lastmod: 2024-01-08
author:
  - Jimmy Lin
tags:
  - heap
  - min_heap
  - max_heap
  - sorting
  - bucket_sort
  - review
draft: false
sr-due: 2024-04-13
sr-interval: 73
sr-ease: 310
---

## Description

Given an integer array `nums` and an integer `k`, return _the_ `k` _most frequent elements_. You may return the answer in **any order**.

**Example 1:**

**Input:** nums = \[1,1,1,2,2,3\], k = 2
**Output:** \[1,2\]

**Example 2:**

**Input:** nums = \[1\], k = 1
**Output:** \[1\]

**Constraints:**

*   `1 <= nums.length <= 105`
*   `-104 <= nums[i] <= 104`
*   `k` is in the range `[1, the number of unique elements in the array]`.
*   It is **guaranteed** that the answer is **unique**.

**Follow up:** Your algorithm's time complexity must be better than `O(n log n)`, where n is the array's size.

## Code 

三種解法都和 [[Top K Frequent Words|Top K Frequent Words]] 的觀念一樣。
### Min Heap
Time Complexity: $O(n \log k)$, Space Complexity: $O(k)$

```cpp
class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int, int> mp;
        for(auto n: nums) {
            mp[n]++;
        }

        // min heap
        auto cmp = [](const pair<int, int>& p1, const pair<int, int>& p2) {
            return p1.second > p2.second;
        };

        priority_queue<pair<int, int>, vector<pair<int, int>>, decltype(cmp)> pq;
        for(auto it: mp) {
            pq.push({it.first, it.second});
            while(pq.size() > k) {
                pq.pop();
            }
        }

        vector<int> res;
        while(!pq.empty()) {
            auto e = pq.top();
            pq.pop();
            res.push_back(e.first);
        }

        return res;



    }
};
```

可以使用 capture by reference，就不需要 push pair 到 heap 上，只需要 push 一個 int。
```cpp
class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int, int> mp;
        for(auto n: nums) {
            mp[n]++;
        }
        auto cmp = [&](const int a, const int b) {
            return mp[a] > mp[b];
        };
        priority_queue<int, vector<int>, decltype(cmp)> pq(cmp);
        for(auto it: mp) {
            pq.push(it.first);
            while(pq.size() > k) {
                pq.pop();
            }
        }

        vector<int> res;
        while(!pq.empty()) {
            res.push_back(pq.top());
            pq.pop();
        }
        return res;
    }
};
```

### Bucket Sort
Time Complexity: $O(n)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int, int> mp;
        for(auto n: nums) {
            mp[n]++;
        }

        vector<vector<int>> bucket(nums.size() + 1);
        for(auto it: mp) {
            bucket[it.second].push_back(it.first);
        }

        vector<int> res;
        for(int i = bucket.size() - 1; i >= 0 && k > 0; i--) {
            for(auto n: bucket[i]) {
                res.push_back(n);
                k--;
                if(k == 0) break;
            }
        }   
        return res;


    }
};
```

## Source
- [Top K Frequent Elements - LeetCode](https://leetcode.com/problems/top-k-frequent-elements/description/)