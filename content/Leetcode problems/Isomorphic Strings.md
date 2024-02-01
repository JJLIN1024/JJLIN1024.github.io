---
title: Isomorphic Strings
date: 2023-01-01
lastmod: 2023-01-01
author: Jimmy Lin
tags: ["hashing", "string"]
draft: false
---

## Code

其實就是 [[Word Pattern]]，code 直接複製貼上稍微改一下就 AC了。

```cpp
class Solution {
public:
    bool isIsomorphic(string s, string t) {

        if(s.size() != t.size()) return false;

        unordered_map<char, int> pti;
        unordered_map<char, int> sti;
        for(int i = 0; i < s.size(); i++) {
            if(pti[s[i]] != sti[t[i]]) return false;
            // default is 0 if key not exist!
            pti[s[i]] = i + 1;
            sti[t[i]] = i + 1;
        }

        return true;
    }
};
```

## Link
- [Isomorphic Strings](https://leetcode.com/problems/isomorphic-strings/description/)
