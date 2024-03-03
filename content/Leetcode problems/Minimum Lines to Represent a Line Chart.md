---
title: Minimum Lines to Represent a Line Chart
date: 2024-02-22
lastmod: 2024-02-22
author:
  - Jimmy Lin
tags:
  - array
  - sorting
draft: false
---

## Description

You are given a 2D integer array `stockPrices` where `stockPrices[i] = [dayi, pricei]` indicates the price of the stock on day `dayi` is `pricei`. A **line chart** is created from the array by plotting the points on an XY plane with the X-axis representing the day and the Y-axis representing the price and connecting adjacent points. One such example is shown below:

![](https://assets.leetcode.com/uploads/2022/03/30/1920px-pushkin_population_historysvg.png)

Return _the **minimum number of lines** needed to represent the line chart_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2022/03/30/ex0.png)

**Input:** stockPrices = \[\[1,7\],\[2,6\],\[3,5\],\[4,4\],\[5,4\],\[6,3\],\[7,2\],\[8,1\]\]
**Output:** 3
**Explanation:**
The diagram above represents the input, with the X-axis representing the day and Y-axis representing the price.
The following 3 lines can be drawn to represent the line chart:
- Line 1 (in red) from (1,7) to (4,4) passing through (1,7), (2,6), (3,5), and (4,4).
- Line 2 (in blue) from (4,4) to (5,4).
- Line 3 (in green) from (5,4) to (8,1) passing through (5,4), (6,3), (7,2), and (8,1).
It can be shown that it is not possible to represent the line chart using less than 3 lines.

**Example 2:**

![](https://assets.leetcode.com/uploads/2022/03/30/ex1.png)

**Input:** stockPrices = \[\[3,4\],\[1,2\],\[7,8\],\[2,3\]\]
**Output:** 1
**Explanation:**
As shown in the diagram above, the line chart can be represented with a single line.

**Constraints:**

*   `1 <= stockPrices.length <= 105`
*   `stockPrices[i].length == 2`
*   `1 <= dayi, pricei <= 109`
*   All `dayi` are **distinct**.

## Code 

Time Complexity: $O(n \log n)$, Space Complexity: $O(1)$

仔細想想，因為 stock price 是按照天數在走的，所以只能夠順著天數排，因此 sort 後直接看哪些天有轉折就行了。

要注意的點是，在計算斜率的時候，避免除法，因為浮點數計算會有精確度的問題。

```cpp
class Solution {
public:
    int minimumLines(vector<vector<int>>& A) {
        int n = A.size(), res = n - 1;
        sort(begin(A), end(A));
        for (int i = 1; i < n - 1; ++i)
            if (1LL * (A[i][0] - A[i-1][0]) * (A[i+1][1] - A[i][1]) == 1LL * (A[i+1][0] - A[i][0]) * (A[i][1] - A[i-1][1]))
                res--;
        return res;    
    }
};
```

## Source
- [Minimum Lines to Represent a Line Chart - LeetCode](https://leetcode.com/problems/minimum-lines-to-represent-a-line-chart/description/)