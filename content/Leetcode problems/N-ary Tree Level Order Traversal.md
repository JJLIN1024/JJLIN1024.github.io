---
title: N-ary Tree Level Order Traversal
date: 2024-01-09
lastmod: 2024-01-09
author:
  - Jimmy Lin
tags:
  - tree
  - tree_traversal
  - review
draft: false
sr-due: 2024-11-21
sr-interval: 250
sr-ease: 310
---

## Description

Given an n-ary tree, return the _level order_ traversal of its nodes' values.

_Nary-Tree input serialization is represented in their level order traversal, each group of children is separated by the null value (See examples)._

**Example 1:**

![](https://assets.leetcode.com/uploads/2018/10/12/narytreeexample.png)

**Input:** root = \[1,null,3,2,4,null,5,6\]
**Output:** \[\[1\],\[3,2,4\],\[5,6\]\]

**Example 2:**

![](https://assets.leetcode.com/uploads/2019/11/08/sample_4_964.png)

**Input:** root = \[1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14\]
**Output:** \[\[1\],\[2,3,4,5\],\[6,7,8,9,10\],\[11,12,13\],\[14\]\]

**Constraints:**

*   The height of the n-ary tree is less than or equal to `1000`
*   The total number of nodes is between `[0, 104]`

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(1)$

只是 [[Binary Tree Level Order Traversal]] 的 generalization 而已。

```cpp
/*
// Definition for a Node.
class Node {
public:
    int val;
    vector<Node*> children;

    Node() {}

    Node(int _val) {
        val = _val;
    }

    Node(int _val, vector<Node*> _children) {
        val = _val;
        children = _children;
    }
};
*/

class Solution {
public:
    vector<vector<int>> levelOrder(Node* root) {
       if(!root) return {};

        queue<Node*> q;
        q.push(root);
        vector<vector<int>> res;
        vector<int> level = {};
        while(!q.empty()) {
            int n = q.size();
            level.clear();
            for(int i = 0; i < n; i++) {
                auto node = q.front();
                level.push_back(node->val);
                q.pop();
                for(auto child: node->children)
                    q.push(child);
            }
            res.push_back(level);
        } 
        return res;
    }
};
```

## Source
- [N-ary Tree Level Order Traversal - LeetCode](https://leetcode.com/problems/n-ary-tree-level-order-traversal/description/)