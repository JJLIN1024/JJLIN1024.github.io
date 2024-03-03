---
title: Minimum Absolute Difference in BST
date: 2024-02-26
lastmod: 2024-02-26
author:
  - Jimmy Lin
tags:
  - binary_tree
draft: false
---

## Description

Given the `root` of a Binary Search Tree (BST), return _the minimum absolute difference between the values of any two different nodes in the tree_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/02/05/bst1.jpg)

**Input:** root = \[4,2,6,1,3\]
**Output:** 1

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/02/05/bst2.jpg)

**Input:** root = \[1,0,48,null,null,12,49\]
**Output:** 1

**Constraints:**

*   The number of nodes in the tree is in the range `[2, 104]`.
*   `0 <= Node.val <= 105`

**Note:** This question is the same as 783: [https://leetcode.com/problems/minimum-distance-between-bst-nodes/](https://leetcode.com/problems/minimum-distance-between-bst-nodes/)

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(1)$

因為是 binary search tree，所以使用 [[Binary Tree Inorder Traversal]]。

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
    int getMinimumDifference(TreeNode* root) {
        stack<TreeNode*> st;
        TreeNode* p = root;
        int prev = -1;
        int res = INT_MAX;
        while(p || !st.empty()) {
            if(p) {
                st.push(p);
                p = p->left;
            } else {
                p = st.top(); 
                if(prev != -1) {
                    res = min(res, abs(p->val - prev));
                }
                prev = p->val;
                st.pop();
                p = p->right;
            }
        }
        return res;
    }
};
```

## Source
- [Minimum Absolute Difference in BST - LeetCode](https://leetcode.com/problems/minimum-absolute-difference-in-bst/description/?envType=study-plan-v2&envId=top-interview-150)