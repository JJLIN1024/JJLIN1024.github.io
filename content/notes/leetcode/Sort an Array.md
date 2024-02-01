---
title: Sort an Array
date: 2023-12-08
lastmod: 2023-12-08
author:
  - Jimmy Lin
tags:
  - sorting
draft: false
---

## Description

Given an array of integers `nums`, sort the array in ascending order and return it.

You must solve the problem **without using any built-in** functions in `O(nlog(n))` time complexity and with the smallest space complexity possible.

**Example 1:**

**Input:** nums = \[5,2,3,1\]
**Output:** \[1,2,3,5\]
**Explanation:** After sorting the array, the positions of some numbers are not changed (for example, 2 and 3), while the positions of other numbers are changed (for example, 1 and 5).

**Example 2:**

**Input:** nums = \[5,1,1,2,0,0\]
**Output:** \[0,0,1,1,2,5\]
**Explanation:** Note that the values of nums are not necessairly unique.

**Constraints:**

*   `1 <= nums.length <= 5 * 104`
*   `-5 * 104 <= nums[i] <= 5 * 104`

## Code 

### Heap Sort
Time Complexity: $O(N \log N)$, Space Complexity: $O(N)$

Make heap is $O(N)$, but heap sort is still $O(N \log N)$.

```cpp
class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        make_heap(nums.begin(), nums.end());
        sort_heap(nums.begin(), nums.end());
        return nums;
    }

};
```

### Merge Sort (Recursive) 
Time Complexity: $O(N \log N)$, Space Complexity: $O(N)$

```c
/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
void merge(int* nums, int low, int mid, int high) {
    int n = high - low + 1;
    int *sorted = malloc(sizeof(int) * n);

    int l = low, r = mid + 1, k = 0;
    while(l <= mid && r <= high) {
        sorted[k++] = nums[l] < nums[r] ? nums[l++] : nums[r++];
    }

    while(l <= mid) {
        sorted[k++] = nums[l++];
    }

    while(r <= high) {
        sorted[k++] = nums[r++];
    }

    for(k = 0; k < n; k++) {
        nums[low + k] = sorted[k];
    }
    free(sorted);
}

void mergeSort(int* nums, int low, int high) {
    if(high <= low) return;

    int mid = (low + high) / 2;
    mergeSort(nums, low, mid);
    mergeSort(nums, mid + 1, high);
    merge(nums, low, mid, high);
}

int* sortArray(int* nums, int numsSize, int* returnSize) {
    *returnSize = numsSize;
    mergeSort(nums, 0, numsSize - 1);
    return nums;
}

```

```c++
class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        int n = nums.size();
        mergeSort(nums, 0, n - 1);
        return nums;
    }

    void mergeSort(vector<int>& nums, int low, int high) {
        if(high <= low) return;
        int mid = (low + high) / 2;

        mergeSort(nums, low, mid);
        mergeSort(nums, mid + 1, high);
        merge(nums, low, mid, high);
    }

    void merge(vector<int>& nums, int low, int mid, int high) {
        int n = high - low + 1;
        vector<int> sorted(n, 0);
        int l = low, r = mid + 1, k = 0;
        while(l <= mid && r <= high) {
            sorted[k++] = nums[l] < nums[r] ? nums[l++] : nums[r++];
        }

        while(l <= mid) {
            sorted[k++] = nums[l++];
        }

        while(r <= high) {
            sorted[k++] = nums[r++];
        }

        for(k = 0; k < n; k++) {
            nums[low + k] = sorted[k];
        }
    }
};
```

### Counting Sort
Time Complexity: $O(N + K)$, Space Complexity: $O(N + K)$, where $K$ is `MAX`。

```cpp
class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        int MAX = INT_MIN;
        for(int i = 0; i < nums.size(); i++) {
            nums[i] += 5 * 1e4;
            MAX = max(MAX, nums[i]);
        }

        vector<int> count(MAX + 1, 0);
        for(auto n: nums) {
            count[n]++;
        }

        for(int i = 1; i < MAX + 1; i++) {
            count[i] += count[i-1];
        }

        int n = nums.size();
        vector<int> sorted(n, 0);

        for(auto n: nums) {
            sorted[count[n] - 1] = n - 5 * 1e4;
            count[n]--;
        }

        return sorted;
    }

};
```

### Radix Sort
Time Complexity: $O(\log_2 N * (N+ K))$, Space Complexity: $O(N + K)$, where $K$ is `MAX`。

要注意 `while((MAX >> (pos * bits)) > 0)` ，若 `bits` 設太大（例如 `16`）就會有可能產生 left shift 32 的狀況，這對於 `int` 來說是 undefined behavior。

還有要注意 `for(int i = n - 1; i >= 0; i--)`，這樣才可以保證是 stable sort。

```cpp
class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        int MAX = INT_MIN;
        for(int i = 0; i < nums.size(); i++) {
            nums[i] += 5 * 1e4;
            MAX = max(MAX, nums[i]);
        }

        int bits = 8;
        int mask = ~((~0) << bits);
        int pos = 0;
        int n = nums.size();
        vector<int> sorted(n, 0);

        while((MAX >> (pos * bits)) > 0) {
            vector<int> count(1 << bits, 0);
            for(auto n: nums) {
                count[(n >> (pos * bits)) & mask]++;
            }
            
            for(int i = 1; i < count.size(); i++) {
                count[i] += count[i - 1];
            }
            
            for(int i = n - 1; i >= 0; i--) {
                sorted[count[((nums[i]) >> (pos * bits)) & mask] - 1] = nums[i];
                count[((nums[i]) >> (pos * bits)) & mask]--;
            }

            for(int i = 0; i < n; i++) {
                nums[i] = sorted[i];
            }
            pos++;
        }

        for(int i = 0; i < nums.size(); i++) {
            nums[i] -= 5 * 1e4;
        }

        return nums;
    }

};
```
## Source
- [Sort an Array - LeetCode](https://leetcode.com/problems/sort-an-array/description/)