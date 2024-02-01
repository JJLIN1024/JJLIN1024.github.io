---
title: Kth Largest Element in an Array
date: 2023-04-21
lastmod: 2023-04-21
author:
  - Jimmy Lin
tags:
  - sort
  - quicksort
  - heapsort
  - partition
draft: false
---

## Description

Given an integer array `nums` and an integer `k`, return _the_ `kth` _largest element in the array_.

Note that it is the `kth` largest element in the sorted order, not the `kth` distinct element.

You must solve it in `O(n)` time complexity.

**Example 1:**

**Input:** nums = \[3,2,1,5,6,4\], k = 2
**Output:** 5

**Example 2:**

**Input:** nums = \[3,2,3,1,2,4,5,5,6\], k = 4
**Output:** 4

**Constraints:**

*   `1 <= k <= nums.length <= 105`
*   `-104 <= nums[i] <= 104`

## Code 

### Quick Select

Time Complexity: $O(n)$, Space Complexity: $O(n)$

- [Partial sorting wiki](https://en.wikipedia.org/wiki/Partial_sorting)
- [std::random_device](https://cplusplus.com/reference/random/random_device/)
- [std::mt19937](https://cplusplus.com/reference/random/mt19937/)
- [std::shuffle](https://cplusplus.com/reference/algorithm/shuffle/)

若沒有 randonmized input，runtime 會慢很多（240ms），有的話只需要（102ms）。

```cpp
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        // randonmize input to gaurantee O(n)
        random_device rd;
        mt19937 g(rd());
        shuffle(nums.begin(), nums.end(), g);
        int left = 0, right = nums.size() - 1;
        k = nums.size() - k;
        while(left < right) {
            int index = quick_select(nums, left, right);
            if(index == k) return nums[index];
            else if(index < k) left = index + 1;
            else right = index - 1;
        }

        return nums[left];


    }

    int quick_select(vector<int>& nums, int front, int end) {
        int pivot = nums[end];
        int i = front - 1;
        for(int j = front; j < end; j++) {
            if(nums[j] < pivot) {
                i++;
                swap(nums[j], nums[i]);
            }
        }
        i++;
        swap(nums[i], nums[end]);
        return i;
    }
};
```

### partial sorting(nth_element & partial_sort)
Time Complexity: $O(n)$, Space Complexity: $O(n)$

- [std::nth_element](https://cplusplus.com/reference/algorithm/nth_element/)
```cpp
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        nth_element(nums.begin(), nums.begin() + k - 1, nums.end(), greater<int>());
        return nums[k - 1];
    }
};
```

```cpp
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        nth_element(nums.begin(), nums.begin() + k - 1, nums.end(), [](const int a, const int b){return a > b;});
        return nums[k - 1];
    }
};
```

```cpp
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        k = nums.size() - k;
        nth_element(nums.begin(), nums.begin() + k, nums.end());
        return nums[k];
    }
};
```

- [std::partial_sort](https://cplusplus.com/reference/algorithm/partial_sort/)
```cpp
class Solution {
public:

    int findKthLargest(vector<int>& nums, int k) {
        partial_sort(nums.begin(), nums.begin() + k, nums.end(), greater<int>());
        return nums[k - 1];
    }
};
```

```cpp
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        k = nums.size() - k;
        partial_sort(nums.begin(), nums.begin() + k + 1, nums.end());
        return nums[k];
    }
};
```

`priority_queue` default 為 max heap，而 `multiset` default 為 min heap。

在寫 custom cmp 時，記得只有 `priority_queue` 的大小方向和其他人相反。
### Max Heap
Time Complexity: $O(n \log k)$, Space Complexity: $O(k)$
```cpp
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        priority_queue<int> p;
        for(auto n: nums) {
            p.push(n);
        }

        for(int i = 0; i < k - 1; i++) {
            p.pop();
        }

        return p.top();
    }
};
```

注意 multiset 的 cmp 大小比較順序。

```cpp
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        auto cmp = [](const int a, const int b) {return a > b;};
        multiset<int, decltype(cmp)> m(cmp);
        for(auto n: nums) {
            m.insert(n);
        }

        for(int i = 0; i < k - 1; i++) m.erase(m.begin());
        return *m.begin();
    }
};
```
### Min Heap
Time Complexity: $O(n \log k)$, Space Complexity: $O(k)$
```cpp
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        priority_queue<int, vector<int>, greater<int>> min_heap;
        for(auto& n: nums) {
            min_heap.push(n);
            if(min_heap.size() > k) 
                min_heap.pop();
        }

        return min_heap.top();
    }

};
```

```cpp
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        auto cmp = [](const int a, const int b){return a > b;};
        priority_queue<int, vector<int>, decltype(cmp)> p(cmp);
        for(auto n: nums) {
            p.push(n);
            if(p.size() > k)
                p.pop();
        }

        return p.top();
    }
};
```

```cpp
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        multiset<int> m;
        for(auto n: nums) {
            m.insert(n);
            if(m.size() > k) {
                m.erase(m.begin());
            }
        }

        return *m.begin();
    }
};
```
## Source
- [Kth Largest Element in an Array - LeetCode](https://leetcode.com/problems/kth-largest-element-in-an-array/description/)