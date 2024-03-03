---
title: Apply Operations on Array to Maximize Sum of Squares
date: 2024-01-30
lastmod: 2024-01-30
author: Jimmy Lin
tags:
  - bit_manipulation
  - review
draft: false
sr-due: 2024-02-03
sr-interval: 4
sr-ease: 270
---

## Description

You are given a **0-indexed** integer array `nums` and a **positive** integer `k`.

You can do the following operation on the array **any** number of times:

*   Choose any two distinct indices `i` and `j` and **simultaneously** update the values of `nums[i]` to `(nums[i] AND nums[j])` and `nums[j]` to `(nums[i] OR nums[j])`. Here, `OR` denotes the bitwise `OR` operation, and `AND` denotes the bitwise `AND` operation.

You have to choose `k` elements from the final array and calculate the sum of their **squares**.

Return _the **maximum** sum of squares you can achieve_.

Since the answer can be very large, return it **modulo** `109 + 7`.

**Example 1:**

**Input:** nums = \[2,6,5,8\], k = 2
**Output:** 261
**Explanation:** We can do the following operations on the array:
- Choose i = 0 and j = 3, then change nums\[0\] to (2 AND 8) = 0 and nums\[3\] to (2 OR 8) = 10. The resulting array is nums = \[0,6,5,10\].
- Choose i = 2 and j = 3, then change nums\[2\] to (5 AND 10) = 0 and nums\[3\] to (5 OR 10) = 15. The resulting array is nums = \[0,6,0,15\].
We can choose the elements 15 and 6 from the final array. The sum of squares is 152 + 62 = 261.
It can be shown that this is the maximum value we can get.

**Example 2:**

**Input:** nums = \[4,5,4,7\], k = 3
**Output:** 90
**Explanation:** We do not need to apply any operations.
We can choose the elements 7, 5, and 4 with a sum of squares: 72 + 52 + 42 = 90.
It can be shown that this is the maximum value we can get.

**Constraints:**

*   `1 <= k <= nums.length <= 105`
*   `1 <= nums[i] <= 109`

## Code 

Time Complexity: $O(32)$, Space Complexity: $O(32)$

Observe the effect of an operation on one bit:
```
(1, 1) -> (1 & 1, 1 | 1) -> (1, 1)
(0, 0) -> (0 & 0, 0 | 0) -> (0, 0)
(0, 1) -> (0 & 1, 0 | 1) -> (0, 1)
(1, 0) -> (1 & 0, 1 | 0) -> (0, 1)
```

所以說，bit will drop to the bottom as we apply as many operations as needed.

以 5, 6, 8 為例：

```
8 4 2 1
-------
0 1 0 1| 5
0 1 1 0| 6
1 0 0 0| 8
-------
1 2 1 1
```

第一輪取值：取 `1 1 1 1` 的平方相當於 $15^2 = 225$。這一步相當於我們先做 6, 8，然後再做 5, 6，最後再做 6, 8。

```
6 & 8
-------
0 1 0 1| 5
0 0 0 0| 6
1 1 1 0| 8
-------

5 & 6
-------
0 0 0 0| 5
0 1 0 1| 6
1 1 1 0| 8
-------

6 & 8
-------
0 0 0 0| 5
0 1 0 0| 6
1 1 1 1| 8
-------
```

因為 8 是全滿，所以做 6,8 時，1 bit 會被擋住就不會下去了。這也是為什麼我們可以直接計算 32 個 bit index 的 counter 然後用 counting sort 來計算最後的結果（因為底層如果有 1 bit 就會擋住上面的 bit from falling down to the bottom!）。

```cpp
class Solution {
public:
    int maxSum(vector<int>& nums, int k) {
        vector<int> count(32, 0);
        for(auto n: nums) {
            for(int i = 0; i < 32; i++) {
                if(n & (1 << i)) {
                    count[i]++;
                }
            }
        }
        
        int res = 0, mod = 1e9 + 7;
        for(int j = 0; j < k; j++) {
            int cur = 0;
            for(int i = 0; i < 32; i++) {
                if(count[i] > 0) {
                    count[i]--;
                    cur += 1 << i;
                }
            }
            res = (res + 1L * cur * cur % mod) % mod;
        }
        return res;
    }
 };
```

## Source
- [Apply Operations on Array to Maximize Sum of Squares - LeetCode](https://leetcode.com/problems/apply-operations-on-array-to-maximize-sum-of-squares/description/)