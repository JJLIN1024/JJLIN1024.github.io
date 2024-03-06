---
title: Trapping Rain Water
date: 2023-10-22
lastmod: 2023-10-22
author: Jimmy Lin
tags:
  - monotonic_stack
  - two_pointer
  - review
draft: false
sr-due: 2024-08-11
sr-interval: 158
sr-ease: 290
---

## Description

Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.

**Example 1:**

![](https://assets.leetcode.com/uploads/2018/10/22/rainwatertrap.png)

**Input:** height = \[0,1,0,2,1,0,1,3,2,1,2,1\]
**Output:** 6
**Explanation:** The above elevation map (black section) is represented by array \[0,1,0,2,1,0,1,3,2,1,2,1\]. In this case, 6 units of rain water (blue section) are being trapped.

**Example 2:**

**Input:** height = \[4,2,0,3,2,5\]
**Output:** 9

**Constraints:**

*   `n == height.length`
*   `1 <= n <= 2 * 104`
*   `0 <= height[i] <= 105`

## Code 

類似 [[Largest Rectangle in Histogram|Largest Rectangle in Histogram]]、[[Maximum Score of a Good Subarray|Maximum Score of a Good Subarray]]，都有用到 `l_wall`, `r_wall` 以及 monotonic stack 的概念。

### Two Pointer
Time Complexity: $O(n)$, Space Complexity: $O(n)$

可看到兩種不同的 Wall 的計算方式，會導致 trap 的計算方式不同。

```cpp
class Solution {
public:
    int trap(vector<int>& height) {
        int n = height.size();
        vector<int> LWall(n, 0);
        vector<int> RWall(n, 0);

        int Lmax = 0, Rmax = 0;
        for(int i = 0; i < n; i++) {
            LWall[i] = Lmax;
            Lmax = max(Lmax, height[i]);
        }
        for(int i = n - 1; i >= 0; i--) {
            RWall[i] = Rmax;
            Rmax = max(Rmax, height[i]);
        }

        int trap = 0;
        for(int i = 0; i < n; i++) {
            trap += max(min(LWall[i], RWall[i]) - height[i], 0);
        }
        return trap;
    }
};

```

```cpp
class Solution {
public:
    int trap(vector<int>& height) {
        int n = height.size();
        vector<int> l_wall(n, 0), r_wall(n, 0);
        l_wall[0] = height[0];
        r_wall[n - 1] = height[n - 1];
        for(int i = 1; i < n; i++) {
            l_wall[i] = max(l_wall[i - 1], height[i]);
        }

        for(int i = n - 2; i >= 0; i--) {
            r_wall[i] = max(r_wall[i + 1], height[i]);
        }   

        int water = 0;
        for(int i = 0; i < n; i++) {
            
            int h = min(r_wall[i], l_wall[i]);
            water += h - height[i];
        }

        return water;
    }
};
```


### Monotonic Stack
Time Complexity: $O(n)$, Space Complexity: $O(n)$

To implement this we use a **stack** that store the indices **with decreasing bar height**, once we find a bar who's height is larger, then let the top of the stack be bot, the cur bar is `ir`, and the previous bar is `il`.

關鍵在於：monotonic stack 適合運用在需要尋找 `i < k < j` and `A[i] > A[k], A[k] < A[j]` 或是 `A[i] < A[k], A[k] > A[j]` 等等山坡形或是倒三角形。只要保持 stack 為嚴格遞增或是遞減即可。

code 的寫法與解題邏輯和 [[Largest Rectangle in Histogram]] 類似。都是要尋找斷點，只是在找 largest rectangle 時是在尋找左右兩邊第一個比自己矮的，而在這題當中是要尋找比自己高的，所以 monotonic stack 在前者中是 monotonic increasing，而在這題中是 monotonic decreasing。

```cpp
class Solution {
public:
    int trap(vector<int>& height) {
        int n = height.size();
        int trap = 0;
        stack<int> st;
        for(int i = 0; i < n; i++) {
            while(!st.empty() && height[st.top()] <= height[i]) {
                int h = height[st.top()]; st.pop();
                int left = st.empty() ? 0 : height[st.top()];
                int right = height[i];
                int idx = st.empty() ? -1 : st.top();
                trap += max(min(left, right) - h, 0) * (i - idx - 1);
            }
            st.push(i);
        }
        return trap;
    }
};

```
## Source
- [Trapping Rain Water - LeetCode](https://leetcode.com/problems/trapping-rain-water/description/)