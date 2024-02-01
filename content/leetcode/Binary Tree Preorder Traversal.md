---
title: Binary Tree Preorder Traversal
date: 2023-03-22
lastmod: 2023-03-22
author:
  - Jimmy Lin
tags:
  - tree
  - tree_traversal
  - review
draft: false
sr-due: 2024-03-02
sr-interval: 39
sr-ease: 270
---

## Description

Given the `root` of a binary tree, return _the preorder traversal of its nodes' values_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/09/15/inorder_1.jpg)

**Input:** root = \[1,null,2,3\]
**Output:** \[1,2,3\]

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

### Iterative

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
    vector<int> preorderTraversal(TreeNode* root) {
       vector<int> res;
        stack<TreeNode*> st;
        TreeNode* p = root;
        while(p || !st.empty()) {
            if(p) {
                res.push_back(p->val);
                st.push(p);
                p = p->left;
            } else {
                p = st.top(); st.pop();
                p = p->right;
            }
        }
        return res;
    }
};
```


將所有 node 都 push 到 stack 上，經由 pop 的過程來執行 preorder traversal。
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
    vector<int> preorderTraversal(TreeNode* root) {
        vector<int> nodes;
        stack<TreeNode*> st;
        if(!root) return {};
        st.push(root);
        while(!st.empty()) {
            auto node = st.top(); st.pop();
            nodes.push_back(node->val);
            if(node->right) st.push(node->right);
            if(node->left) st.push(node->left);
        }
        return nodes;
    }
};
```

另一種做法是只將 right child push 到 stack 上，其他部分的 traversal 藉由 root pointer 的移動來達成。

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
    vector<int> preorderTraversal(TreeNode* root) {
        vector<int> nodes;
        stack<TreeNode*> st;
        while(root || !st.empty()) {
            if(root) {
                nodes.push_back(root->val);
                if(root->right) {
                    st.push(root->right);
                }
                root = root->left;
            } else {
                root = st.top();
                st.pop();
            }
        }
        return nodes;
    }
};
```

## Source
- [Binary Tree Preorder Traversal - LeetCode](https://leetcode.com/problems/binary-tree-preorder-traversal/description/)