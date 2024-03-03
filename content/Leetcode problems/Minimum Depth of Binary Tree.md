---
title: Minimum Depth of Binary Tree
date: 2023-03-15
lastmod: 2023-03-15
author: Jimmy Lin
tags: ["Binary Tree"]
draft: false
---

## Description

Given a binary tree, find its minimum depth.

The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.

**Note:** A leaf is a node with no children.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/10/12/ex_depth.jpg)

**Input:** root = \[3,9,20,null,null,15,7\]
**Output:** 2

**Example 2:**

**Input:** root = \[2,null,3,null,4,null,5,null,6\]
**Output:** 5

**Constraints:**

*   The number of nodes in the tree is in the range `[0, 105]`.
*   `-1000 <= Node.val <= 1000`

## Code 

和 [[Maximum Depth of Binary Tree]] 直接無腦往下遞迴不一樣，計算 minDepth 時會需要注意一個重點，重點在於：什麼是 leaf node？leaf node 就是左右子樹都是 nullptr 的 node，只有一個為 nullptr 的不算是 leaf node。

因為當 Binary Tree 為 skew 的時候，例如 Example 2，只有一個子樹為 nullptr 的 node 其 depth 有一邊會回傳 0 但是這會被取 max 的動作忽略掉，但是這個回傳 0 的動作不會被取 min 忽略，因此會影響最終答案（雖然該 node 並非 leaf node）。

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
    int minDepth(TreeNode* root) {
        if(!root) return 0;
        int d = INT_MAX;
        int curr_d = 1;
        minDepth(root, d, curr_d);
        return d;
    }

    void minDepth(TreeNode* node, int& depth, int curr_depth) {
        if(!node) return;
        if(!node->left && !node->right) {
            depth = min(depth, curr_depth);
            return;
        }

        minDepth(node->left, depth, curr_depth + 1);
        minDepth(node->right, depth, curr_depth + 1);
    }
};
```

更簡潔的版本。

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
    int minDepth(TreeNode* root) {
        if(root==NULL) return 0;
        else if(root->right==NULL && root->left==NULL) return 1;
        else if(root->left==NULL) return minDepth(root->right)+1;
        else if(root->right==NULL) return minDepth(root->left)+1;
        return min(minDepth(root->left),minDepth(root->right)) +1;
    }
};
```

## Source
- [Minimum Depth of Binary Tree - LeetCode](https://leetcode.com/problems/minimum-depth-of-binary-tree/description/)