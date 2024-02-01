---
title: Count Vowel Substrings of a String
date: 2023-10-16
lastmod: 2023-10-16
author:
  - Jimmy Lin
tags:
  - sliding_window
  - two_pointer
  - atMost
  - review
draft: false
sr-due: 2024-02-26
sr-interval: 26
sr-ease: 290
---

## Description

A **substring** is a contiguous (non-empty) sequence of characters within a string.

A **vowel substring** is a substring that **only** consists of vowels (`'a'`, `'e'`, `'i'`, `'o'`, and `'u'`) and has **all five** vowels present in it.

Given a string `word`, return _the number of **vowel substrings** in_ `word`.

**Example 1:**

**Input:** word = "aeiouu"
**Output:** 2
**Explanation:** The vowel substrings of word are as follows (underlined):
- "**aeiou**u"
- "**aeiouu**"

**Example 2:**

**Input:** word = "unicornarihan"
**Output:** 0
**Explanation:** Not all 5 vowels are present, so there are no vowel substrings.

**Example 3:**

**Input:** word = "cuaieuouac"
**Output:** 7
**Explanation:** The vowel substrings of word are as follows (underlined):
- "c**uaieuo**uac"
- "c**uaieuou**ac"
- "c**uaieuoua**c"
- "cu**aieuo**uac"
- "cu**aieuou**ac"
- "cu**aieuoua**c"
- "cua**ieuoua**c"

**Constraints:**

*   `1 <= word.length <= 100`
*   `word` consists of lowercase English letters only.

## Code 

### One Pass without sliding window

Time Complexity: $O(N)$, Space Complexity: $O(1)$

對於這個解法我只有佩服，沒有其他的想法。

```cpp
max(getMin(lastSeen) - last_consonant, 0);
```

當五個母音都存在時且都在 `last_consonant` 的後面時 ，`getMin(lastSeen)` 就會大於 `last_consonant`，以 `cuaieuouac` 為例：

當 iterate 到 `cuaieuo`時，五個母音都集滿了，這時  `last_consonant` 指向 `c`，而 `getMin(lastSeen)` 指向 `a`，所以 `res += 2`，因為 `uaieuo` 和 `aieuo` 都是答案。

```cpp
class Solution {
public:
    bool isVowel(char s) {
        return s == 'a' || s == 'e' || s == 'i' || s == 'o' || s == 'u';
    }

    int getMin(unordered_map<char, int>& mp) {
        int MIN = INT_MAX;
        for(auto it: mp) {
            MIN = min(MIN, it.second);
        }
        return MIN;
    }

    int countVowelSubstrings(string word) {
        unordered_map<char, int> lastSeen;
        lastSeen['a'] = -2;
        lastSeen['e'] = -2;
        lastSeen['i'] = -2;
        lastSeen['o'] = -2;
        lastSeen['u'] = -2;

        int last_consonant = -1;
        int res = 0;

        for(int i = 0; i < word.length(); i++) {
            if(!isVowel(word[i])) {
                last_consonant = i;
            } else {
                lastSeen[word[i]] = i;
                res += max(getMin(lastSeen) - last_consonant, 0);
            }
        }

        return res;
    }
};
```

### The atMost Trick

Time Complexity: $O(N)$, Space Complexity: $O(N)$

```cpp
class Solution {
public:
    bool isVowel(char s) {
        return s == 'a' || s == 'e' || s == 'i' || s == 'o' || s == 'u';
    }

    int atMost(string s, int goal) {
        int i = 0, j = 0, n = s.length();
        unordered_map<char, int> mp;
        int res = 0;
        for(; j < n; j++) {
            if(!isVowel(s[j])) {
                mp.clear();
                i = j + 1;
                continue;
            }

            mp[s[j]]++;
            while(mp.size() > goal) {
                mp[s[i]]--;
                if(mp[s[i]] == 0) mp.erase(s[i]);
                i++;
            }
            res += j - i + 1;
        }
        return res;
    }

    int countVowelSubstrings(string word) {
        return atMost(word, 5) - atMost(word, 4);
    }
};
```

## Source
- [Count Vowel Substrings of a String - LeetCode](https://leetcode.com/problems/count-vowel-substrings-of-a-string/description/)