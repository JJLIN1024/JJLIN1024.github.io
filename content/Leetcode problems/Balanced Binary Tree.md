---
title: Balanced Binary Tree
date: 2023-03-13
lastmod: 2023-03-13
author: Jimmy Lin
tags:
  - binary_tree
  - hashmap
draft: false
---

## Description

Given a binary tree, determine if it is

**height-balanced**

.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/10/06/balance_1.jpg)

**Input:** root = \[3,9,20,null,null,15,7\]
**Output:** true

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/10/06/balance_2.jpg)

**Input:** root = \[1,2,2,3,3,null,null,4,4\]
**Output:** false

**Example 3:**

**Input:** root = \[\]
**Output:** true

**Constraints:**

*   The number of nodes in the tree is in the range `[0, 5000]`.
*   `-104 <= Node.val <= 104`

## Code 

### Recursion  + Hashmap

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
    unordered_map<TreeNode*, int> mp;
public:
    bool isBalanced(TreeNode* root) {
        if(!root) return true;
        int l = getHeight(root->left);
        int r = getHeight(root->right);
        return abs(l - r) <= 1 && isBalanced(root->left) && isBalanced(root->right);
    }

    int getHeight(TreeNode* node) {
        if(!node) return 0;
        if(mp.find(node) != mp.end()) return mp[node];
        int l = getHeight(node->left);
        int h = getHeight(node->right);
        return mp[node] = (max(l, h) + 1);
    }

};
```
## Source
- [Balanced Binary Tree - LeetCode](https://leetcode.com/problems/balanced-binary-tree/description/)