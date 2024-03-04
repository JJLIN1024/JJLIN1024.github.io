---
title: Construct Quad Tree
date: 2024-02-28
lastmod: 2024-02-28
author:
  - Jimmy Lin
tags:
  - divide_and_conquer
  - review
draft: false
sr-due: 2024-03-18
sr-interval: 15
sr-ease: 290
---

## Description

Given a `n * n` matrix `grid` of `0's` and `1's` only. We want to represent `grid` with a Quad-Tree.

Return _the root of the Quad-Tree representing_ `grid`.

A Quad-Tree is a tree data structure in which each internal node has exactly four children. Besides, each node has two attributes:

*   `val`: True if the node represents a grid of 1's or False if the node represents a grid of 0's. Notice that you can assign the `val` to True or False when `isLeaf` is False, and both are accepted in the answer.
*   `isLeaf`: True if the node is a leaf node on the tree or False if the node has four children.

class Node {
    public boolean val;
    public boolean isLeaf;
    public Node topLeft;
    public Node topRight;
    public Node bottomLeft;
    public Node bottomRight;
}

We can construct a Quad-Tree from a two-dimensional area using the following steps:

1.  If the current grid has the same value (i.e all `1's` or all `0's`) set `isLeaf` True and set `val` to the value of the grid and set the four children to Null and stop.
2.  If the current grid has different values, set `isLeaf` to False and set `val` to any value and divide the current grid into four sub-grids as shown in the photo.
3.  Recurse for each of the children with the proper sub-grid.

![](https://assets.leetcode.com/uploads/2020/02/11/new_top.png)

If you want to know more about the Quad-Tree, you can refer to the [wiki](https://en.wikipedia.org/wiki/Quadtree).

**Quad-Tree format:**

You don't need to read this section for solving the problem. This is only if you want to understand the output format here. The output represents the serialized format of a Quad-Tree using level order traversal, where `null` signifies a path terminator where no node exists below.

It is very similar to the serialization of the binary tree. The only difference is that the node is represented as a list `[isLeaf, val]`.

If the value of `isLeaf` or `val` is True we represent it as **1** in the list `[isLeaf, val]` and if the value of `isLeaf` or `val` is False we represent it as **0**.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/02/11/grid1.png)

**Input:** grid = \[\[0,1\],\[1,0\]\]
**Output:** \[\[0,1\],\[1,0\],\[1,1\],\[1,1\],\[1,0\]\]
**Explanation:** The explanation of this example is shown below:
Notice that 0 represents False and 1 represents True in the photo representing the Quad-Tree.
![](https://assets.leetcode.com/uploads/2020/02/12/e1tree.png)

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/02/12/e2mat.png)

**Input:** grid = \[\[1,1,1,1,0,0,0,0\],\[1,1,1,1,0,0,0,0\],\[1,1,1,1,1,1,1,1\],\[1,1,1,1,1,1,1,1\],\[1,1,1,1,0,0,0,0\],\[1,1,1,1,0,0,0,0\],\[1,1,1,1,0,0,0,0\],\[1,1,1,1,0,0,0,0\]\]
**Output:** \[\[0,1\],\[1,1\],\[0,1\],\[1,1\],\[1,0\],null,null,null,null,\[1,0\],\[1,0\],\[1,1\],\[1,1\]\]
**Explanation:** All values in the grid are not the same. We divide the grid into four sub-grids.
The topLeft, bottomLeft and bottomRight each has the same value.
The topRight have different values so we divide it into 4 sub-grids where each has the same value.
Explanation is shown in the photo below:
![](https://assets.leetcode.com/uploads/2020/02/12/e2tree.png)

**Constraints:**

*   `n == grid.length == grid[i].length`
*   `n == 2x` where `0 <= x <= 6`

## Code 

Time Complexity: $O(n^2 \log{n^2})$, Space Complexity: $O(n^2)$

若是 leaf node，就 return pointer，若不是，就新創一個 pointer 再 return。

```cpp
/*
// Definition for a QuadTree node.
class Node {
public:
    bool val;
    bool isLeaf;
    Node* topLeft;
    Node* topRight;
    Node* bottomLeft;
    Node* bottomRight;
    
    Node() {
        val = false;
        isLeaf = false;
        topLeft = NULL;
        topRight = NULL;
        bottomLeft = NULL;
        bottomRight = NULL;
    }
    
    Node(bool _val, bool _isLeaf) {
        val = _val;
        isLeaf = _isLeaf;
        topLeft = NULL;
        topRight = NULL;
        bottomLeft = NULL;
        bottomRight = NULL;
    }
    
    Node(bool _val, bool _isLeaf, Node* _topLeft, Node* _topRight, Node* _bottomLeft, Node* _bottomRight) {
        val = _val;
        isLeaf = _isLeaf;
        topLeft = _topLeft;
        topRight = _topRight;
        bottomLeft = _bottomLeft;
        bottomRight = _bottomRight;
    }
};
*/

class Solution {
array<Node*, 2> leafNodes_;
vector<vector<int>> grid_;
public:
    Node* construct(vector<vector<int>>& grid) {
        grid_ = move(grid);
        leafNodes_[0] = new Node(false, true, nullptr, nullptr, nullptr, nullptr);
        leafNodes_[1] = new Node(true, true, nullptr, nullptr, nullptr, nullptr);
        return construct(0, 0, grid_.size());
    }

    Node* construct(int r, int c, int s) {
        if(s == 1) {
            return leafNodes_[grid_[r][c]];
        }
        s /= 2;
        Node* tl = construct(r, c, s);
        Node* tr = construct(r, c + s, s);
        Node* bl = construct(r + s, c, s);
        Node* br = construct(r + s, c + s, s);
        if(tl == tr && tl == bl && tl == br) {
            return tl;
        }
        return new Node(false, false, tl, tr, bl, br);
    }
};
```

## Source
- [Construct Quad Tree - LeetCode](https://leetcode.com/problems/construct-quad-tree/description/?envType=study-plan-v2&envId=top-interview-150)