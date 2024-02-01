---
title: Remove Duplicates from Sorted List
date: 2023-01-29
lastmod: 2023-12-06
author:
  - Jimmy Lin
tags:
  - linked_list
  - indirect_pointer
draft: false
---

## Description

Given the `head` of a sorted linked list, _delete all duplicates such that each element appears only once_. Return _the linked list **sorted** as well_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/01/04/list1.jpg)

**Input:** head = \[1,1,2\]
**Output:** \[1,2\]

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/01/04/list2.jpg)

**Input:** head = \[1,1,2,3,3\]
**Output:** \[1,2,3\]

**Constraints:**

*   The number of nodes in the list is in the range `[0, 300]`.
*   `-100 <= Node.val <= 100`
*   The list is guaranteed to be **sorted** in ascending order.

## Code 

### Indirect Pointer
Time Complexity: $O(N)$, Space Complexity: $O(1)$

不過這個 solution 並沒有 free 被刪掉的 node，會造成 memory leak。

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
        if ((*indirect)->next && (*indirect)->val == (*indirect)->next->val) 
            *indirect = (*indirect)->next;
        else 
            indirect = &((*indirect)->next);
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
        ListNode* cur = head;
        while(cur) {
            while(cur->next && cur->val == cur->next->val) {
                cur->next = cur->next->next;
            }
            cur = cur->next;
        }

        return head;
    }
};
```

## Source
- [Remove Duplicates from Sorted List - LeetCode](https://leetcode.com/problems/remove-duplicates-from-sorted-list/description/)