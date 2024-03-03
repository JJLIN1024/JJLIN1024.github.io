---
title: Maximize the Confusion of an Exam
date: 2023-10-15
lastmod: 2023-10-15
author:
  - Jimmy Lin
tags:
  - sliding_window
  - two_pointer
draft: false
---

## Description

A teacher is writing a test with `n` true/false questions, with `'T'` denoting true and `'F'` denoting false. He wants to confuse the students by **maximizing** the number of **consecutive** questions with the **same** answer (multiple trues or multiple falses in a row).

You are given a string `answerKey`, where `answerKey[i]` is the original answer to the `ith` question. In addition, you are given an integer `k`, the maximum number of times you may perform the following operation:

*   Change the answer key for any question to `'T'` or `'F'` (i.e., set `answerKey[i]` to `'T'` or `'F'`).

Return _the **maximum** number of consecutive_ `'T'`s or `'F'`s _in the answer key after performing the operation at most_ `k` _times_.

**Example 1:**

**Input:** answerKey = "TTFF", k = 2
**Output:** 4
**Explanation:** We can replace both the 'F's with 'T's to make answerKey = "TTTT".
There are four consecutive 'T's.

**Example 2:**

**Input:** answerKey = "TFFT", k = 1
**Output:** 3
**Explanation:** We can replace the first 'T' with an 'F' to make answerKey = "FFFT".
Alternatively, we can replace the second 'T' with an 'F' to make answerKey = "TFFF".
In both cases, there are three consecutive 'F's.

**Example 3:**

**Input:** answerKey = "TTFTTFTT", k = 1
**Output:** 5
**Explanation:** We can replace the first 'F' to make answerKey = "TTTTTFTT"
Alternatively, we can replace the second 'F' to make answerKey = "TTFTTTTT". 
In both cases, there are five consecutive 'T's.

**Constraints:**

*   `n == answerKey.length`
*   `1 <= n <= 5 * 104`
*   `answerKey[i]` is either `'T'` or `'F'`
*   `1 <= k <= n`

## Code 

這題的解答可以直接套用 [[Longest Repeating Character Replacement|Longest Repeating Character Replacement]] 。

也可以從 [[Max Consecutive Ones III|Max Consecutive Ones III]] 的角度去思考。

Time Complexity: $O(n)$, Space Complexity: $O(1)$

就是 [[Max Consecutive Ones III]] 做兩遍。

```cpp
class Solution {
public:
    int maxConsecutiveAnswers(string answerKey, int k) {
        int res = 0;
        int t1 = 0, t2 = 0, f1 = 0, f2 = 0;
        for(int i_T = 0, i_F = 0, j = 0; j < answerKey.length(); j++) {
            if(answerKey[j] == 'T') {
                t1++;
                t2++;
            } else {
                f1++;
                f2++;
            }

            while(j - i_T + 1 - t1 > k) {
                if(answerKey[i_T] == 'T') {
                    t1--;
                } else {
                    f1--;
                }
                i_T++;
            }

            while(j - i_F + 1 - f2 > k) {
                if(answerKey[i_F] == 'T') {
                    t2--;
                } else {
                    f2--;
                }
                i_F++;
            }

            res = max(res, j - i_T + 1);
            res = max(res, j - i_F + 1);
        }
        return res;
    }
};
```

直接套用 [[Longest Repeating Character Replacement|Longest Repeating Character Replacement]] 。

```cpp
class Solution {
public:
    int maxConsecutiveAnswers(string s, int k) {
        vector<int> count(26, 0);
        int start = 0, maxCount = 0, res = 0;
        for(int end = 0; end < s.length(); end++) {
            count[s[end] - 'A']++;
            maxCount = max(maxCount, count[s[end] - 'A']);
            while(end - start + 1 - maxCount > k) {
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
- [Maximize the Confusion of an Exam - LeetCode](https://leetcode.com/problems/maximize-the-confusion-of-an-exam/description/)