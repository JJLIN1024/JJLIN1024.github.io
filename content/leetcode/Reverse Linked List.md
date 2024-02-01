---
title: Reverse Linked List
date: 2023-01-31
lastmod: 2023-12-06
author:
  - Jimmy Lin
tags:
  - linked_list
draft: false
---

## Description

Given the `head` of a singly linked list, reverse the list, and return _the reversed list_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/02/19/rev1ex1.jpg)

**Input:** head = \[1,2,3,4,5\]
**Output:** \[5,4,3,2,1\]

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/02/19/rev1ex2.jpg)

**Input:** head = \[1,2\]
**Output:** \[2,1\]

**Example 3:**

**Input:** head = \[\]
**Output:** \[\]

**Constraints:**

*   The number of nodes in the list is the range `[0, 5000]`.
*   `-5000 <= Node.val <= 5000`

**Follow up:** A linked list can be reversed either iteratively or recursively. Could you implement both?

## Code 

使用 [[Palindrome Linked List]] 中學到的技巧，將 linked list 反轉。

Time Complexity: $O(N)$, Space Complexity: $O(1)$

```c
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
struct ListNode* reverseList(struct ListNode* head) {
    if(!head) return NULL;
    if(!head->next) return head;
    struct ListNode* prev = NULL;
    struct ListNode* cur = head;
    while(cur) {
        struct ListNode* next = cur->next;
        cur->next = prev;
        prev = cur;
        cur = next;
    }
    return prev;
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
    ListNode* reverseList(ListNode* head) {
        ListNode* cur = head;
        ListNode* prev = nullptr;
        while(cur) {
            ListNode* temp = cur->next;
            cur->next = prev;
            prev = cur;
            cur = temp;
        }

        return prev;

    }
};
```

## Source
- [Reverse Linked List - LeetCode](https://leetcode.com/problems/reverse-linked-list/description/)