---
title: Diameter of Binary Tree
date: 2023-03-14
lastmod: 2023-03-14
author: Jimmy Lin
tags:
  - binary_tree
  - dfs
draft: false
---

## Description

Given the `root` of a binary tree, return _the length of the **diameter** of the tree_.

The **diameter** of a binary tree is the **length** of the longest path between any two nodes in a tree. This path may or may not pass through the `root`.

The **length** of a path between two nodes is represented by the number of edges between them.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/03/06/diamtree.jpg)

**Input:** root = \[1,2,3,4,5\]
**Output:** 3
**Explanation:** 3 is the length of the path \[4,2,1,3\] or \[5,2,1,3\].

**Example 2:**

**Input:** root = \[1,2\]
**Output:** 1

**Constraints:**

*   The number of nodes in the tree is in the range `[1, 104]`.
*   `-100 <= Node.val <= 100`

## Code 

和 [[Binary Tree Maximum Path Sum]] 的 recursion 形式是一樣的。

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
    int diameter = 0;
public:
    int diameterOfBinaryTree(TreeNode* root) {
        checkDiameter(root);
        return diameter;
    }

    int checkDiameter(TreeNode* node) {
        if(!node) return 0;
        int left = checkDiameter(node->left);
        int right = checkDiameter(node->right);
        diameter = max(diameter, left + right);
        return max(left, right) + 1;
    }
};
```

## Source
- [Diameter of Binary Tree - LeetCode](https://leetcode.com/problems/diameter-of-binary-tree/description/)