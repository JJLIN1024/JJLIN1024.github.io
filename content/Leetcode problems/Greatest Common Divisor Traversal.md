---
title: Greatest Common Divisor Traversal
date: 2024-02-25
lastmod: 2024-02-25
author:
  - Jimmy Lin
tags:
  - union_and_find
  - prime_factorization
  - review
draft: false
sr-due: 2024-02-29
sr-interval: 4
sr-ease: 274
---

## Description

You are given a **0-indexed** integer array `nums`, and you are allowed to **traverse** between its indices. You can traverse between index `i` and index `j`, `i != j`, if and only if `gcd(nums[i], nums[j]) > 1`, where `gcd` is the **greatest common divisor**.

Your task is to determine if for **every pair** of indices `i` and `j` in nums, where `i < j`, there exists a **sequence of traversals** that can take us from `i` to `j`.

Return `true` _if it is possible to traverse between all such pairs of indices,_ _or_ `false` _otherwise._

**Example 1:**

**Input:** nums = \[2,3,6\]
**Output:** true
**Explanation:** In this example, there are 3 possible pairs of indices: (0, 1), (0, 2), and (1, 2).
To go from index 0 to index 1, we can use the sequence of traversals 0 -> 2 -> 1, where we move from index 0 to index 2 because gcd(nums\[0\], nums\[2\]) = gcd(2, 6) = 2 > 1, and then move from index 2 to index 1 because gcd(nums\[2\], nums\[1\]) = gcd(6, 3) = 3 > 1.
To go from index 0 to index 2, we can just go directly because gcd(nums\[0\], nums\[2\]) = gcd(2, 6) = 2 > 1. Likewise, to go from index 1 to index 2, we can just go directly because gcd(nums\[1\], nums\[2\]) = gcd(3, 6) = 3 > 1.

**Example 2:**

**Input:** nums = \[3,9,5\]
**Output:** false
**Explanation:** No sequence of traversals can take us from index 0 to index 2 in this example. So, we return false.

**Example 3:**

**Input:** nums = \[4,3,12,8\]
**Output:** true
**Explanation:** There are 6 possible pairs of indices to traverse between: (0, 1), (0, 2), (0, 3), (1, 2), (1, 3), and (2, 3). A valid sequence of traversals exists for each pair, so we return true.

**Constraints:**

*   `1 <= nums.length <= 105`
*   `1 <= nums[i] <= 105`

## Code 

和 [[Largest Component Size by Common Factor]] 幾乎一模一樣，因為用 $O(n^2)$ 時間去對每個 pair 都算算看他們的 gcd 會太慢，使用 prime factorization 只需要 $O(n \sqrt{n})$。

要注意 edge case，因為 1 對其他數來說，gcd 都必定是 1，當 input 只由 1 構成時，若 `input = [1]` 上述的演算法可以處理，因為 1 會是一座孤島，但是若 input 有大於等於兩個 1 ，就必須回傳 false。

若 input 除了 1 還有其他數字，就不需要特別處理了，同理，因爲 1 會是一座孤島。

Time Complexity: $O(n \sqrt{n})$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    unordered_map<int, int> f;
    unordered_map<int, int> s;
    
    bool canTraverseAllPairs(vector<int>& nums) {
        int n = nums.size();

        int one_counter = 0; // edge case
        for(int i = 0; i < n; i++) {
            if(nums[i] == 1) one_counter++;
            if(one_counter >= 2) return false;
            
            for(int k = 2; k * k <= nums[i]; k++) {
                if(nums[i] % k == 0) {
                    uni(nums[i], k);
                    uni(nums[i], nums[i] / k);
                }
            }
        }
        
        unordered_set<int> st;
        for(int i = 0; i < n; i++) {
            st.insert(find(nums[i]));
            if(st.size() >= 2) return false;
        }

        return true;

    }

    int find(int x) {
        if(!f.count(x)) {
            f[x] = x;
            s[x] = 1;
        }
        if(f[x] != x) {
            f[x] = find(f[x]);
        }
        return f[x];
    }

    void uni(int x, int y) {
        x = find(x), y = find(y);
        if(x != y) {
            if(s[x] > s[y]) {
                f[y] = x;
                s[x] += s[y];
            } 
            else {
                f[x] = y;
                s[y] += s[x];
            }
        }
    }
};
```

## Source
- [Greatest Common Divisor Traversal - LeetCode](https://leetcode.com/problems/greatest-common-divisor-traversal/description/?envType=daily-question&envId=2024-02-25)