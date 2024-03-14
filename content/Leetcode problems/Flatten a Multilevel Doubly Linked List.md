---
title: Flatten a Multilevel Doubly Linked List
date: 2023-12-06
lastmod: 2023-12-06
author:
  - Jimmy Lin
tags:
  - linked_list
  - review
draft: false
sr-due: 2024-08-29
sr-interval: 169
sr-ease: 290
---

## Description

You are given a doubly linked list, which contains nodes that have a next pointer, a previous pointer, and an additional **child pointer**. This child pointer may or may not point to a separate doubly linked list, also containing these special nodes. These child lists may have one or more children of their own, and so on, to produce a **multilevel data structure** as shown in the example below.

Given the `head` of the first level of the list, **flatten** the list so that all the nodes appear in a single-level, doubly linked list. Let `curr` be a node with a child list. The nodes in the child list should appear **after** `curr` and **before** `curr.next` in the flattened list.

Return _the_ `head` _of the flattened list. The nodes in the list must have **all** of their child pointers set to_ `null`.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/11/09/flatten11.jpg)

**Input:** head = \[1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12\]
**Output:** \[1,2,3,7,8,11,12,9,10,4,5,6\]
**Explanation:** The multilevel linked list in the input is shown.
After flattening the multilevel linked list it becomes:
![](https://assets.leetcode.com/uploads/2021/11/09/flatten12.jpg)

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/11/09/flatten2.1jpg)

**Input:** head = \[1,2,null,3\]
**Output:** \[1,3,2\]
**Explanation:** The multilevel linked list in the input is shown.
After flattening the multilevel linked list it becomes:
![](https://assets.leetcode.com/uploads/2021/11/24/list.jpg)

**Example 3:**

**Input:** head = \[\]
**Output:** \[\]
**Explanation:** There could be empty list in the input.

**Constraints:**

*   The number of Nodes will not exceed `1000`.
*   `1 <= Node.val <= 105`

**How the multilevel linked list is represented in test cases:**

We use the multilevel linked list from **Example 1** above:

 1---2---3---4---5---6--NULL
         |
         7---8---9---10--NULL
             |
             11--12--NULL

The serialization of each level is as follows:

\[1,2,3,4,5,6,null\]
\[7,8,9,10,null\]
\[11,12,null\]

To serialize all levels together, we will add nulls in each level to signify no node connects to the upper node of the previous level. The serialization becomes:

\[1,    2,    3, 4, 5, 6, null\]
             |
\[null, null, 7,    8, 9, 10, null\]
                   |
\[            null, 11, 12, null\]

Merging the serialization of each level and removing trailing nulls we obtain:

\[1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12\]

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(1)$

```cpp
/*
// Definition for a Node.
class Node {
public:
    int val;
    Node* prev;
    Node* next;
    Node* child;
};
*/

class Solution {
public:
    Node* flatten(Node* head) {
        Node *ptr = head, *tmp_next, *runner;

        while(ptr) {
            if(ptr->child) {
                tmp_next = ptr->next;
                ptr->next = ptr->child;
                ptr->next->prev= ptr;
                ptr->child = nullptr;

                runner = ptr->next;
                while(runner->next)
                    runner = runner->next;
                
                runner->next = tmp_next;
                if(runner->next)
                    runner->next->prev = runner;
            }

            ptr = ptr->next;
        }

        return head;
    }
};
```

## Source
- [Flatten a Multilevel Doubly Linked List - LeetCode](https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/description/)