---
title: Longest Subsequence With Limited Sum
date: 2022-12-25
lastmod: 2022-12-25
author:
  - Jimmy Lin
tags:
  - prefix_sum
  - sliding_window
  - review
draft: false
sr-due: 2024-03-04
sr-interval: 4
sr-ease: 270
---
You are given an integer array `nums` of length `n`, and an integer array `queries` of length `m`.

Return _an array_ `answer` _of length_ `m` _where_ `answer[i]` _is the **maximum** size of a **subsequence** that you can take from_ `nums` _such that the **sum** of its elements is less than or equal to_ `queries[i]`.

A **subsequence** is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.

**Example 1:**

**Input:** nums = [4,5,2,1], queries = [3,10,21]
**Output:** [2,3,4]
**Explanation:** We answer the queries as follows:
- The subsequence [2,1] has a sum less than or equal to 3. It can be proven that 2 is the maximum size of such a subsequence, so answer[0] = 2.
- The subsequence [4,5,1] has a sum less than or equal to 10. It can be proven that 3 is the maximum size of such a subsequence, so answer[1] = 3.
- The subsequence [4,5,2,1] has a sum less than or equal to 21. It can be proven that 4 is the maximum size of such a subsequence, so answer[2] = 4.

**Example 2:**

**Input:** nums = [2,3,4,5], queries = [1]
**Output:** [0]
**Explanation:** The empty subsequence is the only subsequence that has a sum less than or equal to 1, so answer[0] = 0.

**Constraints:**

- `n == nums.length`
- `m == queries.length`
- `1 <= n, m <= 1000`
- `1 <= nums[i], queries[i] <= 106`
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

### Sliding Window

比較慢的解法。

```cpp
class Solution {
public:
    vector<int> answerQueries(vector<int>& nums, vector<int>& queries) {
        sort(nums.begin(), nums.end());
        int n = queries.size();
        vector<int> res(n, 0);
        for(int k = 0; k < queries.size(); k++) {
            int i = 0;
            int curSum = 0;
            for(int j = 0; j < nums.size(); j++) {
                curSum += nums[j];
                while(curSum > queries[k]) {
                    curSum -= nums[i];
                    i++;
                }
                if(curSum <= queries[k]) {
                    res[k] = max(res[k], j - i + 1);
                }
            }
        }
        return res;
    }
};
```
## Link
- [Longest Subsequence With Limited Sum](https://leetcode.com/problems/longest-subsequence-with-limited-sum/description/)
