---
title: Running Sum of 1d Array
date: 2022-12-20
lastmod: 2022-12-20
author: Jimmy Lin
tags: ["Prefix Sum"]
draft: false
---

## Code
```cpp
class Solution {
public:
vector<int> runningSum(vector<int>& nums) {
	for(int i = 1; i < nums.size(); i++) {
		nums[i] += nums[i-1];
	}
	return nums;
}

};
```

使用 [`std::partial_sum`](https://en.cppreference.com/w/cpp/algorithm/partial_sum) （也可以使用 [`std::accumulate`](https://en.cppreference.com/w/cpp/algorithm/accumulate)）
的版本：
```c
class Solution {
public:
    vector<int> runningSum(vector<int>& nums) {
        partial_sum(nums.begin(), nums.end(), nums.begin(), plus<int>());
        return nums;
    }
};
```

[`std::partial_sum`](https://en.cppreference.com/w/cpp/algorithm/partial_sum) 在 C++20 後可以指定 operator，這裡使用的是 [`std::plus<void>`](https://en.cppreference.com/w/cpp/utility/functional/plus_void)

## Link
- [1480. Running Sum of 1d Array](https://leetcode.com/problems/running-sum-of-1d-array/)
