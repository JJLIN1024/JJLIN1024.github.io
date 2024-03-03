---
title: Maximum Length of Pair Chain
date: 2023-01-06
lastmod: 2023-01-06
author:
  - Jimmy Lin
tags:
  - greedy
draft: false
---

## Description

You are given an array of `n` pairs `pairs` where `pairs[i] = [lefti, righti]` and `lefti < righti`.

A pair `p2 = [c, d]` **follows** a pair `p1 = [a, b]` if `b < c`. A **chain** of pairs can be formed in this fashion.

Return _the length longest chain which can be formed_.

You do not need to use up all the given intervals. You can select pairs in any order.

**Example 1:**

**Input:** pairs = \[\[1,2\],\[2,3\],\[3,4\]\]
**Output:** 2
**Explanation:** The longest chain is \[1,2\] -> \[3,4\].

**Example 2:**

**Input:** pairs = \[\[1,2\],\[7,8\],\[4,5\]\]
**Output:** 3
**Explanation:** The longest chain is \[1,2\] -> \[4,5\] -> \[7,8\].

**Constraints:**

*   `n == pairs.length`
*   `1 <= n <= 1000`
*   `-1000 <= lefti < righti <= 1000`

## Code 

看完題目想到 [[Minimum Number of Arrows to Burst Balloons|Minimum Number of Arrows to Burst Balloons]]，同樣是 interval 的問題。

Greedy 解的關鍵在於對 `pairs[i][1]`進行 sorting ，而非 `pairs[i][0]`，因為在選擇前後兩個 `pairs` 時，若前者的尾巴比後者的前面，選擇前者可以讓後面有更多選擇的空間（greedy choice）。

這題有點像 [[Longest Increasing Subsequence|Longest Increasing Subsequence]] 的 2D 版本，不過仔細做下去就會發現問題：給定 `res = [2, 4], [5, 8]`，若遇到 `[3, 6]`，該如何 insert？要用一個取代兩個嗎？

這就會延伸到我們的 greedy choice：永遠選擇尾端較前面的。

Consider pairA and pairB, where pairA appears before pairB in the sorted pairs.  
That implies that pairA[1] < pairB[1], but there is no constraint on pairA[0] and pairB[0].  
Now, the greedy part is: I claim that it's always better to try to add pairA to the chain first.  

Let's prove that:

1. When pairA[1] < pairB[0], it's obvious that we should append pairA first.
2. When pairA[1] >= pairB[0], we have to choose carefully, because that means: either we only append pairA to the chain, or we only append pairB to the chain. Append either pairA or pairB will increment the length of the chain by 1. However: (note: cur is the tail of the chain) appending pairA will have cur = pairA[1], appending pairB will have cur = pairB[1]. And pairA[1] < pairB[1] Apparently, we shall append pairA first because that way we expose a smaller tail which has a better opportunity to append more future pairs.

Time Complexity: $O(n \log n)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    static bool cpm(vector<int>& a, vector<int>& b) {
        return a[1] < b[1];
    }
    int findLongestChain(vector<vector<int>>& pairs) {
        sort(pairs.begin(), pairs.end(), cpm);
        int n = pairs.size();
        int chain = 1;
        int maxRight = pairs[0][1];
        for(int i = 1; i < pairs.size(); i++) {
            if(pairs[i][0] > maxRight) {
                chain++;
                maxRight = pairs[i][1];
            }
        }

        return chain;
    }
};
```

### DP 
Time Complexity: $O(n^2)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    int findLongestChain(vector<vector<int>>& pairs) {
        sort(pairs.begin(), pairs.end());
        int n = pairs.size();
        vector<int> DP(n, 1);
        for(int i = 1; i < pairs.size(); i++) {
            for(int j = 0; j < i; j++) {
                if(pairs[i][0] > pairs[j][1]) DP[i] = DP[j] + 1;
            }
        }

        return *max_element(DP.begin(), DP.end());
    }
};
```


## Source
- [Maximum Length of Pair Chain - LeetCode](https://leetcode.com/problems/maximum-length-of-pair-chain/description/)