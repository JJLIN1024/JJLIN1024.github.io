---
title: Subarray Sums Divisible by K
date: 2024-01-15
lastmod: 2024-01-15
author: Jimmy Lin
tags:
  - prefix_sum
  - review
draft: false
sr-due: 2025-10-09
sr-interval: 588
sr-ease: 330
---

## Description

Given an integer array `nums` and an integer `k`, return _the number of non-empty **subarrays** that have a sum divisible by_ `k`.

A **subarray** is a **contiguous** part of an array.

**Example 1:**

**Input:** nums = \[4,5,0,-2,-3,1\], k = 5
**Output:** 7
**Explanation:** There are 7 subarrays with a sum divisible by k = 5:
\[4, 5, 0, -2, -3, 1\], \[5\], \[5, 0\], \[5, 0, -2, -3\], \[0\], \[0, -2, -3\], \[-2, -3\]

**Example 2:**

**Input:** nums = \[5\], k = 9
**Output:** 0

**Constraints:**

*   `1 <= nums.length <= 3 * 104`
*   `-104 <= nums[i] <= 104`
*   `2 <= k <= 104`

## Code 
### Brute Force (TLE)
Time Complexity: $O(n^2)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    int subarraysDivByK(vector<int>& nums, int k) {

        int n = nums.size();
        vector<int> prefixSum(n + 1, 0);
        prefixSum[0] = 0;
        for(int i = 1; i < prefixSum.size(); i++) {
            prefixSum[i] += prefixSum[i - 1];
            prefixSum[i] += nums[i - 1];
        }   

        int count = 0;
        for(int i = 0; i < prefixSum.size(); i++) {
            for(int j = i + 1; j < prefixSum.size(); j++) {
                int s = prefixSum[j] - prefixSum[i];
                if(s % k == 0) count++;
            }
        }

        return count;
    }
};
```
### Math

KEY: 
if $S_i \mod k = S_j \mod k$
then $(S_i - S_j) \mod k = (S_i \mod k - S_j \mod k) \mod k = 0 \mod k$

類似 [[Subarray Sum Equals K]]，code 幾乎一模一樣，只新增了 modulo 的部分。

```cpp
count += fre[remainder];
```
> 若在前面有出現兩個 remainder 相同的位置，那新的這個位置就會創造出三段符合條件的 subarray。

```cpp
if(remainder < 0) remainder += k; // modulo
```
> 因為上面的公式用到 modulo operation，所以要注意負數的計算
> Ex: [-1, -4, 5, 5], k = 2

```cpp
class Solution {
public:
    int subarraysDivByK(vector<int>& nums, int k) {
        unordered_map<int, int> mp;
        mp[0] = 1;
        int res = 0;
        for(int i = 0; i < nums.size(); i++) {
            if(i > 0) nums[i] += nums[i - 1];
            int remainder = nums[i] % k;
            if(remainder < 0) {
                remainder = remainder + k;
            }

            if(mp.find(remainder) != mp.end()) {
                res += mp[remainder];
            }
            mp[remainder]++;
        }
        return res;
    }
};
```

```cpp
class Solution {
public:
    int subarraysDivByK(vector<int>& nums, int k) {
        int count = 0;
        vector<int> fre(k, 0);
        fre[0] = 1;

        int sum = 0;
        for(int i = 0; i < nums.size(); i++) {
            sum += nums[i];
            int remainder = sum % k;
            if(remainder < 0) remainder += k; // modulo

            count += fre[remainder];
            fre[remainder]++;
        }

        return count;
    }
};
```
## Source
- [Subarray Sums Divisible by K - LeetCode](https://leetcode.com/problems/subarray-sums-divisible-by-k/description/)