---
title: Binary Tree Maximum Path Sum
date: 2024-01-09
lastmod: 2024-01-09
author:
  - Jimmy Lin
tags:
  - DP
  - review
draft: false
sr-due: 2024-02-05
sr-interval: 19
sr-ease: 270
---

## Description

A **path** in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence **at most once**. Note that the path does not need to pass through the root.

The **path sum** of a path is the sum of the node's values in the path.

Given the `root` of a binary tree, return _the maximum **path sum** of any **non-empty** path_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/10/13/exx1.jpg)

**Input:** root = \[1,2,3\]
**Output:** 6
**Explanation:** The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/10/13/exx2.jpg)

**Input:** root = \[-10,9,20,null,null,15,7\]
**Output:** 42
**Explanation:** The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.

**Constraints:**

*   The number of nodes in the tree is in the range `[1, 3 * 104]`.
*   `-1000 <= Node.val <= 1000`

## Code 

Time Complexity: $O(N)$, Space Complexity: $O(1)$

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
    int maxSum = INT_MIN;
public:
    int maxPathSum(TreeNode* root) {
        maxPath(root);
        return maxSum;
    }

    int maxPath(TreeNode* node) {
        if(!node) return 0;
        int leftBranchMax = max(maxPath(node->left), 0);
        int rightBranchMax = max(maxPath(node->right), 0);
        maxSum = max(maxSum, node->val + leftBranchMax + rightBranchMax);
        return node->val + max(leftBranchMax,rightBranchMax);
    }
};
```

## Source
- [Binary Tree Maximum Path Sum - LeetCode](https://leetcode.com/problems/binary-tree-maximum-path-sum/description/)