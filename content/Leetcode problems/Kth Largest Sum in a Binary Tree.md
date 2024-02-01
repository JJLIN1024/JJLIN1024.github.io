---
title: Kth Largest Sum in a Binary Tree
date: 2023-03-22
lastmod: 2023-03-22
author: Jimmy Lin
tags: []
draft: false
---

## Description

You are given the `root` of a binary tree and a positive integer `k`.

The **level sum** in the tree is the sum of the values of the nodes that are on the **same** level.

Return _the_ `kth` _**largest** level sum in the tree (not necessarily distinct)_. If there are fewer than `k` levels in the tree, return `-1`.

**Note** that two nodes are on the same level if they have the same distance from the root.

**Example 1:**

![](https://assets.leetcode.com/uploads/2022/12/14/binaryytreeedrawio-2.png)

**Input:** root = \[5,8,9,2,1,3,7,4,6\], k = 2
**Output:** 13
**Explanation:** The level sums are the following:
- Level 1: 5.
- Level 2: 8 + 9 = 17.
- Level 3: 2 + 1 + 3 + 7 = 13.
- Level 4: 4 + 6 = 10.
The 2nd largest level sum is 13.

**Example 2:**

![](https://assets.leetcode.com/uploads/2022/12/14/treedrawio-3.png)

**Input:** root = \[1,2,null,3\], k = 1
**Output:** 3
**Explanation:** The largest level sum is 3.

**Constraints:**

*   The number of nodes in the tree is `n`.
*   `2 <= n <= 105`
*   `1 <= Node.val <= 106`
*   `1 <= k <= n`

## Code 

結合 [[Binary Tree Level Order Traversal]] 和 [[K Closest Points to Origin]] 中用到的 priority_queue。

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
    long long kthLargestLevelSum(TreeNode* root, int k) {
        queue<TreeNode*> q;
        q.push(root);
        using LL = long long;
        // min heap
        priority_queue<LL, vector<LL>, greater<LL>> pq;
        int level = 0;
        while(!q.empty()) {
            int n = q.size();
            long long levelSum = 0;
            for(int i = 0; i < n; i++) {
                auto node = q.front(); q.pop();
                levelSum += node->val;
                if(node->left) q.push(node->left);
                if(node->right) q.push(node->right);
            }
            pq.push(levelSum);
            level++;
            if(pq.size() > k) pq.pop();
        }

        return level < k ? -1 : pq.top();
    }
};
```

## Source
- [Kth Largest Sum in a Binary Tree - LeetCode](https://leetcode.com/problems/kth-largest-sum-in-a-binary-tree/description/)