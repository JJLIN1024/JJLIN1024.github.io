---
title: Path Sum III
date: 2023-04-18
lastmod: 2023-04-18
author:
  - Jimmy Lin
tags:
  - dfs
  - tree
draft: false
---

## Description

Given the `root` of a binary tree and an integer `targetSum`, return _the number of paths where the sum of the values along the path equals_ `targetSum`.

The path does not need to start or end at the root or a leaf, but it must go downwards (i.e., traveling only from parent nodes to child nodes).

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/04/09/pathsum3-1-tree.jpg)

**Input:** root = \[10,5,-3,3,2,null,11,3,-2,null,1\], targetSum = 8
**Output:** 3
**Explanation:** The paths that sum to 8 are shown.

**Example 2:**

**Input:** root = \[5,4,8,11,null,13,4,7,2,null,null,5,1\], targetSum = 22
**Output:** 3

**Constraints:**

*   The number of nodes in the tree is in the range `[0, 1000]`.
*   `-109 <= Node.val <= 109`
*   `-1000 <= targetSum <= 1000`

## Code 

[[Path Sum II]] 的變形。

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
    int count = 0;
    int pathSum(TreeNode* root, int targetSum) {
        
        if(root) {
            dfs(root, (long)targetSum);
            pathSum(root->left, targetSum);
            pathSum(root->right, targetSum);
        }

        return count;
        
    }

    void dfs(TreeNode* node, long targetSum) {
        if(!node) return;
        if(targetSum == node->val) count++;
        dfs(node->left, targetSum - node->val);
        dfs(node->right, targetSum - node->val);
    }
};
```

## Source
- [Path Sum III - LeetCode](https://leetcode.com/problems/path-sum-iii/description/)