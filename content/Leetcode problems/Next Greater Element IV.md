---
title: Next Greater Element IV
date: 2024-03-05
lastmod: 2024-03-05
author:
  - Jimmy Lin
tags:
  - stack
  - review
draft: false
sr-due: 2024-03-09
sr-interval: 3
sr-ease: 265
---

## Description

You are given a **0-indexed** array of non-negative integers `nums`. For each integer in `nums`, you must find its respective **second greater** integer.

The **second greater** integer of `nums[i]` is `nums[j]` such that:

*   `j > i`
*   `nums[j] > nums[i]`
*   There exists **exactly one** index `k` such that `nums[k] > nums[i]` and `i < k < j`.

If there is no such `nums[j]`, the second greater integer is considered to be `-1`.

*   For example, in the array `[1, 2, 4, 3]`, the second greater integer of `1` is `4`, `2` is `3`, and that of `3` and `4` is `-1`.

Return _an integer array_ `answer`_, where_ `answer[i]` _is the second greater integer of_ `nums[i]`_._

**Example 1:**

**Input:** nums = \[2,4,0,9,6\]
**Output:** \[9,6,6,-1,-1\]
**Explanation:**
0th index: 4 is the first integer greater than 2, and 9 is the second integer greater than 2, to the right of 2.
1st index: 9 is the first, and 6 is the second integer greater than 4, to the right of 4.
2nd index: 9 is the first, and 6 is the second integer greater than 0, to the right of 0.
3rd index: There is no integer greater than 9 to its right, so the second greater integer is considered to be -1.
4th index: There is no integer greater than 6 to its right, so the second greater integer is considered to be -1.
Thus, we return \[9,6,6,-1,-1\].

**Example 2:**

**Input:** nums = \[3,3\]
**Output:** \[-1,-1\]
**Explanation:**
We return \[-1,-1\] since neither integer has any integer greater than it.

**Constraints:**

*   `1 <= nums.length <= 105`
*   `0 <= nums[i] <= 109`

## Code 

### Two Stacks

based on [[Next Greater Element I]], but with some tricks learned in [[Maximum Product of Two Elements in an Array]]。

Time Complexity: $O(n)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    vector<int> secondGreaterElement(vector<int>& nums) {
        stack<int> s1, s2;
        int n = nums.size();
        vector<int> res(n, -1);

        for(int i = 0; i < n; i++) {
            while(!s2.empty() && nums[s2.top()] < nums[i]) {
                res[s2.top()] = nums[i];
                s2.pop();
            }
            
            vector<int> tmp;
            while(!s1.empty() && nums[s1.top()] < nums[i]) {
                tmp.push_back(s1.top());
                s1.pop();
            }

            while(!tmp.empty()) {
                s2.push(tmp.back());
                tmp.pop_back();
            }

            s1.push(i);
        }

        return res;

    }
};
```


### Stack + Heap

相似的 idea，不同之處在於用 heap 去找第二層關係。

```cpp
vector<int> secondGreaterElement(vector<int>& A) {
    int n = A.size();
    vector<vector<int>> mid(n, vector<int>(0));
    stack<int> stk;
    for (int i = 0; i < n; i++) {
        while (stk.size() && A[stk.top()] < A[i]) {
            mid[i].push_back(stk.top());
            stk.pop();
        }
        stk.push(i);
    }
    
    priority_queue<vector<int>> pq;
    vector<int> ans(n, -1);
    for (int i = 0; i < n; i++) {
        while(pq.size() && -pq.top()[0] < A[i]) {
            ans[pq.top()[1]] = A[i];
            pq.pop();
        }
        for (int& j: mid[i])
            pq.push({-A[j], j});
    }
    return ans;
}
```
## Source
- [Next Greater Element IV - LeetCode](https://leetcode.com/problems/next-greater-element-iv/description/)