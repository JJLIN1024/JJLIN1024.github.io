---
title: Add Two Numbers II
date: 2023-12-07
lastmod: 2023-12-07
author:
  - Jimmy Lin
tags:
  - linked_list
draft: false
---

## Description

You are given two **non-empty** linked lists representing two non-negative integers. The most significant digit comes first and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/04/09/sumii-linked-list.jpg)

**Input:** l1 = \[7,2,4,3\], l2 = \[5,6,4\]
**Output:** \[7,8,0,7\]

**Example 2:**

**Input:** l1 = \[2,4,3\], l2 = \[5,6,4\]
**Output:** \[8,0,7\]

**Example 3:**

**Input:** l1 = \[0\], l2 = \[0\]
**Output:** \[0\]

**Constraints:**

*   The number of nodes in each linked list is in the range `[1, 100]`.
*   `0 <= Node.val <= 9`
*   It is guaranteed that the list represents a number that does not have leading zeros.

**Follow up:** Could you solve it without reversing the input lists?

## Code 

Time Complexity: $O(N)$, Space Complexity: $O(1)$

結合 [[Reverse Linked List|Reverse Linked List]] 和 [[Add Two Numbers|Add Two Numbers]] 就可以解出。

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
        l1 = reverse_list(l1);
        l2 = reverse_list(l2);

        int carry = 0;
        ListNode* dummy = new ListNode(0);
        ListNode* curr = dummy;
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
        
        ListNode* res = reverse_list(dummy->next);
        return res;
    }

    ListNode* reverse_list(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* cur = head;
        while(cur) {
            ListNode* next = cur->next;
            cur->next = prev;
            prev = cur;
            cur = next;
        }

        return prev;
    }
};
```

## Source
- [Add Two Numbers II - LeetCode](https://leetcode.com/problems/add-two-numbers-ii/description/)