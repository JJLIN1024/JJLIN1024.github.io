---
title: Sum Root to Leaf Numbers
date: 2024-03-06
lastmod: 2024-03-06
author:
  - Jimmy Lin
tags:
  - binary_tree
draft: false
---

## Description

You are given the `root` of a binary tree containing digits from `0` to `9` only.

Each root-to-leaf path in the tree represents a number.

*   For example, the root-to-leaf path `1 -> 2 -> 3` represents the number `123`.

Return _the total sum of all root-to-leaf numbers_. Test cases are generated so that the answer will fit in a **32-bit** integer.

A **leaf** node is a node with no children.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/02/19/num1tree.jpg)

**Input:** root = \[1,2,3\]
**Output:** 25
**Explanation:**
The root-to-leaf path `1->2` represents the number `12`.
The root-to-leaf path `1->3` represents the number `13`.
Therefore, sum = 12 + 13 = `25`.

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/02/19/num2tree.jpg)

**Input:** root = \[4,9,0,5,1\]
**Output:** 1026
**Explanation:**
The root-to-leaf path `4->9->5` represents the number 495.
The root-to-leaf path `4->9->1` represents the number 491.
The root-to-leaf path `4->0` represents the number 40.
Therefore, sum = 495 + 491 + 40 = `1026`.

**Constraints:**

*   The number of nodes in the tree is in the range `[1, 1000]`.
*   `0 <= Node.val <= 9`
*   The depth of the tree will not exceed `10`.

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(1)$

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
    int res;
    int sumNumbers(TreeNode* root) {
        res = 0;
        helper(root, 0);
        return res;
    }

    void helper(TreeNode* node, int cur) {
        if(!node)
            return;
        cur = cur * 10 + node->val;
        if(!node->left && !node->right)
            res += cur;
        helper(node->left, cur);
        helper(node->right, cur);
    }
};
```

## Source
- [Sum Root to Leaf Numbers - LeetCode](https://leetcode.com/problems/sum-root-to-leaf-numbers/description/)