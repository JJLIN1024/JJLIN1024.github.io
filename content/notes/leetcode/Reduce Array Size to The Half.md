---
title: Reduce Array Size to The Half
date: 2023-07-18
lastmod: 2023-07-18
author: Jimmy Lin
tags: ["heap"]
draft: false
---

## Description

You are given an integer array `arr`. You can choose a set of integers and remove all the occurrences of these integers in the array.

Return _the minimum size of the set so that **at least** half of the integers of the array are removed_.

**Example 1:**

**Input:** arr = \[3,3,3,3,5,5,5,2,2,7\]
**Output:** 2
**Explanation:** Choosing {3,7} will make the new array \[5,5,5,2,2\] which has size 5 (i.e equal to half of the size of the old array).
Possible sets of size 2 are {3,5},{3,2},{5,2}.
Choosing set {2,7} is not possible as it will make the new array \[3,3,3,3,5,5,5\] which has a size greater than half of the size of the old array.

**Example 2:**

**Input:** arr = \[7,7,7,7,7,7\]
**Output:** 1
**Explanation:** The only possible set you can choose is {7}. This will make the new array empty.

**Constraints:**

*   `2 <= arr.length <= 105`
*   `arr.length` is even.
*   `1 <= arr[i] <= 105`

## Code 

### Max Heap
Time Complexity: $O(n \log n)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    int minSetSize(vector<int>& arr) {
        unordered_map<int, int> mp;
        for(int i = 0; i < arr.size(); i++) {
            mp[arr[i]]++;
        }

        priority_queue<int, vector<int>> max_heap;
        for(auto it = mp.begin(); it != mp.end(); it++) {
            max_heap.push(it->second);
        }
        int count = 0;
        int res = 0;
        int n = arr.size();
        while(!max_heap.empty() && count < n / 2) {
            count += max_heap.top();
            max_heap.pop();
            res++;
        }

        return res;

    }
};
```

### Counting Sort
Time Complexity: $O(n)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    int minSetSize(vector<int>& arr) {
        unordered_map<int, int> mp;
        for(int i = 0; i < arr.size(); i++) {
            mp[arr[i]]++;
        }

        int n = arr.size();
        vector<int> fre(n + 1, 0);
        for(auto it = mp.begin(); it != mp.end(); it++) {
            fre[it->second]++;
        }

        int count = 0;
        int res = 0;
        int idx = n;
        while(count < n / 2) {
            while(fre[idx] == 0) idx--;
            res += 1;
            count += idx;
            --fre[idx];
        }

        return res;

    }
};
```

## Source
- [Reduce Array Size to The Half - LeetCode](https://leetcode.com/problems/reduce-array-size-to-the-half/description/)