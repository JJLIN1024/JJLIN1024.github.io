---
title: House Robber II
date: 2022-12-24
lastmod: 2022-12-24
author:
  - Jimmy Lin
tags:
  - DP
draft: false
---
You are a professional robber planning to rob houses along a street. Each house has a tashed. All houses at this place are **arranged in a circle.** That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and **it will automatically contact the police if two adjacent houses were broken into on the same night**.

Given an integer array `nums` representing the amount of money of each house, return _the maximum amount of money you can rob tonight **without alerting the police**_.

**Example 1:**

**Input:** nums = [2,3,2]
**Output:** 3
**Explanation:** You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.

**Example 2:**

**Input:** nums = [1,2,3,1]
**Output:** 4
**Explanation:** Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.

**Example 3:**

**Input:** nums = [1,2,3]
**Output:** 3

**Constraints:**

- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 1000`
## Code

Time Complexity: $O(n)$, Space Complexity: $O(n)$

第一次的想法：[[House Robber|House Robber]] 跑兩次，去頭和去尾各一次，如此一來頭跟尾就絕對不會被同時選到，解決了衝突的問題。

```cpp
class Solution {
public:
    int rob(vector<int>& nums) {
       if (nums.size() == 1) return nums[0];
       if (nums.size() == 2) return max(nums[0], nums[1]);
       if (nums.size() == 3) return max(nums[0], max(nums[2], nums[1]));
       int a = nums[0];
       int b = max(nums[0], nums[1]);
       int profit1, profit2;
       int c = nums[1];
       int d = max(nums[2], nums[1]);
       for(int i = 2; i < nums.size() - 1; i++) {
            profit1 = max(a + nums[i], b);
            a = b;
            b = profit1;
       }         
       for(int j = 3; j < nums.size(); j++) {
            profit2 = max(c + nums[j], d);
            c = d;
	            d = profit2;
       }         
       return max(profit1, profit2);
    }
};
```

進一步將 code 寫得更乾淨，注意 `a = max(a + nums[i], b)` 以及 `b = max(a, nums[i] + b)`。

Time Complexity: $O(n)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
  int rob(vector<int> &nums) {
    // edge case
    if (nums.size() < 2) {
      return nums.size() ? nums[0] : 0;
    }

    // rob house 0
    int a = 0;
    int b = 0;
    for (int i = 0; i < nums.size() - 1; i++) {
      if (i % 2 == 0) {
        a = max(a + nums[i], b);
      } else {
        b = max(a, nums[i] + b);
      }
    }
    // not rob house 0
    int c = 0;
    int d = 0;
    for (int i = 1; i < nums.size(); i++) {
      if (i % 2 == 0) {
        c = max(c + nums[i], d);
      } else {
        d = max(c, nums[i] + d);
      }
    }
    return max({a, b, c, d});
  }
};
```


## Link
- [House Robber II](https://leetcode.com/problems/house-robber-ii/)