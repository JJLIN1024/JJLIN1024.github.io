---
title: Flatten Binary Tree to Linked List
date: 2024-02-26
lastmod: 2024-02-26
author:
  - Jimmy Lin
tags:
  - binary_tree
  - review
draft: false
sr-due: 2024-03-01
sr-interval: 4
sr-ease: 270
---

## Description

Given the `root` of a binary tree, flatten the tree into a "linked list":

*   The "linked list" should use the same `TreeNode` class where the `right` child pointer points to the next node in the list and the `left` child pointer is always `null`.
*   The "linked list" should be in the same order as a [**pre-order** **traversal**](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR) of the binary tree.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/01/14/flaten.jpg)

**Input:** root = \[1,2,5,3,4,null,6\]
**Output:** \[1,null,2,null,3,null,4,null,5,null,6\]

**Example 2:**

**Input:** root = \[\]
**Output:** \[\]

**Example 3:**

**Input:** root = \[0\]
**Output:** \[0\]

**Constraints:**

*   The number of nodes in the tree is in the range `[0, 2000]`.
*   `-100 <= Node.val <= 100`

**Follow up:** Can you flatten the tree in-place (with `O(1)` extra space)?

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(1)$

神解法。

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
    void flatten(TreeNode* root) {
        if(root) {
            auto tmp = root->right;
            root->right = root->left;
            root->left = nullptr;
            auto node = root;
            while(node->right) 
                node = node->right;
            node->right = tmp;
            flatten(root->right);
        }
    }
};
```

## Source
- [Flatten Binary Tree to Linked List - LeetCode](https://leetcode.com/problems/flatten-binary-tree-to-linked-list/description/?envType=study-plan-v2&envId=top-interview-150)