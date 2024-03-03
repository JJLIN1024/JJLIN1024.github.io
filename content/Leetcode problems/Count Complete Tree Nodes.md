---
title: Count Complete Tree Nodes
date: 2024-02-26
lastmod: 2024-02-26
author:
  - Jimmy Lin
tags:
  - binary_tree
  - review
draft: false
sr-due: 2024-02-27
sr-interval: 1
sr-ease: 230
---

## Description

Given the `root` of a **complete** binary tree, return the number of the nodes in the tree.

According to **[Wikipedia](http://en.wikipedia.org/wiki/Binary_tree#Types_of_binary_trees)**, every level, except possibly the last, is completely filled in a complete binary tree, and all nodes in the last level are as far left as possible. It can have between `1` and `2h` nodes inclusive at the last level `h`.

Design an algorithm that runs in less than `O(n)` time complexity.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/01/14/complete.jpg)

**Input:** root = \[1,2,3,4,5,6\]
**Output:** 6

**Example 2:**

**Input:** root = \[\]
**Output:** 0

**Example 3:**

**Input:** root = \[1\]
**Output:** 1

**Constraints:**

*   The number of nodes in the tree is in the range `[0, 5 * 104]`.
*   `0 <= Node.val <= 5 * 104`
*   The tree is guaranteed to be **complete**.

## Code 

Key: The subtree of a complete binary tree is also a complete binary tree.

compare the depth between left sub tree and right sub tree.  
1. A, If it is equal, it means the left sub tree is a full binary tree  
2. B, It it is not , it means the right sub tree is a full binary tree

Time Complexity: $O(\log n \cdot \log n)$, Space Complexity: $O(1)$

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
    int countNodes(TreeNode* root) {
        if(!root) return 0;
        int leftDepth = getDepth(root->left);
        int rightDepth = getDepth(root->right);
        if(leftDepth == rightDepth) {
            return pow(2, leftDepth) + countNodes(root->right);
        } else {
            return pow(2, rightDepth)  + countNodes(root->left);
        }
 
    }

    int getDepth(TreeNode* root){
        if(!root) return 0;
        return 1 + getDepth(root->left);
    }


};
```

## Source
- [Count Complete Tree Nodes - LeetCode](https://leetcode.com/problems/count-complete-tree-nodes/description/?envType=study-plan-v2&envId=top-interview-150)