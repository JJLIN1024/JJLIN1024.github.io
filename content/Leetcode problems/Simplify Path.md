---
title: Simplify Path
date: 2022-12-25
lastmod: 2022-12-25
author: Jimmy Lin
tags: ["stack"]
draft: false
---

## Code

值得注意的有兩點：
- 若是使用 while loop 而非 for loop 時，在把 iter++ 時一定對 while 迴圈進行 bound check。（見下方 comment 處）
- `answer = "/" + st.top() + answer;` 一種將要加上去的字串加在原自串的最前面的方式。
- 當遇到 `..` 時，若前面沒有 path 可以 pop，代表處在 root，所以就等價於 no-op。例如：`/././..`等價於 `/`。

```cpp
class Solution {
public:
    string simplifyPath(string path) {
        stack<string> st;
        string temp = "";
        int iter = 0;
        while(iter < path.size()) {
            if(path[iter] == '/') {
                iter++;
                continue;
            }
            while(iter < path.size() && path[iter] != '/') {
                temp += path[iter];
                iter++;
            }
            
            if(temp == "..") {
                if(!st.empty()) st.pop();
            } else if(temp ==".") {
                ;
            } else {
                st.push(temp);
            }
            temp = "";
            iter++;
        }

        string answer = "";
        while(!st.empty()) {
            answer = "/" + st.top() + answer;
            st.pop();
        }
        if(answer.size() == 0) return "/";

        return answer;

    }
};
```

改用 for loop 的寫法：
```cpp
class Solution {
public:
    string simplifyPath(string path) {
        stack<string> st;
        int iter = 0;
        for (int i = 0; i < path.size(); i++) {
            if(path[i] == '/') {
                continue;
            }
            string temp;
            while(i < path.size() && path[i] != '/') {
                temp += path[i];
                i++;
            }
            
            if(temp == "..") {
                if(!st.empty()) st.pop();
            } else if(temp ==".") {
                continue;
            } else {
                st.push(temp);
            }
        }

        string answer = "";
        while(!st.empty()) {
            answer = "/" + st.top() + answer;
            st.pop();
        }
        if(answer.size() == 0) return "/";
        return answer;

    }
};
```


## Link
- [Simplify Path](https://leetcode.com/problems/simplify-path/description/)
