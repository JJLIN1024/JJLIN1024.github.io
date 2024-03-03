---
title: Even Odd Tree
date: 2024-02-29
lastmod: 2024-02-29
author:
  - Jimmy Lin
tags:
  - binary_tree
draft: false
---

## Description

A binary tree is named **Even-Odd** if it meets the following conditions:

*   The root of the binary tree is at level index `0`, its children are at level index `1`, their children are at level index `2`, etc.
*   For every **even-indexed** level, all nodes at the level have **odd** integer values in **strictly increasing** order (from left to right).
*   For every **odd-indexed** level, all nodes at the level have **even** integer values in **strictly decreasing** order (from left to right).

Given the `root` of a binary tree, _return_ `true` _if the binary tree is **Even-Odd**, otherwise return_ `false`_._

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/09/15/sample_1_1966.png)

**Input:** root = \[1,10,4,3,null,7,9,12,8,6,null,null,2\]
**Output:** true
**Explanation:** The node values on each level are:
Level 0: \[1\]
Level 1: \[10,4\]
Level 2: \[3,7,9\]
Level 3: \[12,8,6,2\]
Since levels 0 and 2 are all odd and increasing and levels 1 and 3 are all even and decreasing, the tree is Even-Odd.

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/09/15/sample_2_1966.png)

**Input:** root = \[5,4,2,3,3,7\]
**Output:** false
**Explanation:** The node values on each level are:
Level 0: \[5\]
Level 1: \[4,2\]
Level 2: \[3,3,7\]
Node values in level 2 must be in strictly increasing order, so the tree is not Even-Odd.

**Example 3:**

![](https://assets.leetcode.com/uploads/2020/09/22/sample_1_333_1966.png)

**Input:** root = \[5,9,1,3,5,7\]
**Output:** false
**Explanation:** Node values in the level 1 should be even integers.

**Constraints:**

*   The number of nodes in the tree is in the range `[1, 105]`.
*   `1 <= Node.val <= 106`

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(n)$

使用 [[Binary Tree Level Order Traversal]] 就行了。

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
    bool isEvenOddTree(TreeNode* root) {
        queue<TreeNode*> q;
        q.push(root);
        int level = 0;
        while(!q.empty()) {
            int n = q.size();
            int prev = level % 2 == 0 ? 0 : 1e6 + 1;
            for(int i = 0; i < n; i++) {
                bool increasing = level % 2 == 0 ? true : false;
                auto node = q.front();
                q.pop();

                if(increasing) {
                    if(node->val % 2 == 0)
                        return false;
                    else {
                        if(node->val <= prev)
                            return false;
                    }
                } else {
                    if(node->val % 2 != 0)
                        return false;
                    else {
                        if(node->val >= prev)
                            return false;
                    }
                }

                prev = node->val;
                
                if(node->left) q.push(node->left);
                if(node->right) q.push(node->right);
            }
            level++;
        }
        return true;
    }
};
```

## Source
- [Even Odd Tree - LeetCode](https://leetcode.com/problems/even-odd-tree/description/?envType=daily-question&envId=2024-02-29)