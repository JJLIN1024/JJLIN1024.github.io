---
title: Stone Game II
date: 2024-08-21
lastmod: 2024-08-21
author:
  - Jimmy Lin
tags:
  - DP
draft: false
---

## Description

Alice and Bob continue their games with piles of stones.  There are a number of piles **arranged in a row**, and each pile has a positive integer number of stones `piles[i]`.  The objective of the game is to end with the most stones. 

Alice and Bob take turns, with Alice starting first.  Initially, `M = 1`.

On each player's turn, that player can take **all the stones** in the **first** `X` remaining piles, where `1 <= X <= 2M`.  Then, we set `M = max(M, X)`.

The game continues until all the stones have been taken.

Assuming Alice and Bob play optimally, return the maximum number of stones Alice can get.

**Example 1:**

**Input:** piles = \[2,7,9,4,4\]
**Output:** 10
**Explanation:**  If Alice takes one pile at the beginning, Bob takes two piles, then Alice takes 2 piles again. Alice can get 2 + 4 + 4 = 10 piles in total. If Alice takes two piles at the beginning, then Bob can take all three piles left. In this case, Alice get 2 + 7 = 9 piles in total. So we return 10 since it's larger. 

**Example 2:**

**Input:** piles = \[1,2,3,4,5,100\]
**Output:** 104

**Constraints:**

*   `1 <= piles.length <= 100`
*   `1 <= piles[i] <= 104`

## Code 

Time Complexity: $O(NM)$, Space Complexity: $O(NM)$

關鍵在於定義 `play` 的回傳值到底是什麼。

定義為自己的 turn 所拿的，以及對手拿完後的 index 之後的 prefix sum，再減掉對手的 `play` 的回傳。

原本卡住的點是要怎麼紀錄對手拿到多少，然後再開始自己的遞迴（alice 要 call alice 自己的遞迴，bob call bob 的），有點類似 minimax 的味道，但這裡正解是 alice call bob 的，bob 會 call alice 。

```cpp
class Solution {
public:
    int stoneGameII(vector<int>& piles) {
        vector<int> pre = piles;
        vector<vector<int>> memo(101, vector<int>(202, -1));
        for(int i = pre.size() - 2; i >= 0; i--) {
            pre[i] += pre[i + 1];
        }
        return play(piles, 0, 1, pre, memo);
    }

    int play(vector<int>& piles, int idx, int M, vector<int>& pre, vector<vector<int>>& memo) {
        if(idx + 2 * M >= pre.size()) {
            // takes all
            return pre[idx];
        }

        if(memo[idx][M] != -1) 
            return memo[idx][M];

        int res = 0;
        int curStone = 0;
        for(int i = 1; i <= 2 * M; i++) {
            curStone = pre[idx] - pre[idx + i];
            res = max(res, curStone + pre[idx + i] - play(piles, idx + i, max(M, i), pre, memo));
        }
        
        memo[idx][M] = res;
        return res;
    }
};
```

## Source
- [Stone Game II - LeetCode](https://leetcode.com/problems/stone-game-ii/description/?envType=daily-question&envId=2024-08-20)