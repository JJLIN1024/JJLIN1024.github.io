---
title: Minimum Length of String After Deleting Similar Ends
date: 2024-03-05
lastmod: 2024-03-05
author:
  - Jimmy Lin
tags:
  - string
  - greedy
draft: false
---

## Description

Given a string `s` consisting only of characters `'a'`, `'b'`, and `'c'`. You are asked to apply the following algorithm on the string any number of times:

1.  Pick a **non-empty** prefix from the string `s` where all the characters in the prefix are equal.
2.  Pick a **non-empty** suffix from the string `s` where all the characters in this suffix are equal.
3.  The prefix and the suffix should not intersect at any index.
4.  The characters from the prefix and suffix must be the same.
5.  Delete both the prefix and the suffix.

Return _the **minimum length** of_ `s` _after performing the above operation any number of times (possibly zero times)_.

**Example 1:**

**Input:** s = "ca"
**Output:** 2
**Explanation:** You can't remove any characters, so the string stays as is.

**Example 2:**

**Input:** s = "cabaabac"
**Output:** 0
**Explanation:** An optimal sequence of operations is:
- Take prefix = "c" and suffix = "c" and remove them, s = "abaaba".
- Take prefix = "a" and suffix = "a" and remove them, s = "baab".
- Take prefix = "b" and suffix = "b" and remove them, s = "aa".
- Take prefix = "a" and suffix = "a" and remove them, s = "".

**Example 3:**

**Input:** s = "aabccabba"
**Output:** 3
**Explanation:** An optimal sequence of operations is:
- Take prefix = "aa" and suffix = "a" and remove them, s = "bccabb".
- Take prefix = "b" and suffix = "bb" and remove them, s = "cca".

**Constraints:**

*   `1 <= s.length <= 105`
*   `s` only consists of characters `'a'`, `'b'`, and `'c'`.

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(1)$

注意 edge case，當左右指標移動到中間時，會有兩種 case：

1. cbc
2. caac

兩種的差別在於左指標是否和他移動過來之前的位置相等。

```cpp
class Solution {
public:
    int minimumLength(string s) {
        int l = 0, r = s.length() - 1;

        while(l < r) {
            if(s[l] != s[r])
                break;
            char cur = s[l];
            while(l < r && s[l] == cur) {
                l++;
            }
            while(l < r && s[r] == cur) {
                r--;
            }
        }

        return l > 0 && s[l - 1] == s[l] ? 0 : max(r - l + 1, 1);
    }
};
```

## Source
- [Minimum Length of String After Deleting Similar Ends - LeetCode](https://leetcode.com/problems/minimum-length-of-string-after-deleting-similar-ends/description/?envType=daily-question&envId=2024-03-05)