---
title: Two Sum IV - Input is a BST
date: 2023-01-06
lastmod: 2023-01-06
author: Jimmy Lin
tags: ["hashmap", "set"]
draft: false
---

## Description

Given the `root` of a binary search tree and an integer `k`, return `true` _if there exist two elements in the BST such that their sum is equal to_ `k`, _or_ `false` _otherwise_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/09/21/sum_tree_1.jpg)

**Input:** root = \[5,3,6,2,4,null,7\], k = 9
**Output:** true

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/09/21/sum_tree_2.jpg)

**Input:** root = \[5,3,6,2,4,null,7\], k = 28
**Output:** false

**Constraints:**

*   The number of nodes in the tree is in the range `[1, 104]`.
*   `-104 <= Node.val <= 104`
*   `root` is guaranteed to be a **valid** binary search tree.
*   `-105 <= k <= 105`

## Code 

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
    bool findTarget(TreeNode* root, int k) {
        set<int> m;
        return helper(root, m, k);
    }

    bool helper(TreeNode* node, set<int>& map, int target) {
        if(!node) return false;
        if(map.count(target - node->val) > 0) return true;
        map.insert(node->val);
        return helper(node->left, map, target) || helper(node->right, map, target);
    }
};
```

## Source
- [Two Sum IV - Input is a BST - LeetCode](https://leetcode.com/problems/two-sum-iv-input-is-a-bst/description/)