---
title: Asteroid Collision
date: 2023-04-20
lastmod: 2023-12-02
author:
  - Jimmy Lin
tags:
  - stack
draft: false
---

## Description

We are given an array `asteroids` of integers representing asteroids in a row.

For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.

Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.

**Example 1:**

**Input:** asteroids = \[5,10,-5\]
**Output:** \[5,10\]
**Explanation:** The 10 and -5 collide resulting in 10. The 5 and 10 never collide.

**Example 2:**

**Input:** asteroids = \[8,-8\]
**Output:** \[\]
**Explanation:** The 8 and -8 collide exploding each other.

**Example 3:**

**Input:** asteroids = \[10,2,-5\]
**Output:** \[10\]
**Explanation:** The 2 and -5 collide resulting in -5. The 10 and -5 collide resulting in 10.

**Constraints:**

*   `2 <= asteroids.length <= 104`
*   `-1000 <= asteroids[i] <= 1000`
*   `asteroids[i] != 0`

## Code 

關鍵在於：

正的就直接 push，負的要考慮相撞。
### Stack
```cpp
class Solution {
public:
    vector<int> asteroidCollision(vector<int>& asteroids) {
        stack<int> st;
        for(auto ast: asteroids) {
            while(!st.empty() && st.top() > 0 && st.top() < -ast) {
                st.pop();
            }

            if(st.empty() || ast > 0 || st.top() < 0) {
                st.push(ast);
            } else if (ast < 0 && st.top() == -ast) {
                st.pop();
            }

        }

        vector<int> res;
        while(!st.empty()) {
            res.push_back(st.top());
            st.pop();
        }

        reverse(res.begin(), res.end());
        return res;
    }
};
```

### Vector

用 vector simulate stack，就可以省去最後面將 element 從 st 中 pop 出來最後再 reverse res。

```cpp
class Solution {
public:
    vector<int> asteroidCollision(vector<int>& asteroids) {

        vector<int> res;
        for(auto ast: asteroids) {
            while(!res.empty() && res.back() > 0 && res.back() < -ast) {
                res.pop_back();
            }

            if(res.empty() || ast > 0 || res.back() < 0) {
                res.push_back(ast);
            } else if (ast < 0 && res.back() == -ast) {
                res.pop_back();
            }

        }

        return res;
    }
};
```


## Source
- [Asteroid Collision - LeetCode](https://leetcode.com/problems/asteroid-collision/description/)