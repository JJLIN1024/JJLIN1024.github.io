---
title: Smallest Subarrays With Maximum Bitwise OR
date: 2023-12-10
lastmod: 2023-12-10
author:
  - Jimmy Lin
tags:
  - bit_manipulation
  - sliding_window
draft: false
---

## Description

You are given a **0-indexed** array `nums` of length `n`, consisting of non-negative integers. For each index `i` from `0` to `n - 1`, you must determine the size of the **minimum sized** non-empty subarray of `nums` starting at `i` (**inclusive**) that has the **maximum** possible **bitwise OR**.

*   In other words, let `Bij` be the bitwise OR of the subarray `nums[i...j]`. You need to find the smallest subarray starting at `i`, such that bitwise OR of this subarray is equal to `max(Bik)` where `i <= k <= n - 1`.

The bitwise OR of an array is the bitwise OR of all the numbers in it.

Return _an integer array_ `answer` _of size_ `n` _where_ `answer[i]` _is the length of the **minimum** sized subarray starting at_ `i` _with **maximum** bitwise OR._

A **subarray** is a contiguous non-empty sequence of elements within an array.

**Example 1:**

**Input:** nums = \[1,0,2,1,3\]
**Output:** \[3,3,2,2,1\]
**Explanation:**
The maximum possible bitwise OR starting at any index is 3. 
- Starting at index 0, the shortest subarray that yields it is \[1,0,2\].
- Starting at index 1, the shortest subarray that yields the maximum bitwise OR is \[0,2,1\].
- Starting at index 2, the shortest subarray that yields the maximum bitwise OR is \[2,1\].
- Starting at index 3, the shortest subarray that yields the maximum bitwise OR is \[1,3\].
- Starting at index 4, the shortest subarray that yields the maximum bitwise OR is \[3\].
Therefore, we return \[3,3,2,2,1\]. 

**Example 2:**

**Input:** nums = \[1,2\]
**Output:** \[2,1\]
**Explanation:** Starting at index 0, the shortest subarray that yields the maximum bitwise OR is of length 2.
Starting at index 1, the shortest subarray that yields the maximum bitwise OR is of length 1.
Therefore, we return \[2,1\].

**Constraints:**

*   `n == nums.length`
*   `1 <= n <= 105`
*   `0 <= nums[i] <= 109`

## Code 

### Sliding Window
Time Complexity: $O(N)$, Space Complexity: $O(N)$

關鍵在於由後往前看。

```cpp
class Solution {
public:
    vector<int> smallestSubarrays(vector<int>& nums) {
        int n = nums.size(); 
        int j = n - 1;
           
        vector<int> res(n);
        vector<int> count(32);
        for(int i = n - 1; i >= 0; i--) {

            for(int k = 0; k < 32; k++) {
                count[k] += ((nums[i] >> k) & 1);
            }

            while(j > i && isOK(nums[j], count)) {
                for(int k = 0; k < 32; k++) {
                    count[k] -= ((nums[j] >> k) & 1);
                }
                j--;
            }

            res[i] = j - i + 1;
        }   

        return res;
    }


    bool isOK(int num, vector<int>& count) {
        for(int i = 0; i < 32; i++) {
            if(count[i] > 0 && count[i] - ((num >> i) & 1) <= 0) 
                return false;
        }
        return true;
    }
};
```

### Closest Satisfaction Position
Time Complexity: $O(N)$, Space Complexity: $O(N)$

以 `8, 10, 8` 為例子：

binary form 為 `1000, 1010, 1000`，Maximum Bitwise OR 依序為 `1010, 1010, 1000`。若從尾巴開始，每一個 bit 單獨來看：

```markdown
	 1234 (j)
i	 ----
1	|1000
2	|1010
3	|1000
```

bit 1 在 i = 1 時就被 set。當 i = 2 時， bit 3 也被 set。但對於 i = 3 來說，bit 3 並沒有被 set，而最近一次 bit 3 被 set 是在 i = 2 的時候，因此其 Maximum Bitwise OR 需要長度為 2 的 subarray（`res[i] = max(res[i], last[j] - i + 1)`）。

```cpp
class Solution {
public:
    vector<int> smallestSubarrays(vector<int>& nums) {
        vector<int> last(32, 0);
        int n = nums.size();
        vector<int> res(n, 1);

        for(int i = n - 1; i >= 0; i--) {
            for(unsigned int j = 0, mask = 1; j < 32; j++, mask <<= 1) {
                if(nums[i] & mask) {
                    last[j] = i;
                }
                res[i] = max(res[i], last[j] - i + 1);
            }
        }
        return res;
    }
};
```

## Source
- [Smallest Subarrays With Maximum Bitwise OR - LeetCode](https://leetcode.com/problems/smallest-subarrays-with-maximum-bitwise-or/description/)