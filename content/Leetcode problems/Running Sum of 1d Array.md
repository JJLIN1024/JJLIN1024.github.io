---
title: Running Sum of 1d Array
date: 2022-12-20
lastmod: 2022-12-20
author:
  - Jimmy Lin
tags:
  - prefix_sum
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

## Link
- [1480. Running Sum of 1d Array](https://leetcode.com/problems/running-sum-of-1d-array/)
