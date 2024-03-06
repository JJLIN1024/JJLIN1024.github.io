---
title: Sort List
date: 2023-02-15
lastmod: 2023-02-15
author:
  - Jimmy Lin
tags:
  - linked_list
  - slow_and_fast_pointer
  - sorting
  - divide_and_conquer
  - review
draft: false
sr-due: 2024-03-10
sr-interval: 4
sr-ease: 270
---

## Description

Given the `head` of a linked list, return _the list after sorting it in **ascending order**_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/09/14/sort_list_1.jpg)

**Input:** head = \[4,2,1,3\]
**Output:** \[1,2,3,4\]

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/09/14/sort_list_2.jpg)

**Input:** head = \[-1,5,3,4,0\]
**Output:** \[-1,0,3,4,5\]

**Example 3:**

**Input:** head = \[\]
**Output:** \[\]

**Constraints:**

*   The number of nodes in the list is in the range `[0, 5 * 104]`.
*   `-105 <= Node.val <= 105`

**Follow up:** Can you sort the linked list in `O(n logn)` time and `O(1)` memory (i.e. constant space)?

## Code 

以 [[Merge Two Sorted Lists]] 為基底，進行 divide and conquer（mergeSort）。

mergeSort 過程中以快慢指標的技巧找到中點進行分割。

```c
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */

struct ListNode* mergeTwoList(struct ListNode* list1, struct ListNode* list2) {
    struct ListNode* head;
    struct ListNode** indirect = &head;
    while(list1 && list2) {
        if(list1->val < list2->val) {
            *indirect = list1;
            list1 = list1->next;
        } else {
            *indirect = list2;
            list2 = list2->next;
        }
        indirect = &(*indirect)->next;
    }
    if(list1) {
       *indirect = list1;
    } else {
       *indirect = list2;
    }
    return head;
}

struct ListNode* sortList(struct ListNode* head) {
    if(!head) return NULL;
    if(!head->next) return head;

    struct ListNode* slow = head;
    struct ListNode* fast = head;
    struct ListNode* prev = NULL;
    while(fast && fast->next) {
        prev = slow;
        slow = slow->next;
        fast = fast->next->next;
    }
    prev->next = NULL;

    head = sortList(head);
    slow = sortList(slow);
    head = mergeTwoList(head, slow);
    return head;
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
    ListNode* sortList(ListNode* head) {
        if(head == NULL || head ->next == NULL)
            return head;
            
        ListNode* slow = head;
        ListNode* fast = head;
        ListNode* temp;
        while(fast && fast->next) {
            temp = slow;
            slow = slow->next;
            fast = fast->next->next;
        }

        temp->next = nullptr;

        ListNode* left = sortList(head);
        ListNode* right = sortList(slow);

        return mergeTwoLists(left, right);
    }

    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        ListNode* dummy = new ListNode(0);
        ListNode* curr = dummy;
        while(list1 && list2) {
            if(list1->val < list2->val) {
                curr->next = new ListNode(list1->val);
                curr = curr->next;
                list1 = list1->next;
            } else {
                curr->next = new ListNode(list2->val);
                curr = curr->next;
                list2 = list2->next;
            }
        }

        if(list1) {
            curr->next = list1;
        } else if (list2) {
            curr->next = list2;
        }

        return dummy->next;
    }
};
```

## Source
- [Sort List - LeetCode](https://leetcode.com/problems/sort-list/description/)