---
title: Unique Binary Search Trees II
date: 2024-03-06
lastmod: 2024-03-06
author:
  - Jimmy Lin
tags:
  - binary_tree
  - divide_and_conquer
draft: false
---

## Description

Given an integer `n`, return _all the structurally unique **BST'**s (binary search trees), which has exactly_ `n` _nodes of unique values from_ `1` _to_ `n`. Return the answer in **any order**.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/01/18/uniquebstn3.jpg)

**Input:** n = 3
**Output:** \[\[1,null,2,null,3\],\[1,null,3,2\],\[2,1,3\],\[3,1,null,null,2\],\[3,2,null,1\]\]

**Example 2:**

**Input:** n = 1
**Output:** \[\[1\]\]

**Constraints:**

*   `1 <= n <= 8`

## Code 

time complexity 就是 [Catalan Numbers](https://brilliant.org/wiki/catalan-numbers/)。

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

    vector<TreeNode*> generateTrees(int n) {
        return buildTree(1, n);
    }

    vector<TreeNode*> buildTree(int start, int end) {
        vector<TreeNode*> ans;
            
        // If start > end, then subtree will be empty so add NULL in the ans and return it.
        if(start > end) {
            ans.push_back(NULL);
            return ans;
        }

        // Iterate through all values from start to end to construct left and right subtree recursively
        for(int i = start; i <= end; ++i) {
            vector<TreeNode*> leftSubTree = buildTree(start, i - 1);    // Construct left subtree
            vector<TreeNode*> rightSubTree = buildTree(i + 1, end);     // Construct right subtree
                
            // loop through all left and right subtrees and connect them to ith root  
            for(int j = 0; j < leftSubTree.size(); j++) {
                for(int k = 0; k < rightSubTree.size(); k++) {
                    TreeNode* root = new TreeNode(i);   // Create root with value i
                    root->left = leftSubTree[j];   // Connect left subtree rooted at leftSubTree[j]
                    root->right = rightSubTree[k];   // Connect right subtree rooted at rightSubTree[k]
                    ans.push_back(root);    // Add this tree(rooted at i) to ans data-structure
                }
            }
        }
            
        return ans;
    }
};
```

## Source
- [Unique Binary Search Trees II - LeetCode](https://leetcode.com/problems/unique-binary-search-trees-ii/description/)