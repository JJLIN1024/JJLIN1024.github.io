---
title: Longest Subsequence With Limited Sum
date: 2022-12-25
lastmod: 2022-12-25
author: Jimmy Lin
tags: ["Prefix Sum", "Binary Search"]
draft: false
---

## Code

注意：subsequence 和 subarray 不一樣！subsequence 不需要是連續的。因為是 subsequence 所以可以直接 sort `nums`。

有用到 [[Search Insert Position]] 去找 query 該被插入的位置（index 即是題目所求之最大覆蓋長度）。

```cpp
class Solution {
public:
    vector<int> answerQueries(vector<int>& nums, vector<int>& queries) {
        int qSize = queries.size();
        vector<int> answer(qSize, 0);
        
        sort(nums.begin(), nums.end());
        for(int i = 1; i < nums.size(); i++) {
            nums[i] += nums[i-1];
        }
        for(int i = 0; i < queries.size(); i++) {
            answer[i] = find(nums, queries[i]);
        }
        return answer;
    }

    int find(vector<int> &nums, int query) {
        int l = 0, r = nums.size();
        while(l < r) {
            int mid = l + (r - l) / 2;
            if (nums[mid] > query) r = mid;
            else l = mid + 1;
        }
        return l;
    } 
};
```

`find` 函式可以用 `std::upper_bound` 來代替（return **大於**指定搜尋元素之 index）

```cpp
class Solution {
public:
    vector<int> answerQueries(vector<int>& nums, vector<int>& queries) {
        int qSize = queries.size();
        vector<int> answer(qSize, 0);
        
        sort(nums.begin(), nums.end());
        for(int i = 1; i < nums.size(); i++) {
            nums[i] += nums[i-1];
        }
        for(int i = 0; i < queries.size(); i++) {
            answer[i] = upper_bound(nums.begin(), nums.end(), queries[i]) - nums.begin();
        }
        return answer;
    }

};
```


## Link
- [Longest Subsequence With Limited Sum](https://leetcode.com/problems/longest-subsequence-with-limited-sum/description/)
