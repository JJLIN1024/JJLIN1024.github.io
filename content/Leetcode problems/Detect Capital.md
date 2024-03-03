---
title: Detect Capital
date: 2023-01-02
lastmod: 2023-01-02
author: Jimmy Lin
tags: ["string"]
draft: false
---
We define the usage of capitals in a word to be right when one of the following cases holds:

- All letters in this word are capitals, like `"USA"`.
- All letters in this word are not capitals, like `"leetcode"`.
- Only the first letter in this word is capital, like `"Google"`.

Given a string `word`, return `true` if the usage of capitals in it is right.

**Example 1:**

**Input:** word = "USA"
**Output:** true

**Example 2:**

**Input:** word = "FlaG"
**Output:** false

**Constraints:**

- `1 <= word.length <= 100`
- `word` consists of lowercase and uppercase English letters.
## Code

```cpp
class Solution {
public:
    bool detectCapitalUse(string word) {

        if(!isupper(word[0])) {
            for(int i = 0; i < word.size(); i++) {
                if(isupper(word[i])) return false;
            }
        } else {
            if(word.size() >= 2) {
                bool capital = false;
                if(isupper(word[1])) capital = true;
                for(int i = 2; i < word.size(); i++) {
                    if(!isupper(word[i]) && capital) return false;
                    if(isupper(word[i]) && !capital) return false;
                }
            }
        }

        return true;
        
    }
};
```

將邏輯寫的更精簡，可以只分成兩個 case，第一個 case 是當開頭為小寫時，後面一定只能是小寫，第二個 case 是當開頭為大寫時，則後面一定要都是小寫或者大寫。

```cpp
class Solution {
public:
    bool detectCapitalUse(string word) {
        for(int i = 1; i < word.size(); i++){
            if(isupper(word[1]) != isupper(word[i]) || 
            islower(word[0]) && isupper(word[i])) return false;
        }        
        return true;
    }
};
```

## Link
- [Detect Capital](https://leetcode.com/problems/detect-capital/description/)
