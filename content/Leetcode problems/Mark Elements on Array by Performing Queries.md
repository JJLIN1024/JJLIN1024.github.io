---
title: Mark Elements on Array by Performing Queries
date: 2024-03-25
lastmod: 2024-03-25
author:
  - Jimmy Lin
tags:
  - heap
  - review
draft: false
sr-due: 2024-03-29
sr-interval: 4
sr-ease: 270
---

## Description

You are given a **0-indexed** array `nums` of size `n` consisting of positive integers.

You are also given a 2D array `queries` of size `m` where `queries[i] = [indexi, ki]`.

Initially all elements of the array are **unmarked**.

You need to apply `m` queries on the array in order, where on the `ith` query you do the following:

*   Mark the element at index `indexi` if it is not already marked.
*   Then mark `ki` unmarked elements in the array with the **smallest** values. If multiple such elements exist, mark the ones with the smallest indices. And if less than `ki` unmarked elements exist, then mark all of them.

Return _an array answer of size_ `m` _where_ `answer[i]` _is the **sum** of unmarked elements in the array after the_ `ith` _query_.

**Example 1:**

**Input:** nums = \[1,2,2,1,2,3,1\], queries = \[\[1,2\],\[3,3\],\[4,2\]\]

**Output:** \[8,3,0\]

**Explanation:**

We do the following queries on the array:

*   Mark the element at index `1`, and `2` of the smallest unmarked elements with the smallest indices if they exist, the marked elements now are `nums = [**1**,**2**,2,**1**,2,3,1]`. The sum of unmarked elements is `2 + 2 + 3 + 1 = 8`.
*   Mark the element at index `3`, since it is already marked we skip it. Then we mark `3` of the smallest unmarked elements with the smallest indices, the marked elements now are `nums = [**1**,**2**,**2**,**1**,**2**,3,**1**]`. The sum of unmarked elements is `3`.
*   Mark the element at index `4`, since it is already marked we skip it. Then we mark `2` of the smallest unmarked elements with the smallest indices if they exist, the marked elements now are `nums = [**1**,**2**,**2**,**1**,**2**,**3**,**1**]`. The sum of unmarked elements is `0`.

**Example 2:**

**Input:** nums = \[1,4,2,3\], queries = \[\[0,1\]\]

**Output:** \[7\]

**Explanation:** We do one query which is mark the element at index `0` and mark the smallest element among unmarked elements. The marked elements will be `nums = [**1**,4,**2**,3]`, and the sum of unmarked elements is `4 + 3 = 7`.

**Constraints:**

*   `n == nums.length`
*   `m == queries.length`
*   `1 <= m <= n <= 105`
*   `1 <= nums[i] <= 105`
*   `queries[i].length == 2`
*   `0 <= indexi, ki <= n - 1`

## Code 

Time Complexity: $O(n \log n)$, Space Complexity: $O(n)$

對於 `queries[i][0]` 來說，不管怎麼樣都會需要被從 totalSum 中減去。

對於 `queries[i][1]` 來說，代表需要減去除了已經被減去 `queries[i][0]` 以外的數量。

所以使用 `while(pq.size() && q[1])` ，`q[1]` 只有在 `pq` pop 出的元素並非已經處理過的 `queries[i][0], i = 0, 1, ..., nums.size() - 1` 時才會減一。

```cpp
class Solution {
public:
    vector<long long> unmarkedSumArray(vector<int>& nums, vector<vector<int>>& queries) {
       long long sum = 0;
        vector<long long> ans;
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int,int>>> pq;
        for(auto i = 0; i < nums.size(); ++i){ 
            sum += nums[i]; pq.push({nums[i], i}); 
        }

        for(auto q: queries){
            sum -= nums[q[0]];
            nums[q[0]] = 0;
            while(pq.size() && q[1]){
                if(nums[pq.top().second]){ 
                    sum -= nums[pq.top().second];  
                    nums[pq.top().second] = 0; 
                    q[1]--; 
                }
                pq.pop();
            }
            ans.push_back(sum);
        }
        return ans;
    }
};
```

## Source
- [Mark Elements on Array by Performing Queries - LeetCode](https://leetcode.com/problems/mark-elements-on-array-by-performing-queries/description/)