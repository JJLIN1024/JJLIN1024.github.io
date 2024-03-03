---
title: N-ary Tree Preorder Traversal
date: 2023-03-31
lastmod: 2023-03-31
author:
  - Jimmy Lin
tags:
  - tree
  - traversal
  - review
draft: false
sr-due: 2024-03-09
sr-interval: 45
sr-ease: 288
---

## Description

Given the `root` of an n-ary tree, return _the preorder traversal of its nodes' values_.

Nary-Tree input serialization is represented in their level order traversal. Each group of children is separated by the null value (See examples)

**Example 1:**

![](https://assets.leetcode.com/uploads/2018/10/12/narytreeexample.png)

**Input:** root = \[1,null,3,2,4,null,5,6\]
**Output:** \[1,3,5,6,2,4\]

**Example 2:**

![](https://assets.leetcode.com/uploads/2019/11/08/sample_4_964.png)

**Input:** root = \[1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14\]
**Output:** \[1,2,3,6,7,11,14,4,8,12,5,9,13,10\]

**Constraints:**

*   The number of nodes in the tree is in the range `[0, 104]`.
*   `0 <= Node.val <= 104`
*   The height of the n-ary tree is less than or equal to `1000`.

**Follow up:** Recursive solution is trivial, could you do it iteratively?

## Code 

same approach as [[Binary Tree Preorder Traversal]]

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
    vector<int> preorder(Node* root) {
        if(!root) return {};
        stack<Node*> st;
        vector<int> answer;
        st.push(root);
        while(!st.empty()) {
            auto node = st.top();
            st.pop();
            answer.push_back(node->val);
            for(int i = node->children.size() - 1; i >= 0; i--) {
                if(node->children[i])
                    st.push(node->children[i]);
            }
        }

        return answer;
    }
};
```

## Source
- [N-ary Tree Preorder Traversal - LeetCode](https://leetcode.com/problems/n-ary-tree-preorder-traversal/description/)