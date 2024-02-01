---
title: Kth Smallest Element in a Sorted Matrix
date: 2023-07-15
lastmod: 2023-07-15
author: Jimmy Lin
tags: ["binary search"]
draft: false
---

## Description

Given an `n x n` `matrix` where each of the rows and columns is sorted in ascending order, return _the_ `kth` _smallest element in the matrix_.

Note that it is the `kth` smallest element **in the sorted order**, not the `kth` **distinct** element.

You must find a solution with a memory complexity better than `O(n2)`.

**Example 1:**

**Input:** matrix = \[\[1,5,9\],\[10,11,13\],\[12,13,15\]\], k = 8
**Output:** 13
**Explanation:** The elements in the matrix are \[1,5,9,10,11,12,13,**13**,15\], and the 8th smallest number is 13

**Example 2:**

**Input:** matrix = \[\[-5\]\], k = 1
**Output:** -5

**Constraints:**

*   `n == matrix.length == matrix[i].length`
*   `1 <= n <= 300`
*   `-109 <= matrix[i][j] <= 109`
*   All the rows and columns of `matrix` are **guaranteed** to be sorted in **non-decreasing order**.
*   `1 <= k <= n2`

**Follow up:**

*   Could you solve the problem with a constant memory (i.e., `O(1)` memory complexity)?
*   Could you solve the problem in `O(n)` time complexity? The solution may be too advanced for an interview but you may find reading [this paper](http://www.cse.yorku.ca/~andy/pubs/X+Y.pdf) fun.

## Code 

### Min Heap
Time Complexity: $O(k \log k)$, Space Complexity: $O(k)$

用到的概念是 [merge k sorted array](https://www.geeksforgeeks.org/merge-k-sorted-arrays/)。

```cpp
class Solution {
public:
    int kthSmallest(vector<vector<int>>& matrix, int k) {
        int res;
        int m = matrix.size();
        int n = matrix[0].size();
        priority_queue<vector<int>, vector<vector<int>>, greater<>> minHeap;
        for(int i = 0; i < min(m, k); i++) {
            minHeap.push({matrix[i][0], i, 0});
        }

        for(int i = 0; i < k; i++) {
            auto top = minHeap.top(); 
            minHeap.pop();
            res = top[0];
            int rowIdx = top[1];
            int colIdx = top[2];
            if(colIdx + 1 < n) 
                minHeap.push({matrix[rowIdx][colIdx + 1], rowIdx, colIdx + 1});
        }

        return res;


    }
};
```

### Binary Search
Time Complexity: $O((m + n) \log D)$, Space Complexity: $O(k)$

`each of the rows and columns is sorted in ascending order`，和 [[Search a 2D Matrix II|Search a 2D Matrix II]]  是一樣的，所以在尋找有多少 element 比 mid 小的時候，可以使用 linear search，time complexity 會是 $O(m + n)$。

```cpp
class Solution {
public:
    int kthSmallest(vector<vector<int>>& matrix, int k) {
        int n = matrix.size(), m = matrix[0].size();
        int l = matrix[0][0], r = matrix[n-1][m-1];

        while(l < r) {
            int m = l + (r - l) / 2;
            if(countSmaller(m, matrix) < k) {
                l = m + 1;
            } else {
                r = m;
            }
        }

        return l;
    }

    int countSmaller(int target, vector<vector<int>>& matrix) {
        int n = matrix.size(), m = matrix[0].size();
        int count = 0;
        for(int i = 0; i < n; i++) {
            int j = m - 1;
            while(j >= 0 && matrix[i][j] > target)
                j--;
            count += (j + 1);
        }
        return count;
    }
};
```


# O(n) from paper. Yes, O(#rows). - Kth Smallest Element in a Sorted Matrix - LeetCode

## Description

It's O(n) where n is the number of rows (and columns), not the number of elements. So it's very efficient. The algorithm is from the paper [Selection in X + Y and matrices with sorted rows and columns](http://www.cse.yorku.ca/~andy/pubs/X+Y.pdf), which I first saw mentioned by @elmirap (thanks).

**The basic idea:** Consider the submatrix you get by removing every second row and every second column. This has about a quarter of the elements of the original matrix. And the k-th element (k-th _smallest_ I mean) of the original matrix is roughly the (k/4)-th element of the submatrix. So roughly get the (k/4)-th element of the submatrix and then use that to find the k-th element of the original matrix in O(n) time. It's recursive, going down to smaller and smaller submatrices until a trivial 2×2 matrix. For more details I suggest checking out the paper, the first half is easy to read and explains things well. Or @zhiqing\_xiao's [solution+explanation](https://discuss.leetcode.com/topic/54262/o-row-time-o-row-space-solution-with-detail-intuitive-explanation-c-accepted).

**Cool:** It uses variants of [saddleback search](http://cs.geneseo.edu/~baldwin/math-thinking/saddleback.html) that you might know for example from the [Search a 2D Matrix II](https://leetcode.com/problems/search-a-2d-matrix-ii/) problem. And it uses the [median of medians](https://en.wikipedia.org/wiki/Median_of_medians) algorithm for linear-time selection.

**Optimization:** If k is less than n, we only need to consider the top-left k×k matrix. Similar if k is almost n<sup>2</sup>. So it's even O(min(n, k, n^2-k)), I just didn't mention that in the title because I wanted to keep it simple and because those few very small or very large k are unlikely, most of the time k will be "medium" (and average n<sup>2</sup>/2).

**Implementation:** I implemented the submatrix by using an index list through which the actual matrix data gets accessed. If \[0, 1, 2, ..., n-1\] is the index list of the original matrix, then \[0, 2, 4, ...\] is the index list of the submatrix and \[0, 4, 8, ...\] is the index list of the subsubmatrix and so on. This also covers the above optimization by starting with \[0, 1, 2, ..., **k**\-1\] when applicable.

**Application:** I believe it can be used to easily solve the [Find K Pairs with Smallest Sums](https://leetcode.com/problems/find-k-pairs-with-smallest-sums/) problem in time O(k) instead of O(k log n), which I think is the best posted so far. I might try that later if nobody beats me to it (if you do, let me know :-). _**Update:**_ I [did that now](https://discuss.leetcode.com/topic/53380/o-k-solution).

```python
class Solution(object):
    def kthSmallest(self, matrix, k):

        # The median-of-medians selection function.
        def pick(a, k):
            if k == 1:
                return min(a)
            groups = (a[i:i+5] for i in range(0, len(a), 5))
            medians = [sorted(group)[len(group) / 2] for group in groups]
            pivot = pick(medians, len(medians) / 2 + 1)
            smaller = [x for x in a if x < pivot]
            if k <= len(smaller):
                return pick(smaller, k)
            k -= len(smaller) + a.count(pivot)
            return pivot if k < 1 else pick([x for x in a if x > pivot], k)

        # Find the k1-th and k2th smallest entries in the submatrix.
        def biselect(index, k1, k2):

            # Provide the submatrix.
            n = len(index)
            def A(i, j):
                return matrix[index[i]][index[j]]
            
            # Base case.
            if n <= 2:
                nums = sorted(A(i, j) for i in range(n) for j in range(n))
                return nums[k1-1], nums[k2-1]

            # Solve the subproblem.
            index_ = index[::2] + index[n-1+n%2:]
            k1_ = (k1 + 2*n) / 4 + 1 if n % 2 else n + 1 + (k1 + 3) / 4
            k2_ = (k2 + 3) / 4
            a, b = biselect(index_, k1_, k2_)

            # Prepare ra_less, rb_more and L with saddleback search variants.
            ra_less = rb_more = 0
            L = []
            jb = n   # jb is the first where A(i, jb) is larger than b.
            ja = n   # ja is the first where A(i, ja) is larger than or equal to a.
            for i in range(n):
                while jb and A(i, jb - 1) > b:
                    jb -= 1
                while ja and A(i, ja - 1) >= a:
                    ja -= 1
                ra_less += ja
                rb_more += n - jb
                L.extend(A(i, j) for j in range(jb, ja))
                
            # Compute and return x and y.
            x = a if ra_less <= k1 - 1 else \
                b if k1 + rb_more - n*n <= 0 else \
                pick(L, k1 + rb_more - n*n)
            y = a if ra_less <= k2 - 1 else \
                b if k2 + rb_more - n*n <= 0 else \
                pick(L, k2 + rb_more - n*n)
            return x, y

        # Set up and run the search.
        n = len(matrix)
        start = max(k - n*n + n-1, 0)
        k -= n*n - (n - start)**2
        return biselect(range(start, min(n, start+k)), k, k)[0]
```

## Reference
- [O(n) from paper. Yes, O(#rows). - Kth Smallest Element in a Sorted Matrix - LeetCode](https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/solutions/85170/o-n-from-paper-yes-o-rows/)




## Source
- [Kth Smallest Element in a Sorted Matrix - LeetCode](https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/description/)