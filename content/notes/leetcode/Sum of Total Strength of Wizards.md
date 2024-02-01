---
title: Sum of Total Strength of Wizards
date: 2024-01-16
lastmod: 2024-01-16
author: Jimmy Lin
tags:
  - prefix_sum
  - monotonic_stack
  - review
draft: false
sr-due: 2024-01-31
sr-interval: 2
sr-ease: 210
---

## Description

As the ruler of a kingdom, you have an army of wizards at your command.

You are given a **0-indexed** integer array `strength`, where `strength[i]` denotes the strength of the `ith` wizard. For a **contiguous** group of wizards (i.e. the wizards' strengths form a **subarray** of `strength`), the **total strength** is defined as the **product** of the following two values:

*   The strength of the **weakest** wizard in the group.
*   The **total** of all the individual strengths of the wizards in the group.

Return _the **sum** of the total strengths of **all** contiguous groups of wizards_. Since the answer may be very large, return it **modulo** `109 + 7`.

A **subarray** is a contiguous **non-empty** sequence of elements within an array.

**Example 1:**

**Input:** strength = \[1,3,1,2\]
**Output:** 44
**Explanation:** The following are all the contiguous groups of wizards:
- \[1\] from \[**1**,3,1,2\] has a total strength of min(\[1\]) \* sum(\[1\]) = 1 \* 1 = 1
- \[3\] from \[1,**3**,1,2\] has a total strength of min(\[3\]) \* sum(\[3\]) = 3 \* 3 = 9
- \[1\] from \[1,3,**1**,2\] has a total strength of min(\[1\]) \* sum(\[1\]) = 1 \* 1 = 1
- \[2\] from \[1,3,1,**2**\] has a total strength of min(\[2\]) \* sum(\[2\]) = 2 \* 2 = 4
- \[1,3\] from \[**1,3**,1,2\] has a total strength of min(\[1,3\]) \* sum(\[1,3\]) = 1 \* 4 = 4
- \[3,1\] from \[1,**3,1**,2\] has a total strength of min(\[3,1\]) \* sum(\[3,1\]) = 1 \* 4 = 4
- \[1,2\] from \[1,3,**1,2**\] has a total strength of min(\[1,2\]) \* sum(\[1,2\]) = 1 \* 3 = 3
- \[1,3,1\] from \[**1,3,1**,2\] has a total strength of min(\[1,3,1\]) \* sum(\[1,3,1\]) = 1 \* 5 = 5
- \[3,1,2\] from \[1,**3,1,2**\] has a total strength of min(\[3,1,2\]) \* sum(\[3,1,2\]) = 1 \* 6 = 6
- \[1,3,1,2\] from \[**1,3,1,2**\] has a total strength of min(\[1,3,1,2\]) \* sum(\[1,3,1,2\]) = 1 \* 7 = 7
The sum of all the total strengths is 1 + 9 + 1 + 4 + 4 + 4 + 3 + 5 + 6 + 7 = 44.

**Example 2:**

**Input:** strength = \[5,4,6\]
**Output:** 213
**Explanation:** The following are all the contiguous groups of wizards: 
- \[5\] from \[**5**,4,6\] has a total strength of min(\[5\]) \* sum(\[5\]) = 5 \* 5 = 25
- \[4\] from \[5,**4**,6\] has a total strength of min(\[4\]) \* sum(\[4\]) = 4 \* 4 = 16
- \[6\] from \[5,4,**6**\] has a total strength of min(\[6\]) \* sum(\[6\]) = 6 \* 6 = 36
- \[5,4\] from \[**5,4**,6\] has a total strength of min(\[5,4\]) \* sum(\[5,4\]) = 4 \* 9 = 36
- \[4,6\] from \[5,**4,6**\] has a total strength of min(\[4,6\]) \* sum(\[4,6\]) = 4 \* 10 = 40
- \[5,4,6\] from \[**5,4,6**\] has a total strength of min(\[5,4,6\]) \* sum(\[5,4,6\]) = 4 \* 15 = 60
The sum of all the total strengths is 25 + 16 + 36 + 36 + 40 + 60 = 213.

**Constraints:**

*   `1 <= strength.length <= 105`
*   `1 <= strength[i] <= 109`

## Code 

**Most tricky part before involving math:**  
For each `strength[i]`, we could find a non-empty index range `(left, right)` where `strength[i]` is the min value. So for all subarrays in this range **including** `strength[i]`, the total strength is `strength[i]` * the sum of those subarray sums.

- `left` is the first index on the left side `i` where `strength[left] < strength[i]`
- `right` is the first index on the right side of `i` where `strength[right] <= strength[i]`

These two indices can be pre-calculated using **monotonic stack** (example: [LC496. Next Greater Element I](https://leetcode.com/problems/next-greater-element-i/)).

The reason we use `<` on `left` but `<=` on `right` is to avoid duplicates.  
Here is an example array: 1 **2 3 4 2** 3 4 2 1  
For the highlighted subarray `2 3 4 2`, we want to calculate the strength using the 2nd `2` but not the first `2`.

**How do we get the "sum of all subarrays including `strength[i]` in range `(left, right)`"?**  
Let's list the indices:  
...`left-1`, `left`, **`left + 1`, `left + 2`, ... `i-1`, `i`, `i+1`, ... `right-1`**, `right`, `right+1`...

Let `prefix[i]` be the prefix sum of first `i` elements in `strength`.

The sum of subarrays including `i` are:

- the subarrays that start with `left+1`:  
    sum(`left+1`, ... `i`) = `prefix[i + 1] - prefix[left + 1]`  
    sum(`left+1`, ... `i+1`) = `prefix[i + 2] - prefix[left + 1]`  
    ...  
    sum(`left+1`, ... `right-1`) = `prefix[right] - prefix[left + 1]`
- the subarrays that start with `left+2`:  
    sum(`left+2`, ... `i`) = `prefix[i + 1] - prefix[left + 2]`  
    sum(`left+2`, ... `i+1`) = `prefix[i + 2] - prefix[left + 2]`  
    ...  
    sum(`left+2`, ... `right-1`) = `prefix[right] - prefix[left + 2]`

...

- the subarrays that start with `i`:  
    sum(`i`, ... `i`) = `prefix[i + 1] - prefix[i]`  
    sum(`i`, ... `i+1`) = `prefix[i + 2] - prefix[i]`  
    ...  
    sum(`i`, ... `right-1`) = `prefix[right] - prefix[i]`

Then we combine all above terms, we have:

- _positive_ parts:  
    `(prefix[i + 1] + prefix[i + 2] + ... + prefix[right]) * (i - left)`
- _negative_ parts:  
    `(prefix[left + 1] + prefix[left + 2] + ... + prefix[i]) * (right - i)`

The range sum of `prefix` can be optimized by pre-compute prefix-sum of `prefix`.

**Time complexity: O(N)**: we have 5 passes of the input array length  
**Space complexity: O(N)**: two prefix arrays and a stack (vector) is used

Time Complexity: $O(n)$, Space Complexity: $O(n)$

要求得 prefix sum，假設要求 index `[i, j]` 之間的 sum，就必須用 `prefixSum[j + 1] - prefixSum[i]`。

對 `[1, 3, 1, 2]` 來說，要求的 index `[0, 3]` 之間的 sum，就要用 `prefix[4] - prefix[0]`。而要再進一步求得這些 prefix 的 sum，就要再加上一層 layer，這也是為什麼 `vector<long long> prefix(N + 1, 0L);` 和 `vector<long long> prefix_sum(N + 2, 0L);` 要宣告成 size = N + 1 和 N + 2 的原因。

```cpp
int totalStrength(vector<int>& st) {
    long long MOD = 1'000'000'007;
    const int N = st.size();
    // sum of first k elements
    vector<long long> prefix(N + 1, 0L);
    for (int i = 0; i < N; ++i) {
        prefix[i + 1] = (prefix[i] + st[i]) % MOD;
    }
    // sum of first k prefix
    vector<long long> prefix_sum(N + 2, 0L);
    for (int i = 0; i <= N; ++i) {
        prefix_sum[i + 1] = (prefix_sum[i] + prefix[i]) % MOD;
    }
    
    // first index on the left < current st
    vector<int> left(N, -1);
    // mono increase
    vector<int> stack;
    for (int i = 0; i < N; ++i) {
        while (!stack.empty() && st[stack.back()] >= st[i]) {
            stack.pop_back();
        }
        left[i] = stack.empty() ? -1 : stack.back();
        stack.push_back(i);
    }
    
    // first index on the right <= current st
    vector<int> right(N, N);
    stack.clear();
    for (int i = N - 1; i >= 0; --i) {
        while (!stack.empty() && st[stack.back()] > st[i]) {
            stack.pop_back();
        }
        right[i] = stack.empty() ? N : stack.back();
        stack.push_back(i);
    }
    
    long long res = 0;
    for (int i = 0; i < N; ++i) {
        res += ((prefix_sum[right[i] + 1] - prefix_sum[i + 1]) * (i - left[i]) % MOD + MOD * 2 - 
               (prefix_sum[i + 1] - prefix_sum[left[i] + 1]) * (right[i] - i) % MOD) % MOD * st[i] % MOD;
        res %= MOD;
    }
    return (int) res;
}
```


get left and right in one pass
```cpp
vector<int> left(N, -1);
vector<int> right(N, N);
// mono increase
vector<int> stack;
for (int i = 0; i < N; ++i) {
    while (!stack.empty() && st[stack.back()] >= st[i]) {
        int t=stack.back();
        stack.pop_back();
        right[t]=i;
    }
    left[i] = stack.empty() ? -1 : stack.back();
    stack.push_back(i);
}
```
## Source
- [Sum of Total Strength of Wizards - LeetCode](https://leetcode.com/problems/sum-of-total-strength-of-wizards/description/)