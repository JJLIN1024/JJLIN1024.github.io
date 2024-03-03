---
title: Reverse Nodes in k-Group
date: 2023-12-06
lastmod: 2023-12-06
author:
  - Jimmy Lin
tags:
  - linked_list
  - review
draft: false
sr-due: 2024-05-20
sr-interval: 90
sr-ease: 290
---

## Description

Given the `head` of a linked list, reverse the nodes of the list `k` at a time, and return _the modified list_.

`k` is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of `k` then left-out nodes, in the end, should remain as it is.

You may not alter the values in the list's nodes, only nodes themselves may be changed.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/10/03/reverse_ex1.jpg)

**Input:** head = \[1,2,3,4,5\], k = 2
**Output:** \[2,1,4,3,5\]

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/10/03/reverse_ex2.jpg)

**Input:** head = \[1,2,3,4,5\], k = 3
**Output:** \[3,2,1,4,5\]

**Constraints:**

*   The number of nodes in the list is `n`.
*   `1 <= k <= n <= 5000`
*   `0 <= Node.val <= 1000`

**Follow-up:** Can you solve the problem in `O(1)` extra memory space?

## Code 

Time Complexity: $O(n)$, Space Complexity: $O(1)$

### Recursive

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
    ListNode* reverseKGroup(ListNode* head, int k) {
        ListNode* node = head;
        for(int i = 0; i < k; i++) {
            if(!node) return head;
            node = node->next;
        }

        ListNode* new_head = reverse(head, node);
        head->next = reverseKGroup(node, k);
        return new_head;
    }

    ListNode* reverse(ListNode* first, ListNode* last) {
        ListNode* prev = first;
        while(first != last) {
            ListNode* tmp = first->next;
            first->next = prev;
            prev = first;
            first = tmp;
        }
        return prev;
    }
};
```

### Iterative

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
    ListNode* reverse_list(ListNode* first) {
        ListNode* prev = first;
        while(first) {
            ListNode* tmp = first->next;
            first->next = prev;
            prev = first;
            first = tmp;
        }
        return prev;
    }

    ListNode* reverseKGroup(ListNode* head, int k) {
        ListNode* dummy = new ListNode();
        dummy->next = head;

        ListNode* prev = dummy, *end, *nextHead;
        while(head) {
            end = head;
            int i;
            for(i = 0; i < k - 1 && end && end->next; end = end->next, i++);
            nextHead = end->next;
            if(i == k - 1) {
                end->next = nullptr;
                prev->next = reverse_list(head);
                prev = head;
                head->next = nextHead;
            }
            head = nextHead;
        }

        return dummy->next;
    }
};
```
## Source
- [Reverse Nodes in k-Group - LeetCode](https://leetcode.com/problems/reverse-nodes-in-k-group/description/)