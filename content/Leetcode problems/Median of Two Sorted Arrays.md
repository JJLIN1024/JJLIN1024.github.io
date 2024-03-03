---
title: Median of Two Sorted Arrays
date: 2024-01-11
lastmod: 2024-01-11
author: Jimmy Lin
tags:
  - binary_search
  - review
draft: false
sr-due: 2024-04-11
sr-interval: 39
sr-ease: 210
---

## Description

Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return **the median** of the two sorted arrays.

The overall run time complexity should be `O(log (m+n))`.

**Example 1:**

**Input:** nums1 = \[1,3\], nums2 = \[2\]
**Output:** 2.00000
**Explanation:** merged array = \[1,2,3\] and median is 2.

**Example 2:**

**Input:** nums1 = \[1,2\], nums2 = \[3,4\]
**Output:** 2.50000
**Explanation:** merged array = \[1,2,3,4\] and median is (2 + 3) / 2 = 2.5.

**Constraints:**

*   `nums1.length == m`
*   `nums2.length == n`
*   `0 <= m <= 1000`
*   `0 <= n <= 1000`
*   `1 <= m + n <= 2000`
*   `-106 <= nums1[i], nums2[i] <= 106`

## Code 

### Brute Force

Time Complexity: $O(n \log n)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        vector<int> merge;
        for(auto n: nums1) merge.push_back(n);
        for(auto n: nums2) merge.push_back(n);
        sort(merge.begin(), merge.end());
        int n = merge.size();

        return n % 2 == 1 ? merge[n / 2] : (merge[n / 2 - 1] + merge[n / 2]) / 2.0;
    }

};
```

### Heap

Time Complexity: $O(k \log n)$, Space Complexity: $O(n)$

```cpp
class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        int n = nums1.size();
        int m = nums2.size();

        if((n + m) % 2 == 0) {
            return (findKth(nums1,nums2,(n + m) / 2) + findKth(nums1, nums2, ((n + m) / 2) + 1)) / 2;
        } else {
            return findKth(nums1, nums2, ((n + m) / 2) + 1);
        }
    }


    double findKth(vector<int>& nums1, vector<int>& nums2, int k) {
        // min heap
        auto cmp = [](const pair<int, int>& p1, const pair<int, int>& p2) {
            return p1.first > p2.first;
        };
        priority_queue<pair<int, int>, vector<pair<int, int>>, decltype(cmp)> pq(cmp);

        int i = 0, j = 0, count = 0;
        if(nums1.size() != 0) {
            pq.push({nums1[0], 1});
            i++;
        }
        if(nums2.size() != 0) {
            pq.push({nums2[0], 2});
            j++;
        }
        
        int res;
        while(count < k) {
            int lable = pq.top().second;
            res = pq.top().first;
            pq.pop();
            count++;
            if(lable == 1 && i < nums1.size()) {
                pq.push({nums1[i], 1});
                i++;
            }
            if(lable == 2 && j < nums2.size()) {
                pq.push({nums2[j], 2});
                j++;
            }
        }
        return res;

    }

};
```
### Binary Search

Time Complexity: $O(\log(\min(m + n)))$, Space Complexity: $O(n)$

對於一個長度為 n 的 array 來說，有 2n + 1 個 cut position，以 `[1, 2, 3]` 來說，相當於 `[*, 1, *, 2, *, 3, *]` 總共 7 個 cut position。

而 cut position mapping 到原本 array element 的方式如下表：

```
N        Index of L / R
1               0 / 0
2               0 / 1
3               1 / 1  
4               1 / 2      
5               2 / 2
6               2 / 3
7               3 / 3
8               3 / 4
```

L 一定會是 (N - 1) / 2，而 R 一定會是 N / 2。以`[*, 1, *, 2, *, 3, *]` 為例，當選擇 index 3 為 cut position 時，對應到的 L 會是 (3 - 1) / 2 = 1，為原本 `[1, 2, 3]` 的 index 1 的元素，就是 2。而 R 對應到的會是 N / 2  = 3 / 2 = 1，也是 element 2。

因為我們把 cut position 考慮進去，因此每個 length = N 的 array 都會變成 length = 2N + 1。

我們會先選擇長度較長的去做 cut，因為選短的沒有意義（長的還有一大堆，短的再怎麼樣 cut 都不會幫助我們更快找到 median）。

令長的為 $N_2$，短的為 $N_1$（原本長度），則加上 cut position 後長度分別為 $2 N_2 + 1$ 和 $2N_1 + 1$。在長的中選擇一個 cut position（用 binary search），令為 $k$，將兩個 array 都一起考慮，總共有 $2N_1 + 2N_2 + 2$ 個 cut position，一半是 $N_1 + N_2 + 1$ 個 cut position，用 0-based index 來看的話（$k$ 也是 0-based index），還剩下 $(N_1 + N_2 + 1) - 1 - k$ 個 cut position，也就是短的 array 中我們要選擇的 cut position。

`INT_MIN & INT_MAX` 對應到的是 cut 在 index 0 和尾端的 edge case。

```cpp
class Solution {
public:
     double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
    int N1 = nums1.size();
    int N2 = nums2.size();
    if (N1 < N2) return findMedianSortedArrays(nums2, nums1);	// Make sure A2 is the shorter one.
    
    int lo = 0, hi = N2 * 2;
    while (lo <= hi) {
        int mid2 = (lo + hi) / 2;   // Try Cut 2 
        int mid1 = N1 + N2 - mid2;  // Calculate Cut 1 accordingly
        
        double L1 = (mid1 == 0) ? INT_MIN : nums1[(mid1-1)/2];	// Get L1, R1, L2, R2 respectively
        double L2 = (mid2 == 0) ? INT_MIN : nums2[(mid2-1)/2];
        double R1 = (mid1 == N1 * 2) ? INT_MAX : nums1[(mid1)/2];
        double R2 = (mid2 == N2 * 2) ? INT_MAX : nums2[(mid2)/2];
        
        if (L1 > R2) lo = mid2 + 1;		// A1's lower half is too big; need to move C1 left (C2 right)
        else if (L2 > R1) hi = mid2 - 1;	// A2's lower half too big; need to move C2 left.
        else return (max(L1,L2) + min(R1, R2)) / 2;	// Otherwise, that's the right cut.
    }
    return -1;
} 
};
```


```cpp
class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        int n = nums1.size();
        int m = nums2.size();

        if((n + m) % 2 == 0) {
            return (helper(nums1, 0, n, nums2, 0, m, (n + m) / 2) + helper(nums1, 0, n, nums2, 0, m, ((n + m) / 2) + 1)) / 2;
        } else {
            return helper(nums1, 0, n, nums2, 0, m, ((n + m) / 2) + 1);
        }
    }

    double helper(vector<int>& num1, int a, int m, vector<int>& num2, int b, int n, int k) {

        if(m > n) return helper(num2, b, n, num1, a, m, k);
        if(m == 0) return num2[b + k - 1];
        if(k == 1) return min(num1[a], num2[b]);

        int k1 = min(m, k / 2);
        int k2 = k - k1;

        if(num1[a + k1 - 1] < num2[b + k2 - 1]) {
            return helper(num1, a + k1, m - k1, num2, b, n, k - k1);
        } else {
            return helper(num1, a, m, num2, b + k2, n - k2, k - k2);
        }
    }
};
```

## Source
- [Median of Two Sorted Arrays - LeetCode](https://leetcode.com/problems/median-of-two-sorted-arrays/description/)