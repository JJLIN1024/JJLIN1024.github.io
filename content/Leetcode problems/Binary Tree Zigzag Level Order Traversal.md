---
title: Binary Tree Zigzag Level Order Traversal
date: 2023-04-21
lastmod: 2024-01-09
author:
  - Jimmy Lin
tags:
  - tree
  - tree_traversal
  - review
draft: false
sr-due: 2024-02-04
sr-interval: 21
sr-ease: 290
---

## Description

Given the `root` of a binary tree, return _the zigzag level order traversal of its nodes' values_. (i.e., from left to right, then right to left for the next level and alternate between).

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/02/19/tree1.jpg)

**Input:** root = \[3,9,20,null,null,15,7\]
**Output:** \[\[3\],\[20,9\],\[15,7\]\]

**Example 2:**

**Input:** root = \[1\]
**Output:** \[\[1\]\]

**Example 3:**

**Input:** root = \[\]
**Output:** \[\]

**Constraints:**

*   The number of nodes in the tree is in the range `[0, 2000]`.
*   `-100 <= Node.val <= 100`

## Code 

和 [[Binary Tree Level Order Traversal]] 類似，只是要考慮方向性。

### Level order traversal with reversion
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
    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
        
        vector<vector<int>> res;
        if(!root) return res;
        queue<TreeNode*> q;
        q.push(root);

        int level_n = 0;
        while(!q.empty()) {
            int levelSize = q.size();
            vector<int> level;
            for(int i = 0; i < levelSize; i++) {
                auto node = q.front();
                level.push_back(node->val);
                if(node->left) q.push(node->left);
                if(node->right) q.push(node->right);
                q.pop();
            }

            if(level_n % 2 != 0) reverse(level.begin(), level.end());
            res.push_back(level);
            level_n++;
        } 

        return res;
    }
};
```


### ### Level order traversal without reversion

關鍵在於：`int index = reverse? levelSize - i - 1 : i;`

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
    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
        
        vector<vector<int>> res;
        if(!root) return res;
        queue<TreeNode*> q;
        q.push(root);

        bool reverse = false;
        while(!q.empty()) {
            int levelSize = q.size();
            vector<int> level(levelSize);
            for(int i = 0; i < levelSize; i++) {
                auto node = q.front();
                int index = reverse? levelSize - i - 1 : i;
                level[index] = node->val;
                if(node->left) q.push(node->left);
                if(node->right) q.push(node->right);
                q.pop();
            }
            reverse = !reverse;
            res.push_back(level);
        } 

        return res;
    }
};
```


## Source
- [Binary Tree Zigzag Level Order Traversal - LeetCode](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/description/)