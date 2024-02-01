---
title: Replace the Substring for Balanced String
date: 2024-01-03
lastmod: 2024-01-03
author:
  - Jimmy Lin
tags:
  - sliding_window
draft: false
---

## Description

You are given a string s of length `n` containing only four kinds of characters: `'Q'`, `'W'`, `'E'`, and `'R'`.

A string is said to be **balanced** if each of its characters appears `n / 4` times where `n` is the length of the string.

Return _the minimum length of the substring that can be replaced with **any** other string of the same length to make_ `s` _**balanced**_. If s is already **balanced**, return `0`.

**Example 1:**

**Input:** s = "QWER"
**Output:** 0
**Explanation:** s is already balanced.

**Example 2:**

**Input:** s = "QQWE"
**Output:** 1
**Explanation:** We need to replace a 'Q' to 'R', so that "RQWE" (or "QRWE") is balanced.

**Example 3:**

**Input:** s = "QQQW"
**Output:** 2
**Explanation:** We can replace the first "QQ" to "ER". 

**Constraints:**

*   `n == s.length`
*   `4 <= n <= 105`
*   `n` is a multiple of `4`.
*   `s` contains only `'Q'`, `'W'`, `'E'`, and `'R'`.

## Code 

### Sliding Window
Time Complexity: $O(N)$, Space Complexity: $O(1)$

因為我們可以任意更改 sliding window 中的 element，因此只要 window 外的元素每個的總數都不超過 `n / 4`，我們就可以更改 window 中的 element 去增加其總數，使得 string 是 balanced 。但是若 window 外的某元素的個數超過 `n / 4`，我們怎麼改 window 中的 element 都無法使其總數減少，string 就無法被 balanced。

和 [[Minimum Size Subarray Sum]] 一樣，在每一輪的 sliding window 結束後，要檢查條件是否滿足（`if(count['Q'] <= k && count['W'] <= k && count['E'] <= k && count['R'] <= k) `），而非去檢查邊界條件（`j < n`），再更新解(`res`)。

```cpp
class Solution {
public:
    int balancedString(string s) {
        unordered_map<char, int> count;
        for(auto c: s) {
            count[c]++;
        }
        int n = s.length(), j = 0;
        int k = n / 4;
        int res = n;
        
        for(int i = 0; i < n; i++) {
            while(j < n && (count['Q'] > k || count['W'] > k || count['E'] > k || count['R'] > k)) {
                count[s[j]]--;
                j++;
            }
            if(count['Q'] <= k && count['W'] <= k && count['E'] <= k && count['R'] <= k) {
                res = min(res, j - i);
            }
            count[s[i]]++;
        }
        return res;
    }

};
```
```cpp
class Solution {
public:
    int balancedString(string s) {
        unordered_map<char, int> count;
        for(auto c: s) {
            count[c]++;
        }

        int n = s.length();
        int k = n / 4;
        int i = 0, res = n;
        for(int j = 0; j < n; j++) {
            count[s[j]]--;
            while(i < n && count['Q'] <= k && count['W'] <= k && count['E'] <= k && count['R'] <= k) {
                res = min(res, j - i + 1);
                count[s[i++]]++;
            }
        }
        return res;

    }

};
```

## Source
- [Replace the Substring for Balanced String - LeetCode](https://leetcode.com/problems/replace-the-substring-for-balanced-string/description/)