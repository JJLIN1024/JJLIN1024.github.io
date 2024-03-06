---
title: Convert Sorted Array to Binary Search Tree
date: 2023-03-19
lastmod: 2023-03-19
author:
  - Jimmy Lin
tags:
  - divide_and_conquer
draft: false
---

## Description

Given an integer array `nums` where the elements are sorted in **ascending order**, convert _it to a_

**_height-balanced_**

_binary search tree_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/02/18/btree1.jpg)

**Input:** nums = \[-10,-3,0,5,9\]
**Output:** \[0,-3,9,-10,null,5\]
**Explanation:** \[0,-10,5,null,-3,null,9\] is also accepted:
![](https://assets.leetcode.com/uploads/2021/02/18/btree2.jpg)

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/02/18/btree.jpg)

**Input:** nums = \[1,3\]
**Output:** \[3,1\]
**Explanation:** \[1,null,3\] and \[3,1\] are both height-balanced BSTs.

**Constraints:**

*   `1 <= nums.length <= 104`
*   `-104 <= nums[i] <= 104`
*   `nums` is sorted in a **strictly increasing** order.

## Code 

因為 array 為 sorted，因此中間的 node 就會是 head。

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    TreeNode* sortedArrayToBST(vector<int>& nums) {
        TreeNode* head = helper(nums, 0, nums.size() - 1);
        return head;
    }

    TreeNode* helper(vector<int>& nums, int left, int right) {
        if(left > right) return nullptr;
        int mid = left + (right - left) / 2;
        TreeNode* node = new TreeNode(nums[mid]);
        node->left = helper(nums, left, mid - 1);
        node->right = helper(nums, mid + 1, right);
        return node;
    }
};
```

## Source
- [Convert Sorted Array to Binary Search Tree - LeetCode](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/description/)