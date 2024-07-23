---
title: Step-By-Step Directions From a Binary Tree Node to Another
date: 2024-07-17
lastmod: 2024-07-17
author:
  - Jimmy Lin
tags:
  - binary_tree
  - dfs
  - backtracking
draft: false
---

## Description

ou are given the `root` of a **binary tree** with `n` nodes. Each node is uniquely assigned a value from `1` to `n`. You are also given an integer `startValue` representing the value of the start node `s`, and a different integer `destValue` representing the value of the destination node `t`.

Find the **shortest path** starting from node `s` and ending at node `t`. Generate step-by-step directions of such path as a string consisting of only the **uppercase** letters `'L'`, `'R'`, and `'U'`. Each letter indicates a specific direction:

*   `'L'` means to go from a node to its **left child** node.
*   `'R'` means to go from a node to its **right child** node.
*   `'U'` means to go from a node to its **parent** node.

Return _the step-by-step directions of the **shortest path** from node_ `s` _to node_ `t`.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/11/15/eg1.png)

**Input:** root = \[5,1,2,3,null,6,4\], startValue = 3, destValue = 6
**Output:** "UURL"
**Explanation:** The shortest path is: 3 → 1 → 5 → 2 → 6.

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/11/15/eg2.png)

**Input:** root = \[2,1\], startValue = 2, destValue = 1
**Output:** "L"
**Explanation:** The shortest path is: 2 → 1.

**Constraints:**

*   The number of nodes in the tree is `n`.
*   `2 <= n <= 105`
*   `1 <= Node.val <= n`
*   All the values in the tree are **unique**.
*   `1 <= startValue, destValue <= n`
*   `startValue != destValue`

## Code 

[[Lowest Common Ancestor of a Binary Tree]] 的延伸，加上 dfs + backtracking

Time Complexity: $O(n)$, Space Complexity: $O(n)$

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
    string getDirections(TreeNode* root, int startValue, int destValue) {
        auto lca = LCA(root, startValue, destValue);
        string toStart = "", toEnd = "";
        getDir(lca, toStart, startValue, true);
        getDir(lca, toEnd, destValue, false);
        return toStart + toEnd;
    }

    TreeNode* LCA(TreeNode* root, int startValue, int destValue) {
        if(!root || root->val == startValue || root->val == destValue) 
            return root;
        auto LCA_l = LCA(root->left, startValue, destValue);
        auto LCA_r = LCA(root->right, startValue, destValue);
        if(LCA_l && LCA_r)
            return root;
        return LCA_l ? LCA_l : LCA_r;
    }

    bool getDir(TreeNode* root, string& path, int value, bool findStart) {
        if(!root)
            return false;
        if(root->val == value)
            return true;
        
        path += findStart ? 'U' : 'L';
        if(getDir(root->left, path, value, findStart))
            return true;
        path.pop_back();

        path += findStart ? 'U' : 'R';
        if(getDir(root->right, path, value, findStart))
            return true;
        path.pop_back();

        return false;
    }
};
```

## Source
- [Step-By-Step Directions From a Binary Tree Node to Another - LeetCode](https://leetcode.com/problems/step-by-step-directions-from-a-binary-tree-node-to-another/description/?envType=daily-question&envId=2024-07-16)