---
title: Invert Binary Tree
date: 2023-02-17
lastmod: 2023-02-17
author: Jimmy Lin
tags:
  - binary_tree
  - review
draft: false
sr-due: 2024-11-14
sr-interval: 242
sr-ease: 310
---

## Description

Given the `root` of a binary tree, invert the tree, and return _its root_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/03/14/invert1-tree.jpg)

**Input:** root = \[4,2,7,1,3,6,9\]
**Output:** \[4,7,2,9,6,3,1\]

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/03/14/invert2-tree.jpg)

**Input:** root = \[2,1,3\]
**Output:** \[2,3,1\]

**Example 3:**

**Input:** root = \[\]
**Output:** \[\]

**Constraints:**

*   The number of nodes in the tree is in the range `[0, 100]`.
*   `-100 <= Node.val <= 100`

## Code 

### Recursive

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
    TreeNode* invertTree(TreeNode* root) {
        if(!root)
            return nullptr;

        auto left_inverted = invertTree(root->left);
        auto right_inverted = invertTree(root->right);

        root->right = left_inverted;
        root->left = right_inverted;

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
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        stack<TreeNode*> st;
        st.push(root);

        while(!st.empty()) {
            auto p = st.top(); st.pop();
            if(p) {
                st.push(p->left);
                st.push(p->right);
                swap(p->left, p->right);
            }
        }
        return root;
    }
};
```
## Source
- [Invert Binary Tree - LeetCode](https://leetcode.com/problems/invert-binary-tree/description/)