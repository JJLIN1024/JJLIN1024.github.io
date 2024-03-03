---
title: Odd Even Linked List
date: 2023-04-18
lastmod: 2023-12-06
author:
  - Jimmy Lin
tags:
  - linked_list
draft: false
---

## Description

Given the `head` of a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices, and return _the reordered list_.

The **first** node is considered **odd**, and the **second** node is **even**, and so on.

Note that the relative order inside both the even and odd groups should remain as it was in the input.

You must solve the problem in `O(1)` extra space complexity and `O(n)` time complexity.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/03/10/oddeven-linked-list.jpg)

**Input:** head = \[1,2,3,4,5\]
**Output:** \[1,3,5,2,4\]

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/03/10/oddeven2-linked-list.jpg)

**Input:** head = \[2,1,3,5,6,4,7\]
**Output:** \[2,3,6,7,1,5,4\]

**Constraints:**

*   The number of nodes in the linked list is in the range `[0, 104]`.
*   `-106 <= Node.val <= 106`

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
struct ListNode* oddEvenList(struct ListNode* head) {
    if(!head) return NULL;
    if(!head->next) return head;
    
    struct ListNode* odd_start = head;
    struct ListNode* even_start = head->next;

    struct ListNode* odd = odd_start;
    struct ListNode* even = even_start;

    struct ListNode* odd_prev = odd;
    struct ListNode* even_prev = even;

    while(odd && even) {
        odd->next = even->next;
        odd_prev = odd;
        odd = odd->next;
        if(!odd)
            break;
        even->next = odd->next;  
        even_prev = even;      
        even = even->next;
        if(!even)
            break;
    }
    if(!odd) 
        odd_prev->next = even_start;
    else
        odd->next = even_start;

    return odd_start;
}
```

可觀察出 `while(odd && even && odd->next && even->next)` 一個好的迴圈定義很重要。

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
    ListNode* oddEvenList(ListNode* head) {
        if(!head || !head->next) return head;

        ListNode* odd = head;
        ListNode* even = head->next;
        ListNode* even_start = even;

        while(odd && even && odd->next && even->next) {
            odd->next = even->next;
            even->next = odd->next->next;

            odd = odd->next;
            even = even->next;
        }

        odd->next = even_start;

        return head;
    }
};
```

## Source
- [Odd Even Linked List - LeetCode](https://leetcode.com/problems/odd-even-linked-list/description/)