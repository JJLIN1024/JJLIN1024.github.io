---
title: Word Pattern
date: 2023-01-01
lastmod: 2023-01-01
author: Jimmy Lin
tags: ["hash", "string"]
draft: false
---

- C++ unordered_map
	- [What happens if I read a map's value where the key does not exist?](https://stackoverflow.com/questions/10124679/what-happens-if-i-read-a-maps-value-where-the-key-does-not-exist)
- 分割字串（空格隔開）
	- [std::istringstream](https://cplusplus.com/reference/sstream/istringstream/)
	- [C/C++ 學習筆記：istringstream、ostringstream、stringstream 類介紹 和 stringstream類 clear函數的真正用途](https://www.twblogs.net/a/5b8a17392b71775d1ce55f47)


## Code

第一次解的時候的寫法，有很多的改善空間：第一點，字串分割可以用 `istringstream`。第二點，map 可以用一個，也可以用兩個，重點是要檢查 pattern & string token 之間的一對一關係（不行多對一，也不行一對多）。
另外就是 `if(iter < pattern.size() || iter < tokens.size() ) return false;` 可以提早 check，節省時間。

```cpp
class Solution {
public:
    bool wordPattern(string pattern, string s) {
        vector<string> tokens;
        unordered_map<char, string> pts;
        unordered_map<string, char> stp;
        for(int i = 0; i < s.size(); i++) {
            string temp = "";
            while(i < s.size() && s[i] != ' ') {
                temp += s[i];
                i++;
            }
            tokens.push_back(temp);
        }

        int iter = 0;
        while(iter < pattern.size() && iter < tokens.size()) {
            if(pts.find(pattern[iter]) != pts.end()) {
                if(pts[pattern[iter]] != tokens[iter]) return false;
            } 
            if(stp.find(tokens[iter]) != stp.end()) {
                if(stp[tokens[iter]] != pattern[iter]) return false;
            } 
            stp[tokens[iter]] = pattern[iter];
            pts[pattern[iter]] = tokens[iter];
            iter++;
        }
        if(iter < pattern.size() || iter < tokens.size() ) return false;

        return true;
    }
};
```

使用 `istringstream`：

```cpp
class Solution {
public:
    bool wordPattern(string pattern, string s) {
        
        vector<string> tokens;
        istringstream in(s); string token;
        while(in >> token) {
            tokens.push_back(token);
        }
        // early stop
        if(pattern.size() != tokens.size()) return false;

        unordered_map<char, string> pts;
        unordered_map<string, char> stp;
        for(int i = 0; i < pattern.size(); i++) {
            
            if (pts.find(pattern[i]) != pts.end()) {
                // check 1 to n
                if(pts[pattern[i]] != tokens[i]) return false;
            }
            if (stp.find(tokens[i]) != stp.end()) {
                // check n to 1
                if(stp[tokens[i]] != pattern[i]) return false;
            }
            pts[pattern[i]] = tokens[i];
            stp[tokens[i]] = pattern[i];
        }

        return true;
    }
};
```

上面的解法思路都是將文字 map 到文字，但是其實可以將文字 map 到 index，這樣也可以檢查一對一的關係，因為若 pattern 和 token  map 到不同 index，代表他們落在不同位置，代表是一對多或是多對一的狀況發生。

要注意這裡是 map 到 `i + 1`，因為若 key 不存在時返回的值是 `0`。
```cpp
class Solution {
public:
    bool wordPattern(string pattern, string s) {
        
        vector<string> tokens;
        istringstream in(s); string token;
        while(in >> token) {
            tokens.push_back(token);
        }
        // early stop
        if(pattern.size() != tokens.size()) return false;

        unordered_map<char, int> pti;
        unordered_map<string, int> sti;
        for(int i = 0; i < pattern.size(); i++) {
            if(pti[pattern[i]] != sti[tokens[i]]) return false;
            // default is 0 if key not exist!
            pti[pattern[i]] = i + 1;
            sti[tokens[i]] = i + 1;
        }

        return true;
    }
};
```

還可以更近一步加速，用`istringstream` 邊讀邊判斷：

```cpp
class Solution {
public:
    bool wordPattern(string pattern, string s) {
    
        istringstream in(s); 
        unordered_map<char, int> pti;
        unordered_map<string, int> sti;
        int n = pattern.size();
        int i = 0;
        for(string token; in >> token; i++) {
            if(i == n || pti[pattern[i]] != sti[token]) return false;
            pti[pattern[i]] = i + 1;
            sti[token] = i + 1;
        }

        return i == n;
    }
};
```
## Link
- [Word Pattern](https://leetcode.com/problems/word-pattern/description/)
