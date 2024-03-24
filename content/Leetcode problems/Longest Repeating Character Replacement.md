---
title: Longest Repeating Character Replacement
date: 2023-04-19
lastmod: 2023-04-19
author: Jimmy Lin
tags:
  - sliding_window
  - two_pointer
  - review
draft: false
sr-due: 2024-10-31
sr-interval: 222
sr-ease: 290
---

## Description

You are given a string `s` and an integer `k`. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most `k` times.

Return _the length of the longest substring containing the same letter you can get after performing the above operations_.

**Example 1:**

**Input:** s = "ABAB", k = 2
**Output:** 4
**Explanation:** Replace the two 'A's with two 'B's or vice versa.

**Example 2:**

**Input:** s = "AABABBA", k = 1
**Output:** 4
**Explanation:** Replace the one 'A' in the middle with 'B' and form "AABBBBA".
The substring "BBBB" has the longest repeating letters, which is 4.

**Constraints:**

*   `1 <= s.length <= 105`
*   `s` consists of only uppercase English letters.
*   `0 <= k <= s.length`

## Code 

這題的 sliding window 在 shrink 時，不需要去確認 shrink 掉的 element 會不會影響下一個 iteration 的解，所以 `if(end - start + 1 > maxCount + k)` 不需要寫成 `while(end - start + 1 > maxCount + k) `。（因為找到的解在滑動的過程中只會增加，不可能減少）

解不會大於 `maxCount + k`。

```cpp
class Solution {
public:
    int characterReplacement(string s, int k) {
        vector<int> count(26, 0);
        int maxCount = 0, maxLength = 0;

        for(int i = 0; i < s.length(); i++) {
            count[s[i] - 'A']++;
            maxCount = max(maxCount, count[s[i] - 'A']);
            if(maxLength < maxCount + k)
                maxLength++;
            else {
                count[s[i - maxLength] - 'A']--;
            }
        }

        return maxLength;
    }
};
```

關鍵在於 `end - start + 1 - maxCount > k`。

`end - start + 1` 是目前 window大小，`maxCount` 是目前 window 中重複的 character，兩者相減就是需要替換的 character 的數量，而題目限制此數量不能大於 `k`，因此當大於 `k` 時就需要 shrink window。

Time Complexity: $O(n)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    int characterReplacement(string s, int k) {
        vector<int> count(26, 0);
        int start = 0, maxCount = 0, res = 0;
        for(int end = 0; end < s.length(); end++) {
            count[s[end] - 'A']++;
            maxCount = max(maxCount, count[s[end] - 'A']);
            if(end - start + 1 > maxCount + k) {
                count[s[start] - 'A']--;
                start++;
            }
            res = max(res, end - start + 1);
        }

        return res;
    }
};
```

## Source
- [Longest Repeating Character Replacement - LeetCode](https://leetcode.com/problems/longest-repeating-character-replacement/)