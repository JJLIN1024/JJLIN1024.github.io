---
title: Remove Nodes From Linked List
date: 2023-12-07
lastmod: 2023-12-07
author:
  - Jimmy Lin
tags:
  - linked_list
  - indirect_pointer
draft: false
---

## Description

You are given the `head` of a linked list.

Remove every node which has a node with a greater value anywhere to the right side of it.

Return _the_ `head` _of the modified linked list._

**Example 1:**

![](https://assets.leetcode.com/uploads/2022/10/02/drawio.png)

**Input:** head = \[5,2,13,3,8\]
**Output:** \[13,8\]
**Explanation:** The nodes that should be removed are 5, 2 and 3.
- Node 13 is to the right of node 5.
- Node 13 is to the right of node 2.
- Node 8 is to the right of node 3.

**Example 2:**

**Input:** head = \[1,1,1,1\]
**Output:** \[1,1,1,1\]
**Explanation:** Every node has value 1, so no nodes are removed.

**Constraints:**

*   The number of the nodes in the given list is in the range `[1, 105]`.
*   `1 <= Node.val <= 105`

## Code 

Time Complexity: $O(N)$, Space Complexity: $O(1)$

用到 [[Reverse Linked List|Reverse Linked List]]，和 [[Daily Temperatures]] 中的概念。

```

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* removeNodes(ListNode* head) {
        if(!(head->next)) return head;
       head = reverse_list(head);

       int curMax = head->val;
        ListNode** indirect = &head;
        while(*indirect) {
            if((*indirect)->val < curMax) {
                *indirect = (*indirect)->next;
            } else {
                curMax = max(curMax, (*indirect)->val);
                indirect = &(*indirect)->next;
            }
        }

        head = reverse_list(head);
        return head;
    }

    ListNode* reverse_list(ListNode* head) {
        ListNode* cur = head;
        ListNode* prev = nullptr;
        while(cur) {
            ListNode* next = cur->next;
            cur->next = prev;
            prev = cur;
            cur = next;
        }

        return prev;
    }
};
```

## Source
- [Remove Nodes From Linked List - LeetCode](https://leetcode.com/problems/remove-nodes-from-linked-list/)