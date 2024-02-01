---
title: Largest Palindromic Number
date: 2023-03-14
lastmod: 2024-01-04
author:
  - Jimmy Lin
tags:
  - palindrome
  - string
  - leading_zero
draft: false
---
	
## Description

You are given a string `num` consisting of digits only.

Return _the **largest palindromic** integer (in the form of a string) that can be formed using digits taken from_ `num`. It should not contain **leading zeroes**.

**Notes:**

*   You do **not** need to use all the digits of `num`, but you must use **at least** one digit.
*   The digits can be reordered.

**Example 1:**

**Input:** num = "444947137"
**Output:** "7449447"
**Explanation:** 
Use the digits "4449477" from "**44494****7**13**7**" to form the palindromic integer "7449447".
It can be shown that "7449447" is the largest palindromic integer that can be formed.

**Example 2:**

**Input:** num = "00009"
**Output:** "9"
**Explanation:** 
It can be shown that "9" is the largest palindromic integer that can be formed.
Note that the integer returned should not contain leading zeroes.

**Constraints:**

*   `1 <= num.length <= 105`
*   `num` consists of digits.

## Code 

類似 [[Longest Palindrome]] ，只是在這裡要明確的寫出 palindrome 為何，以及要考慮 leading zero 的問題。

以下兩種解法分別用不同的方法去處理 leading zero，第一種先處理，第二種是最後再做 pruning。

```cpp
// way 1
for(int i = 9; i >= 0; i--) {
	if(i == 0 && front.empty()) 
		continue;
	...
	...
}

// way 2
// pruning leading zero
int i = 0, m = res.length();
while(res[i] == '0') {
	i++;
}
if(i > 0)
	res = res.substr(i, m - 2*i);
if(i == m) return "0";       
```

```cpp
class Solution {
public:
    string largestPalindromic(string num) {
        vector<int> freq(10, 0);
        for(auto c: num) {
            freq[c - '0']++;
        }

        string front = "", back = "";
        for(int i = 9; i >= 0; i--) {
            if(i == 0 && front.empty()) 
                continue;
            while(freq[i] > 1) {
                front += to_string(i);
                back += to_string(i);
                freq[i] -= 2;
            }
        }

        for(int i = 9; i >= 0; i--) {
            if(freq[i]) {
                front += to_string(i);
                break;
            }
        }

        reverse(back.begin(), back.end());
        return front + back;
    }
};
```

```cpp
class Solution {
public:
    string largestPalindromic(string num) {
        vector<int> count(10, 0);
        for(auto n: num) {
            count[n - '0']++;
        }

        string res = "";
        int odd_max = -1;
        for(int i = 9; i >= 0; i--) {
            if(count[i]) {
                if(count[i] % 2 != 0)
                    odd_max = max(odd_max, i);
                int n_append = count[i] % 2 == 0 ? count[i] : count[i] - 1;
                n_append /= 2;
                while(n_append--)
                    res += to_string(i);
            }
        }

        string half = res;
        if(odd_max != -1) {
            res += to_string(odd_max);
        }

        reverse(half.begin(), half.end());
        res += half;

        // pruning leading zero
        int i = 0, m = res.length();
        while(res[i] == '0') {
            i++;
        }

        if(i > 0)
            res = res.substr(i, m - 2*i);
        if(i == m) return "0";

        return res;
    }
};
```
## Source
- [Largest Palindromic Number - LeetCode](https://leetcode.com/problems/largest-palindromic-number/description/)