---
title: Bulls and Cows
date: 2023-04-12
lastmod: 2023-04-12
author:
  - Jimmy Lin
tags:
  - array
  - review
draft: false
sr-due: 2024-02-01
sr-interval: 18
sr-ease: 290
---

## Description

You are playing the **[Bulls and Cows](https://en.wikipedia.org/wiki/Bulls_and_Cows)** game with your friend.

You write down a secret number and ask your friend to guess what the number is. When your friend makes a guess, you provide a hint with the following info:

*   The number of "bulls", which are digits in the guess that are in the correct position.
*   The number of "cows", which are digits in the guess that are in your secret number but are located in the wrong position. Specifically, the non-bull digits in the guess that could be rearranged such that they become bulls.

Given the secret number `secret` and your friend's guess `guess`, return _the hint for your friend's guess_.

The hint should be formatted as `"xAyB"`, where `x` is the number of bulls and `y` is the number of cows. Note that both `secret` and `guess` may contain duplicate digits.

**Example 1:**

**Input:** secret = "1807", guess = "7810"
**Output:** "1A3B"
**Explanation:** Bulls are connected with a '|' and cows are underlined:
"1807"
  |
"7810"

**Example 2:**

**Input:** secret = "1123", guess = "0111"
**Output:** "1A1B"
**Explanation:** Bulls are connected with a '|' and cows are underlined:
"1123"        "1123"
  |      or     |
"0111"        "0111"
Note that only one of the two unmatched 1s is counted as a cow since the non-bull digits can only be rearranged to allow one 1 to be a bull.

**Constraints:**

*   `1 <= secret.length, guess.length <= 1000`
*   `secret.length == guess.length`
*   `secret` and `guess` consist of digits only.

## Code 

```cpp
class Solution {
public:
    string getHint(string secret, string guess) {

        if (secret.size() != guess.size() || secret.empty()) { return "0A0B"; }

        int bulls = 0;
        int cows = 0;
        vector<int> sMap(10, 0), gMap(10, 0);

        for(int i = 0; i < secret.length(); i++) {
            if(secret[i] == guess[i]) bulls++;
            else {
                ++sMap[secret[i] - '0'];
                ++gMap[guess[i] - '0'];
            }   
        }

        for(int i = 0; i < 10; i++) {
            cows += min(sMap[i], gMap[i]);
        }

        string hint = to_string(bulls) + "A" + to_string(cows) + "B";
        return hint;
        
    }
};
```

## Source
- [Bulls and Cows - LeetCode](https://leetcode.com/problems/bulls-and-cows/description/)