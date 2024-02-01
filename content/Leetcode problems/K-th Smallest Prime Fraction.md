---
title: K-th Smallest Prime Fraction
date: 2023-07-21
lastmod: 2023-07-21
author: Jimmy Lin
tags: ["heap", "min heap", "binary search"]
draft: false
---

## Description

You are given a sorted integer array `arr` containing `1` and **prime** numbers, where all the integers of `arr` are unique. You are also given an integer `k`.

For every `i` and `j` where `0 <= i < j < arr.length`, we consider the fraction `arr[i] / arr[j]`.

Return _the_ `kth` _smallest fraction considered_. Return your answer as an array of integers of size `2`, where `answer[0] == arr[i]` and `answer[1] == arr[j]`.

**Example 1:**

**Input:** arr = \[1,2,3,5\], k = 3
**Output:** \[2,5\]
**Explanation:** The fractions to be considered in sorted order are:
1/5, 1/3, 2/5, 1/2, 3/5, and 2/3.
The third fraction is 2/5.

**Example 2:**

**Input:** arr = \[1,7\], k = 1
**Output:** \[1,7\]

**Constraints:**

*   `2 <= arr.length <= 1000`
*   `1 <= arr[i] <= 3 * 104`
*   `arr[0] == 1`
*   `arr[i]` is a **prime** number for `i > 0`.
*   All the numbers of `arr` are **unique** and sorted in **strictly increasing** order.
*   `1 <= k <= arr.length * (arr.length - 1) / 2`

## Code 

### Min Heap
Time Complexity: $O(n^2 \log( \frac{n(n-1)}{2} - k + 1) = O(n^2 \log n)$, Space Complexity: $O( \frac{n(n-1)}{2} - k + 1) = O(n^2)$

```cpp
class Solution {
    struct cmp {
        bool operator() (const pair<double, pair<int, int>>& p1, const pair<double, pair<int, int>>& p2) {
            return p1.first > p2.first;
        }
    };
public:
    vector<int> kthSmallestPrimeFraction(vector<int>& arr, int k) {
        priority_queue<pair<double, pair<int, int>>, vector<pair<double, pair<int, int>>>, cmp> min_heap;

        // total number of elements to be pushed into heap
        int size = arr.size();
        size = size * (size - 1);
        size = size / 2;
        // size - (k - 1) = (size - k + 1) is the number of elements 
        // we want to pop out from the heap in order
        // to make the top of the heap the kth smallest prime
        // after the for loop ends

        for(int i = 0; i < arr.size(); i++) {
            for(int j = i + 1; j < arr.size(); j++) {
                min_heap.push({((double)arr[i] / (double)arr[j]), {i, j}});
                if(min_heap.size() > (size - k + 1))  {
                    min_heap.pop();
                }
                   
            }
        }
        auto res = min_heap.top();
        vector<int> ans;
        ans.push_back(arr[res.second.first]);
        ans.push_back(arr[res.second.second]);
        return ans;
    }
};
```


### Min Heap
Time Complexity: $O(\max(n, k) \log n)$, Space Complexity: $O(n)$

使用 [[Merge k Sorted Lists|Merge k Sorted Lists]] 的觀念，以 `[1, 7, 23, 29, 47]` 為例，就是以下四條 list。

```markdown
1/47  < 1/29    < 1/23 < 1/7
7/47  < 7/29    < 7/23
23/47 < 23/29
29/47
```

```cpp
class Solution {
    struct cmp {
        bool operator() (const pair<double, pair<int, int>>& p1, const pair<double, pair<int, int>>& p2) {
            return p1.first > p2.first;
        }
    };
public:
    vector<int> kthSmallestPrimeFraction(vector<int>& arr, int k) {
        priority_queue<pair<double, pair<int, int>>, vector<pair<double, pair<int, int>>>, cmp> min_heap;
        int n = arr.size();
        for(int i = 0; i < arr.size() - 1; i++) {
            min_heap.push({((double)arr[i] / (double)arr[n-1]), {i, n-1}});
        }

        for(int i = 0; i < k - 1; i++) {
            auto res = min_heap.top();
            min_heap.pop();
            int idx1 = res.second.first;
            int idx2 = res.second.second;
            if(idx2 - 1 > idx1) {
                min_heap.push({((double)arr[idx1] / (double)arr[idx2 - 1]), {idx1, idx2 - 1}});
            }
                
        }
        
        vector<int> ans;
        auto res = min_heap.top();
        ans.push_back(arr[res.second.first]);
        ans.push_back(arr[res.second.second]);
        return ans;
    }
};
```

### Binary Search

Time Complexity: $O()$, Space Complexity: $O()$

相同概念：[[Kth Smallest Element in a Sorted Matrix|Kth Smallest Element in a Sorted Matrix]]

```cpp

```

## Source
- [K-th Smallest Prime Fraction - LeetCode](https://leetcode.com/problems/k-th-smallest-prime-fraction/description/)