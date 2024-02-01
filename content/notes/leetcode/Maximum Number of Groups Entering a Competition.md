---
title: Maximum Number of Groups Entering a Competition
date: 2023-07-15
lastmod: 2023-07-15
author: Jimmy Lin
tags: ["binary search"]
draft: false
---

## Description

You are given a positive integer array `grades` which represents the grades of students in a university. You would like to enter **all** these students into a competition in **ordered** non-empty groups, such that the ordering meets the following conditions:

*   The sum of the grades of students in the `ith` group is **less than** the sum of the grades of students in the `(i + 1)th` group, for all groups (except the last).
*   The total number of students in the `ith` group is **less than** the total number of students in the `(i + 1)th` group, for all groups (except the last).

Return _the **maximum** number of groups that can be formed_.

**Example 1:**

**Input:** grades = \[10,6,12,7,3,5\]
**Output:** 3
**Explanation:** The following is a possible way to form 3 groups of students:
- 1st group has the students with grades = \[12\]. Sum of grades: 12. Student count: 1
- 2nd group has the students with grades = \[6,7\]. Sum of grades: 6 + 7 = 13. Student count: 2
- 3rd group has the students with grades = \[10,3,5\]. Sum of grades: 10 + 3 + 5 = 18. Student count: 3
It can be shown that it is not possible to form more than 3 groups.

**Example 2:**

**Input:** grades = \[8,8\]
**Output:** 1
**Explanation:** We can only form 1 group, since forming 2 groups would lead to an equal number of students in both groups.

**Constraints:**

*   `1 <= grades.length <= 105`
*   `1 <= grades[i] <= 105`

## Code 

基本概念：[[Binary Search 101|Binary Search 101]]。

要最大化 group 組數，就是 group size 由 1, 2, 3, ... 有小到大，因此這題就是要找一個 `k`，滿足 `1 + 2 + ... + k <= grades.size()`。

### Binary Search
Time Complexity: $O(n \log n)$, Space Complexity: $O(1)$

```cpp
class Solution {
public:
    int maximumGroups(vector<int>& grades) {
        sort(grades.begin(), grades.end());
        int l = 1, r = 446;
        while(l < r) {
            int m = (l + r + 1) / 2;
            if((m * (m + 1) / 2) <= grades.size()) {
                l = m;
            } else {
                r = m - 1;
            }
        }
        return l;
    }

};
```


### Math
Time Complexity: $O(1)$, Space Complexity: $O(1)$

`1 + 2 + ... + k <= grades.size()` 可以用數學算出 `k` 之解。

令 `grades.size() = n`，解二元一次方程式：

$\frac{k(k + 1)}{2} \leq n \Rightarrow k^2 + k \leq 2n$

使用配方法：
$(k + 0.5)^2 \leq 2n + 0.25$ 
$\Rightarrow (k + 0.5) \leq \sqrt {2n + 0.25}$ 
$\Rightarrow k \leq \sqrt {2n + 0.25} - 0.5$ 

```cpp
class Solution {
public:
    int maximumGroups(vector<int>& grades) {
        return (int)(sqrt(grades.size() * 2 + 0.25) - 0.5);
    }
};
```

## Source
- [Maximum Number of Groups Entering a Competition - LeetCode](https://leetcode.com/problems/maximum-number-of-groups-entering-a-competition/description/)