---
title: House Robber
date: 2022-12-24
lastmod: 2022-12-24
author: Jimmy Lin
tags:
  - DP
draft: false
---
You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and **it will automatically contact the police if two adjacent houses were broken into on the same night**.

Given an integer array `nums` representing the amount of money of each house, return _the maximum amount of money you can rob tonight **without alerting the police**_.

**Example 1:**

**Input:** nums = [1,2,3,1]
**Output:** 4
**Explanation:** Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.

**Example 2:**

**Input:** nums = [2,7,9,3,1]
**Output:** 12
**Explanation:** Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
Total amount you can rob = 2 + 9 + 1 = 12.

**Constraints:**

- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 400`
## Code 

Time Complexity: $O(n)$, Space Complexity: $O(n)$

對於 House $i$ 而言，只有偷或者不偷兩者選擇。DP 式：`DP[i] = (DP[i-2] + value(i), DP[i-1])`。

```cpp
class Solution {
public:
    int rob(vector<int>& nums) {
        int n_house = nums.size();
        if(n_house == 1) return nums[0];
        vector<int> profits(n_house, 0);
        profits[0] = nums[0];
        profits[1] = max(nums[0], nums[1]);
        for(int i = 2; i < n_house; i++) {
            profits[i] = max(profits[i-2] + nums[i], profits[i-1]);
        }
        
        return profits[n_house - 1];
    }
};
```

Time Complexity: $O(n)$, Space Complexity: $O(1)$

觀察 DP 式 dependency 關係，$i$ 只和 $i-1, i-2$ 有關係，因此我們至多只需要三個變數，就完成 DP 計算。如下：`pre` 就是 $i-2$ state，`cur` 就是 $i-1$ state，`temp` 則是 $i$ state。

```cpp
class Solution {
public:
    int rob(vector<int>& nums) {
        int pre = 0, cur = 0;
        for(int i = 0; i < nums.size(); i++) {
            int temp = max(pre + nums[i], cur);
            pre = cur;
            cur = temp;
        }
        return cur;
    }
};
```


## Link
- [House Robber](https://leetcode.com/problems/house-robber/)