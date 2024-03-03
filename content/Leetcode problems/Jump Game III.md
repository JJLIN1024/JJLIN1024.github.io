---
title: Jump Game III
date: 2023-03-11
lastmod: 2023-03-11
author: Jimmy Lin
tags: ["DFS"]
draft: false
---

## Description

Given an array of non-negative integers `arr`, you are initially positioned at `start` index of the array. When you are at index `i`, you can jump to `i + arr[i]` or `i - arr[i]`, check if you can reach to **any** index with value 0.

Notice that you can not jump outside of the array at any time.

**Example 1:**

**Input:** arr = \[4,2,3,0,3,1,2\], start = 5
**Output:** true
**Explanation:** 
All possible ways to reach at index 3 with value 0 are: 
index 5 -> index 4 -> index 1 -> index 3 
index 5 -> index 6 -> index 4 -> index 1 -> index 3 

**Example 2:**

**Input:** arr = \[4,2,3,0,3,1,2\], start = 0
**Output:** true 
**Explanation:** One possible way to reach at index 3 with value 0 is: 
index 0 -> index 4 -> index 1 -> index 3

**Example 3:**

**Input:** arr = \[3,0,2,1,2\], start = 2
**Output:** false
**Explanation:** There is no way to reach at index 1 with value 0.

**Constraints:**

*   `1 <= arr.length <= 5 * 104`
*   `0 <= arr[i] < arr.length`
*   `0 <= start < arr.length`

## Code 

我原本自己寫的 DFS，需要用 $O(n)$ 的 `visited` 。

```cpp
class Solution {
public:
    bool canReach(vector<int>& arr, int start) {
        int n = arr.size();
        vector<int> visited(n, 0);
        return dfs(start, arr, visited);
    }

    bool dfs(int index, vector<int>& arr, vector<int>& visited) {
        if(visited[index]) return false;
        visited[index] = 1;
        if(arr[index] == 0) {
            return true;
        }
        bool left = false;
        bool right = false;
        if(index - arr[index] >= 0) left = dfs(index - arr[index], arr, visited);
        if(index + arr[index] < arr.size()) right = dfs(index + arr[index], arr, visited);
        return left || right;
    }
};
```

`lee125` 大神的解答，將 traverse 過的 element 的值設為負值，就不需要 `visited` 來檢查，且要找的值 `0` 就可以由 `!(A[i] = -A[i]` 檢查出來。

看完只能說，人的智商還是有差。

```cpp
class Solution {
public:
    bool canReach(vector<int>& A, int i) {
        return 0 <= i && i < A.size() && A[i] >= 0 && (!(A[i] = -A[i]) || canReach(A, i + A[i]) || canReach(A, i - A[i]));
    }
};
```

## Source
- [Jump Game III - LeetCode](https://leetcode.com/problems/jump-game-iii/description/)