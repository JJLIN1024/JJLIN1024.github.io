---
title: Swap Nodes in Pairs
date: 2023-04-17
lastmod: 2023-04-17
author:
  - Jimmy Lin
tags:
  - linked_list
  - indirect_pointer
draft: false
---

## Description

Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/10/03/swap_ex1.jpg)

**Input:** head = \[1,2,3,4\]
**Output:** \[2,1,4,3\]

**Example 2:**

**Input:** head = \[\]
**Output:** \[\]

**Example 3:**

**Input:** head = \[1\]
**Output:** \[1\]

**Constraints:**

*   The number of nodes in the list is in the range `[0, 100]`.
*   `0 <= Node.val <= 100`

## Code 

### Recursive
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
    ListNode* swapPairs(ListNode* head) {
        if(!head) return head;
        if(!head->next) return head;
        
        ListNode* temp = head->next;
        head->next = swapPairs(head->next->next);
        temp->next = head;

        return temp;
    }
};
```

### Iterative
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
    ListNode* swapPairs(ListNode* head) {
        if(!head || !(head->next)) return head;
        
        ListNode* dummy = new ListNode();

        ListNode* prev = dummy;
        ListNode* cur = head;

        while(cur && cur->next) {
            prev->next = cur->next;
            cur->next = prev->next->next;
            prev->next->next = cur;

            prev = cur;
            cur = cur->next;
        }

        return dummy->next;
    }
};
```
### Iterative Pointer to Pointer

Time Complexity: $O(N)$, Space Complexity: $O(1)$
while loop 會先確認 a & b 所指向的地方是 valid 的（不為 nullptr），才會進行 while loop 中改變 pointer 的操作。

關鍵在於：`iter` 一開始會是指向 `head` 的 pointer，但是在第二循環後，就不會指向 head，但是在第一循環會修改 `head` 的 address 使得答案正確。

```c
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
struct ListNode* swapPairs(struct ListNode* head) {
    if(!head) return NULL;
    struct ListNode** iter = &head;
    struct ListNode* a;
    struct ListNode* b;
    while((a = *iter) && (b = a->next)) {
        a->next = b->next;
        b->next = a;
        *iter = b;
        iter = &(a->next);
    }
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
    ListNode* swapPairs(ListNode* head) {
        ListNode** pp = &head, *a, *b;
        while((a = *pp) && (b = a->next)) {
            a->next = b->next;
            b->next = a;
            *pp = b;
            pp = &(a->next);
        }

        return head;
    }
};
```

## Source
- [Swap Nodes in Pairs - LeetCode](https://leetcode.com/problems/swap-nodes-in-pairs/description/)