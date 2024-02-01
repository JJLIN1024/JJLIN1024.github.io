---
title: Form Largest Integer With Digits That Add up to Target
date: 2023-09-25
lastmod: 2023-09-25
author:
  - Jimmy Lin
tags:
  - DP
  - unboundedKnapsack
  - knapsack
draft: false
---

## Description

Given an array of integers `cost` and an integer `target`, return _the **maximum** integer you can paint under the following rules_:

*   The cost of painting a digit `(i + 1)` is given by `cost[i]` (**0-indexed**).
*   The total cost used must be equal to `target`.
*   The integer does not have `0` digits.

Since the answer may be very large, return it as a string. If there is no way to paint any integer given the condition, return `"0"`.

**Example 1:**

**Input:** cost = \[4,3,2,5,6,7,2,5,5\], target = 9
**Output:** "7772"
**Explanation:** The cost to paint the digit '7' is 2, and the digit '2' is 3. Then cost("7772") = 2\*3+ 3\*1 = 9. You could also paint "977", but "7772" is the largest number.
**Digit    cost**
  1  ->   4
  2  ->   3
  3  ->   2
  4  ->   5
  5  ->   6
  6  ->   7
  7  ->   2
  8  ->   5
  9  ->   5

**Example 2:**

**Input:** cost = \[7,6,5,5,5,6,8,7,8\], target = 12
**Output:** "85"
**Explanation:** The cost to paint the digit '8' is 7, and the digit '5' is 5. Then cost("85") = 7 + 5 = 12.

**Example 3:**

**Input:** cost = \[2,4,6,2,4,6,4,4,4\], target = 5
**Output:** "0"
**Explanation:** It is impossible to paint any integer with total cost equal to target.

**Constraints:**

*   `cost.length == 9`
*   `1 <= cost[i], target <= 5000`

## Code 

### DP

這題和 [[Coin Change II|Coin Change II]] 類似，是 unbounded knapsack 的題目。DP 關係式為`dp[i][j] = dp[i - 1][j] + (j >= cost[i - 1] ? dp[i][j - cost[i - 1]] : 0);`

只是這題是 `string`，要注意 `string` 的相關操作。

另外，注意 base case 的設定，設為 `""`，而 DP table 的初始值，設為 `"0"`，且在 for loop 中使用`if(dp[i][j - cost[i - 1]] == "0") continue;`，因為這題的 `dp[i][j]` 代表使用 index `0 ~ i` 的 digit 組成 cost **剛剛好**為 `j` 的 largest number。

Time Complexity: $O(NT)$, Space Complexity: $O(NT)$

```cpp
class Solution {
    inline bool isGreaterThan(string &a, string &b) {
        return a.size() != b.size() ? a.size() > b.size() : a > b;
    }
public:
    string largestNumber(vector<int>& cost, int target) {
        int n = cost.size();
        vector<vector<string>> dp(n + 1, vector<string>(target + 1, "0")); // "0" means impossible

        // base case
        for(int i = 0; i < n + 1; i++) {
            dp[i][0] = "";
        }

        for(int i = 1; i < n + 1; i++) {
            for(int j = 1; j < target + 1; j++) {
                dp[i][j] = dp[i - 1][j];
                if(j >= cost[i - 1]) {
                    if(dp[i][j - cost[i - 1]] == "0") continue;
                    auto s = string(1, '0' + i) + dp[i][j - cost[i - 1]];
                    if (isGreaterThan(s, dp[i][j])) dp[i][j] = s;
                }
            }
        }

        return dp[n][target];
    }
};
```

### DP - Optimized
Time Complexity: $O(NT)$, Space Complexity: $O(T)$

觀察 `dp[i][j]` 只和`dp[i - 1][j]` 和 `dp[i][j - cost[i - 1]]` 有關係，因此可以只用 1D dp table 。

```cpp
class Solution {
    inline bool isGreaterThan(string &a, string &b) {
        return a.size() != b.size() ? a.size() > b.size() : a > b;
    }
public:
    string largestNumber(vector<int>& cost, int target) {
        int n = cost.size();
        vector<string> dp(target + 1, "0"); // "0" means impossible

        // base case
        dp[0] = "";

        for(int i = 1; i < n + 1; i++) {
            for(int j = 1; j < target + 1; j++) {
                if(j >= cost[i - 1]) {
                    if(dp[j - cost[i - 1]] == "0") continue;
                    auto s = string(1, '0' + i) + dp[j - cost[i - 1]];
                    if (isGreaterThan(s, dp[j])) dp[j] = s;
                }
            }
        }

        return dp[target];
    }
};
```
## Source
- [Form Largest Integer With Digits That Add up to Target - LeetCode](https://leetcode.com/problems/form-largest-integer-with-digits-that-add-up-to-target/)