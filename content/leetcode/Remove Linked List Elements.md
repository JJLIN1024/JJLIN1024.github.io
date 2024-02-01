---
title: Remove Linked List Elements
date: 2023-03-16
lastmod: 2023-03-16
author:
  - Jimmy Lin
tags:
  - linked_list
draft: false
---

## Description

Given the `head` of a linked list and an integer `val`, remove all the nodes of the linked list that has `Node.val == val`, and return _the new head_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/03/06/removelinked-list.jpg)

**Input:** head = \[1,2,6,3,4,5,6\], val = 6
**Output:** \[1,2,3,4,5\]

**Example 2:**

**Input:** head = \[\], val = 1
**Output:** \[\]

**Example 3:**

**Input:** head = \[7,7,7,7\], val = 7
**Output:** \[\]

**Constraints:**

*   The number of nodes in the list is in the range `[0, 104]`.
*   `1 <= Node.val <= 50`
*   `0 <= val <= 50`

## Code 

### Indirect Pointer
Time Complexity: $O(N)$, Space Complexity: $O(1)$

```c
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
struct ListNode* removeElements(struct ListNode* head, int val) {
    if(!head) return NULL;
    struct ListNode** indirect = &head;
    while(*indirect) {
        if((*indirect)->val == val) {
            struct ListNode* to_be_free = *indirect;
            *indirect = (*indirect)->next;
            free(to_be_free);
        } else {
            indirect = &((*indirect)->next);
        }
    }    
    return head;
}
```

### Pointer
Time Complexity: $O(N)$, Space Complexity: $O(1)$

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
    ListNode* removeElements(ListNode* head, int val) {
        ListNode* dummy = new ListNode();
        dummy->next = head;
        ListNode* curr = dummy;
        while(curr->next) {
            if(curr->next->val == val) {
                curr->next = curr->next->next;
            } else {
                curr = curr->next;
            }    
        }
        return dummy->next;
    }
};
```

## Source
- [Remove Linked List Elements - LeetCode](https://leetcode.com/problems/remove-linked-list-elements/description/)