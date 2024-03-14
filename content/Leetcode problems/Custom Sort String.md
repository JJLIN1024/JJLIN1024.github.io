---
title: Custom Sort String
date: 2024-03-11
lastmod: 2024-03-11
author:
  - Jimmy Lin
tags:
  - sorting
  - counting_sort
draft: false
---

## Description

You are given two strings `order` and `s`. All the characters of `order` are **unique** and were sorted in some custom order previously.

Permute the characters of `s` so that they match the order that `order` was sorted. More specifically, if a character `x` occurs before a character `y` in `order`, then `x` should occur before `y` in the permuted string.

Return _any permutation of_ `s` _that satisfies this property_.

**Example 1:**

**Input:** order = "cba", s = "abcd"

**Output:** "cbad"

**Explanation:** `"a"`, `"b"`, `"c"` appear in order, so the order of `"a"`, `"b"`, `"c"` should be `"c"`, `"b"`, and `"a"`.

Since `"d"` does not appear in `order`, it can be at any position in the returned string. `"dcba"`, `"cdba"`, `"cbda"` are also valid outputs.

**Example 2:**

**Input:** order = "bcafg", s = "abcd"

**Output:** "bcad"

**Explanation:** The characters `"b"`, `"c"`, and `"a"` from `order` dictate the order for the characters in `s`. The character `"d"` in `s` does not appear in `order`, so its position is flexible.

Following the order of appearance in `order`, `"b"`, `"c"`, and `"a"` from `s` should be arranged as `"b"`, `"c"`, `"a"`. `"d"` can be placed at any position since it's not in order. The output `"bcad"` correctly follows this rule. Other arrangements like `"bacd"` or `"bcda"` would also be valid, as long as `"b"`, `"c"`, `"a"` maintain their order.

**Constraints:**

*   `1 <= order.length <= 26`
*   `1 <= s.length <= 200`
*   `order` and `s` consist of lowercase English letters.
*   All the characters of `order` are **unique**.

## Code 

類似 [[Sort Array by Increasing Frequency]]。

Time Complexity: $O(n \log n)$, Space Complexity: $O(n)$

```cpp
class Solution {
  public:
    string customSortString(string S, string T) {
        unordered_map<char, int> dir;
        for (int i = 0; i < S.size(); i++) {
            dir[S[i]] = i + 1;
        }
        sort(T.begin(), T.end(),
             [&](char a, char b) { return dir[a] < dir[b]; });
        return T;
    }
};
```


可以做到 $O(n)$，使用 counting sort。

```cpp
class Solution {
public:
    string customSortString(string order, string s) {
        unordered_map<char, int> mp;
        for(int i = 0; i < order.length(); i++) {
            mp[order[i]] = i;
        }

        vector<int> count(order.length(), 0);
		// partition
        int i = 0, j = s.length() - 1;
        while(i <= j) {
            while(i <= j && mp.find(s[i]) != mp.end()) {
                count[mp[s[i]]]++;
                i++;
            }
            while(i <= j && mp.find(s[i]) == mp.end()) {
                swap(s[i], s[j]);
                j--;
            }
        }

        int end = accumulate(count.begin(), count.end(), 0) - 1;

		// counting sort
        for(int i = count.size() - 1; i >= 0; i--) {
            while(count[i] > 0) {
                s[end] = order[i];
                count[i]--;
                end--;
            }
        }   

        return s;
    }
};
```


## Source
- [Custom Sort String - LeetCode](https://leetcode.com/problems/custom-sort-string/description/?envType=daily-question&envId=2024-03-11)