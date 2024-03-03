---
title: Longest Consecutive Sequence
date: 2023-04-18
lastmod: 2024-01-08
author:
  - Jimmy Lin
tags:
  - hashmap
  - review
draft: false
sr-due: 2027-08-04
sr-interval: 1251
sr-ease: 350
---

## Description

Given an unsorted array of integers `nums`, return _the length of the longest consecutive elements sequence._

You must write an algorithm that runs in `O(n)` time.

**Example 1:**

**Input:** nums = \[100,4,200,1,3,2\]
**Output:** 4
**Explanation:** The longest consecutive elements sequence is `[1, 2, 3, 4]`. Therefore its length is 4.

**Example 2:**

**Input:** nums = \[0,3,7,2,5,8,4,6,0,1\]
**Output:** 9

**Constraints:**

*   `0 <= nums.length <= 105`
*   `-109 <= nums[i] <= 109`

## Code 

### hash table
Time Complexity: $O(n)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_set<int> s;
        for(auto n: nums) {
            s.insert(n);
        }

        int res = 0; // [] empty edge case
        for(auto n: nums) {
            if(!s.count(n - 1)) { // a start
                int cur = n;
                int streak = 0;
                while(s.count(cur)) {
                    cur++;
                    streak++;
                }

                res = max(res, streak);
            }
        }
        return res;
    }
};

```

### Union and Find: Disjoint set

```cpp
class UF {
    vector<int> _parent;
    vector<int> _size;
    public:
        UF(int size) {
            _parent.resize(size);
            _size.resize(size);
            for(int i = 0; i < size; i++) {
                _parent[i] = i;
                _size[i] = 1;
            }
        }

        int find(int x) {
            return _parent[x] = _parent[x] == x ? x : find(_parent[x]);
        }

        void join(int x, int y) {
            int p1 = find(x);
            int p2 = find(y);
            if(p1 != p2) {
                if(_size[p1] < _size[p2]) {
                    _parent[p1] = p2;
                    _size[p2] += _size[p1];
                } else {
                    _parent[p2] = p1;
                    _size[p1] += _size[p2];
                }
            }
        }

        int getMaxSize() {
            int maxSize = 0;
            for(auto s: _size) {
                maxSize = max(maxSize, s);
            }
            return maxSize;
        }
};

class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        if(!nums.size()) return 0;
        int n = nums.size();
        
        UF uf(nums.size());
        unordered_map<int, int> mp;
        for(int i = 0; i < nums.size(); i++) {
            if(mp.find(nums[i]) != mp.end()) continue;
            if(mp.find(nums[i] - 1) != mp.end()) uf.join(i, mp[nums[i] - 1]);
            if(mp.find(nums[i] + 1) != mp.end()) uf.join(i, mp[nums[i] + 1]);
            mp[nums[i]] = i;
        }

        return uf.getMaxSize();
    }

};
```


## Source
- [Longest Consecutive Sequence - LeetCode](https://leetcode.com/problems/longest-consecutive-sequence/description/)