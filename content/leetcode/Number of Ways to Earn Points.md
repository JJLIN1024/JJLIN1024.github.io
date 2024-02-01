---
title: Number of Ways to Earn Points
date: 2023-09-25
lastmod: 2023-09-25
author:
  - Jimmy Lin
tags:
  - DP
  - boundedKnapsack
  - knapsack
draft: false
---

## Description

There is a test that has `n` types of questions. You are given an integer `target` and a **0-indexed** 2D integer array `types` where `types[i] = [counti, marksi]` indicates that there are `counti` questions of the `ith` type, and each one of them is worth `marksi` points.

Return _the number of ways you can earn **exactly**_ `target` _points in the exam_. Since the answer may be too large, return it **modulo** `109 + 7`.

**Note** that questions of the same type are indistinguishable.

*   For example, if there are `3` questions of the same type, then solving the `1st` and `2nd` questions is the same as solving the `1st` and `3rd` questions, or the `2nd` and `3rd` questions.

**Example 1:**

**Input:** target = 6, types = \[\[6,1\],\[3,2\],\[2,3\]\]
**Output:** 7
**Explanation:** You can earn 6 points in one of the seven ways:
- Solve 6 questions of the 0th type: 1 + 1 + 1 + 1 + 1 + 1 = 6
- Solve 4 questions of the 0th type and 1 question of the 1st type: 1 + 1 + 1 + 1 + 2 = 6
- Solve 2 questions of the 0th type and 2 questions of the 1st type: 1 + 1 + 2 + 2 = 6
- Solve 3 questions of the 0th type and 1 question of the 2nd type: 1 + 1 + 1 + 3 = 6
- Solve 1 question of the 0th type, 1 question of the 1st type and 1 question of the 2nd type: 1 + 2 + 3 = 6
- Solve 3 questions of the 1st type: 2 + 2 + 2 = 6
- Solve 2 questions of the 2nd type: 3 + 3 = 6

**Example 2:**

**Input:** target = 5, types = \[\[50,1\],\[50,2\],\[50,5\]\]
**Output:** 4
**Explanation:** You can earn 5 points in one of the four ways:
- Solve 5 questions of the 0th type: 1 + 1 + 1 + 1 + 1 = 5
- Solve 3 questions of the 0th type and 1 question of the 1st type: 1 + 1 + 1 + 2 = 5
- Solve 1 questions of the 0th type and 2 questions of the 1st type: 1 + 2 + 2 = 5
- Solve 1 question of the 2nd type: 5

**Example 3:**

**Input:** target = 18, types = \[\[6,1\],\[3,2\],\[2,3\]\]
**Output:** 1
**Explanation:** You can only earn 18 points by answering all questions.

**Constraints:**

*   `1 <= target <= 1000`
*   `n == types.length`
*   `1 <= n <= 50`
*   `types[i].length == 2`
*   `1 <= counti, marksi <= 50`

## Code 

此題是 bounded knapsack 的題目。

DP 關係式：

`take = max(dp[i - 1][j - w[i] * k, for k = 1, 2, 3, ..., capacity) `
`do_not_take = dp[i - 1][j]`

### DP
Time Complexity: $O(MNK)$, Space Complexity: $O(MNK)$

```cpp
using ll = long long;
class Solution {
    ll dp[51][1001];
    ll mod = 1e9 + 7;
public:
    int waysToReachTarget(int target, vector<vector<int>>& types) {
        int n = types.size();

        for(int i = 0; i < n + 1; i++) {
            dp[i][0] = 1;
        }

        for(int i = 1; i < n + 1; i++) {
            int count = types[i - 1][0];
            int mark = types[i - 1][1];
            for(int j = 1; j <= target; j++) {
                dp[i][j] = dp[i - 1][j];
                for(int k = 1; k <= count && j >= k * mark; k++) {
                    dp[i][j] = (dp[i][j] + dp[i - 1][j - (k * mark)]) % mod;
                }
            }
        }

        // for(int i = 0; i < n + 1; i++) {
        //     for(int j = 0; j < target + 1; j++) {
        //         cout << dp[i][j] << " ";
        //     }
        //     cout << endl;
        // }

        return dp[n][target];


    }
};
```

## Source
- [Number of Ways to Earn Points - LeetCode](https://leetcode.com/problems/number-of-ways-to-earn-points/description/)