---
title: Merge Two Sorted Lists
date: 2023-02-15
lastmod: 2023-12-03
author:
  - Jimmy Lin
tags:
  - linked_list
  - indirect_pointer
draft: false
---

## Description

You are given the heads of two sorted linked lists `list1` and `list2`.

Merge the two lists in a one **sorted** list. The list should be made by splicing together the nodes of the first two lists.

Return _the head of the merged linked list_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/10/03/merge_ex1.jpg)

**Input:** list1 = \[1,2,4\], list2 = \[1,3,4\]
**Output:** \[1,1,2,3,4,4\]

**Example 2:**

**Input:** list1 = \[\], list2 = \[\]
**Output:** \[\]

**Example 3:**

**Input:** list1 = \[\], list2 = \[0\]
**Output:** \[0\]

**Constraints:**

*   The number of nodes in both lists is in the range `[0, 50]`.
*   `-100 <= Node.val <= 100`
*   Both `list1` and `list2` are sorted in **non-decreasing** order.

## Code 

Time Complexity: $O(N)$, Space Complexity: $O(1)$
### Direct Pointer

C:
```c
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
struct ListNode* mergeTwoLists(struct ListNode* list1, struct ListNode* list2) {
    struct ListNode* dummy = malloc(sizeof(struct ListNode));
    struct ListNode* res = dummy;
    while(list1 && list2) {
        if(list1->val < list2->val) {
            dummy->next = list1;
            list1 = list1->next;
        } else {
            dummy->next = list2;
            list2 = list2->next;
        }
        dummy = dummy->next;
    }
    if(list1) {
        dummy->next = list1;
    } else {
        dummy->next = list2;
    }
    return res->next;
}
```

C++:
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
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        ListNode* dummy = new ListNode(0);
        ListNode* curr = dummy;
        while(list1 && list2) {
            if(list1->val < list2->val) {
                curr->next = new ListNode(list1->val);
                list1 = list1->next;
            } else {
                curr->next = new ListNode(list2->val);
                list2 = list2->next;
            }
            curr = curr->next;
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

### Pointer to Pointer (Indirect Pointer)

想避免組態暫時節點的空間 (即上方程式碼中的 `malloc`)，該怎麼做？運用上述 indirect pointer 的技巧（因為 indirect pointer 只需要改變 address，所以不需要用到 malloc）：

C:
```c
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
struct ListNode* mergeTwoLists(struct ListNode* list1, struct ListNode* list2) {
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
```

C++:
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
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        ListNode* head = nullptr;
        ListNode** indirect = &head;

        while(list1 && list2) {
            if(list1->val < list2->val) {
                *indirect = list1;
                list1 = list1->next;
            } else {
                *indirect = list2;
                list2 = list2->next;
            }

            indirect = &((*indirect)->next);
        }

        if(list1) 
            *indirect = list1;
        if(list2) 
            *indirect = list2;

        return head;
    }
};
```

## Source
- [Merge Two Sorted Lists - LeetCode](https://leetcode.com/problems/merge-two-sorted-lists/description/)