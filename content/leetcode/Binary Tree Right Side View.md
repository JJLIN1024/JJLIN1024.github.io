---
title: Binary Tree Right Side View
date: 2023-04-09
lastmod: 2023-04-09
author: Jimmy Lin
tags:
  - binary_tree
  - tree_traversal
  - review
draft: false
sr-due: 2024-02-28
sr-interval: 28
sr-ease: 290
---

## Description

Given the `root` of a binary tree, imagine yourself standing on the **right side** of it, return _the values of the nodes you can see ordered from top to bottom_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/02/14/tree.jpg)

**Input:** root = \[1,2,3,null,5,null,4\]
**Output:** \[1,3,4\]

**Example 2:**

**Input:** root = \[1,null,3\]
**Output:** \[1,3\]

**Example 3:**

**Input:** root = \[\]
**Output:** \[\]

**Constraints:**

*   The number of nodes in the tree is in the range `[0, 100]`.
*   `-100 <= Node.val <= 100`

## Code 

題意就是要每一個 level 最右側的點，因此使用 level order traversal。

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
    vector<int> rightSideView(TreeNode* root) {
        vector<int> res;
        if(!root) return res;
        queue<TreeNode*> q;
        q.push(root);

        while(!q.empty()) {
            int levelSize = q.size();
            TreeNode* rightSideNode;
            for(int i = 0; i < levelSize; i++) {
                auto node = q.front();
                rightSideNode = node;
                q.pop();
                if(node->left) q.push(node->left);
                if(node->right) q.push(node->right);
            }
            res.push_back(rightSideNode->val);
        }

        return res;
    }
};
```

Brilliant ! `if(res.size()<level) res.push_back(root->val);`

```cpp
class Solution {
public:
    void recursion(TreeNode *root, int level, vector<int> &res)
    {
        if(root==NULL) return ;
        if(res.size()<level) res.push_back(root->val);
        recursion(root->right, level+1, res);
        recursion(root->left, level+1, res);
    }
    
    vector<int> rightSideView(TreeNode *root) {
        vector<int> res;
        recursion(root, 1, res);
        return res;
    }
};
```
## Source
- [Binary Tree Right Side View - LeetCode](https://leetcode.com/problems/binary-tree-right-side-view/)