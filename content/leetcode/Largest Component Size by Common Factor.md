---
title: Largest Component Size by Common Factor
date: 2023-11-04
lastmod: 2023-11-04
author:
  - Jimmy Lin
tags:
  - disjoint_set
  - union_and_find
  - review
draft: false
sr-due: 2024-01-31
sr-interval: 4
sr-ease: 270
---

## Description

You are given an integer array of unique positive integers `nums`. Consider the following graph:

*   There are `nums.length` nodes, labeled `nums[0]` to `nums[nums.length - 1]`,
*   There is an undirected edge between `nums[i]` and `nums[j]` if `nums[i]` and `nums[j]` share a common factor greater than `1`.

Return _the size of the largest connected component in the graph_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2018/12/01/ex1.png)

**Input:** nums = \[4,6,15,35\]
**Output:** 4

**Example 2:**

![](https://assets.leetcode.com/uploads/2018/12/01/ex2.png)

**Input:** nums = \[20,50,9,63\]
**Output:** 2

**Example 3:**

![](https://assets.leetcode.com/uploads/2018/12/01/ex3.png)

**Input:** nums = \[2,3,6,7,4,12,21,39\]
**Output:** 8

**Constraints:**

*   `1 <= nums.length <= 2 * 104`
*   `1 <= nums[i] <= 105`
*   All the values of `nums` are **unique**.

## Code 

### Union and Find
Time Complexity: $O(n \sqrt{n})$, Space Complexity: $O(n)$

```cpp
class Solution {
    unordered_map<int, int> f;
    unordered_map<int, int> s;
public:
    int largestComponentSize(vector<int>& nums) {
        for(int i = 0; i < nums.size(); i++) {
            for(int k = 2; k <= sqrt(nums[i]); k++) {
                if(nums[i] % k == 0) {
                    uni(nums[i], k);
                    uni(nums[i], nums[i] / k);
                }
            }
        }   
        unordered_map<int, int> count;
        int res = 1;
        for(int i = 0; i < nums.size(); i++) {
            res = max(res, ++count[find(nums[i])]);
        }
        return res;
    } 

    int find(int x) {
        if(!f.count(x)) {
            f[x] = x;
            s[x] = 1;
        }
        if(f[x] != x) {
            f[x] = find(f[x]);
        }
        return f[x];
    }

    void uni(int x, int y) {
        x = find(x), y = find(y);
        if(x != y) {
            if(s[x] > s[y]) {
                f[y] = x;
                s[x] += s[y];
            } 
            else {
                f[x] = y;
                s[y] += s[x];
            }
        }
    }
    
};
```

## Source
- [Largest Component Size by Common Factor - LeetCode](https://leetcode.com/problems/largest-component-size-by-common-factor/description/)