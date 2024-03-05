---
title: Next Greater Element I
date: 2023-03-25
lastmod: 2023-03-25
author:
  - Jimmy Lin
tags:
  - monotonic_stack
  - review
draft: false
sr-due: 2024-11-13
sr-interval: 253
sr-ease: 330
---

## Description

The **next greater element** of some element `x` in an array is the **first greater** element that is **to the right** of `x` in the same array.

You are given two **distinct 0-indexed** integer arrays `nums1` and `nums2`, where `nums1` is a subset of `nums2`.

For each `0 <= i < nums1.length`, find the index `j` such that `nums1[i] == nums2[j]` and determine the **next greater element** of `nums2[j]` in `nums2`. If there is no next greater element, then the answer for this query is `-1`.

Return _an array_ `ans` _of length_ `nums1.length` _such that_ `ans[i]` _is the **next greater element** as described above._

**Example 1:**

**Input:** nums1 = \[4,1,2\], nums2 = \[1,3,4,2\]
**Output:** \[-1,3,-1\]
**Explanation:** The next greater element for each value of nums1 is as follows:
- 4 is underlined in nums2 = \[1,3,4,2\]. There is no next greater element, so the answer is -1.
- 1 is underlined in nums2 = \[1,3,4,2\]. The next greater element is 3.
- 2 is underlined in nums2 = \[1,3,4,2\]. There is no next greater element, so the answer is -1.

**Example 2:**

**Input:** nums1 = \[2,4\], nums2 = \[1,2,3,4\]
**Output:** \[3,-1\]
**Explanation:** The next greater element for each value of nums1 is as follows:
- 2 is underlined in nums2 = \[1,2,3,4\]. The next greater element is 3.
- 4 is underlined in nums2 = \[1,2,3,4\]. There is no next greater element, so the answer is -1.

**Constraints:**

*   `1 <= nums1.length <= nums2.length <= 1000`
*   `0 <= nums1[i], nums2[i] <= 104`
*   All integers in `nums1` and `nums2` are **unique**.
*   All the integers of `nums1` also appear in `nums2`.

**Follow up:** Could you find an `O(nums1.length + nums2.length)` solution?

## Code 

### Monotonic Stack

Time Complexity: $O(N)$, Space Complexity: $O(N)$

From left to right:
```cpp
class Solution {
public:
    vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {
        unordered_map<int, int> mp;
        stack<int> st;
        for(auto num: nums2) {
            while(!st.empty() && st.top() < num) {
                mp[st.top()] = num;
                st.pop();
            }
            st.push(num);
        }

        vector<int> answer;
        for(auto num: nums1) {
            if(mp.find(num) != mp.end()) {
                answer.push_back(mp[num]);
            } else {
                answer.push_back(-1);
            }
        }
        return answer;
    }
};
```

From right to left:
```cpp
class Solution {
public:
    vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {
        stack<int> st;
        int n2 = nums2.size();
        unordered_map<int, int> mp;
        for(int i = n2 - 1; i >= 0; i--) {
            while(!st.empty() && st.top() < nums2[i]) {
                st.pop();
            }
            if(!st.empty()) {
                mp[nums2[i]] = st.top();
            } else {
                mp[nums2[i]] = -1;
            }
            st.push(nums2[i]);
        }    

        vector<int> res;
        for(int i = 0; i < nums1.size(); i++) {
            res.push_back(mp[nums1[i]]);
        }
        return res;

    }
};
```
## Source
- [Next Greater Element I - LeetCode](https://leetcode.com/problems/next-greater-element-i/description/)