---
title: Count the Number of Substrings With Dominant Ones
date: 2024-07-28
lastmod: 2024-07-28
author:
  - Jimmy Lin
tags:
  - sliding_window
draft: false
---

## Description

You are given a binary string `s`.

Return the number of

substrings

with **dominant** ones.

A string has **dominant** ones if the number of ones in the string is **greater than or equal to** the **square** of the number of zeros in the string.

**Example 1:**

**Input:** s = "00011"

**Output:** 5

**Explanation:**

The substrings with dominant ones are shown in the table below.

| i | j | s\[i..j\] | Number of Zeros | Number of Ones |
| --- | --- | --- | --- | --- |
| 3 | 3 | 1 | 0 | 1 |
| 4 | 4 | 1 | 0 | 1 |
| 2 | 3 | 01 | 1 | 1 |
| 3 | 4 | 11 | 0 | 2 |
| 2 | 4 | 011 | 1 | 2 |

**Example 2:**

**Input:** s = "101101"

**Output:** 16

**Explanation:**

The substrings with **non-dominant** ones are shown in the table below.

Since there are 21 substrings total and 5 of them have non-dominant ones, it follows that there are 16 substrings with dominant ones.

| i | j | s\[i..j\] | Number of Zeros | Number of Ones |
| --- | --- | --- | --- | --- |
| 1 | 1 | 0 | 1 | 0 |
| 4 | 4 | 0 | 1 | 0 |
| 1 | 4 | 0110 | 2 | 2 |
| 0 | 4 | 10110 | 2 | 3 |
| 1 | 5 | 01101 | 2 | 3 |

**Constraints:**

*   `1 <= s.length <= 4 * 104`
*   `s` consists only of characters `'0'` and `'1'`.

## Code 

## Prefix Sum - TLE
Time Complexity: $O(n^2)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    int numberOfSubstrings(string s) {
        int n = s.length();
        vector<int> pre_1(n + 1, 0);
        vector<int> pre_0(n + 1, 0);
        for(int i = 0; i < s.length(); i++) {
            if(s[i] == '0') {
                pre_0[i + 1]++;
            } else {
                pre_1[i + 1]++;
            }
            pre_0[i + 1] += pre_0[i];
            pre_1[i + 1] += pre_1[i];
        }

        int res = 0;
        for(int i = 0; i < n; i++) {
            for(int j = i; j < n; j++) {
                int ones = pre_1[j + 1] - pre_1[i];
                int zeros = pre_0[j + 1] - pre_0[i];
                int zeroPower = zeros * zeros;

                // pruning
                int potential_ones = (n - j);
                if(ones + potential_ones < zeroPower)
                    break;

                if(ones >= zeroPower)
                    res++;
            }
        }
        
        
        return res;
    }
};
```

## Prefix Sum with better pruning
Time Complexity: $O(n^2)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    int numberOfSubstrings(string s) {
        int n = s.length();
        vector<int> pre(n + 1, 0);
        for(int i = 0; i < s.length(); i++) {
            pre[i + 1] = pre[i + 1] + pre[i] + (s[i] == '1' ? 1 : 0);
        }

        int res = 0;
        for(int i = 0; i < n; i++) {
            for(int j = i; j < n; j++) {
                int ones = pre[j + 1] - pre[i];
                int zeros = j - i + 1 - ones;
                // early stop
                int potential_ones = (n - j);
                if(ones + potential_ones < zeros * zeros)
                    break;
                if(zeros * zeros > ones) {
                    // jump foward, we need at least (zeros * zeros) - one more ones
                    // and since we're in a for loop, j++ at the end, so -1
                    j += ((zeros * zeros) - ones - 1);
                } else {
                    // we have enough ones
                    res++;
                    int zeroMax = sqrt(ones);
                    if(zeroMax > zeros) {
                        res += (j + (zeroMax - zeros)) >= n ? (n - j - 1) : (zeroMax - zeros);
                        j += (zeroMax - zeros);
                    }
                }
            }
        }
        return res;
    }
};
```
## Sliding Window

Time Complexity: $O(n)$, Space Complexity: $O(n)$

```cpp

```
## Source
- [Count the Number of Substrings With Dominant Ones - LeetCode](https://leetcode.com/problems/count-the-number-of-substrings-with-dominant-ones/description/)