---
title: Reducing Dishes
date: 2023-03-29
lastmod: 2023-03-29
author: Jimmy Lin
tags: ["greedy"]
draft: false
---

## Description

A chef has collected data on the `satisfaction` level of his `n` dishes. Chef can cook any dish in 1 unit of time.

**Like-time coefficient** of a dish is defined as the time taken to cook that dish including previous dishes multiplied by its satisfaction level i.e. `time[i] * satisfaction[i]`.

Return _the maximum sum of **like-time coefficient** that the chef can obtain after dishes preparation_.

Dishes can be prepared in **any** order and the chef can discard some dishes to get this maximum value.

**Example 1:**

**Input:** satisfaction = \[-1,-8,0,5,-9\]
**Output:** 14
**Explanation:** After Removing the second and last dish, the maximum total **like-time coefficient** will be equal to (-1\*1 + 0\*2 + 5\*3 = 14).
Each dish is prepared in one unit of time.

**Example 2:**

**Input:** satisfaction = \[4,3,2\]
**Output:** 20
**Explanation:** Dishes can be prepared in any order, (2\*1 + 3\*2 + 4\*3 = 20)

**Example 3:**

**Input:** satisfaction = \[-1,-4,-5\]
**Output:** 0
**Explanation:** People do not like the dishes. No dish is prepared.

**Constraints:**

*   `n == satisfaction.length`
*   `1 <= n <= 500`
*   `-1000 <= satisfaction[i] <= 1000`

## Code 

一開始寫的 $O(n^2)$ 解。但有直覺是 sort 過後要挑正的，至於負的就必須看加進去後和正的因為烹煮時間增加的 gain 誰比較大，將此想法 implement 後就是底下的 greedy 解法。

以 `[-1,-8,0,5,-9]` 為例， sort 過後是 `[-9, -8, -1, 0, 5]`。

- iter 1: total = 5, ans = 5
- iter 2: total = 0 + 5, ans = 10
- iter 3: total = -1 + 0 + 5, ans =  14
- iter 4: total = -8 + -1 + 0 + 5 < 0

不斷地將 total 加到 ans 就是變相的在計算將比較好的 dish 延後烹煮順序進而得到的 gain。

```cpp
class Solution {
public:
    int maxSatisfaction(vector<int>& satisfaction) {
        sort(begin(satisfaction), end(satisfaction));
        int ans = 0;
        for(int i = 0; i < satisfaction.size(); i++) {
            int temp = 0;
            int time = 1;
            for(int j = i; j < satisfaction.size(); j++) {
                temp += time * satisfaction[j];
                time++;
            }
            ans = max(ans, temp);
        }

        return ans;
    }
};

```

### Greedy

```cpp
class Solution {
public:
    int maxSatisfaction(vector<int>& satisfaction) {
        sort(begin(satisfaction), end(satisfaction));
        int ans = 0, total = 0;
        for(int i = satisfaction.size() - 1; i >= 0 && satisfaction[i] + total > 0; i--) {
            total += satisfaction[i];
            ans += total;
        }

        return ans;
    }
};



```


## Source
- [Reducing Dishes - LeetCode](https://leetcode.com/problems/reducing-dishes/description/)