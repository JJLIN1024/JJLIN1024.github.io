---
title: Add Two Numbers
date: 2023-01-31
lastmod: 2023-01-31
author:
  - Jimmy Lin
tags:
  - linked_list
draft: false
---

## Description

You are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in **reverse order**, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/10/02/addtwonumber1.jpg)

**Input:** l1 = \[2,4,3\], l2 = \[5,6,4\]
**Output:** \[7,0,8\]
**Explanation:** 342 + 465 = 807.

**Example 2:**

**Input:** l1 = \[0\], l2 = \[0\]
**Output:** \[0\]

**Example 3:**

**Input:** l1 = \[9,9,9,9,9,9,9\], l2 = \[9,9,9,9\]
**Output:** \[8,9,9,9,0,0,0,1\]

**Constraints:**

*   The number of nodes in each linked list is in the range `[1, 100]`.
*   `0 <= Node.val <= 9`
*   It is guaranteed that the list represents a number that does not have leading zeros.

## Code 

一開始寫了個又臭又長的版本。

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
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        int carry = 0;
        ListNode dummy(0);
        ListNode* curr = &dummy;
        while(l1 && l2) {
            int val = (l1->val + l2->val + carry) % 10;
            curr->next = new ListNode(val);
            carry = (l1->val + l2->val + carry) / 10;
            curr = curr->next;
            l1 = l1->next;
            l2 = l2->next;
        }

        while(l1) {
            int val = (l1->val + carry) % 10;
            curr->next = new ListNode(val);
            carry = (l1->val + carry) / 10;
            curr = curr->next;
            l1 = l1->next;
        }

        while(l2) {
            int val = (l2->val + carry) % 10;
            curr->next = new ListNode(val);
            carry = (l2->val + carry) / 10;
            curr = curr->next;
            l2 = l2->next;
        }

        if(carry) {
            curr->next = new ListNode(carry);
        }
        
        return dummy.next;
    }
};
```

while 迴圈改用 or 就可以將 code 變簡潔。

```c
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
struct ListNode* addTwoNumbers(struct ListNode* l1, struct ListNode* l2) {
   int carry = 0;
   struct ListNode* dummy =  (struct ListNode*) malloc(sizeof(struct ListNode));
   dummy->next = NULL;
   struct ListNode* cur = dummy;
    while(l1 || l2 || carry) {
        int sum = 0;
        if(l1) {
            sum += l1->val;
            l1 = l1->next;
        }
            
        if(l2) {
            sum += l2->val;
            l2 = l2->next;
        }

        sum += carry;
        carry = sum / 10;

        struct ListNode* new_node =  (struct ListNode*) malloc(sizeof(struct ListNode));
        new_node->val = sum % 10;
        new_node->next = NULL;

        cur->next = new_node;
        cur = cur->next;

    }
   return dummy->next; 
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
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        int carry = 0;
        ListNode dummy(0);
        ListNode* curr = &dummy;
        while(l1 || l2 || carry) {
            int sum = 0;
            if(l1) {
                sum += l1->val;
                l1 = l1->next;
            }

            if(l2) {
                sum += l2->val;
                l2 = l2->next;
            }
            sum += carry;

            curr->next = new ListNode(sum % 10);
            carry = sum / 10;
            curr = curr->next;
        }
        
        return dummy.next;
    }
};
```
## Source
- [Add Two Numbers - LeetCode](https://leetcode.com/problems/add-two-numbers/description/)