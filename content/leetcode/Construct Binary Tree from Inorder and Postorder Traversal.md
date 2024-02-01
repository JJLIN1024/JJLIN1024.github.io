---
title: Construct Binary Tree from Inorder and Postorder Traversal
date: 2023-03-30
lastmod: 2023-03-30
author: Jimmy Lin
tags:
  - binary_tree
  - review
draft: false
sr-due: 2024-03-01
sr-interval: 30
sr-ease: 294
---

## Description

Given two integer arrays `inorder` and `postorder` where `inorder` is the inorder traversal of a binary tree and `postorder` is the postorder traversal of the same tree, construct and return _the binary tree_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/02/19/tree.jpg)

**Input:** inorder = \[9,3,15,20,7\], postorder = \[9,15,7,20,3\]
**Output:** \[3,9,20,null,null,15,7\]

**Example 2:**

**Input:** inorder = \[-1\], postorder = \[-1\]
**Output:** \[-1\]

**Constraints:**

*   `1 <= inorder.length <= 3000`
*   `postorder.length == inorder.length`
*   `-3000 <= inorder[i], postorder[i] <= 3000`
*   `inorder` and `postorder` consist of **unique** values.
*   Each value of `postorder` also appears in `inorder`.
*   `inorder` is **guaranteed** to be the inorder traversal of the tree.
*   `postorder` is **guaranteed** to be the postorder traversal of the tree.

## Code 

同 [[Construct Binary Tree from Preorder and Inorder Traversal]]。

Trick：postorder （LRN -> NRL）反過來就類似 preorder（NLR）。這技巧在 [[N-ary Tree Postorder Traversal]] 中用過。

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
    TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
        int rootIdx = 0;
        // LRN -> NRL, simliar to preorder
        reverse(postorder.begin(), postorder.end());
        return build(postorder, inorder, rootIdx, 0, inorder.size()-1);
    }
    
    TreeNode* build(vector<int>& postorder, vector<int>& inorder, int& rootIdx, int left, int right) {
        if (left > right) return NULL;
        int pivot = left;  // find the root from inorder
        while(inorder[pivot] != postorder[rootIdx]) pivot++;
        
        rootIdx++;
        TreeNode* newNode = new TreeNode(inorder[pivot]);
        newNode->right = build(postorder, inorder, rootIdx, pivot+1, right);
        newNode->left = build(postorder, inorder, rootIdx, left, pivot-1);
        return newNode;
    }
};
```

## Source
- [Construct Binary Tree from Inorder and Postorder Traversal - LeetCode](https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/description/)