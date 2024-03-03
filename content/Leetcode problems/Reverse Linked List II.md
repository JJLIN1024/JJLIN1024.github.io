---
title: Reverse Linked List II
date: 2023-12-06
lastmod: 2023-12-06
author:
  - Jimmy Lin
tags:
  - linked_list
draft: false
---

## Description

Given the `head` of a singly linked list and two integers `left` and `right` where `left <= right`, reverse the nodes of the list from position `left` to position `right`, and return _the reversed list_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/02/19/rev2ex2.jpg)

**Input:** head = \[1,2,3,4,5\], left = 2, right = 4
**Output:** \[1,4,3,2,5\]

**Example 2:**

**Input:** head = \[5\], left = 1, right = 1
**Output:** \[5\]

**Constraints:**

*   The number of nodes in the list is `n`.
*   `1 <= n <= 500`
*   `-500 <= Node.val <= 500`
*   `1 <= left <= right <= n`

**Follow up:** Could you do it in one pass?

## Code 

Time Complexity: $O(N)$, Space Complexity: $O(1)$

```c
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
struct ListNode* reverseBetween(struct ListNode* head, int left, int right) {
    struct ListNode* dummy = (struct ListNode*) malloc(sizeof(struct ListNode));
    dummy->next = head;

    struct ListNode* cur = dummy;
    for(int i = 0; i < left - 1; i++) {
        cur = cur->next;
    }

    struct ListNode* prev = NULL; 
    struct ListNode* old_head = cur;
    cur = cur->next;
    struct ListNode* new_tail = cur;

    struct ListNode* next;
    for(int i = 0; i <= right - left; i++) {
        next = cur->next;
        cur->next = prev;
        prev = cur;
        cur = next;
    }

    // prev is new head;
    old_head->next = prev;
    new_tail->next = next;

    return dummy->next;
}
```

## Source
- [Reverse Linked List II - LeetCode](https://leetcode.com/problems/reverse-linked-list-ii/description/)