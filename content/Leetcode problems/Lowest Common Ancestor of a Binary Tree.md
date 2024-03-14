---
title: Lowest Common Ancestor of a Binary Tree
date: 2023-03-13
lastmod: 2023-03-13
author: Jimmy Lin
tags:
  - binary_tree
  - review
draft: false
sr-due: 2024-10-10
sr-interval: 211
sr-ease: 290
---

## Description

Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

According to the [definition of LCA on Wikipedia](https://en.wikipedia.org/wiki/Lowest_common_ancestor): “The lowest common ancestor is defined between two nodes `p` and `q` as the lowest node in `T` that has both `p` and `q` as descendants (where we allow **a node to be a descendant of itself**).”

**Example 1:**

![](https://assets.leetcode.com/uploads/2018/12/14/binarytree.png)

**Input:** root = \[3,5,1,6,2,0,8,null,null,7,4\], p = 5, q = 1
**Output:** 3
**Explanation:** The LCA of nodes 5 and 1 is 3.

**Example 2:**

![](https://assets.leetcode.com/uploads/2018/12/14/binarytree.png)

**Input:** root = \[3,5,1,6,2,0,8,null,null,7,4\], p = 5, q = 4
**Output:** 5
**Explanation:** The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself according to the LCA definition.

**Example 3:**

**Input:** root = \[1,2\], p = 1, q = 2
**Output:** 1

**Constraints:**

*   The number of nodes in the tree is in the range `[2, 105]`.
*   `-109 <= Node.val <= 109`
*   All `Node.val` are **unique**.
*   `p != q`
*   `p` and `q` will exist in the tree.

## Code 

解題關鍵在於，對於一個 TreeNode 來說，如果自身就是其中之一，那自己就會是答案（因為是由上往下遞迴，在上面就可以 return 了）。如果自己不是且左右子樹分別都有找到，自己就會是答案（因為是由上往下遞迴，所以越下面的會越先得到結果然後 return ）。

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if(!root || root == p || root == q) return root;
        TreeNode* Ancestor1 = lowestCommonAncestor(root->left, p, q);
        TreeNode* Ancestor2 = lowestCommonAncestor(root->right, p, q);

        if(Ancestor1 && Ancestor2) return root;
        return Ancestor1 ? Ancestor1 : Ancestor2;
    }
};
```

## Source
- [Lowest Common Ancestor of a Binary Tree - LeetCode](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/description/)