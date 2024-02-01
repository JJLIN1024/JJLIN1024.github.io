---
title: Reorder List
date: 2023-03-15
lastmod: 2023-12-06
author:
  - Jimmy Lin
tags:
  - linked_list
  - slow_and_fast_pointer
draft: false
---

## Description

You are given the head of a singly linked-list. The list can be represented as:

L0 → L1 → … → Ln - 1 → Ln

_Reorder the list to be on the following form:_

L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …

You may not modify the values in the list's nodes. Only nodes themselves may be changed.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/03/04/reorder1linked-list.jpg)

**Input:** head = \[1,2,3,4\]
**Output:** \[1,4,2,3\]

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/03/09/reorder2-linked-list.jpg)

**Input:** head = \[1,2,3,4,5\]
**Output:** \[1,5,2,4,3\]

**Constraints:**

*   The number of nodes in the list is in the range `[1, 5 * 104]`.
*   `1 <= Node.val <= 1000`

## Code 

Time Complexity: $O(N)$, Space Complexity: $O(1)$

用到 [[Reverse Linked List]] 中的技巧將後半段反轉，也用到快慢指標去找到中點。

不過要注意 ，上述兩者在這裡的 implementation 都將 fast pointer(`p2`) 設的比一般的還要再往前一個 node。因為要將前半段的結尾的 `next` 設成 `NULL`。

```c
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
void reorderList(struct ListNode* head) {
    if(!head) return;
    if(!head->next) return;

    struct ListNode* slow = head;
    struct ListNode* fast = head->next;
    while(fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }

    // isolate the frist half
    struct ListNode* temp = slow->next;
    slow->next = NULL;

    // reverse the second half
    struct ListNode* prev = NULL;
    while(temp) {
        struct ListNode* next = temp->next;
        temp->next = prev;
        prev = temp;
        temp = next;
    }

    // prev and head is the two heads of two lists to join
    struct ListNode* old_head = head;
    struct ListNode* new_head = prev;
    while(old_head) {
        struct ListNode* next = old_head->next;
        old_head->next = new_head;
        old_head = new_head;
        new_head = next;
    }
}
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
    void reorderList(ListNode* head) {
        if (!head || !head->next) return;

        ListNode* p1 = head;
        ListNode* p2 = head->next;
        while(p2 && p2->next) {
            p1 = p1->next;
            p2 = p2->next->next;
        }
        // now slow is node before mid, reverse the second half of the list
        ListNode* newHead = p1->next;
        p2 = newHead->next;
        newHead->next = nullptr;
        while(p2) {
            p1 = p2->next;
            p2->next = newHead;
            newHead = p2;
            p2 = p1;
        }

        for (p1 = head, p2 = newHead; p1; ) {
            auto t = p1->next;
            p1->next = p2;
            p1 = p2;
            p2 = t;
        }

    }
};
```

## Source
- [Reorder List - LeetCode](https://leetcode.com/problems/reorder-list/description/)