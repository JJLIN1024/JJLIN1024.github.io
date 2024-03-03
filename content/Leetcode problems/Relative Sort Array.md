---
title: Relative Sort Array
date: 2023-12-11
lastmod: 2023-12-11
author:
  - Jimmy Lin
tags:
  - counting_sort
  - sort
  - review
draft: false
sr-due: 2024-03-07
sr-interval: 4
sr-ease: 270
---

## Description

Given two arrays `arr1` and `arr2`, the elements of `arr2` are distinct, and all elements in `arr2` are also in `arr1`.

Sort the elements of `arr1` such that the relative ordering of items in `arr1` are the same as in `arr2`. Elements that do not appear in `arr2` should be placed at the end of `arr1` in **ascending** order.

**Example 1:**

**Input:** arr1 = \[2,3,1,3,2,4,6,7,9,2,19\], arr2 = \[2,1,4,3,9,6\]
**Output:** \[2,2,2,1,4,3,3,9,6,7,19\]

**Example 2:**

**Input:** arr1 = \[28,6,22,8,44,17\], arr2 = \[22,28,8,6\]
**Output:** \[22,28,8,6,17,44\]

**Constraints:**

*   `1 <= arr1.length, arr2.length <= 1000`
*   `0 <= arr1[i], arr2[i] <= 1000`
*   All the elements of `arr2` are **distinct**.
*   Each `arr2[i]` is in `arr1`.

## Code 

Time Complexity: $O(N \log N)$, Space Complexity: $O(N)$

```cpp
class Solution {
public:
    vector<int> relativeSortArray(vector<int>& arr1, vector<int>& arr2) {
        unordered_map<int, int> mp;
        for(int i = 0; i < arr2.size(); i++)
            mp[arr2[i]] = i;
        auto cmp = [&](const int& n1, const int& n2){
            if(mp.find(n1) != mp.end() && mp.find(n2) != mp.end())
                return mp[n1] < mp[n2];
            else {
                if(mp.find(n1) == mp.end() && mp.find(n2) != mp.end()) {
                    return false;
                } else if(mp.find(n1) != mp.end() && mp.find(n2) == mp.end()) {
                    return true;
                } else {
                    return n1 < n2;
                }
            }
        };

        sort(arr1.begin(), arr1.end(), cmp);
        return arr1;
    }
};
```


使用 map 是因為不在 arr2 中的 arr1 元素需要 sort in ascending order。

```cpp
class Solution {
public:
    vector<int> relativeSortArray(vector<int>& arr1, vector<int>& arr2) {
        map<int, int> mp;
        for(auto a: arr1) {
            mp[a]++;
        }

        int index = 0;
        for(auto a: arr2) {
            while(mp[a] > 0) {
                arr1[index++] = a;
                mp[a]--;
            }
        }

        for(auto m: mp) {
            while(m.second-- > 0)
                arr1[index++] = m.first; 
        }

        return arr1;
        
    }
};


```
## Source
- [Relative Sort Array - LeetCode](https://leetcode.com/problems/relative-sort-array/description/)