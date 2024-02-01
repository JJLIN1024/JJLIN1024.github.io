---
title: Lowest Common Ancestor of a Binary Search Tree
date: 2023-03-13
lastmod: 2023-03-13
author: Jimmy Lin
tags:
  - binary_tree
  - review
draft: false
sr-due: 2024-02-21
sr-interval: 27
sr-ease: 268
---

## Description

Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.

According to the [definition of LCA on Wikipedia](https://en.wikipedia.org/wiki/Lowest_common_ancestor): “The lowest common ancestor is defined between two nodes `p` and `q` as the lowest node in `T` that has both `p` and `q` as descendants (where we allow **a node to be a descendant of itself**).”

**Example 1:**

![](https://assets.leetcode.com/uploads/2018/12/14/binarysearchtree_improved.png)

**Input:** root = \[6,2,8,0,4,7,9,null,null,3,5\], p = 2, q = 8
**Output:** 6
**Explanation:** The LCA of nodes 2 and 8 is 6.

**Example 2:**

![](https://assets.leetcode.com/uploads/2018/12/14/binarysearchtree_improved.png)

**Input:** root = \[6,2,8,0,4,7,9,null,null,3,5\], p = 2, q = 4
**Output:** 2
**Explanation:** The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition.

**Example 3:**

**Input:** root = \[2,1\], p = 2, q = 1
**Output:** 2

**Constraints:**

*   The number of nodes in the tree is in the range `[2, 105]`.
*   `-109 <= Node.val <= 109`
*   All `Node.val` are **unique**.
*   `p != q`
*   `p` and `q` will exist in the BST.

## Code 

關鍵在於：只要不是以下兩個 case 

1. `curr->val > p->val && curr->val > q->val`
2. `curr->val < p->val && curr->val < q->val

就會是：

1. `curr->val == p->val && curr->val > q->val
2.  `curr->val > p->val && curr->val == q->val
3.  `curr->val < p->val && curr->val == q->val
4.  `curr->val == p->val && curr->val < q->val

代表 `curr` 的值和 `p, q` 其中一個一樣，`curr` 即是 `p, q` 的 Lowest Common Ancestor。

或者是：

1. `curr->val > p->val && curr->val < q->val`
2. `curr->val < p->val && curr->val > q->val

這也代表 `curr` 即是 `p, q` 的 Lowest Common Ancestor。

### Recursive

和 [[Lowest Common Ancestor of a Binary Tree]] 不一樣的地方在於我們可以利用 binary search tree 的特性。

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
        if(root->val > p->val && root->val > q->val) 
            return lowestCommonAncestor(root->left, p, q);
        if(root->val < p->val && root->val < q->val) 
            return lowestCommonAncestor(root->right, p, q);
        return root;
    }

};
```

### Iterative

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
        TreeNode* curr = root;
        while(true) {
            if(curr->val > p->val && curr->val > q->val) 
                curr = curr->left;
            else if(curr->val < p->val && curr->val < q->val) 
                curr = curr->right;
            else 
                break;
        }

        return curr;
    }

};
```

## Source
- [Lowest Common Ancestor of a Binary Search Tree - LeetCode](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/description/)