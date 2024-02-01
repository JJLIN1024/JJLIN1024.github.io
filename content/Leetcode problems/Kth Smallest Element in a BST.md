---
title: Kth Smallest Element in a BST
date: 2023-03-22
lastmod: 2023-03-22
author: Jimmy Lin
tags:
  - binary_tree
draft: false
---

## Description

Given the `root` of a binary search tree, and an integer `k`, return _the_ `kth` _smallest value (**1-indexed**) of all the values of the nodes in the tree_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/01/28/kthtree1.jpg)

**Input:** root = \[3,1,4,null,2\], k = 1
**Output:** 1

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/01/28/kthtree2.jpg)

**Input:** root = \[5,3,6,2,4,null,null,1\], k = 3
**Output:** 3

**Constraints:**

*   The number of nodes in the tree is `n`.
*   `1 <= k <= n <= 104`
*   `0 <= Node.val <= 104`

**Follow up:** If the BST is modified often (i.e., we can do insert and delete operations) and you need to find the kth smallest frequently, how would you optimize?

## Code 

使用 [[Binary Tree Inorder Traversal]]，因為 inorder traversal 就是由小到大。

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
    int kthSmallest(TreeNode* root, int k) {
        stack<TreeNode*> st;
        while(root || !st.empty()) {
            while(root) {
                st.push(root);
                root = root->left;
            }
            root = st.top(); st.pop();
            if(--k == 0) break;
            root = root->right;
        }

        return root->val;
    }
};
```

## Source
- [Kth Smallest Element in a BST - LeetCode](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)