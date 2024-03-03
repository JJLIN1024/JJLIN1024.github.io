---
title: Populating Next Right Pointers in Each Node
date: 2023-04-09
lastmod: 2023-04-09
author: Jimmy Lin
tags: ["level order traversal", "binary tree"]
draft: false
---

## Description

You are given a **perfect binary tree** where all leaves are on the same level, and every parent has two children. The binary tree has the following definition:

struct Node {
  int val;
  Node \*left;
  Node \*right;
  Node \*next;
}

Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to `NULL`.

Initially, all next pointers are set to `NULL`.

**Example 1:**

![](https://assets.leetcode.com/uploads/2019/02/14/116_sample.png)

**Input:** root = \[1,2,3,4,5,6,7\]
**Output:** \[1,#,2,3,#,4,5,6,7,#\]
**Explanation:** Given the above perfect binary tree (Figure A), your function should populate each next pointer to point to its next right node, just like in Figure B. The serialized output is in level order as connected by the next pointers, with '#' signifying the end of each level.

**Example 2:**

**Input:** root = \[\]
**Output:** \[\]

**Constraints:**

*   The number of nodes in the tree is in the range `[0, 212 - 1]`.
*   `-1000 <= Node.val <= 1000`

**Follow-up:**

*   You may only use constant extra space.
*   The recursive approach is fine. You may assume implicit stack space does not count as extra space for this problem.

## Code 

### level order traversal

$O(n)$ space

```cpp
/*
// Definition for a Node.
class Node {
public:
    int val;
    Node* left;
    Node* right;
    Node* next;

    Node() : val(0), left(NULL), right(NULL), next(NULL) {}

    Node(int _val) : val(_val), left(NULL), right(NULL), next(NULL) {}

    Node(int _val, Node* _left, Node* _right, Node* _next)
        : val(_val), left(_left), right(_right), next(_next) {}
};
*/

class Solution {
public:
    Node* connect(Node* root) {
        if(!root) return root;

        queue<Node*> q;
        q.push(root);
        while(!q.empty()) {
            int levelSize = q.size();
            Node* node;
            for(int i = 0; i < levelSize; i++) {
                node = q.front();
                q.pop();
                if(!q.empty()) node->next = q.front();

                if(node->left) q.push(node->left);
                if(node->right) q.push(node->right);
            }

            node->next = nullptr;
        }

        return root;

    }
};
```


### Iterative 

$O(1)$ space

```cpp
/*
// Definition for a Node.
class Node {
public:
    int val;
    Node* left;
    Node* right;
    Node* next;

    Node() : val(0), left(NULL), right(NULL), next(NULL) {}

    Node(int _val) : val(_val), left(NULL), right(NULL), next(NULL) {}

    Node(int _val, Node* _left, Node* _right, Node* _next)
        : val(_val), left(_left), right(_right), next(_next) {}
};
*/

class Solution {
public:
    Node* connect(Node* root) {
        if(!root) return root;

        Node* levelStart = root;
        while(levelStart) {
            Node* curr = levelStart;
            while(curr) {
                if(curr->left)
                    curr->left->next = curr->right;
                if(curr->right && curr->next)
                    curr->right->next = curr->next->left;
                curr = curr->next;
            }
            levelStart = levelStart->left;
        }

        return root;

    }
};
```

## Source
- [Populating Next Right Pointers in Each Node - LeetCode](https://leetcode.com/problems/populating-next-right-pointers-in-each-node/description/)