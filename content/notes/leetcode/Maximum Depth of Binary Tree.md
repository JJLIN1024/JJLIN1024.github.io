---
title: Maximum Depth of Binary Tree
date: 2023-03-15
lastmod: 2023-03-15
author: Jimmy Lin
tags:
  - binary_tree
draft: false
---

## Description

Given the `root` of a binary tree, return _its maximum depth_.

A binary tree's **maximum depth** is the number of nodes along the longest path from the root node down to the farthest leaf node.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/11/26/tmp-tree.jpg)

**Input:** root = \[3,9,20,null,null,15,7\]
**Output:** 3

**Example 2:**

**Input:** root = \[1,null,2\]
**Output:** 2

**Constraints:**

*   The number of nodes in the tree is in the range `[0, 104]`.
*   `-100 <= Node.val <= 100`

## Code 

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
    int maxDepth(TreeNode* root) {
        if(!root) return 0;
        return max(maxDepth(root->left), maxDepth(root->right)) + 1;
    }
};
```

## Source
- [Maximum Depth of Binary Tree - LeetCode](https://leetcode.com/problems/maximum-depth-of-binary-tree/description/)