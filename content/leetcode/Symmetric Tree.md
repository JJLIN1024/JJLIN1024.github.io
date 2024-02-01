---
title: Symmetric Tree
date: 2023-03-18
lastmod: 2023-03-18
author: Jimmy Lin
tags: ["tree"]
draft: false
---

## Description

Given the `root` of a binary tree, _check whether it is a mirror of itself_ (i.e., symmetric around its center).

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/02/19/symtree1.jpg)

**Input:** root = \[1,2,2,3,4,4,3\]
**Output:** true

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/02/19/symtree2.jpg)

**Input:** root = \[1,2,2,null,3,null,3\]
**Output:** false

**Constraints:**

*   The number of nodes in the tree is in the range `[1, 1000]`.
*   `-100 <= Node.val <= 100`

**Follow up:** Could you solve it both recursively and iteratively?

## Code 

### recursive
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
    bool isSymmetric(TreeNode* root) {
        return !root || helper(root->left, root->right);
    }

    bool helper(TreeNode* left, TreeNode* right) {
        if(!left || !right) return left == right;
        if(left->val != right->val) return false;
        return helper(left->right, right->left) && helper(left->left, right->right);
    }
};
```


### Iterative

using queue.

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */

class Solution {
public:
    bool isSymmetric(TreeNode* root) {
        if (!root) return true;
        queue<TreeNode*> check;
        
        check.push(root->left);
        check.push(root->right);
        
        while (!check.empty()) {
            TreeNode* node1 = check.front();
            check.pop();
            TreeNode* node2 = check.front();
            check.pop();
            if (!node1 && node2) return false;
            if (!node2 && node1) return false;
            if (node1 && node2) {
                if (node1->val != node2->val) return false;
                check.push(node1->left);
                check.push(node2->right);
                check.push(node1->right);
                check.push(node2->left);
            }
        }
        
        return true;
            
        }
};

```

## Source
- [Symmetric Tree - LeetCode](https://leetcode.com/problems/symmetric-tree/description/)