---
title: Binary Search Tree Iterator
date: 2023-03-31
lastmod: 2023-03-31
author: Jimmy Lin
tags: ["inorder traversal"]
draft: false
---

## Description

Implement the `BSTIterator` class that represents an iterator over the **[in-order traversal](https://en.wikipedia.org/wiki/Tree_traversal#In-order_(LNR))** of a binary search tree (BST):

*   `BSTIterator(TreeNode root)` Initializes an object of the `BSTIterator` class. The `root` of the BST is given as part of the constructor. The pointer should be initialized to a non-existent number smaller than any element in the BST.
*   `boolean hasNext()` Returns `true` if there exists a number in the traversal to the right of the pointer, otherwise returns `false`.
*   `int next()` Moves the pointer to the right, then returns the number at the pointer.

Notice that by initializing the pointer to a non-existent smallest number, the first call to `next()` will return the smallest element in the BST.

You may assume that `next()` calls will always be valid. That is, there will be at least a next number in the in-order traversal when `next()` is called.

**Example 1:**

![](https://assets.leetcode.com/uploads/2018/12/25/bst-tree.png)

**Input**
\["BSTIterator", "next", "next", "hasNext", "next", "hasNext", "next", "hasNext", "next", "hasNext"\]
\[\[\[7, 3, 15, null, null, 9, 20\]\], \[\], \[\], \[\], \[\], \[\], \[\], \[\], \[\], \[\]\]
**Output**
\[null, 3, 7, true, 9, true, 15, true, 20, false\]

**Explanation**
BSTIterator bSTIterator = new BSTIterator(\[7, 3, 15, null, null, 9, 20\]);
bSTIterator.next();    // return 3
bSTIterator.next();    // return 7
bSTIterator.hasNext(); // return True
bSTIterator.next();    // return 9
bSTIterator.hasNext(); // return True
bSTIterator.next();    // return 15
bSTIterator.hasNext(); // return True
bSTIterator.next();    // return 20
bSTIterator.hasNext(); // return False

**Constraints:**

*   The number of nodes in the tree is in the range `[1, 105]`.
*   `0 <= Node.val <= 106`
*   At most `105` calls will be made to `hasNext`, and `next`.

**Follow up:**

*   Could you implement `next()` and `hasNext()` to run in average `O(1)` time and use `O(h)` memory, where `h` is the height of the tree?

## Code 

### $O(n)$ space
在 constructer 中使用 [[Binary Tree Inorder Traversal]] 中的方法，建立 inorder traversal vector，後續的 next 移動就是 vector 的 index 存取問題。

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
class BSTIterator {
    vector<int> inorder;
    int idx;
public:
    BSTIterator(TreeNode* root) {
        idx = -1;
        stack<TreeNode*> st;
        while(root || !st.empty()) {
            while(root) {
                st.push(root);
                root = root->left;
            }
            auto node = st.top();
            st.pop();
            inorder.push_back(node->val);
            root = node->right;
        }
    }
    
    int next() {
        idx++;
        return inorder[idx];
    }
    
    bool hasNext() {
        return idx < 0 || idx < inorder.size() - 1;
    }
};

/**
 * Your BSTIterator object will be instantiated and called as such:
 * BSTIterator* obj = new BSTIterator(root);
 * int param_1 = obj->next();
 * bool param_2 = obj->hasNext();
 */
```

### $O(h)$ space, h is the tree height

將上述的 inorder traversal 拆解成 partial inorder traversal，就可以使 space complexity 降到 $O(h)$。

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
class BSTIterator {
    stack<TreeNode*> st;
public:
    BSTIterator(TreeNode* root) {
        partial_inorder(root);
    }
    
    int next() {
        auto node = st.top();
        st.pop();
        partial_inorder(node->right);
        return node->val;
    }
    
    bool hasNext() {
        return !st.empty();
    }

    void partial_inorder(TreeNode* node) {
        while(node) {
            st.push(node);
            node = node->left;
        }
    }
};

/**
 * Your BSTIterator object will be instantiated and called as such:
 * BSTIterator* obj = new BSTIterator(root);
 * int param_1 = obj->next();
 * bool param_2 = obj->hasNext();
 */
```

## Source
- [Binary Search Tree Iterator - LeetCode](https://leetcode.com/problems/binary-search-tree-iterator/description/)