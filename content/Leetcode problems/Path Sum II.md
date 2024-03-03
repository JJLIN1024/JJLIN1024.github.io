---
title: Path Sum II
date: 2023-04-18
lastmod: 2024-01-09
author:
  - Jimmy Lin
tags:
  - dfs
  - tree
draft: false
---

## Description

Given the `root` of a binary tree and an integer `targetSum`, return _all **root-to-leaf** paths where the sum of the node values in the path equals_ `targetSum`_. Each path should be returned as a list of the node **values**, not node references_.

A **root-to-leaf** path is a path starting from the root and ending at any leaf node. A **leaf** is a node with no children.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/01/18/pathsumii1.jpg)

**Input:** root = \[5,4,8,11,null,13,4,7,2,null,null,5,1\], targetSum = 22
**Output:** \[\[5,4,11,2\],\[5,8,4,5\]\]
**Explanation:** There are two paths whose sum equals targetSum:
5 + 4 + 11 + 2 = 22
5 + 8 + 4 + 5 = 22

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/01/18/pathsum2.jpg)

**Input:** root = \[1,2,3\], targetSum = 5
**Output:** \[\]

**Example 3:**

**Input:** root = \[1,2\], targetSum = 0
**Output:** \[\]

**Constraints:**

*   The number of nodes in the tree is in the range `[0, 5000]`.
*   `-1000 <= Node.val <= 1000`
*   `-1000 <= targetSum <= 1000`

## Code 

只是 [[Path Sum]] 加上印出 path 而已。

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
    vector<vector<int>> pathSum(TreeNode* root, int targetSum) {
        vector<vector<int>> paths;
        vector<int> path;
        dfs(root, paths, path, targetSum);

        return paths;
    }


    void dfs(TreeNode* node, vector<vector<int>>& paths, vector<int> path, int targetSum) {
        if(!node) return;
        if(!node->left && !node->right) {
            if(targetSum == node->val) {
                path.push_back(node->val);
                paths.push_back(path);
            }
            return;
        } 

        targetSum -= node->val;
        path.push_back(node->val);
        if(node->left)
            dfs(node->left, paths, path, targetSum);
        if(node->right)
            dfs(node->right, paths, path, targetSum);
    }
};
```

## Source
- [Path Sum II - LeetCode](https://leetcode.com/problems/path-sum-ii/description/)