---
title: Validate Binary Search Tree
date: 2023-03-22
lastmod: 2023-03-22
author: Jimmy Lin
tags:
  - binary_tree
draft: false
---

## Description

Given the `root` of a binary tree, _determine if it is a valid binary search tree (BST)_.

A **valid BST** is defined as follows:

*   The left
    
    subtree
    
    of a node contains only nodes with keys **less than** the node's key.
*   The right subtree of a node contains only nodes with keys **greater than** the node's key.
*   Both the left and right subtrees must also be binary search trees.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/12/01/tree1.jpg)

**Input:** root = \[2,1,3\]
**Output:** true

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/12/01/tree2.jpg)

**Input:** root = \[5,1,4,null,null,3,6\]
**Output:** false
**Explanation:** The root node's value is 5 but its right child's value is 4.

**Constraints:**

*   The number of nodes in the tree is in the range `[1, 104]`.
*   `-231 <= Node.val <= 231 - 1`

## Code 

Beware of the constraints, use `long` instead of `int`.

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
    bool isValidBST(TreeNode* root) {
        return helper(root, LONG_MIN, LONG_MAX);
    }

    bool helper(TreeNode* node, long left_bound, long right_bound) {
        if(!node) return true;
        if(node->val <= left_bound || node->val >= right_bound) return false;
        return helper(node->left, left_bound, node->val) && helper(node->right, node->val, right_bound);
    }
};

```


也可以使用 [[Binary Tree Inorder Traversal]]，在 traversal 中途判斷是否合理。

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
    bool isValidBST(TreeNode* root) {
        stack<TreeNode*> st;
        TreeNode* prev = nullptr;
        while(root || !st.empty()) {
            if(root) {
                st.push(root);
                root = root->left;
            } else {
                root = st.top(); st.pop();
                if(prev && (prev->val >= root->val)) return false;
                prev = root;
                root = root->right;
            }
        }
        return true;
    }
};
```
## Source
- [Validate Binary Search Tree - LeetCode](https://leetcode.com/problems/validate-binary-search-tree/description/)