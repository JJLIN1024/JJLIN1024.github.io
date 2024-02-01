---
title: Populating Next Right Pointers in Each Node II
date: 2023-04-10
lastmod: 2023-04-10
author: Jimmy Lin
tags: ["level order traversal", "binary tree"]
draft: false
---

## Description

Given a binary tree

struct Node {
  int val;
  Node \*left;
  Node \*right;
  Node \*next;
}

Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to `NULL`.

Initially, all next pointers are set to `NULL`.

**Example 1:**

![](https://assets.leetcode.com/uploads/2019/02/15/117_sample.png)

**Input:** root = \[1,2,3,4,5,null,7\]
**Output:** \[1,#,2,3,#,4,5,7,#\]
**Explanation:** Given the above binary tree (Figure A), your function should populate each next pointer to point to its next right node, just like in Figure B. The serialized output is in level order as connected by the next pointers, with '#' signifying the end of each level.

**Example 2:**

**Input:** root = \[\]
**Output:** \[\]

**Constraints:**

*   The number of nodes in the tree is in the range `[0, 6000]`.
*   `-100 <= Node.val <= 100`

**Follow-up:**

*   You may only use constant extra space.
*   The recursive approach is fine. You may assume implicit stack space does not count as extra space for this problem.

## Code 

same as [[Populating Next Right Pointers in Each Node]]，差別在於此題並沒有限定給定的 binary tree 為 perfect binary tree。

### Level order traversal

解法和 [[Populating Next Right Pointers in Each Node]] 一樣。

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

和 [[Populating Next Right Pointers in Each Node]] 的 iterative 解法相比，在每一層都多使用了一個 dummy node `tempChild`。

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
        Node* curr = root;

        while(curr) {
            Node* tempChild = new Node(0);
            Node* currChild = tempChild;
            while(curr) {
                if(curr->left) {
                    currChild->next = curr->left;
                    currChild = currChild->next;
                }
                if(curr->right) {
                    currChild->next = curr->right;
                    currChild = currChild->next;
                }

                curr = curr->next;
            }

            curr = tempChild->next;
        }

        return root;

    }
};
```
## Source
- [Populating Next Right Pointers in Each Node II - LeetCode](https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/description/)