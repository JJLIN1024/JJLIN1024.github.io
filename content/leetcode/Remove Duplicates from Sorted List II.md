---
title: Remove Duplicates from Sorted List II
date: 2023-01-30
lastmod: 2023-12-06
author:
  - Jimmy Lin
tags:
  - linked_list
  - indirect_pointer
draft: false
---

## Description

Given the `head` of a sorted linked list, _delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list_. Return _the linked list **sorted** as well_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/01/04/linkedlist1.jpg)

**Input:** head = \[1,2,3,3,4,4,5\]
**Output:** \[1,2,5\]

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/01/04/linkedlist2.jpg)

**Input:** head = \[1,1,1,2,3\]
**Output:** \[2,3\]

**Constraints:**

*   The number of nodes in the list is in the range `[0, 300]`.
*   `-100 <= Node.val <= 100`
*   The list is guaranteed to be **sorted** in ascending order.

## Code 

和 [[Remove Duplicates from Sorted List]] 類似，不過這題除非使用 pointer to pointer，要不然就會需要建立 dummy node 以及使用 prev, cur pointer。

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
struct ListNode* deleteDuplicates(struct ListNode* head) {
    struct ListNode** indirect = &head;
    while(*indirect) {
        if ((*indirect)->next && (*indirect)->val == (*indirect)->next->val) {
            int v = (*indirect)->val;
            while ((*indirect) && (*indirect)->val == v) {
                *indirect = (*indirect)->next;
            }
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
    ListNode* deleteDuplicates(ListNode* head) {
        ListNode dummy(0);
        ListNode* prev = &dummy;
        prev->next = head;
        ListNode* cur = head;
        while(cur) {
            if(cur->next && cur->val == cur->next->val){
                while(cur->next && cur->val == cur->next->val) {
                    cur = cur->next;
                }
                prev->next = cur->next;
                cur = cur->next;
            } else {
                cur = cur->next;
                prev = prev->next;
            }
        }

        return dummy.next;
    }
};
```

## Source
- [Remove Duplicates from Sorted List II - LeetCode](https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/description/)