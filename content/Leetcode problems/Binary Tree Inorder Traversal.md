---
title: Binary Tree Inorder Traversal
date: 2023-03-22
lastmod: 2024-01-09
author:
  - Jimmy Lin
tags:
  - tree
  - tree_traversal
  - review
draft: false
sr-due: 2024-02-09
sr-interval: 28
sr-ease: 270
---

## Description

Given the `root` of a binary tree, return _the inorder traversal of its nodes' values_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/09/15/inorder_1.jpg)

**Input:** root = \[1,null,2,3\]
**Output:** \[1,3,2\]

**Example 2:**

**Input:** root = \[\]
**Output:** \[\]

**Example 3:**

**Input:** root = \[1\]
**Output:** \[1\]

**Constraints:**

*   The number of nodes in the tree is in the range `[0, 100]`.
*   `-100 <= Node.val <= 100`

**Follow up:** Recursive solution is trivial, could you do it iteratively?

## Code 

### Recursion
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
    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> res;
        if(!root) return res;
        traverse(root, res);
        return res;
    }

    void traverse(TreeNode* node, vector<int>& res) {
        if(node->left) traverse(node->left, res);
        res.push_back(node->val);
        if(node->right) traverse(node->right, res);
    }
};
```


### In-Place

和 [[Binary Tree Preorder Traversal]] 類似，差別只在於 `res.push_back(p->val);` 的時機。

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
    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> res;
        stack<TreeNode*> st;
        TreeNode* p = root;
        while(p || !st.empty()) {
            if(p) {
                st.push(p);
                p = p->left;
            } else {
                p = st.top(); 
                res.push_back(p->val);
                st.pop();
                p = p->right;
            }
        }
        return res;
    }
};
```


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
    vector<int> inorderTraversal(TreeNode* root) {
        stack<TreeNode*> st;
        vector<int> nodes;
        while (root || !st.empty()){
            while(root) {
                st.push(root);
                root = root->left;
            }
            root = st.top();
            st.pop();
            nodes.push_back(root->val);
            root = root->right;
        }

        return nodes;
    }
};
```

## Source
- [Binary Tree Inorder Traversal - LeetCode](https://leetcode.com/problems/binary-tree-inorder-traversal/description/)