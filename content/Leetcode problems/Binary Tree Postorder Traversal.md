---
title: Binary Tree Postorder Traversal
date: 2023-03-22
lastmod: 2023-03-22
author: Jimmy Lin
tags:
  - tree
  - tree_traversal
  - review
draft: false
sr-due: 2024-03-18
sr-interval: 66
sr-ease: 210
---

## Description

Given the `root` of a binary tree, return _the postorder traversal of its nodes' values_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/08/28/pre1.jpg)

**Input:** root = \[1,null,2,3\]
**Output:** \[3,2,1\]

**Example 2:**

**Input:** root = \[\]
**Output:** \[\]

**Example 3:**

**Input:** root = \[1\]
**Output:** \[1\]

**Constraints:**

*   The number of the nodes in the tree is in the range `[0, 100]`.
*   `-100 <= Node.val <= 100`

**Follow up:** Recursive solution is trivial, could you do it iteratively?

## Code 

和 [[Binary Tree Preorder Traversal]] 類似，差別只在於向左向右的順序。

Key 在於 `LRN` 反過來就是 `NRL`，而 preorder 是 `NLR`。

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
    vector<int> postorderTraversal(TreeNode* root) {
        vector<int> res;
        stack<TreeNode*> st;
        TreeNode* p = root;
        while(p || !st.empty()) {
            if(p) {
                res.push_back(p->val);
                st.push(p);
                p = p->right;
            } else {
                p = st.top(); st.pop();
                p = p->left;
            }
        }
        reverse(res.begin(), res.end());
        return res;
    }
};
```

traverse without reverse：

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
    vector<int> postorderTraversal(TreeNode* root) {
        vector<int> nodes;
        stack<TreeNode*> st;
        TreeNode* prev = nullptr;
        while(root || !st.empty()) {
            if(root) {
                st.push(root);
                root = root->left;
            } else {
                TreeNode* node = st.top();
                if(node->right && prev != node->right) {
                    root = node->right;
                } else {
                    nodes.push_back(node->val);
                    prev = node;
                    st.pop();
                }
            }
        }
        return nodes;
    }
};
```

### push twice !

Brilliant idea! The algorithm is that we push each node twice onto the stack. Each time we pop a node out, if we see that there is a same node on the stack, we know that we have not done traversing yet, and need to keep pushing the current node's children onto the stack. However, if the stack is empty, or the top element is not the same as the current element, we know that we're done searching with this node, thus we can add this node to the result.

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
    vector<int> postorderTraversal(TreeNode* root) {
        if(!root) return {};
        vector<int> nodes;
        stack<TreeNode*> st;
        st.push(root);
        st.push(root);
        TreeNode* curr;
        while(!st.empty()) {
            curr = st.top();
            st.pop();
            if(!st.empty() && st.top() == curr) {
                if(curr->right) {
                    st.push(curr->right);
                    st.push(curr->right);
                }
                if(curr->left) {
                    st.push(curr->left);
                    st.push(curr->left);
                }
            } else {
                nodes.push_back(curr->val);
            }
        }
        return nodes;
    }
};
```

## Source
- [Binary Tree Postorder Traversal - LeetCode](https://leetcode.com/problems/binary-tree-postorder-traversal/description/)