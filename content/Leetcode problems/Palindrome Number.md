---
title: Palindrome Number
date: 2023-03-18
lastmod: 2023-12-30
author:
  - Jimmy Lin
tags:
  - string
  - Palindrome
draft: false
---

## Description

Given an integer `x`, return `true` _if_ `x` _is a_

_**palindrome**_

_, and_ `false` _otherwise_.

**Example 1:**

**Input:** x = 121
**Output:** true
**Explanation:** 121 reads as 121 from left to right and from right to left.

**Example 2:**

**Input:** x = -121
**Output:** false
**Explanation:** From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.

**Example 3:**

**Input:** x = 10
**Output:** false
**Explanation:** Reads 01 from right to left. Therefore it is not a palindrome.

**Constraints:**

*   `-231 <= x <= 231 - 1`

**Follow up:** Could you solve it without converting the integer to a string?

## Code 

### to_string

轉成字串再用 two pointer 比較。

```cpp
class Solution {
public:
    bool isPalindrome(int x) {
        string str_x = to_string(x);
        int l = 0, r = str_x.length() - 1;
        while(l < r) {
            if(str_x[l++] != str_x[r--]) return false;
        }

        return true;
    }
};
```

也可以 reverse 之後再跟原本的比較。

```cpp
class Solution {
public:
    bool isPalindrome(int x) {
        string str_x = to_string(x);
        reverse(str_x.begin(), str_x.end());
        return str_x == to_string(x);
    }
};
```

### Math

`rev` 為 `x` 的後半部，又因為 `while(rev < x)`，因此 `rev` 可能會比 `x` 大十倍。

要注意 edge case：`x = 10`，此時倒轉過來會是 `01`，會有 leading zero，所以要檢查 `(x % 10 == 0 && x != 0)`。

```cpp
class Solution {
public:
    bool isPalindrome(int x) {
        if(x < 0 || (x % 10 == 0 && x != 0)) return false;
        int rev = 0;
        while(rev < x) {
            rev = rev * 10 + x % 10;
            x = x / 10;
        }

        return x == rev || x == rev / 10;

    }
};
```

## Source
- [Palindrome Number - LeetCode](https://leetcode.com/problems/palindrome-number/description/)