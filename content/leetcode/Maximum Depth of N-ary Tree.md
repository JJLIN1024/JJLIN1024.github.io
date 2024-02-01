---
title: Maximum Depth of N-ary Tree
date: 2023-03-15
lastmod: 2023-03-15
author: Jimmy Lin
tags:
  - binary_tree
  - tree
draft: false
---

## Description

Given a n-ary tree, find its maximum depth.

The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

_Nary-Tree input serialization is represented in their level order traversal, each group of children is separated by the null value (See examples)._

**Example 1:**

![](https://assets.leetcode.com/uploads/2018/10/12/narytreeexample.png)

**Input:** root = \[1,null,3,2,4,null,5,6\]
**Output:** 3

**Example 2:**

![](https://assets.leetcode.com/uploads/2019/11/08/sample_4_964.png)

**Input:** root = \[1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14\]
**Output:** 5

**Constraints:**

*   The total number of nodes is in the range `[0, 104]`.
*   The depth of the n-ary tree is less than or equal to `1000`.

## Code 

[[Maximum Depth of Binary Tree]] 的 generalized 版本。

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
    int maxDepth(Node* root) {
        if(!root) return 0;
        int tempMax = 0;
        for(auto child: root->children) {
            tempMax = max(tempMax, maxDepth(child));
        }
        return tempMax + 1;
    }
};
```

## Source
- [Maximum Depth of N-ary Tree - LeetCode](https://leetcode.com/problems/maximum-depth-of-n-ary-tree/description/)