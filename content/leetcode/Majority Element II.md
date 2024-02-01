---
title: Majority Element II
date: 2023-02-04
lastmod: 2023-02-04
author: Jimmy Lin
tags: ["hashmap"]
draft: false
---

## Description

Given an integer array of size `n`, find all elements that appear more than `⌊ n/3 ⌋` times.

**Example 1:**

**Input:** nums = \[3,2,3\]
**Output:** \[3\]

**Example 2:**

**Input:** nums = \[1\]
**Output:** \[1\]

**Example 3:**

**Input:** nums = \[1,2\]
**Output:** \[1,2\]

**Constraints:**

*   `1 <= nums.length <= 5 * 104`
*   `-109 <= nums[i] <= 109`

**Follow up:** Could you solve the problem in linear time and in `O(1)` space?

## Code 

### hashmap

解題邏輯和 [[Majority Element]] 一樣，只是多使用了 set 來 erase duplicate。

```cpp
class Solution {
public:
    vector<int> majorityElement(vector<int>& nums) {
        map<int, int> m;
        vector<int> answer;
        for(int num: nums) {
            m[num]++;
            if(m[num] > floor(nums.size() / 3)) {
                answer.push_back(num);
            }
        }
        set<int> s(answer.begin(), answer.end());
        answer.assign(s.begin(), s.end());
        return answer;
    }
};
```

### Moore Voting Algorithm

因為題目限制 majority element 個數要大於 n/3，因此刪除 vote 的對象變成三個人，即是底下 code 中 `if(mp.size() == 3)` 的由來。

可以 generalize 到限制為 n/k，使用`if(mp.size() == k)` 即可。

```cpp
class Solution {
public:
    vector<int> majorityElement(vector<int>& nums) {
        unordered_map<int, int> mp;
        for(int i = 0; i < nums.size(); i++){
            mp[nums[i]]++;
            if(mp.size() == 3) {
                for(auto it = mp.begin(); it != mp.end();) {
                    (--(it->second))? it++: it = mp.erase(it);
                }
            }
        }
        for(auto it = mp.begin(); it != mp.end(); it++) {
            it->second = 0;
        }
        for(int i = 0; i < nums.size(); i++) {
            if(mp.find(nums[i]) != mp.end()) mp[nums[i]]++;
        }
        vector<int> answer;
        int l = nums.size() / 3;
        for(auto it = mp.begin(); it != mp.end(); it++) {
            if(it->second > l) answer.push_back(it->first);
        }

        return answer;
    }
};
```

## Source
- [Majority Element II - LeetCode](https://leetcode.com/problems/majority-element-ii/description/)
- [6 lines, general case O(N) time and O(k) space](https://leetcode.com/problems/majority-element-ii/solutions/63502/6-lines-general-case-o-n-time-and-o-k-space/?orderBy=most_votes)