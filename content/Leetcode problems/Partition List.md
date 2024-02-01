---
title: Partition List
date: 2023-05-02
lastmod: 2023-05-02
author:
  - Jimmy Lin
tags:
  - linked_list
  - indirect_pointer
draft: false
---

## Description

Given the `head` of a linked list and a value `x`, partition it such that all nodes **less than** `x` come before nodes **greater than or equal** to `x`.

You should **preserve** the original relative order of the nodes in each of the two partitions.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/01/04/partition.jpg)

**Input:** head = \[1,4,3,2,5,2\], x = 3
**Output:** \[1,2,2,4,3,5\]

**Example 2:**

**Input:** head = \[2,1\], x = 2
**Output:** \[1,2\]

**Constraints:**

*   The number of nodes in the list is in the range `[0, 200]`.
*   `-100 <= Node.val <= 100`
*   `-200 <= x <= 200`

## Code 

建好比 x 小和比 x 大的 linked list，再串起來。

Time Complexity: $O(N)$, Space Complexity: $O(1)$

### Direct Pointer

```c
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
static struct ListNode* new_node() {
    struct ListNode* node = malloc(sizeof(struct ListNode));
    node->val = 0;
    node->next = NULL;
    return node;
}

struct ListNode* partition(struct ListNode* head, int x) {
    struct ListNode* smaller = new_node();
    struct ListNode* bigger = new_node();

    struct ListNode* s_ptr = smaller;
    struct ListNode* b_ptr = bigger;
    while(head) {
        if(head->val < x) {
            s_ptr->next = head;
            s_ptr = s_ptr->next;
        } else {
            b_ptr->next = head;
            b_ptr = b_ptr->next;
        }
        head = head->next;
    }
    s_ptr->next = bigger->next;
    b_ptr->next = NULL;
    return smaller->next;

    
}
```
### Pointer to a pointer (Indirect Pointer)

避免動態記憶體組態(malloc)。

```c
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
struct ListNode* partition(struct ListNode* head, int x) {
    struct ListNode* bigger = NULL;
    struct ListNode** s_ptr = &head;
    struct ListNode** b_ptr = &bigger;
    struct ListNode* cur = head;

    while(cur) {
        if(cur->val < x) {
            *s_ptr = cur;
            s_ptr = &(*s_ptr)->next;
        } else {
            *b_ptr = cur;
            b_ptr = &(*b_ptr)->next;
        }
        cur = cur->next;
    }
    *s_ptr = bigger;
    *b_ptr = NULL; 
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
    ListNode* partition(ListNode* head, int x) {

        ListNode* big = nullptr;
        ListNode** bigger = &big;
        ListNode** smaller = &head;

        for(ListNode* cur = head; cur != nullptr; cur = cur->next) {
            if(cur->val < x) {
                *smaller = cur;
                smaller = &((*smaller)->next);
            } else {
                *bigger = cur;
                bigger = &((*bigger)->next);
            }
        }

        *smaller = big;
        *bigger = nullptr;

        return head;
    }
};
```

### Pointer to a pointer to a pointer

用 `ListNode*** indirect` 指向 `bigger` or `smaller`。

重點，形式從 `smaller = &((*smaller)->next);` or `bigger = &((*bigger)->next);` 變成了 `*indirect = &(**indirect)->next;`。

```c
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
struct ListNode* partition(struct ListNode* head, int x) {
    struct ListNode* bigger = NULL;
    struct ListNode** s_ptr = &head;
    struct ListNode** b_ptr = &bigger;
    struct ListNode* cur = head;

    while(cur) {
        struct ListNode*** indirect = cur->val < x ? &s_ptr : &b_ptr;
        **indirect = cur;
        *indirect = &(**indirect)->next;
        cur = cur->next;
    }
    *s_ptr = bigger;
    *b_ptr = NULL; 
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
    ListNode* partition(ListNode* head, int x) {

        ListNode* big = nullptr;
        ListNode** bigger = &big;
        ListNode** smaller = &head;

        for(ListNode* cur = head; cur != nullptr; cur = cur->next) {
            ListNode*** indirect = cur->val < x ? &smaller : &bigger;
            **indirect = cur;
            *indirect = &(**indirect)->next; 
        }

        *smaller = big;
        *bigger = nullptr;

        return head;
    }
};
```


## Source
- [Partition List - LeetCode](https://leetcode.com/problems/partition-list/description/)