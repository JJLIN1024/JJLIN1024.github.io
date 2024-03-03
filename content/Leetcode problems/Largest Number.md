---
title: Largest Number
date: 2023-04-21
lastmod: 2023-04-21
author:
  - Jimmy Lin
tags:
  - sorting
  - review
draft: false
sr-due: 2024-03-07
sr-interval: 4
sr-ease: 270
---

## Description

Given a list of non-negative integers `nums`, arrange them such that they form the largest number and return it.

Since the result may be very large, so you need to return a string instead of an integer.

**Example 1:**

**Input:** nums = \[10,2\]
**Output:** "210"

**Example 2:**

**Input:** nums = \[3,30,34,5,9\]
**Output:** "9534330"

**Constraints:**

*   `1 <= nums.length <= 100`
*   `0 <= nums[i] <= 109`

## Code 

要排就要先排大的，string 相加的 comparator 其實就是在做字串排序比大小了，看看誰放前面會比較大。

Edge Case：`nums = [0, 0]`

Time Complexity: $O(n \log n)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    string largestNumber(vector<int>& nums) {
        vector<string> s;
        for(auto n: nums) {
            s.push_back(to_string(n));
        }

        sort(s.begin(), s.end(), [](const string& s1, const string& s2){return s1 + s2 > s2 + s1;});

        string res = "";
        for(auto ss: s) {
            res += ss;
        }

        while(res[0] == '0' && res.length() > 1) {
            res.erase(0, 1);
        }

        return res;
    }


};
```

```cpp
class Solution {
public:
    string largestNumber(vector<int>& nums) {
        string res = "";

        sort(nums.begin(), nums.end(), [](const int a, const int b) {return (to_string(a) + to_string(b)) > (to_string(b) + to_string(a));});
        
        for(auto n: nums) {
            res += to_string(n);
        }

        while(res.length() > 1 && res[0] == '0') res.erase(res.begin());
        return res;
    }


};
```
## Source
- [Largest Number - LeetCode](https://leetcode.com/problems/largest-number/)