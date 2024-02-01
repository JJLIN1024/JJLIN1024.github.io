---
title: Binary Tree Level Order Traversal II
date: 2024-01-09
lastmod: 2024-01-09
author:
  - Jimmy Lin
tags:
  - tree
  - tree_traversal
  - review
draft: false
sr-due: 2024-02-02
sr-interval: 19
sr-ease: 290
---

## Description

Given the `root` of a binary tree, return _the bottom-up level order traversal of its nodes' values_. (i.e., from left to right, level by level from leaf to root).

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/02/19/tree1.jpg)

**Input:** root = \[3,9,20,null,null,15,7\]
**Output:** \[\[15,7\],\[9,20\],\[3\]\]

**Example 2:**

**Input:** root = \[1\]
**Output:** \[\[1\]\]

**Example 3:**

**Input:** root = \[\]
**Output:** \[\]

**Constraints:**

*   The number of nodes in the tree is in the range `[0, 2000]`.
*   `-1000 <= Node.val <= 1000`

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(n)$

先做 [[Binary Tree Level Order Traversal]]，然後將結果 reverse 即可。

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
    vector<vector<int>> levelOrderBottom(TreeNode* root) {
        if(!root) return {};

        queue<TreeNode*> q;
        q.push(root);
        vector<vector<int>> res;
        vector<int> level = {};
        while(!q.empty()) {
            int n = q.size();
            level.clear();
            for(int i = 0; i < n; i++) {
                auto node = q.front();
                level.push_back(node->val);
                q.pop();
                if(node->left) q.push(node->left);
                if(node->right) q.push(node->right);
            }
            res.push_back(level);
        } 

        reverse(res.begin(), res.end());
        return res;
    }
};
```

## Source
- [Binary Tree Level Order Traversal II - LeetCode](https://leetcode.com/problems/binary-tree-level-order-traversal-ii/description/)