---
title: Subtree of Another Tree
date: 2023-03-19
lastmod: 2023-03-19
author: Jimmy Lin
tags:
  - recursion
  - binary_tree
  - review
draft: false
sr-due: 2024-03-08
sr-interval: 53
sr-ease: 290
---

## Description

Given the roots of two binary trees `root` and `subRoot`, return `true` if there is a subtree of `root` with the same structure and node values of `subRoot` and `false` otherwise.

A subtree of a binary tree `tree` is a tree that consists of a node in `tree` and all of this node's descendants. The tree `tree` could also be considered as a subtree of itself.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/04/28/subtree1-tree.jpg)

**Input:** root = \[3,4,5,1,2\], subRoot = \[4,1,2\]
**Output:** true

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/04/28/subtree2-tree.jpg)

**Input:** root = \[3,4,5,1,2,null,null,null,null,0\], subRoot = \[4,1,2\]
**Output:** false

**Constraints:**

*   The number of nodes in the `root` tree is in the range `[1, 2000]`.
*   The number of nodes in the `subRoot` tree is in the range `[1, 1000]`.
*   `-104 <= root.val <= 104`
*   `-104 <= subRoot.val <= 104`

## Code 

有用到 [[Same Tree]] 當作輔助。

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
    bool isSubtree(TreeNode* root, TreeNode* subRoot) {
        if(!root) return false;
        if(isSameTree(root, subRoot)) return true;
        return isSubtree(root->left, subRoot) || isSubtree(root->right, subRoot);
    }

    bool isSameTree(TreeNode* node1, TreeNode* node2) {
        if(!node1 && !node2) return true;
        if(!node1 || !node2) return false;
        return node1->val == node2->val && isSameTree(node1->left, node2->left) && isSameTree(node1->right, node2->right);
    }
};
```

## Source
- [Subtree of Another Tree - LeetCode](https://leetcode.com/problems/subtree-of-another-tree/description/)